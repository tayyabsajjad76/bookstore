document.addEventListener('DOMContentLoaded', () => {

  // ── FAQ ──
  const faqs = [
    { q: "How long does delivery take?",         a: "Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available at checkout." },
    { q: "Can I return a book?",                  a: "Yes! We have a 30-day return policy. Books must be in original condition. Initiate returns via your account." },
    { q: "Do you offer bulk/corporate orders?",   a: "Absolutely! Contact us for special pricing on orders of 10+ books. We serve schools, offices, and libraries." },
    { q: "How do promo codes work?",              a: "Enter your promo code in the cart before checkout. Codes like TECH40 and SAVE10 are currently active!" },
  ];

  const faqList = document.getElementById('faqList');
  faqs.forEach(f => {
    const div = document.createElement('div');
    div.style.cssText = 'background:#fff;border-radius:var(--r);margin-bottom:10px;border:1px solid rgba(0,0,0,.06);overflow:hidden';
    div.innerHTML = `
      <div style="padding:14px 18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:.95rem" class="faq-q">
        ${f.q}
        <i class="fa-solid fa-chevron-down" style="color:var(--gold);font-size:.8rem;transition:transform .2s"></i>
      </div>
      <div style="display:none;padding:0 18px 14px;font-size:.93rem;color:var(--muted);line-height:1.65" class="faq-a">${f.a}</div>`;
    div.querySelector('.faq-q').addEventListener('click', function() {
      const ans  = div.querySelector('.faq-a');
      const icon = div.querySelector('i');
      const open = ans.style.display === 'block';
      ans.style.display  = open ? 'none' : 'block';
      icon.style.transform = open ? '' : 'rotate(180deg)';
    });
    faqList.appendChild(div);
  });

  // ── Pre-fill if logged in ──
  const session = Store.getSession();
  if (session) {
    document.getElementById('contactName').value  = session.name;
    document.getElementById('contactEmail').value = session.email || '';
  }

  // ── Send form ──
  document.getElementById('sendBtn').addEventListener('click', () => {
    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name)    return Toast.show('Please enter your name.', 'error');
    if (!email || !email.includes('@')) return Toast.show('Please enter a valid email.', 'error');
    if (!subject) return Toast.show('Please select a subject.', 'error');
    if (!message) return Toast.show('Please write a message.', 'error');

    document.getElementById('sendBtn').innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    document.getElementById('sendBtn').style.background = 'var(--sage)';
    Toast.show(`Thank you, ${name}! We'll reply within 24 hours. ✉️`, 'success');

    setTimeout(() => {
      document.getElementById('contactMessage').value = '';
      document.getElementById('contactSubject').value = '';
      document.getElementById('sendBtn').innerHTML    = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      document.getElementById('sendBtn').style.background = '';
    }, 3000);
  });

});