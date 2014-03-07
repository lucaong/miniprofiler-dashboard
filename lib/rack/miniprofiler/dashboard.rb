module Rack
  module MiniProfiler
    class Dashboard < Rack::Static
      def initialize
        super( urls: [""], root: "public", index: "index.html" )
      end
    end
  end
end
