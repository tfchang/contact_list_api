# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/list' do
  Contact.all.to_json
end

post '/api/find' do
  term = "%" << params[:search_term] << "%"
  sql = "first_name LIKE ? OR last_name LIKE ? OR email LIKE ?"
  Contact.where(sql, term, term, term).to_json
end

post '/api/create' do
  response = {}
  response[:result] = false
  contact = Contact.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email])

  if contact.save
    params[:phone].each do |phone|
      puts phone.inspect
      contact.phones.create(label: phone[:label], number: phone[:number])
    end
    response[:result] = true
    response[:id] = contact.id
  end
  response.to_json
end

get '/api/show/:id' do
  contact = Contact.find(params[:id].to_i)
  phones = contact.phones
  response = contact.to_json.insert(-2, ",\"phones\":#{phones.to_json}")
  # erb :show
end

post '/api/delete' do
  puts('In Action!')
  response = {}
  response[:result] = false
  
  contact = Contact.find(params[:id].to_i)
  if contact.destroy
    response[:result] = true
    response[:id] = contact.id
  end
  response.to_json
end