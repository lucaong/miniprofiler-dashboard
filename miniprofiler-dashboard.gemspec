# encoding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require 'rack/miniprofiler/dashboard/version'

Gem::Specification.new do |gem|
  gem.name          = "miniprofiler-dashboard"
  gem.version       = Rack::MiniProfiler::Dashboard::VERSION
  gem.description   = "A dashboard for MiniProfiler"
  gem.summary       = <<-DESC
A dashboard for MiniProfiler, with a better UI and a simple tool to profile
even non-HTML APIs
  DESC
  gem.files         = `git ls-files`.split($/)

  gem.add_dependency 'rack'
  gem.add_dependency 'rack-mini-profiler'
  gem.add_development_dependency "rake"
end

