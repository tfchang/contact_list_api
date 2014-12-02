var handlers = {
  listContacts: function() {
    $.getJSON('/api/list', function(data) {
      $('#contacts').removeClass('hide');
      var table = $('#contacts').find('tbody').empty();

      $.each(data, function(index, contact) {
        var tr = $("<tr>").appendTo(table);
        $('<td>').text(contact.first_name).appendTo(tr);
        $('<td>').text(contact.last_name).appendTo(tr);
        $('<td>').text(contact.email).appendTo(tr);
      });
    });
  },

  addContact: function() {
    $('#new-contact').removeClass('hide');
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
  }
};

$(function() {
  $('#list-contacts').on('click', handlers.listContacts);

  $('#add-contact').on('click', handlers.addContact);

  $('#new-contact').on('submit', handlers.createContact);
});
