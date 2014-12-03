var handlers = {
  listContacts: function() {
    findForm.hide();
    newForm.hide();
    showBox.hide();
    contactsTable.show();

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
    contactsTable.hide();  
    newForm.hide();
    showBox.hide();
    findForm.show();
  },

  addContact: function() {
    contactsTable.hide();  
    showBox.hide();
    findForm.hide();
    newForm.show();
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
    info.empty();

    var contact_id = $(this).find('td').first().text();
    var show_url = '/api/show/' + contact_id;
    console.log(show_url);

    $.getJSON(show_url, function(contact) {
      console.log(contact);
      var full_name = contact.first_name + " " + contact.last_name;
      $('<h3>').text(full_name).appendTo(info);
      $('<h4>').text(contact.email).appendTo(info);
      $('<h5>').text("Phone Numbers: ").appendTo(info);
    });
  }
};

$(function() {
  contactsTable = $('#contacts').hide();
  findForm = $('#find-form').hide();
  newForm = $('#new-contact').hide();
  showBox = $('#show-contact').hide();

  $('#list-contacts').on('click', handlers.listContacts);
  $('#find-contact').on('click', handlers.findContact);
  $('#add-contact').on('click', handlers.addContact);
  
  newForm.on('submit', handlers.createContact);

  contactsTable.on('mouseenter', '.contact-row', handlers.addHighlight);
  contactsTable.on('mouseleave', '.contact-row', handlers.removeHighlight);
  contactsTable.on('click', '.contact-row', handlers.showContact);
});
