# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/list' do
  contacts = Contact.all.to_json
end
