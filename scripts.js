// Sample product data
const sampleProducts = [
    {
      name: 'Aviator',
      price: 1499,
      image: 'p1.webp',
      quantity: 1
    },
    {
      name: 'Wayfarer',
      price: 1399,
      image: 'p2.webp',
      quantity: 2
    },
    
  ];
  
  // Render the cart table
  renderCartTable();
  
  function renderCartTable() {
    let cartTable = document.getElementById('cartTable');
    cartTable.innerHTML = '';
  
    let subtotal = 0;
    sampleProducts.forEach((item, index) => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="${item.image}" alt="${item.name}" class="cart-product-image mr-2">
            <span>${item.name}</span>
          </div>
        </td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>
          <input type="number" class="form-control cart-quantity" value="${item.quantity}" min="1" onchange="updateCartQuantity(${index}, this.value)">
        </td>
        <td>₹${(item.price * item.quantity).toFixed(2)}</td>
      `;
      cartTable.appendChild(row);
  
      subtotal += item.price * item.quantity;
    });
  
    updateTotals(subtotal);
  }
  
  function updateCartQuantity(index, quantity) {
    sampleProducts[index].quantity = parseInt(quantity);
    renderCartTable();
  }
  
  function updateTotals(subtotal) {
    let tax = subtotal * 0.1; // 10% tax
    let total = subtotal + 5 + tax; // Shipping + Tax
  
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }


  function renderCartTable() {
    let cartTable = document.getElementById('cartTable');
    cartTable.innerHTML = '';

    let subtotal = 0;
    sampleProducts.forEach((item, index) => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="${item.image}" alt="${item.name}" class="cart-product-image mr-2">
            <span>${item.name}</span>
          </div>
        </td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>
          <input type="number" class="form-control cart-quantity" value="${item.quantity}" min="1" onchange="updateCartQuantity(${index}, this.value)">
        </td>
        <td>₹${(item.price * item.quantity).toFixed(2)}</td> <!-- Updated the price display here -->
      `;
      cartTable.appendChild(row);

      subtotal += item.price * item.quantity;
    });

    updateTotals(subtotal);
}

function updateTotals(subtotal) {
    let tax = subtotal * 0.01; // 10% tax
    let total = subtotal + 5 + tax; // Shipping + Tax

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}


// Fetch cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render the cart table and order summary
renderCartTable();
renderOrderSummary();

function renderCartTable() {
  let cartTable = document.getElementById('cartTable');
  cartTable.innerHTML = '';

  let subtotal = 0;
  cart.forEach((item, index) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="cart-product-image mr-2">
          <span>${item.name}</span>
        </div>
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" class="form-control cart-quantity" value="${item.quantity}" min="1" onchange="updateCartQuantity(${index}, this.value)">
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    `;
    cartTable.appendChild(row);

    subtotal += item.price * item.quantity;
  });

  updateTotals(subtotal);
}

function updateCartQuantity(index, quantity) {
  cart[index].quantity = parseInt(quantity);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartTable();
  renderOrderSummary();
}

function renderOrderSummary() {
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  let tax = subtotal * 0.1; // 10% tax
  let total = subtotal + 5 + tax; // Shipping + Tax

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Handle form submission (shipping.html)
document.getElementById('shippingForm').addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  let name = document.getElementById('name').value;
  let address = document.getElementById('address').value;
  let city = document.getElementById('city').value;
  let state = document.getElementById('state').value;
  let zip = document.getElementById('zip').value;

  // Save shipping address to localStorage or session
  let shippingAddress = { name, address, city, state, zip };
  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));

  // Proceed to the next step (e.g., payment page)
  window.location.href = 'payment.html';
});