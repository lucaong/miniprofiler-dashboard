require 'test_helper'
require 'rack/builder'
require 'rack-mini-profiler'
require 'rack/miniprofiler/dashboard'

describe Rack::MiniProfiler::Dashboard do
  let(:app) do
    Rack::Builder.new do
      use Rack::MiniProfiler
      map '/profiler' do
        run Rack::MiniProfiler::Dashboard.new(->(_) { [404, {}, ["Not found"]] })
      end
    end
  end

  include Rack::Test::Methods

  it "shows the dashboard on /profiler" do
    get "/profiler/index.html"
    last_response.must_be :ok?
  end
end
