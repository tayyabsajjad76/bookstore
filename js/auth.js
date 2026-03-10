document.addEventListener('DOMContentLoaded', () => {


  if (Store.getSession()) {
    const back = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
    window.location.href = back;
    return;
  }

  const tabLogin      = document.getElementById('tabLogin');
  const tabSignup     = document.getElementById('tabSignup');
  const panelLogin    = document.getElementById('panelLogin');
  const panelSignup   = document.getElementById('panelSignup');
  const loginEmail    = document.getElementById('loginEmail');
  const loginPw       = document.getElementById('loginPassword');
  const loginBtn      = document.getElementById('loginBtn');
  const loginError    = document.getElementById('loginError');
  const signupFirst   = document.getElementById('signupFirst');
  const signupLast    = document.getElementById('signupLast');
  const signupEmail   = document.getElementById('signupEmail');
  const signupPw      = document.getElementById('signupPassword');
  const signupConfirm = document.getElementById('signupConfirm');
  const signupBtn     = document.getElementById('signupBtn');
  const signupError   = document.getElementById('signupError');
  const signupSuccess = document.getElementById('signupSuccess');

  // Tab switching
  const showLogin = () => {
    tabLogin.classList.add('active');  tabSignup.classList.remove('active');
    panelLogin.classList.add('active'); panelSignup.classList.remove('active');
    clearErrors();
  };
  const showSignup = () => {
    tabSignup.classList.add('active'); tabLogin.classList.remove('active');
    panelSignup.classList.add('active'); panelLogin.classList.remove('active');
    clearErrors();
  };
  tabLogin.addEventListener('click',   showLogin);
  tabSignup.addEventListener('click',  showSignup);
  document.getElementById('switchToSignup').addEventListener('click', showSignup);
  document.getElementById('switchToLogin').addEventListener('click',  showLogin);

  // From URL param
  if (new URLSearchParams(window.location.search).get('tab') === 'signup') showSignup();

  // Password toggle
  const togglePw = (inp, btn) => {
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.querySelector('i').className = show ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  };
  document.getElementById('toggleLoginPw').addEventListener('click',  () => togglePw(loginPw,  document.getElementById('toggleLoginPw')));
  document.getElementById('toggleSignupPw').addEventListener('click', () => togglePw(signupPw, document.getElementById('toggleSignupPw')));

  // Error helpers
  const showError = (el, msg) => { el.textContent = msg; el.classList.remove('d-none'); };
  const clearErrors = () => [loginError, signupError, signupSuccess].forEach(el => el?.classList.add('d-none'));

  // ── LOGIN ──
  const doLogin = () => {
    clearErrors();
    const email = loginEmail.value.trim().toLowerCase();
    const pw    = loginPw.value;
    if (!email) return showError(loginError, '⚠ Please enter your email.');
    if (!pw)    return showError(loginError, '⚠ Please enter your password.');
    const users = Store.getUsers();
    const user  = users.find(u => u.email === email && u.password === pw);
    if (!user)  return showError(loginError, '⚠ Incorrect email or password.');
    Store.saveSession(user);
    Toast.show(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');
    setTimeout(() => {
      const redirect = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
      window.location.href = redirect;
    }, 800);
  };
  loginBtn.addEventListener('click', doLogin);
  [loginEmail, loginPw].forEach(el => el.addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); }));

  // ── SIGNUP ──
  const doSignup = () => {
    clearErrors();
    const first = signupFirst.value.trim();
    const last  = signupLast.value.trim();
    const name  = `${first} ${last}`.trim();
    const email = signupEmail.value.trim().toLowerCase();
    const pw    = signupPw.value;
    const conf  = signupConfirm.value;
    if (!first)                          return showError(signupError, '⚠ Please enter your first name.');
    if (!email || !email.includes('@'))  return showError(signupError, '⚠ Please enter a valid email address.');
    if (pw.length < 6)                   return showError(signupError, '⚠ Password must be at least 6 characters.');
    if (pw !== conf)                     return showError(signupError, '⚠ Passwords do not match.');
    const users = Store.getUsers();
    if (users.find(u => u.email === email)) return showError(signupError, '⚠ An account with this email already exists.');
    const newUser = {
      id      : Date.now(),
      name,
      email,
      password: pw,
      avatar  : (first[0]+(last[0]||'')).toUpperCase(),
      joinedAt: new Date().toISOString()
    };
    users.push(newUser);
    Store.saveUsers(users);
    signupSuccess.textContent = `✅ Account created! Welcome to PageTurn, ${first}!`;
    signupSuccess.classList.remove('d-none');
    setTimeout(() => {
      Store.saveSession(newUser);
      window.location.href = 'index.html';
    }, 1200);
  };
  signupBtn.addEventListener('click', doSignup);
  [signupFirst, signupLast, signupEmail, signupPw, signupConfirm].forEach(el =>
    el.addEventListener('keydown', e => { if(e.key==='Enter') doSignup(); })
  );

});