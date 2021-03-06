# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/list' do
  Contact.all.to_json
end

get '/api/find' do
  term = "%" << params[:search_term] << "%"
  sql = "first_name LIKE ? OR last_name LIKE ? OR email LIKE ?"
  Contact.where(sql, term, term, term).to_json
end

post '/api/create' do
  response = {}
  response[:result] = false
  contact = Contact.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email])

  if contact.save
    params[:phones].each do |phone|
      contact.phones.create(label: phone[:label], number: phone[:number])
    end
    response[:result] = true
    response[:id] = contact.id
  end
  response.to_json
end

get '/api/show' do
  contact = Contact.find(params[:id].to_i)
  phones = contact.phones
  response = contact.to_json.insert(-2, ",\"phones\":#{phones.to_json}")
  # erb :show
end

post '/api/save' do
  response = {}
  response[:result] = false
  
  contact = Contact.find(params[:id].to_i)
  contact.first_name = params[:first_name]
  contact.last_name = params[:last_name]
  contact.email = params[:email]

  if contact.save
    response[:result] = true
    response[:id] = contact.id

    # TODO: Notify user if any phone fails to save
    contact.phones.destroy_all
    phones = params[:phones]
    phones.each do |phone|
      contact.phones.create(label: phone[1]["label"], number: phone[1]["number"])
    end
  end
  response.to_json
end

post '/api/delete' do
  response = {}
  response[:result] = false
  
  contact = Contact.find(params[:id].to_i)
  if contact.destroy
    response[:result] = true
    response[:id] = contact.id
  end
  response.to_json
end