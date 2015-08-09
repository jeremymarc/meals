set :application, "toptal"
set :repo_url, "git@github.com:jeremymarc/toptal.git"

# Project-specific overrides go here.
# For list of variables that can be customized, see:
# https://github.com/mattbrictson/capistrano-mb/blob/master/lib/capistrano/tasks/defaults.rake

fetch(:mb_recipes) << "sidekiq"
fetch(:mb_aptitude_packages).merge!(
  "redis-server@ppa:rwky/redis" => :redis
)

set :mb_dotenv_keys, %w(
  rails_secret_key_base
  mandrill_username
  mandrill_api_key
  sidekiq_web_username
  sidekiq_web_password
)
