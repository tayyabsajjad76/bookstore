document.addEventListener('DOMContentLoaded', () => {

  // ── State ──
  let activeCategory = 'All';
  let searchQuery    = '';
  let maxPrice       = 60;
  let minRating      = 0;
  let filterNew      = false;
  let filterSale     = false;
  let filterBest     = false;
  let sortMode       = 'default';
  let currentPage    = 1;
  const PER_PAGE     = 8;

  // Read URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('cat'))   activeCategory = params.get('cat');
  if (params.get('q'))     searchQuery    = params.get('q');
  if (params.get('badge') === 'new') filterNew = true;

  // ── Build category filters ──
  const catFilters = document.getElementById('catFilters');
  CATEGORIES.forEach(cat => {
    const label = document.createElement('label');
    label.className = 'filter-option';
    const checked = cat.name === activeCategory ? 'checked' : '';
    label.innerHTML = `<input type="radio" name="catRadio" value="${cat.name}" ${checked}> ${cat.icon} ${cat.name} <span style="margin-left:auto;font-family:'DM Mono',monospace;font-size:.7rem;color:var(--muted)">${cat.count}</span>`;
    label.querySelector('input').addEventListener('change', () => {
      activeCategory = cat.name;
      currentPage = 1;
      renderBooks();
    });
    catFilters.appendChild(label);
  });

  // ── Build rating filters ──
  const ratingFilters = document.getElementById('ratingFilters');
  [4, 3, 2].forEach(r => {
    const div = document.createElement('div');
    div.className = 'rating-filter';
    div.innerHTML = `<input type="radio" name="ratingRadio" value="${r}"> <span class="stars">${'★'.repeat(r)}</span> & up`;
    div.querySelector('input').addEventListener('change', () => { minRating = r; currentPage = 1; renderBooks(); });
    ratingFilters.appendChild(div);
  });
  const anyRating = document.createElement('div');
  anyRating.className = 'rating-filter';
  anyRating.innerHTML = `<input type="radio" name="ratingRadio" value="0" checked> Any rating`;
  anyRating.querySelector('input').addEventListener('change', () => { minRating = 0; renderBooks(); });
  ratingFilters.prepend(anyRating);

  // ── Price range ──
  const priceRange = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceLabel');
  priceRange.addEventListener('input', () => {
    maxPrice = parseInt(priceRange.value);
    priceLabel.textContent = `Up to $${maxPrice}`;
    currentPage = 1;
    renderBooks();
  });

  // ── Badge filters ──
  document.getElementById('filterNew').addEventListener('change', (e)  => { filterNew  = e.target.checked; currentPage=1; renderBooks(); });
  document.getElementById('filterSale').addEventListener('change', (e) => { filterSale = e.target.checked; currentPage=1; renderBooks(); });
  document.getElementById('filterBest').addEventListener('change', (e) => { filterBest = e.target.checked; currentPage=1; renderBooks(); });

  // ── Pre-check from URL ──
  if (filterNew) document.getElementById('filterNew').checked = true;

  // ── Search ──
  const searchInput = document.getElementById('searchInput');
  if (searchQuery) searchInput.value = searchQuery;
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    currentPage = 1;
    renderBooks();
  });

  // ── Sort ──
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    sortMode = e.target.value;
    renderBooks();
  });

  // ── Clear ──
  const clearAll = () => {
    activeCategory = 'All'; searchQuery = ''; maxPrice = 60; minRating = 0;
    filterNew = false; filterSale = false; filterBest = false; sortMode = 'default';
    currentPage = 1;
    searchInput.value = '';
    priceRange.value = 60; priceLabel.textContent = 'Up to $60';
    document.querySelectorAll('input[name="catRadio"]')[0].checked = true;
    document.querySelectorAll('input[name="ratingRadio"]')[0].checked = true;
    document.getElementById('filterNew').checked  = false;
    document.getElementById('filterSale').checked = false;
    document.getElementById('filterBest').checked = false;
    document.getElementById('sortSelect').value = 'default';
    renderBooks();
  };
  document.getElementById('clearFilters').addEventListener('click', clearAll);
  document.getElementById('resetBtn').addEventListener('click', clearAll);

  // ── Filter + Sort ──
  const getFiltered = () => {
    let books = [...BOOKS];
    if (activeCategory !== 'All') books = books.filter(b => b.category === activeCategory);
    if (searchQuery) books = books.filter(b =>
      b.title.toLowerCase().includes(searchQuery) ||
      b.author.toLowerCase().includes(searchQuery) ||
      b.category.toLowerCase().includes(searchQuery)
    );
    books = books.filter(b => b.price <= maxPrice);
    if (minRating > 0) books = books.filter(b => b.rating >= minRating);
    if (filterNew)  books = books.filter(b => b.badge === 'new');
    if (filterSale) books = books.filter(b => b.badge === 'sale');
    if (filterBest) books = books.filter(b => b.badge === 'best');

    switch (sortMode) {
      case 'price-asc':  books.sort((a,b) => a.price - b.price); break;
      case 'price-desc': books.sort((a,b) => b.price - a.price); break;
      case 'rating':     books.sort((a,b) => b.rating - a.rating); break;
      case 'reviews':    books.sort((a,b) => b.reviews - a.reviews); break;
      case 'title':      books.sort((a,b) => a.title.localeCompare(b.title)); break;
    }
    return books;
  };

  // ── Render ──
  const renderBooks = () => {
    const filtered = getFiltered();
    const total    = filtered.length;
    const pages    = Math.ceil(total / PER_PAGE);
    const start    = (currentPage - 1) * PER_PAGE;
    const paged    = filtered.slice(start, start + PER_PAGE);

    document.getElementById('bookCount').textContent = total;
    const grid = document.getElementById('catalogGrid');
    grid.innerHTML = '';
    document.getElementById('emptyState').style.display = total === 0 ? 'block' : 'none';

    paged.forEach(book => { grid.innerHTML += buildBookCard(book); });

    // Pagination
    const paginationEl = document.getElementById('pagination');
    paginationEl.innerHTML = '';
    if (pages > 1) {
      for (let i = 1; i <= pages; i++) {
        const btn = document.createElement('button');
        btn.className = `btn btn-sm ${i === currentPage ? 'btn-gold' : 'btn-outline-gold'}`;
        btn.textContent = i;
        btn.addEventListener('click', () => { currentPage = i; renderBooks(); window.scrollTo({top: 300, behavior:'smooth'}); });
        paginationEl.appendChild(btn);
      }
    }
  };

  renderBooks();

});