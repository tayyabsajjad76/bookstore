document.addEventListener('DOMContentLoaded', () => {

  // ── Categories strip ──
  const catRow = document.getElementById('catRow');
  CATEGORIES.forEach(cat => {
    const chip = document.createElement('div');
    chip.className = 'cat-chip';
    chip.innerHTML = `<span class="cat-chip-icon">${cat.icon}</span> ${cat.name} <span class="cat-chip-count">${cat.count}</span>`;
    chip.addEventListener('click', () => {
      if (cat.name === 'All') window.location.href = 'catalog.html';
      else window.location.href = `catalog.html?cat=${cat.name}`;
    });
    catRow.appendChild(chip);
  });

  // ── Featured books (first 4) ──
  const featuredGrid = document.getElementById('featuredGrid');
  BOOKS.slice(0, 4).forEach(book => {
    featuredGrid.innerHTML += buildBookCard(book);
  });

  // ── Bestsellers (top rated) ──
  const bestsellerGrid = document.getElementById('bestsellerGrid');
  [...BOOKS].sort((a,b) => b.rating - a.rating).slice(0, 4).forEach(book => {
    bestsellerGrid.innerHTML += buildBookCard(book);
  });

  // ── Testimonials ──
  const testimonials = [
    { text: "PageTurn has completely transformed how I discover books. The curation is incredible — every recommendation feels personally chosen for me.", name: "Ayesha Rahman", role: "Avid Reader · 140+ books", avatar: "AR", color: "#1a3a5c" },
    { text: "The checkout experience is seamless, the book selection is vast, and delivery is always on time. My go-to bookstore without question.", name: "Marcus Chen", role: "Software Engineer", avatar: "MC", color: "#2d4a1a" },
    { text: "I love how they've organized books by category. Found so many hidden gems in the History section that I never would have found elsewhere!", name: "Fatima Al-Zahra", role: "History Teacher", avatar: "FA", color: "#3a1a1a" },
  ];
  const grid = document.getElementById('testimonialsGrid');
  testimonials.forEach(t => {
    grid.innerHTML += `
      <div class="testimonial-card">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar" style="background:${t.color}22;color:${t.color}">${t.avatar}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-role">${t.role}</div>
          </div>
        </div>
      </div>`;
  });

  // ── Newsletter ──
  document.getElementById('nlBtn').addEventListener('click', () => {
    const email = document.getElementById('nlEmail').value.trim();
    if (!email || !email.includes('@')) { Toast.show('Please enter a valid email.', 'error'); return; }
    Toast.show('You\'re subscribed! 📚 First edition this Friday.', 'success');
    document.getElementById('nlEmail').value = '';
  });

});