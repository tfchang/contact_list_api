Contact List Application/API
============================ 

Baisc CRUD operations on contact information: first name, last name, email, and phone numbers (up to three for each contact).

Work In Progress

This single-page web application began at Lighthouse Labs as a learning project for JavaScript/jQuery. It also provides an API that returns JSON data. It uses Sinatra as the web server.

API Endpoints (return JSON)
---------------------------

### GET '/api/list'
Returns a list of all contacts (first name, last name, email). No phone numbers.

### GET '/api/find?search_term=[search term]'
> Replace [search_term] with the term you want to search by.

Find contacts by matching the search term against first name, last name, and email. Returns a list of all matched contacts (first name, last name, email).

### POST '/api/create'
> Parameters: first_name, last_name, email, phones
>>            phones format:  [{label:label, number:number},
>>                             {label:label, number:number}, 
>>                             ...] 

Create a new contact with first name, last name, email, and phone numbers. Each phone number has a label.

### GET '/api/show?id=[id]'
> Replace [id] with the contact ID.

Show all information (first name, last name, email, phone numbers) of a contact identified by id.

### POST '/api/save'
> Parameters: id, first_name, last_name, email, phones
>>            phones format:  [{label:label, number:number},
>>                             {label:label, number:number}, 
>>                              ...]

Update contact (identified by id) information. Can update first name, last name, email, phone numbers.

### POST '/api/delete'
> Parameters: id

Delete the contact identified by id.
