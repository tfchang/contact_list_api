# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/list' do
  contacts = Contact.all.to_json
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