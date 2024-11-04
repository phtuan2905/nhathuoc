// Function to increase or decrease quantity and update prices
function changeQuantity(button, amount) {
    const input = button.parentElement.querySelector('input');
    let currentValue = parseInt(input.value);
    if (currentValue + amount >= 1) {
      input.value = currentValue + amount;
      updateCart();
    }
  }
  
  // Function to update cart prices dynamically
  function updateCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;
    let discount = 24000; // Static discount for example
    let savedAmount = discount;
  
    cartItems.forEach(item => {
      const checkbox = item.querySelector('.item-checkbox');
      if (checkbox.checked) {
        const price = parseInt(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('.quantity-control input').value);
        totalPrice += price * quantity;
      }
    });
  
    // Update the total price and final amount in the summary
    document.getElementById('total-price').textContent = `${totalPrice.toLocaleString()}₫`;
    document.getElementById('final-price').textContent = `${(totalPrice).toLocaleString()}₫`;
  
    // If the total price is 0 or below, show a message and disable the "Mua hàng" button
    if (totalPrice <= 0) {
      document.getElementById('empty-cart-message').style.display = 'block';
      document.getElementById('purchase-button').disabled = true;
    } else {
      document.getElementById('empty-cart-message').style.display = 'none';
      document.getElementById('purchase-button').disabled = false;
    }
  }
  
  // Function to confirm order and show the modal
  function confirmOrder(option) {
    if (option == false) return;
    const finalPrice = document.getElementById('final-price').textContent;
    document.getElementById('modal-final-price').textContent = finalPrice;
    document.getElementById('order-modal').style.display = 'flex';
    
  }
  
  // Function to close the modal
  function closeModal() {
    document.getElementById('order-modal').style.display = 'none';
  }
  
  // Function to delete an item from the cart
  function deleteItem(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();
    updateCart();
  }
  
  // Function to select all checkboxes
  document.getElementById('select-all').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    updateCart();
  });
  
  // Add event listeners to each individual checkbox
  document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCart);
  });
  
window.addEventListener("beforeunload", function (event) {
  localStorage.clear();
  var itemslink = document.getElementsByClassName("link-sp");
  var itemsdv = document.getElementsByClassName("don-vi-sp");
  for (let i = 0; i < itemslink.length; i++) {
    var keyname = "@@@@@" + itemslink[i].href;
    var keyvalue = itemsdv[i].value;
    localStorage.setItem(keyname, keyvalue);
  }
});

  // Initial cart update
  updateCart();