module Rack
  class MiniProfiler
    class Dashboard < Rack::Static
      def initialize( app )
        super( app, urls: [""], root: "public", index: "index.html" )
      end
    end
  end
end
