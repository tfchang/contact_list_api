$(function() {
  $('#list-contacts').on('click', function() {
    $.getJSON('/api/list', function(data) {
      var table = $('#contacts').find('tbody').empty();

      $.each(data, function(index, contact) {
        var tr = $("<tr>").appendTo(table);
        $('<td>').text(contact.first_name).appendTo(tr);
        $('<td>').text(contact.last_name).appendTo(tr);
        $('<td>').text(contact.email).appendTo(tr);
      });

      $('#result').removeClass('hide');
    });
  });
});
