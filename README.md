Hurl
====

Hurl was created for the Rails Rumble 2009 in 48 hours.
Now Hurl is an open source project for your enjoyment.

 - The official url is: <http://hurl.it/>
 - The unofficial url is: <http://hurl.eu/> (because hurl.it is so often **502 Bad Gateway**)


About this fork
---------------

This fork is intented to fix some errors (autocomplete, pubic_path, CodeRay, and few others).
I also removed GitHub login.

And the main change is to the design. I rebuilt the layout using the fresh [Foundation v3](http://foundation.zurb.com/). Hurl.eu is now _responsive_ on phone and tablet.


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


Run as a daemon
---------------

Install thin (or unicorn)

    gem install thin

Run thin as a daemon (the -s indicate how many instance you want)

    thin -s 1 -R config.ru start

Now visit <http://localhost:3000>


Configuration
-------------

If you want to configure few things, create a file `env.rb` in the root dir with:

````ruby
ENV['DEBUG']          = '0'
ENV['WEBSITE']        = 'hurl.eu' # url of the website
ENV['GA_CODE']        = 'UA-345518-XX' # Google Analytics code
````


Issues
------

Find a bug? Want a feature? Submit an [issue
here](http://github.com/j0k3r/hurl/issues). Patches welcome!


Screenshot
----------

[![Hurl](https://img.skitch.com/20120704-tjeaqjff6sdxnmcmad5rqwhh5a.png)](http://hurl.eu)


Original Authors
----------------

* [Leah Culver][1]
* [Chris Wanstrath][2]

[1]: http://github.com/leah
[2]: http://github.com/defunkt
