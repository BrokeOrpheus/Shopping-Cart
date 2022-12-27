let totalizer = function () {
  let total = 0;
  $('.subtotal').each(function () {
    total += parseInt($(this).text());
    $('#total').text(total);
  });
};

$('#addItem').submit(function (event) {
  event.preventDefault();
  let item = $('#inputRow').find('[name=item]').val();
  let price = $('#inputRow').find('[name=price]').val();
  let quantity = $('#inputRow').find('[name=quantity]').val();
  let subtotal = price * quantity;
  
  let listButtons = '<div class="btn-group-vertical"><button class="btn edit">edit</button><button class="remove btn btn-danger">remove</button></div>';

  $('#totalRow').before('<tr class="hover"><td class="item">' + item + '</td><td>$<span class="price">' + price + '</span></td><td class="quantity">' + quantity + '</td><td>$<span class="subtotal">' + subtotal + '</span></td><td>' + listButtons + '</td></tr>');

  $('#inputRow').find('[name=item]').val('');
  $('#inputRow').find('[name=price]').val('');
  $('#inputRow').find('[name=quantity]').val('');

  totalizer();
  $('#inputRow').find('[name=item]').focus();
});

$(document).on('click', '.remove', function () {
  $(this).closest('tr').remove();
  totalizer();
});