let totalizer = function () {
  let total = 0;
  $('.subtotal').each(function () {
    total += parseInt($(this).text());
    $('#total').text(total);
  });
};

var listButtons = '<div class="btn-group-vertical"><button class="btn edit">edit</button><button class="remove btn btn-danger">remove</button></div>';


$('#addItem').submit(function (event) {
  event.preventDefault();
  let item = $('#inputRow [name=item]');
  let price = $('#inputRow [name=price]');
  let quantity = $('#inputRow [name=quantity]');
  let subtotal = price.val() * quantity.val();

  $('#totalRow').before('<tr class="hover"><td class="item">' + item.val() + '</td><td>$<span class="price">' + price.val() + '</span></td><td class="quantity">' + quantity.val() + '</td><td>$<span class="subtotal">' + subtotal + '</span></td><td>' + listButtons + '</td></tr>');

  item.val('');
  price.val('');
  quantity.val('');
  item.focus();

  totalizer();
});

$(document).on('click', '.remove', function () {
  $(this).closest('tr').remove();
  totalizer();
});

$(document).on('click', '.edit', function () {
  
  let parentRow = $(this).closest('tr');

  let item = parentRow.find('.item').text();
  let price = parentRow.find('.price').text();
  let quantity = parentRow.find('.quantity').text();
  
  let editButtons = '<div class="btn-group-vertical"><button type="submit" class="btn btn-success apply">apply</button><button type="button" class="btn btn-danger cancel">cancel</button></div>';

  parentRow.children().toggle();

  parentRow.after('<tr class="editRow"><form id="formEdit"><td><input name="item" value="' + item + '"/></td><td><input name="price" value="' + price + '"/></td><td><input name="quantity" value="' + quantity + '"/></td><td colspan="2">' + editButtons + '</td></form></tr>');
});

$(document).on('click', '.cancel', function () {
  $(this).closest('tr').prev().children().toggle();
  $(this).closest('tr').remove();
});

$(document).on('click', '.apply', function (event) {
  event.preventDefault();

  let parentRow = $(this).closest('tr');
  let item = parentRow.find('[name=item]').val();
  let price = parentRow.find('[name=price]').val();
  let quantity = parentRow.find('[name=quantity]').val();
  let subtotal = price * quantity;

  parentRow.prev().html('<td class="item">' + item + '</td><td>$<span class="price">' + price + '</span></td><td class="quantity">' + quantity + '</td><td>$<span class="subtotal">' + subtotal + '</span></td><td>' + listButtons + '</td>');

  parentRow.remove();
  totalizer();
});


$(document).ready(function () {
  $('tr.hover').each(function () {
    let price = parseInt($(this).find('.price').text());
    let quantity = parseInt($(this).find('.quantity').text());
    $(this).find('.subtotal').text(price * quantity);
  });
  
  totalizer();
});