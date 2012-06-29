require 'helpers/pretty_printing'
require 'helpers/sinatra'
require 'yaml'

module Hurl
  module Helpers
    include Hurl::Helpers::PrettyPrinting
    include Hurl::Helpers::Sinatra

    #
    # helpers defined here are available to all views and sinatra routes
    #

    # debug { puts "hi!" }
    def debug
      yield if @debug
    end

    # sha(hash) => '01578ad840f1a7eba2bd202351119e635fde8e2a'
    def sha(thing)
      Digest::SHA1.hexdigest(thing.to_s)
    end

    def ga_code
      @ga_code
    end

    def website
      @website
    end

    # for sorting hashes with symbol keys
    def sort_hash(hash)
      hash.to_a.sort_by { |a, b| a.to_s }
    end

    # creates the hurls shown on the front page if they're not in the db
    def setup_default_hurls
      default_hurls.each do |name, params|
        save_hurl(params)
      end
    end

    def default_hurls
      return @default_hurls if @default_hurls
      path = File.expand_path(App.root + '/hurls.yaml')
      @default_hurls = YAML.load_file(path)
    end
  end
end
