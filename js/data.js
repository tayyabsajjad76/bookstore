/* ============================================================
   PageTurn Bookstore — data.js
   Shared book data + cart + auth utilities used by all pages
   ============================================================ */

/* ── BOOK DATA ── */
const BOOKS = [
  {
    id: 1, title: "The Midnight Library", author: "Matt Haig",
    category: "Novel", price: 14.99, oldPrice: 18.99,
    rating: 4.8, reviews: 2341, badge: "best",
    color: "#1a3a5c", description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    pages: 304, publisher: "Canongate Books", year: 2020, isbn: "978-1786892737", language: "English"
  },
  {
    id: 2, title: "Atomic Habits", author: "James Clear",
    category: "Self-Help", price: 16.99, oldPrice: null,
    rating: 4.9, reviews: 5120, badge: "new",
    color: "#2d4a1a", description: "An easy and proven way to build good habits and break bad ones. Learn how tiny changes in behavior can lead to remarkable results and transform your life.",
    pages: 320, publisher: "Avery Publishing", year: 2018, isbn: "978-0735211292", language: "English"
  },
  {
    id: 3, title: "Clean Code", author: "Robert C. Martin",
    category: "Technology", price: 34.99, oldPrice: 44.99,
    rating: 4.7, reviews: 3890, badge: "sale",
    color: "#1e1e3a", description: "A handbook of agile software craftsmanship. Even bad code can function, but if code isn't clean, it can bring a development organization to its knees.",
    pages: 464, publisher: "Prentice Hall", year: 2008, isbn: "978-0132350884", language: "English"
  },
  {
    id: 4, title: "Sapiens", author: "Yuval Noah Harari",
    category: "History", price: 17.99, oldPrice: 22.99,
    rating: 4.6, reviews: 4201, badge: "best",
    color: "#3a1a1a", description: "A brief history of humankind. From the Stone Age to the Silicon Age, how has Homo sapiens come to dominate the planet? The answer lies in our unique ability to believe in collective myths.",
    pages: 443, publisher: "Harper Perennial", year: 2015, isbn: "978-0062316097", language: "English"
  },
  {
    id: 5, title: "The Psychology of Money", author: "Morgan Housel",
    category: "Self-Help", price: 15.99, oldPrice: null,
    rating: 4.7, reviews: 3102, badge: "new",
    color: "#2d1a3a", description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know. It's about how you behave.",
    pages: 256, publisher: "Harriman House", year: 2020, isbn: "978-0857197689", language: "English"
  },
  {
    id: 6, title: "Dune", author: "Frank Herbert",
    category: "Novel", price: 12.99, oldPrice: 16.99,
    rating: 4.8, reviews: 6543, badge: "sale",
    color: "#3a2d1a", description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
    pages: 688, publisher: "Ace Books", year: 1965, isbn: "978-0441013593", language: "English"
  },
  {
    id: 7, title: "Educated", author: "Tara Westover",
    category: "History", price: 13.99, oldPrice: null,
    rating: 4.7, reviews: 2987, badge: null,
    color: "#1a3a2d", description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    pages: 352, publisher: "Random House", year: 2018, isbn: "978-0399590504", language: "English"
  },
  {
    id: 8, title: "The Pragmatic Programmer", author: "David Thomas",
    category: "Technology", price: 39.99, oldPrice: 49.99,
    rating: 4.8, reviews: 2890, badge: "best",
    color: "#1a1a2d", description: "Your journey to mastery. The Pragmatic Programmer illustrates the best approaches and major pitfalls of many different aspects of software development.",
    pages: 352, publisher: "Addison-Wesley", year: 2019, isbn: "978-0135957059", language: "English"
  },
  {
    id: 9, title: "1984", author: "George Orwell",
    category: "Novel", price: 9.99, oldPrice: null,
    rating: 4.9, reviews: 8901, badge: null,
    color: "#2d2d2d", description: "Among the seminal texts of the 20th century, George Orwell's chilling novel is a haunting portrait of a man at the mercy of a totalitarian and bureaucratic power.",
    pages: 328, publisher: "Signet Classic", year: 1949, isbn: "978-0451524935", language: "English"
  },
  {
    id: 10, title: "Introduction to Algorithms", author: "Thomas H. Cormen",
    category: "Education", price: 54.99, oldPrice: 69.99,
    rating: 4.6, reviews: 1230, badge: "sale",
    color: "#1e2d1a", description: "The bible of algorithms. A comprehensive introduction to the modern study of computer algorithms. Broadly accessible to anyone with a fundamental understanding of mathematics.",
    pages: 1312, publisher: "MIT Press", year: 2009, isbn: "978-0262033848", language: "English"
  },
  {
    id: 11, title: "Thinking, Fast and Slow", author: "Daniel Kahneman",
    category: "Education", price: 15.99, oldPrice: 19.99,
    rating: 4.6, reviews: 3450, badge: null,
    color: "#3a1a2d", description: "A groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative.",
    pages: 499, publisher: "Farrar, Straus and Giroux", year: 2011, isbn: "978-0374533557", language: "English"
  },
  {
    id: 12, title: "The Great Gatsby", author: "F. Scott Fitzgerald",
    category: "Novel", price: 8.99, oldPrice: null,
    rating: 4.5, reviews: 7823, badge: null,
    color: "#1a2d3a", description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when the New York Times noted 'gin was the national drink.'",
    pages: 180, publisher: "Scribner", year: 1925, isbn: "978-0743273565", language: "English"
  },
];

const CATEGORIES = [
  { name: "All",        icon: "📚", count: BOOKS.length },
  { name: "Novel",      icon: "📖", count: BOOKS.filter(b => b.category === "Novel").length },
  { name: "Technology", icon: "💻", count: BOOKS.filter(b => b.category === "Technology").length },
  { name: "Education",  icon: "🎓", count: BOOKS.filter(b => b.category === "Education").length },
  { name: "History",    icon: "🏛️",  count: BOOKS.filter(b => b.category === "History").length },
  { name: "Self-Help",  icon: "💡", count: BOOKS.filter(b => b.category === "Self-Help").length },
];

/* ── STORAGE ── */
const Store = {
  getCart    : ()  => JSON.parse(localStorage.getItem('pt_cart')    || '[]'),
  saveCart   : (c) => localStorage.setItem('pt_cart',    JSON.stringify(c)),
  getSession : ()  => JSON.parse(localStorage.getItem('pt_session') || 'null'),
  saveSession: (u) => localStorage.setItem('pt_session', JSON.stringify(u)),
  clearSession:()  => localStorage.removeItem('pt_session'),
  getUsers   : ()  => JSON.parse(localStorage.getItem('pt_users')   || '[]'),
  saveUsers  : (u) => localStorage.setItem('pt_users',   JSON.stringify(u)),
};

/* ── CART UTILITIES ── */
const Cart = {
  add(bookId, qty = 1) {
    const cart = Store.getCart();
    const idx  = cart.findIndex(i => i.id === bookId);
    if (idx > -1) cart[idx].qty += qty;
    else          cart.push({ id: bookId, qty });
    Store.saveCart(cart);
    Cart.updateBadge();
  },
  remove(bookId) {
    const cart = Store.getCart().filter(i => i.id !== bookId);
    Store.saveCart(cart);
    Cart.updateBadge();
  },
  updateQty(bookId, qty) {
    const cart = Store.getCart();
    const idx  = cart.findIndex(i => i.id === bookId);
    if (idx > -1) { cart[idx].qty = Math.max(1, qty); Store.saveCart(cart); }
    Cart.updateBadge();
  },
  getTotal() {
    return Store.getCart().reduce((sum, item) => {
      const book = BOOKS.find(b => b.id === item.id);
      return sum + (book ? book.price * item.qty : 0);
    }, 0);
  },
  getCount() {
    return Store.getCart().reduce((sum, i) => sum + i.qty, 0);
  },
  updateBadge() {
    const badge = document.getElementById('cartCount');
    if (badge) {
      const count = Cart.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },
  clear() {
    Store.saveCart([]);
    Cart.updateBadge();
  }
};

/* ── TOAST ── */
const Toast = {
  show(msg, type = 'default') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { default: '📚', success: '✅', error: '❌' };
    toast.innerHTML = `<span>${icons[type]||'📚'}</span> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(40px)'; toast.style.transition = '.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
  }
};

/* ── STAR RENDERER ── */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '½';
  return s;
};

/* ── BOOK CARD BUILDER ── */
const buildBookCard = (book) => {
  const badgeHtml = book.badge
    ? `<div class="book-badge badge-${book.badge}">${book.badge === 'new' ? 'NEW' : book.badge === 'sale' ? 'SALE' : 'BEST'}</div>`
    : '';
  const oldPriceHtml = book.oldPrice
    ? `<span class="book-price-old">$${book.oldPrice.toFixed(2)}</span>`
    : '';
  return `
    <div class="book-card" data-id="${book.id}" onclick="viewBook(${book.id})">
      <div class="book-cover" style="background:${book.color}22;">
        <div class="book-cover-inner" style="background:linear-gradient(135deg,${book.color},${book.color}cc);">
          <div class="book-cover-title">${book.title}</div>
        </div>
        ${badgeHtml}
      </div>
      <div class="book-info">
        <div class="book-category">${book.category}</div>
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-rating">
          <span class="stars">${renderStars(book.rating)}</span>
          <span class="rating-count">(${book.reviews.toLocaleString()})</span>
        </div>
        <div class="book-footer">
          <div>
            <span class="book-price">$${book.price.toFixed(2)}</span>
            ${oldPriceHtml}
          </div>
          <button class="add-cart-btn" id="cartBtn-${book.id}" onclick="event.stopPropagation(); addToCartQuick(${book.id})" title="Add to cart">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>`;
};

/* ── ADD TO CART QUICK ── */
const addToCartQuick = (id) => {
  const book = BOOKS.find(b => b.id === id);
  if (!book) return;
  Cart.add(id);
  const btn = document.getElementById(`cartBtn-${id}`);
  if (btn) { btn.classList.add('added'); btn.innerHTML = '<i class="fa-solid fa-check"></i>'; }
  Toast.show(`<strong>${book.title}</strong> added to cart!`, 'success');
};

/* ── VIEW BOOK ── */
const viewBook = (id) => {
  window.location.href = `book-detail.html?id=${id}`;
};

/* ── NAVBAR AUTH STATE ── */
const initNavAuth = () => {
  const session    = Store.getSession();
  const authItem   = document.getElementById('navAuthItem');
  const userItem   = document.getElementById('navUserItem');
  const userAvatar = document.getElementById('navUserAvatar');
  const userName   = document.getElementById('navUserName');
  const logoutBtn  = document.getElementById('navLogoutBtn');

  if (session && authItem && userItem) {
    authItem.classList.add('d-none');
    userItem.classList.remove('d-none');
    if (userAvatar) userAvatar.textContent = session.avatar;
    if (userName)   userName.textContent   = session.name.split(' ')[0];
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Store.clearSession();
      authItem.classList.remove('d-none');
      userItem.classList.add('d-none');
      Toast.show('You have been logged out.', 'default');
    });
  }
};

/* ── NAVBAR SHARED HTML ── */
const NAVBAR_HTML = `
<nav class="navbar">
  <a class="nav-logo" href="index.html">
    <div class="nav-logo-icon">📚</div>
    <div class="nav-logo-text">Page<span>Turn</span></div>
  </a>
  <ul class="nav-links">
    <li><a href="index.html" id="navHome">Home</a></li>
    <li><a href="catalog.html" id="navCatalog">Catalog</a></li>
    <li><a href="contact.html" id="navContact">Contact</a></li>
  </ul>
  <div class="nav-actions">
    <div class="nav-search-wrap">
      <i class="fa-solid fa-magnifying-glass nav-search-icon"></i>
      <input class="nav-search" id="navSearch" placeholder="Search books..." autocomplete="off">
    </div>
    <a class="cart-btn" href="cart.html" title="Cart">
      <i class="fa-solid fa-bag-shopping"></i>
      <div class="cart-count" id="cartCount" style="display:none">0</div>
    </a>
    <li id="navAuthItem" style="list-style:none">
      <a class="btn-nav-login" href="auth.html">Login / Sign Up</a>
    </li>
    <li id="navUserItem" class="d-none" style="list-style:none">
      <div class="user-pill">
        <div class="user-pill-avatar" id="navUserAvatar"></div>
        <span class="user-pill-name" id="navUserName"></span>
        <button class="user-pill-logout" id="navLogoutBtn" title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </li>
    <button class="nav-hamburger" id="navHamburger"><i class="fa-solid fa-bars"></i></button>
  </div>
</nav>`;

/* ── FOOTER SHARED HTML ── */
const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="nav-logo">
          <div class="nav-logo-icon">📚</div>
          <div class="nav-logo-text" style="color:#fff">Page<span>Turn</span></div>
        </div>
        <p>Your curated destination for the finest books. From timeless classics to modern masterpieces — every page tells a story worth discovering.</p>
        <div class="footer-socials" style="margin-top:20px">
          <a class="footer-social" href="#"><i class="fa-brands fa-twitter"></i></a>
          <a class="footer-social" href="#"><i class="fa-brands fa-instagram"></i></a>
          <a class="footer-social" href="#"><i class="fa-brands fa-facebook"></i></a>
          <a class="footer-social" href="#"><i class="fa-brands fa-goodreads"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Browse</h4>
        <a href="catalog.html">All Books</a>
        <a href="catalog.html?cat=Novel">Novels</a>
        <a href="catalog.html?cat=Technology">Technology</a>
        <a href="catalog.html?cat=Education">Education</a>
        <a href="catalog.html?cat=History">History</a>
        <a href="catalog.html?cat=Self-Help">Self-Help</a>
      </div>
      <div class="footer-col">
        <h4>Account</h4>
        <a href="auth.html">Login</a>
        <a href="auth.html">Sign Up</a>
        <a href="cart.html">My Cart</a>
        <a href="contact.html">Support</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="contact.html">Contact Us</a>
        <a href="#">About PageTurn</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 PageTurn Bookstore. All rights reserved.</span>
      <span style="color:rgba(255,255,255,.3)">Built with ❤️ for book lovers</span>
    </div>
  </div>
</footer>`;

/* ── INJECT NAVBAR & FOOTER ── */
document.addEventListener('DOMContentLoaded', () => {
  const navEl    = document.getElementById('navbar');
  const footerEl = document.getElementById('footer');
  if (navEl)    navEl.innerHTML    = NAVBAR_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Active nav link
  const path = window.location.pathname;
  if (path.includes('catalog'))    document.getElementById('navCatalog')?.classList.add('active');
  else if (path.includes('contact')) document.getElementById('navContact')?.classList.add('active');
  else                               document.getElementById('navHome')?.classList.add('active');

  // Cart badge
  Cart.updateBadge();

  // Auth state
  initNavAuth();

  // Nav search
  const navSearch = document.getElementById('navSearch');
  if (navSearch) {
    navSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && navSearch.value.trim()) {
        window.location.href = `catalog.html?q=${encodeURIComponent(navSearch.value.trim())}`;
      }
    });
  }
});
