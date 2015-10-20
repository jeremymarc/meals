# Meals

This is a Rails 4.2.1 app.

## Prerequisites

This project requires:

* Ruby 2.2.1, preferably managed using [rbenv][]
* PostgreSQL must be installed and accepting connections

If you need help setting up a Ruby development environment, check out this [Rails OS X Setup Guide](https://mattbrictson.com/rails-osx-setup-guide).

## Getting started

### bin/setup

Run the `bin/setup` script. This script will:

* Check you have the required Ruby version
* Install gems using Bundler
* Create local copies of `.env` and `database.yml`
* Create, migrate, and seed the database

### Run it!

1. Run `rake test` to make sure everything works.
2. Run `rails s` to start the Rails app.
3. In a separate console, run the react client by doing:
 - cd public/react-client
 - npm install
 - bower install
 - gulp watch
