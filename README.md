Hurl
====

Hurl was created for the Rails Rumble 2009 in 48 hours.
Now Hurl is an open source project for your enjoyment.

 - The official url is: <http://hurl.it/>
 - The unofficial url is: <http://hurl.eu/> (because hurl.it is so often **502 Bad Gateway**)


Installation
------------

Hurl requires Ruby 1.8.6+ (but I recommend to use ruby 1.9)

    apt-get install ruby1.9-dev

First download hurl and cd into the directory:

    git clone git://github.com/twilio/hurl
    cd hurl

Install [RubyGems](https://rubygems.org/pages/download):

    sudo apt-get install rubygems

Then install [Bundler](http://gembundler.com/):

    gem install bundler

Now install Hurl's dependencies:

    bundle install
    
If you got problem with curb, run these commands and re-try `bundle install`:

    sudo apt-get install curl libcurl3 libcurl3-gnutls libcurl4-openssl-dev
    gem install curb --platform=ruby


Run Locally
-----------

    bundle exec shotgun config.ru

Now visit <http://localhost:9393>


Issues
------

Find a bug? Want a feature? Submit an [issue
here](http://github.com/twilio/hurl/issues). Patches welcome!


Screenshot
----------

[![Hurl](http://img.skitch.com/20091020-xtiqtj4eajuxs43iu5h3be7upj.png)](http://hurl.eu)


Original Authors
----------------

* [Leah Culver][2]
* [Chris Wanstrath][3]

[2]: http://github.com/leah
[3]: http://github.com/defunkt
