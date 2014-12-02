# Homepage (Root path)
get '/' do
  erb :index
end

get '/list' do
  erb :list
end
