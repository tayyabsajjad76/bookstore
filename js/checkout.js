document.addEventListener('DOMContentLoaded', () => {

  // ── Populate summary ──
  const cartData = Store.getCart();
  if (cartData.length === 0) { window.location.href = 'cart.html'; return; }

  const subtotal = Cart.getTotal();
  const shipping = subtotal >= 35 ? 0 : 4.99;
  const total    = subtotal + shipping;

  const summaryItems = document.getElementById('summaryItems');
  cartData.forEach(item => {
    const book = BOOKS.find(b => b.id === item.id);
    if (!book) return;
    summaryItems.innerHTML += `
      <div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--cream)">
        <div style="width:40px;height:56px;border-radius:2px 6px 6px 2px;background:linear-gradient(135deg,${book.color},${book.color}cc);flex-shrink:0"></div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:.92rem;line-height:1.3">${book.title}</div>
          <div style="font-size:.8rem;color:var(--muted)">Qty: ${item.qty}</div>
        </div>
        <div style="font-weight:700;font-size:.95rem">$${(book.price*item.qty).toFixed(2)}</div>
      </div>`;
  });

  document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('summaryShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (shipping === 0) { document.getElementById('summaryShipping').style.color = 'var(--sage)'; }
  document.getElementById('summaryTotal').textContent    = `$${total.toFixed(2)}`;

  // ── Pre-fill if logged in ──
  const session = Store.getSession();
  if (session) {
    const parts = session.name.split(' ');
    const fn = document.getElementById('firstName');
    const ln = document.getElementById('lastName');
    const em = document.getElementById('email');
    if (fn) fn.value = parts[0] || '';
    if (ln) ln.value = parts[1] || '';
    if (em) em.value = session.email || '';
  }

  // ── Payment method switching ──
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const method = opt.dataset.method;
      document.getElementById('cardFields').style.display = method === 'card' ? 'block' : 'none';
      document.getElementById('bankFields').style.display = method === 'bank' ? 'block' : 'none';
      document.getElementById('cashFields').style.display = method === 'cash' ? 'block' : 'none';
    });
  });

  // ── Card number formatting ──
  const cardNumber = document.getElementById('cardNumber');
  cardNumber.addEventListener('input', () => {
    let val = cardNumber.value.replace(/\D/g, '').slice(0, 16);
    cardNumber.value = val.replace(/(.{4})/g, '$1 ').trim();
  });
  const cardExpiry = document.getElementById('cardExpiry');
  cardExpiry.addEventListener('input', () => {
    let val = cardExpiry.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) val = val.slice(0,2) + ' / ' + val.slice(2);
    cardExpiry.value = val;
  });

  // ── Validation helper ──
  const validate = () => {
    let ok = true;
    const req = [
      ['firstName', 'firstNameErr'],
      ['lastName',  'lastNameErr'],
      ['email',     'emailErr'],
      ['address',   'addressErr'],
      ['city',      'cityErr'],
    ];
    req.forEach(([fId, eId]) => {
      const field = document.getElementById(fId);
      const err   = document.getElementById(eId);
      const empty = !field.value.trim();
      const emailBad = fId === 'email' && !field.value.includes('@');
      if (empty || emailBad) {
        field.classList.add('error');
        err.classList.add('show');
        ok = false;
      } else {
        field.classList.remove('error');
        err.classList.remove('show');
      }
    });

    const method = document.querySelector('.payment-option.selected')?.dataset.method;
    if (method === 'card') {
      const cn  = cardNumber.value.replace(/\s/g, '');
      const exp = document.getElementById('cardExpiry').value;
      if (cn.length < 16) {
        document.getElementById('cardNumber').classList.add('error');
        document.getElementById('cardErr').classList.add('show');
        ok = false;
      } else {
        document.getElementById('cardNumber').classList.remove('error');
        document.getElementById('cardErr').classList.remove('show');
      }
      if (!exp.includes('/')) {
        document.getElementById('cardExpiry').classList.add('error');
        document.getElementById('expiryErr').classList.add('show');
        ok = false;
      } else {
        document.getElementById('cardExpiry').classList.remove('error');
        document.getElementById('expiryErr').classList.remove('show');
      }
    }
    return ok;
  };

  // ── Place order ──
  document.getElementById('placeOrderBtn').addEventListener('click', () => {
    if (!validate()) {
      Toast.show('Please fill in all required fields.', 'error');
      return;
    }
    const orderId = 'PT-' + Math.floor(10000 + Math.random() * 90000);
    document.getElementById('orderId').textContent = `Order #${orderId}`;
    document.getElementById('successOverlay').classList.add('active');
    Cart.clear();
  });

});