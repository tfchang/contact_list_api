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
  addHighlight: function() {
    $(this).addClass('highlight');
  },

  removeHighlight: function() {
    $(this).removeClass('highlight');
  },

  displayContactTable: function(index, contact, table) {
    var tr = $("<tr class='contact-row'>").appendTo(table);
    $('<td>').text(contact.id).appendTo(tr);
    $('<td>').text(contact.first_name).appendTo(tr);
    $('<td>').text(contact.last_name).appendTo(tr);
    $('<td>').text(contact.email).appendTo(tr);
  },

  listContacts: function() {
    showOnly(contactsTable);

    $.getJSON('/api/list', function(data) { 
      var table = contactsTable.find('tbody').empty();

      $.each(data, function(index, contact) {
        handlers.displayContactTable(index, contact, table)
      });
    });
  },

  findContact: function() {
    showOnly(findForm);
    findForm[0].reset();
  },

  searchContact: function() {
    event.preventDefault();
    formParams = $(this).serialize();
    $.post('/api/find', formParams, handlers.postSearch, 'json');
  },

  postSearch: function(data) {
    showOnly(contactsTable);
    var table = contactsTable.find('tbody').empty();

    $.each(data, function(index, contact) {
      handlers.displayContactTable(index, contact, table)
    });
  },

  addContact: function() {
    showOnly(newForm);
    newForm[0].reset();
  },

  createContact: function(event) {
    event.preventDefault();
    formParams = $(this).serialize();
    $.post('/api/create', formParams, handlers.postCreate, 'json');
  },

  postCreate: function(data) {
    handlers.postAction('create', data.result);
  },

  showContactPhones: function(contact) {
    var phones = $('#contact-phones').find('.contact-phone');
    phones.empty();
    phones.attr('contentEditable', false);

    // $.each(contact.phones, function(index, phone) {
    // Display three rows regardless of how many phones the contact has
    $.each(phones, function(index, row) {
      phone = contact.phones[index];
      if (phone) {
        $('<td>').text(phone.label).appendTo(row);
        $('<td>').text(phone.number).appendTo(row);
      } else {
        $('<td>').appendTo(row);
        $('<td>').appendTo(row);
      };
    }); 
  },

  showContactInfo: function(contact) {
    var info = showBox.children('#contact-info');
    info.empty();
    info.data('contact-id', contact.id);
    showBox.show();

    var fullName = contact.first_name + " " + contact.last_name; 
    $('<h3 id="contact-name">').text(fullName).appendTo(info);
    $('<h4 id="contact-first-name">').text(contact.first_name).appendTo(info);
    $('<h4 id="contact-last-name">').text(contact.last_name).appendTo(info);
    $('<h4 id="contact-email">').text(contact.email).appendTo(info);
    $('<hr />').appendTo(info);    
    $("<h5 id='phone-heading'>").text("Phone Numbers: ").appendTo(info);

    handlers.showContactPhones(contact); 
  },

  showContact: function() {
    var contactID = $(this).find('td').first().text();
    var showURL = '/api/show/' + contactID;
    $.getJSON(showURL, handlers.showContactInfo);
  },

  editContact: function() {
    var info = showBox.children('#contact-info');

    $('<p class="notice">').text("First name, last name, email, and phone numbers can be edited.").prependTo(info);
    $('#contact-first-name').attr('contentEditable', true);
    $('#contact-last-name').attr('contentEditable', true);
    $('#contact-email').attr('contentEditable', true);
    $('.contact-phone').attr('contentEditable', true);

    handlers.editToggleButtons();
  },

  saveContact: function() {
    var saveParams = {
      'id':           $('#contact-info').data('contact-id'),
      'first_name':   $('#contact-first-name').text(),
      'last_name':    $('#contact-last-name').text(),
      'email':        $('#contact-email').text(),
      'phones':       []
    };

    var phones = $('#contact-phones').find('.contact-phone');

    $.each(phones, function(index, row) {
      var tr = $(row);
      var phoneParams = {
        'label': tr.children('td').first().text(),
        'number': tr.children('td').last().text()
      };
      if (phoneParams.number !== "") {
        saveParams.phones.push(phoneParams);
      };
    });

    $.post('/api/save', saveParams, handlers.postSave, 'json');
  },

  postSave: function(data) {
    handlers.postAction('edit', data.result);
    handlers.editToggleButtons();
  },

  editToggleButtons: function() {
    editButton.toggle();
    deleteButton.toggle();
    saveButton.toggle();
  },

  deleteContact: function() {
    var contactID = $('#contact-info').data('contact-id');
    $.post('/api/delete', {'id':contactID}, handlers.postDelete, 'json');
  },

  postDelete: function(data) {
    handlers.postAction('delete', data.result);
  },

  postAction: function(action, result) {
    if (result) {
      handlers.listContacts();
    } else {
      alert('Error! Failure to ' + action + ' contact.')
    };
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

  editButton = $('#edit-contact');
  deleteButton = $('#delete-contact');
  saveButton = $('#save-contact');
  editButton.on('click', handlers.editContact);
  deleteButton.on('click', handlers.deleteContact);
  saveButton.on('click', handlers.saveContact);
  saveButton.hide();
  
  newForm.on('submit', handlers.createContact);
  findForm.on('submit', handlers.searchContact);

  contactsTable.on('mouseenter', '.contact-row', handlers.addHighlight);
  contactsTable.on('mouseleave', '.contact-row', handlers.removeHighlight);
  contactsTable.on('click', '.contact-row', handlers.showContact);
});
