module Rack
  class MiniProfiler
    class Dashboard < Rack::Static
      def initialize( app )
        public_path = ::File.expand_path( '../../../public', ::File.dirname( __FILE__ ) )
        super( app, urls: [''], root: public_path, index: 'index.html' )
      end
    end
  end
end
