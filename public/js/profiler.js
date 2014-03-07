(function() {

  // When form is submitted, perform request, get miniprofiler ID and reload
  // the page passing the ID as a get parameter
  $(".pr-request-form").submit( function( evt ) {
    evt.preventDefault()
    var path = $("#req-path").val()   || "/"
    var type = $("#req-method").val() || "GET"
    var data = $("#req-data").val()

    $.ajax( path, { type: type, data: data } )
      .done(function( res, status, xhr ) {
        var ids = JSON.parse( xhr.getResponseHeader("X-Miniprofiler-Ids") );
        if ( ids && ids.length ) {
          window.location = location.pathname + "?id=" + ids[0]
        }
      })
      .fail(function( _, __, error ) { alert( "Request failed with: " + error ) })
  })

  // If an ID was passed in the querystring, get data for that ID making a
  // request to /mini-profiler-resources/results and render the stats
  if ( /\?.*id=/.test( location.search ) ) {
    $("body").animate({ scrollTop: 120 })

    var url = "/mini-profiler-resources/results" + location.search

    $.get( url ).done(function( result ) {
      if ( console && console.log ) console.log( result )

      var root          = result.Root
      var totalDuration = root.DurationMilliseconds;

      $("title").text( "Profiler - " + result.Name )

      // Barebone template rendering
      var render = function( template, data ) {
        return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, function( _, token ) {
          return data[ token ]
        })
      }

      var overviewRowTemplate = document.getElementById("overview_row_tmpl").innerHTML
      var sqlRowTemplate      = document.getElementById("sql_row_tmpl").innerHTML

      // Recursively render stats for step tree
      var renderProfile = function( steps ) {
        steps.map( function( step ) {
          var data = {
            depth:       step.Depth,
            name:        step.Name,
            duration:    step.DurationMilliseconds.toFixed(2),
            percent:     ( step.DurationMilliseconds / totalDuration * 100 ).toFixed(2),
            start:       step.StartMilliseconds.toFixed(2),
            numSQL:      step.SqlTimings.length,
            sqlDuration: step.SqlTimingsDurationMilliseconds.toFixed(2)
          }
          var row = render( overviewRowTemplate, data )
          $(".pr-overview tbody").append( row )

          step.SqlTimings.map( function( sql ) {
            var data = {
              sql:      sql.FormattedCommandString,
              trace:    sql.StackTraceSnippet,
              duration: sql.DurationMilliseconds.toFixed(2),
              percent:  ( sql.DurationMilliseconds / totalDuration * 100 ).toFixed(2),
              start:    sql.StartMilliseconds.toFixed(2)
            }
            var row = render( sqlRowTemplate, data )
            $(".pr-sql-timings tbody").append( row )
          })

          // Recurse on children
          if ( step.Children && step.Children.length ) {
            renderProfile( step.Children )
          }
        })
      }

      renderProfile([ root ])
    })
  } else {
    $(".stats").hide()
  }
})();
