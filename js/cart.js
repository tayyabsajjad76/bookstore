document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

const renderCart = () => {
  const cartData = Store.getCart();
  const container = document.getElementById('cartContent');

  if (cartData.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any books yet. Start browsing to find your next great read!</p>
        <a class="btn btn-gold" href="catalog.html"><i class="fa-solid fa-book-open"></i> Browse Books</a>
      </div>`;
    return;
  }

  const subtotal = Cart.getTotal();
  const shipping = subtotal >= 35 ? 0 : 4.99;
  const discount = 0;
  const total    = subtotal + shipping - discount;

  container.innerHTML = `
    <div class="cart-layout">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
          <h3 style="font-family:'Playfair Display',serif;font-size:1.2rem">${cartData.length} item${cartData.length>1?'s':''} in your cart</h3>
          <button class="btn btn-sm" id="clearCartBtn" style="color:var(--rust);font-size:.88rem;">
            <i class="fa-solid fa-trash"></i> Clear All
          </button>
        </div>
        <div id="cartItems"></div>
        <a class="btn btn-outline-gold btn-sm" href="catalog.html" style="margin-top:12px;">
          <i class="fa-solid fa-arrow-left"></i> Continue Shopping
        </a>
      </div>

      <div class="order-summary">
        <div class="summary-title">Order Summary</div>

        <div class="summary-row">
          <span>Subtotal (${cartData.length} items)</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0 ? '<span style="color:var(--sage)">FREE</span>' : '$' + shipping.toFixed(2)}</span>
        </div>
        ${shipping > 0 ? `<div style="font-size:.82rem;color:var(--sage);padding:4px 0">Add $${(35-subtotal).toFixed(2)} more for free shipping</div>` : ''}
        <div class="summary-row" id="discountRow" style="display:none;color:var(--sage)">
          <span>Discount</span>
          <span id="discountAmt">−$0.00</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row total">
          <span>Total</span>
          <span id="totalAmt">$${total.toFixed(2)}</span>
        </div>

        <div class="coupon-row" style="margin-top:20px">
          <input class="coupon-input" id="couponInput" placeholder="Promo code">
          <button class="btn btn-outline-gold btn-sm" id="couponBtn">Apply</button>
        </div>

        <a class="btn btn-gold btn-full" href="checkout.html">
          Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
        </a>

        <div style="display:flex;align-items:center;gap:8px;justify-content:center;margin-top:16px;color:var(--muted);font-size:.83rem">
          <i class="fa-solid fa-lock" style="color:var(--sage)"></i> Secure checkout · SSL encrypted
        </div>

        <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;font-size:1.2rem">
          💳 🏦 💰
        </div>
      </div>
    </div>`;

  // Render items
  const itemsContainer = document.getElementById('cartItems');
  cartData.forEach(item => {
    const book = BOOKS.find(b => b.id === item.id);
    if (!book) return;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-cover" style="background:linear-gradient(135deg,${book.color},${book.color}cc)"></div>
      <div class="cart-item-info">
        <div class="cart-item-category">${book.category}</div>
        <div class="cart-item-title">${book.title}</div>
        <div class="cart-item-author">by ${book.author}</div>
        <div class="cart-item-bottom">
          <div class="qty-ctrl">
            <button class="qty-btn" data-id="${book.id}" data-action="minus">−</button>
            <input type="number" class="qty-input" value="${item.qty}" min="1" data-id="${book.id}">
            <button class="qty-btn" data-id="${book.id}" data-action="plus">+</button>
          </div>
          <button class="remove-btn" data-id="${book.id}">
            <i class="fa-solid fa-trash"></i> Remove
          </button>
          <div class="cart-item-price">$${(book.price * item.qty).toFixed(2)}</div>
        </div>
      </div>`;
    itemsContainer.appendChild(div);
  });

  // Qty and remove events
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id  = parseInt(btn.dataset.id);
      const act = btn.dataset.action;
      const cart = Store.getCart();
      const idx  = cart.findIndex(i => i.id === id);
      if (idx > -1) {
        if (act === 'minus' && cart[idx].qty > 1) cart[idx].qty--;
        if (act === 'plus')  cart[idx].qty++;
        Store.saveCart(cart);
        Cart.updateBadge();
        renderCart();
      }
    });
  });
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      Cart.remove(parseInt(btn.dataset.id));
      renderCart();
      Toast.show('Item removed from cart.');
    });
  });
  document.getElementById('clearCartBtn').addEventListener('click', () => {
    Cart.clear();
    renderCart();
    Toast.show('Cart cleared.');
  });

  // Coupon
  document.getElementById('couponBtn').addEventListener('click', () => {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    if (code === 'TECH40') {
      const disc = subtotal * 0.4;
      document.getElementById('discountRow').style.display = 'flex';
      document.getElementById('discountAmt').textContent = `−$${disc.toFixed(2)}`;
      document.getElementById('totalAmt').textContent = `$${(total - disc).toFixed(2)}`;
      Toast.show('Coupon TECH40 applied — 40% off!', 'success');
    } else if (code === 'SAVE10') {
      const disc = subtotal * 0.1;
      document.getElementById('discountRow').style.display = 'flex';
      document.getElementById('discountAmt').textContent = `−$${disc.toFixed(2)}`;
      document.getElementById('totalAmt').textContent = `$${(total - disc).toFixed(2)}`;
      Toast.show('Coupon SAVE10 applied — 10% off!', 'success');
    } else {
      Toast.show('Invalid coupon code.', 'error');
    }
  });
};