FROM ruby:2.2.1

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install && gem install thin

COPY . .

CMD ["bundle", "exec", "shotgun", "-E", "production", "-o", "0.0.0.0", "-p", "3000", "config.ru"]
