/**
 * Priyadharshan Portfolio & Auth Portal
 * Responsive Interactive Logic & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Action Elements
  const btnGoogle = document.getElementById('btnGoogle');
  const btnEmail = document.getElementById('btnEmail');
  const accountSwitchLink = document.getElementById('accountSwitchLink');
  const accountSwitchText = document.getElementById('accountSwitchText');

  // Drawer Elements
  const authDrawer = document.getElementById('authDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const emailAuthForm = document.getElementById('emailAuthForm');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerSubtitle = document.getElementById('drawerSubtitle');
  const userEmailInput = document.getElementById('userEmail');
  const userPasswordInput = document.getElementById('userPassword');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const submitAuthBtn = document.getElementById('submitAuthBtn');
  const togglePassBtn = document.getElementById('togglePassBtn');

  // OAuth Modal Elements
  const oauthModal = document.getElementById('oauthModal');
  const oauthBackdrop = document.getElementById('oauthBackdrop');
  const oauthCancelBtn = document.getElementById('oauthCancelBtn');
  const googleAccountBtn = document.getElementById('googleAccountBtn');
  const googleGuestBtn = document.getElementById('googleGuestBtn');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // State
  let isLoginMode = false; // false = Registration/Start, true = Direct Login

  // --- Login / Register Mode Toggle ---
  if (accountSwitchLink) {
    accountSwitchLink.addEventListener('click', (e) => {
      e.preventDefault();
      isLoginMode = !isLoginMode;

      if (isLoginMode) {
        accountSwitchText.textContent = "Don't have an account?";
        accountSwitchLink.textContent = 'Sign Up';
        drawerTitle.textContent = 'Welcome Back';
        drawerSubtitle.textContent = 'Enter your credentials to access your saved projects.';
        submitAuthBtn.querySelector('.submit-label').textContent = 'Sign In';
        openAuthDrawer();
      } else {
        accountSwitchText.textContent = 'Already have an account?';
        accountSwitchLink.textContent = 'Login';
        drawerTitle.textContent = 'Create an Account';
        drawerSubtitle.textContent = 'Join to explore all projects, experiment logs, and codebases.';
        submitAuthBtn.querySelector('.submit-label').textContent = 'Get Started';
      }
    });
  }

  // --- Google OAuth Simulation ---
  if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
      openOAuthModal();
    });
  }

  function openOAuthModal() {
    oauthModal.classList.add('active');
    oauthModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeOAuthModal() {
    oauthModal.classList.remove('active');
    oauthModal.setAttribute('aria-hidden', 'true');
    if (!authDrawer.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  if (oauthBackdrop) oauthBackdrop.addEventListener('click', closeOAuthModal);
  if (oauthCancelBtn) oauthCancelBtn.addEventListener('click', closeOAuthModal);

  if (googleAccountBtn) {
    googleAccountBtn.addEventListener('click', () => {
      closeOAuthModal();
      btnGoogle.classList.add('loading');

      setTimeout(() => {
        btnGoogle.classList.remove('loading');
        showToast('Signed in successfully as Priyadharshan B!', '✓');
      }, 1000);
    });
  }

  if (googleGuestBtn) {
    googleGuestBtn.addEventListener('click', () => {
      closeOAuthModal();
      openAuthDrawer();
      setTimeout(() => userEmailInput && userEmailInput.focus(), 350);
    });
  }

  // --- Email Drawer Logic ---
  if (btnEmail) {
    btnEmail.addEventListener('click', () => {
      openAuthDrawer();
    });
  }

  function openAuthDrawer() {
    clearErrors();
    authDrawer.classList.add('active');
    authDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      // Focus input gently without viewport jump
      if (userEmailInput && window.innerWidth >= 768) {
        userEmailInput.focus();
      }
    }, 350);
  }

  function closeAuthDrawer() {
    authDrawer.classList.remove('active');
    authDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearErrors();
  }

  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeAuthDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeAuthDrawer);

  // Global Keyboard Escape listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (authDrawer.classList.contains('active')) closeAuthDrawer();
      if (oauthModal.classList.contains('active')) closeOAuthModal();
    }
  });

  // Toggle Password Visibility
  if (togglePassBtn) {
    togglePassBtn.addEventListener('click', () => {
      const isPassword = userPasswordInput.type === 'password';
      userPasswordInput.type = isPassword ? 'text' : 'password';
      togglePassBtn.style.color = isPassword ? '#fff' : 'rgba(255, 255, 255, 0.45)';
    });
  }

  // Form Validation & Submission
  if (emailAuthForm) {
    emailAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const email = userEmailInput.value.trim();
      const password = userPasswordInput.value;
      let hasError = false;

      // Email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        emailError.textContent = 'Please enter your email address.';
        hasError = true;
      } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      if (!password) {
        passwordError.textContent = 'Please enter your password.';
        hasError = true;
      } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        hasError = true;
      }

      if (hasError) return;

      // Simulate Authentication Request
      submitAuthBtn.classList.add('loading');
      submitAuthBtn.disabled = true;

      setTimeout(() => {
        submitAuthBtn.classList.remove('loading');
        submitAuthBtn.disabled = false;
        closeAuthDrawer();
        emailAuthForm.reset();

        const actionText = isLoginMode ? 'Welcome back!' : 'Account registered successfully!';
        showToast(`${actionText} Authenticated as ${email}`, '🚀');
      }, 1100);
    });
  }

  function clearErrors() {
    if (emailError) emailError.textContent = '';
    if (passwordError) passwordError.textContent = '';
  }

  // --- Toast Notification Helper ---
  function showToast(message, icon = '✦') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  // --- Dynamic Screen Size & Range Monitor ---
  function updateScreenRanges() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const root = document.documentElement;

    // Width Ranges
    let widthTier = 'micro-mobile';
    if (w >= 1440) widthTier = 'ultrawide';
    else if (w >= 1024) widthTier = 'desktop';
    else if (w >= 768) widthTier = 'tablet';
    else if (w >= 600) widthTier = 'foldable';
    else if (w >= 440) widthTier = 'phablet';
    else if (w >= 390) widthTier = 'flagship-mobile';
    else if (w >= 360) widthTier = 'standard-mobile';

    // Height Tiers
    let heightTier = 'normal';
    if (h <= 660) heightTier = 'short';
    else if (h >= 850) heightTier = 'tall';

    // Orientation
    const orientation = w > h ? 'landscape' : 'portrait';

    root.setAttribute('data-screen-width', widthTier);
    root.setAttribute('data-screen-height', heightTier);
    root.setAttribute('data-orientation', orientation);
  }

  updateScreenRanges();
  window.addEventListener('resize', updateScreenRanges, { passive: true });
  window.addEventListener('orientationchange', updateScreenRanges, { passive: true });
});

