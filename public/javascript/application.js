var handlers = {
  listContacts: function() {
    $.getJSON('/api/list', function(data) {
      $('#new-contact').addClass('hide');
      $('#contacts').removeClass('hide');    
      var table = $('#contacts').find('tbody').empty();

      $.each(data, function(index, contact) {
        var tr = $("<tr class='contact-row' height='30'>").appendTo(table);
        $('<td>').text(contact.id).appendTo(tr);
        $('<td>').text(contact.first_name).appendTo(tr);
        $('<td>').text(contact.last_name).appendTo(tr);
        $('<td>').text(contact.email).appendTo(tr);
      });
    });
  },

  addContact: function() {
    $('#contacts').addClass('hide');
    $('#new-contact').removeClass('hide');
    $('#new-contact')[0].reset();
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
    var contact_id = Number($(this).find('td').first().text());
  }
};

$(function() {
  $('#list-contacts').on('click', handlers.listContacts);

  $('#add-contact').on('click', handlers.addContact);

  $('#new-contact').on('submit', handlers.createContact);

  $('#contacts').on('mouseenter', '.contact-row', handlers.addHighlight);
  $('#contacts').on('mouseleave', '.contact-row', handlers.removeHighlight);
  $('#contacts').on('click', '.contact-row', handlers.showContact);
});
