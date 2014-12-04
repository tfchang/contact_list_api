function showOnly(elem) {
  contactsTable.hide();
  findForm.hide();
  newForm.hide();
  showBox.hide(); 

  if (elem) {
    elem.show();
  }
};

var handlers = {
  // displayTable: function(index, contact) {
  //   var tr = $("<tr class='contact-row' height='30'>").appendTo(table);
  //   $('<td>').text(contact.id).appendTo(tr);
  //   $('<td>').text(contact.first_name).appendTo(tr);
  //   $('<td>').text(contact.last_name).appendTo(tr);
  //   $('<td>').text(contact.email).appendTo(tr);
  // },

  listContacts: function() {
    showOnly(contactsTable);

    $.getJSON('/api/list', function(data) { 
      var table = contactsTable.find('tbody').empty();

      $.each(data, function(index, contact) {
        var tr = $("<tr class='contact-row' height='30'>").appendTo(table);
        $('<td>').text(contact.id).appendTo(tr);
        $('<td>').text(contact.first_name).appendTo(tr);
        $('<td>').text(contact.last_name).appendTo(tr);
        $('<td>').text(contact.email).appendTo(tr);
      });
    });
  },

  findContact: function() {
    showOnly(findForm);
    findForm[0].reset();
  },

  searchContact: function() {
    event.preventDefault();
    form_params = $(this).serialize();
    $.post('/api/find', form_params, handlers.postSearch, 'json');
  },

  postSearch: function(data) {
    showOnly(contactsTable);
    var table = contactsTable.find('tbody').empty();

    $.each(data, function(index, contact) {
      var tr = $("<tr class='contact-row' height='30'>").appendTo(table);
      $('<td>').text(contact.id).appendTo(tr);
      $('<td>').text(contact.first_name).appendTo(tr);
      $('<td>').text(contact.last_name).appendTo(tr);
      $('<td>').text(contact.email).appendTo(tr);
    });
  },

  addContact: function() {
    showOnly(newForm);
    newForm[0].reset();
  },

  createContact: function(event) {
    event.preventDefault();
    form_params = $(this).serialize();
    $.post('/api/create', form_params, handlers.postCreate, 'json');
  },

  postCreate: function(data) {
    if (data.result) {
      handlers.listContacts();
    } else {
      alert('Error!')
    }
  },

  addHighlight: function() {
    $(this).addClass('highlight');
  },

  removeHighlight: function() {
    $(this).removeClass('highlight');
  },

  showContact: function() {
    showBox.show();
    var info = showBox.children('#contact-info');
    var phones = $('#contact-phones').children('tbody');
    info.empty();
    phones.empty();

    var contact_id = $(this).find('td').first().text();
    var show_url = '/api/show/' + contact_id;

    $.getJSON(show_url, function(contact) {
      var full_name = contact.first_name + " " + contact.last_name;      
      $('<h3>').text(full_name).appendTo(info);
      $('<h4>').text(contact.email).appendTo(info);
      $('<h5>').text("Phone Numbers: ").appendTo(info);

      $.each(contact.phones, function(index, phone) {
        var tr = $('<tr>').appendTo(phones);
        $('<td>').text(phone.label).appendTo(tr);
        $('<td>').text(phone.number).appendTo(tr);
      });  
    });
  }
};

$(function() {
  contactsTable = $('#contacts');
  findForm = $('#find-form');
  newForm = $('#new-contact');
  showBox = $('#show-contact');
  showOnly();

  $('#list-contacts').on('click', handlers.listContacts);
  $('#find-contact').on('click', handlers.findContact);
  $('#add-contact').on('click', handlers.addContact);
  
  newForm.on('submit', handlers.createContact);
  findForm.on('submit', handlers.searchContact);

  contactsTable.on('mouseenter', '.contact-row', handlers.addHighlight);
  contactsTable.on('mouseleave', '.contact-row', handlers.removeHighlight);
  contactsTable.on('click', '.contact-row', handlers.showContact);
});
