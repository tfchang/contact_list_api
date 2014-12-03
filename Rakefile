require 'rake'
require "sinatra/activerecord/rake"
require ::File.expand_path('../config/environment', __FILE__)

Rake::Task["db:create"].clear
Rake::Task["db:drop"].clear


# Use PostgreSQL for Heroku deployment
desc "create the database"
task "db:create" do
 if development?
  set :database, {
    adapter: "sqlite3",
    database: "db/db.sqlite3"
  }
  else
    set :database, ENV['DATABASE_URL']
  end
end

desc "drop the database"
task "db:drop" do
  rm_f 'db/db.sqlite3'
end

desc 'Retrieves the current schema version number'
task "db:version" do
  puts "Current version: #{ActiveRecord::Migrator.current_version}"
end
