document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id     = parseInt(params.get('id'));
  const book   = BOOKS.find(b => b.id === id);

  if (!book) {
    document.getElementById('detailContent').innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📕</div>
        <h3>Book not found</h3>
        <p>The book you're looking for doesn't exist.</p>
        <a class="btn btn-gold" href="catalog.html">Back to Catalog</a>
      </div>`;
    return;
  }

  // Update header
  document.getElementById('headerEyebrow').textContent = book.category.toUpperCase();
  document.getElementById('headerTitle').textContent   = book.title;
  document.getElementById('breadcrumbTitle').textContent = book.title;
  document.title = `${book.title} — PageTurn Bookstore`;

  // Reviews data
  const reviews = [
    { name: "Sarah M.", avatar: "SM", rating: 5, date: "Jan 2025", text: "An absolutely beautiful book. The writing is poetic and the story lingers with you long after the last page. Highly recommend!" },
    { name: "James K.", avatar: "JK", rating: 4, date: "Dec 2024", text: "Fantastic read. The pacing is perfect and the characters feel deeply real. A few slow chapters in the middle but the payoff is worth it." },
    { name: "Priya R.", avatar: "PR", rating: 5, date: "Nov 2024", text: "One of the best books I've read this year. It made me rethink everything. Will be recommending to all my friends." },
  ];

  const oldPriceHtml = book.oldPrice ? `<span class="detail-price-old">$${book.oldPrice.toFixed(2)}</span>` : '';
  const badgeHtml    = book.badge ? `<span style="background:var(--${book.badge==='new'?'gold':book.badge==='sale'?'rust':'sage'});color:${book.badge==='new'?'var(--ink)':'#fff'};padding:4px 14px;border-radius:14px;font-family:'DM Mono',monospace;font-size:.72rem;font-weight:700">${book.badge.toUpperCase()}</span>` : '';

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-layout">

      <!-- Cover Column -->
      <div class="detail-cover-wrap">
        <div class="detail-book-cover" style="background:linear-gradient(135deg,${book.color},${book.color}cc);">
          <div class="detail-cover-title">${book.title}<br><span style="font-family:'Crimson Pro',serif;font-style:italic;font-size:.85rem;opacity:.7">— ${book.author}</span></div>
        </div>
        <div class="detail-cover-actions">
          <button class="btn btn-gold btn-sm" id="addCartBtn">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
          <button class="btn btn-outline-gold btn-sm" id="wishlistBtn" title="Add to wishlist">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
        <div style="margin-top:16px;padding:16px;background:var(--cream);border-radius:var(--r);text-align:left;font-size:.88rem;color:var(--muted)">
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.06)">
            <span>Format</span><span style="color:var(--ink);font-weight:600">Paperback</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.06)">
            <span>Delivery</span><span style="color:var(--sage);font-weight:600">3–5 days</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:5px 0">
            <span>In Stock</span><span style="color:var(--sage);font-weight:600">✓ Available</span>
          </div>
        </div>
      </div>

      <!-- Info Column -->
      <div>
        <div class="detail-eyebrow">${book.category}</div>
        <h1 class="detail-title">${book.title}</h1>
        <div class="detail-author">by ${book.author}</div>

        <div class="detail-rating-row">
          <span class="stars" style="font-size:1.1rem">${renderStars(book.rating)}</span>
          <span style="font-weight:700;font-size:1.05rem">${book.rating}</span>
          <span style="color:var(--muted);font-size:.9rem">(${book.reviews.toLocaleString()} reviews)</span>
          ${badgeHtml}
        </div>

        <div class="detail-price-row">
          <span class="detail-price">$${book.price.toFixed(2)}</span>
          ${oldPriceHtml}
          ${book.oldPrice ? `<span style="background:var(--rust);color:#fff;padding:2px 10px;border-radius:12px;font-size:.78rem;font-family:'DM Mono',monospace">SAVE $${(book.oldPrice-book.price).toFixed(2)}</span>` : ''}
        </div>

        <p class="detail-desc">${book.description}</p>

        <div class="detail-meta-grid">
          <div class="detail-meta-item">
            <div class="detail-meta-label">Pages</div>
            <div class="detail-meta-val">${book.pages}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Publisher</div>
            <div class="detail-meta-val">${book.publisher}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Year</div>
            <div class="detail-meta-val">${book.year}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Language</div>
            <div class="detail-meta-val">${book.language}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">ISBN</div>
            <div class="detail-meta-val" style="font-family:'DM Mono',monospace;font-size:.82rem">${book.isbn}</div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Category</div>
            <div class="detail-meta-val">${book.category}</div>
          </div>
        </div>

        <div class="qty-row">
          <span style="font-weight:600">Quantity</span>
          <div class="qty-ctrl">
            <button class="qty-btn" id="qtyMinus">−</button>
            <input type="number" class="qty-input" id="qtyInput" value="1" min="1" max="99">
            <button class="qty-btn" id="qtyPlus">+</button>
          </div>
        </div>

        <div class="detail-action-btns">
          <button class="btn btn-gold" id="addCartBtn2">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
          <button class="btn btn-dark" id="buyNowBtn">
            <i class="fa-solid fa-bolt"></i> Buy Now
          </button>
        </div>

        <!-- Tabs -->
        <div class="detail-tabs">
          <button class="detail-tab active" data-tab="description">Description</button>
          <button class="detail-tab" data-tab="reviews">Reviews (${reviews.length})</button>
          <button class="detail-tab" data-tab="details">Details</button>
        </div>

        <div class="tab-panel active" id="tab-description">
          <p style="font-size:1.05rem;line-height:1.85;color:var(--ink-muted)">${book.description} This masterfully crafted work has captivated readers around the world with its compelling narrative and profound insights. Whether you're a longtime fan of ${book.author} or discovering their work for the first time, this book promises to be an unforgettable reading experience.</p>
        </div>

        <div class="tab-panel" id="tab-reviews">
          ${reviews.map(r => `
            <div style="padding:20px 0;border-bottom:1px solid var(--cream)">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
                <div style="width:38px;height:38px;border-radius:50%;background:${book.color}22;color:${book.color};display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:.75rem;font-weight:700">${r.avatar}</div>
                <div>
                  <div style="font-weight:600">${r.name}</div>
                  <div style="font-size:.82rem;color:var(--muted)">${r.date}</div>
                </div>
                <div style="margin-left:auto;color:var(--gold)">${'★'.repeat(r.rating)}</div>
              </div>
              <p style="color:var(--ink-muted);font-size:.97rem;line-height:1.7">${r.text}</p>
            </div>`).join('')}
        </div>

        <div class="tab-panel" id="tab-details">
          <table style="width:100%;border-collapse:collapse;font-size:.95rem">
            ${[['Title', book.title],['Author', book.author],['Publisher', book.publisher],['Year', book.year],['Pages', book.pages],['ISBN', book.isbn],['Language', book.language],['Category', book.category]].map(([k,v]) => `
              <tr style="border-bottom:1px solid var(--cream)">
                <td style="padding:10px 0;color:var(--muted);width:140px;font-family:'DM Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em">${k}</td>
                <td style="padding:10px 0;font-weight:500">${v}</td>
              </tr>`).join('')}
          </table>
        </div>

      </div>
    </div>`;

  // ── Tab switching ──
  document.querySelectorAll('.detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // ── Qty ──
  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('qtyMinus').addEventListener('click', () => { if (qtyInput.value > 1) qtyInput.value--; });
  document.getElementById('qtyPlus').addEventListener('click',  () => { qtyInput.value++; });

  // ── Add to Cart ──
  const doAddCart = () => {
    const qty = parseInt(qtyInput.value) || 1;
    Cart.add(book.id, qty);
    Toast.show(`<strong>${book.title}</strong> ×${qty} added to cart!`, 'success');
  };
  document.getElementById('addCartBtn').addEventListener('click',  doAddCart);
  document.getElementById('addCartBtn2').addEventListener('click', doAddCart);

  // ── Buy Now ──
  document.getElementById('buyNowBtn').addEventListener('click', () => {
    doAddCart();
    window.location.href = 'cart.html';
  });

  // ── Wishlist ──
  document.getElementById('wishlistBtn').addEventListener('click', function() {
    this.innerHTML = '<i class="fa-solid fa-heart"></i>';
    this.style.borderColor = 'var(--rust)';
    this.style.color = 'var(--rust)';
    Toast.show('Added to wishlist ❤️');
  });

  // ── Related books ──
  const related = BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);
  const relGrid = document.getElementById('relatedGrid');
  if (related.length > 0) {
    related.forEach(b => { relGrid.innerHTML += buildBookCard(b); });
  } else {
    document.getElementById('relatedSection').style.display = 'none';
  }

});