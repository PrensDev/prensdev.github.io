(() => {

  // * Constants

  const CONSTANTS = {
    COOKIES: {
      DISPLAY_MODE: 'displayMode'
    }
  }

  const { COOKIES } = CONSTANTS;

  // * Dark or Light Mode

  let getDisplayMode = _ => sessionStorage.getItem(COOKIES.DISPLAY_MODE);
  
  const htmlClassList = document.getElementsByTagName('html')[0].classList;
  const setLightMode = _ => htmlClassList.remove('dark');
  const setDarkMode = _ => htmlClassList.add('dark');

  const setDisplayMode = mode => {
    sessionStorage.setItem(COOKIES.DISPLAY_MODE, mode);
    ({
      'MEDIA': window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? setDarkMode : setLightMode,
      'LIGHT': setLightMode,
      'DARK': setDarkMode
    })[getDisplayMode()]();
  }

  // On load
  let currentDisplayMode = getDisplayMode();
  currentDisplayMode
    ? setDisplayMode(currentDisplayMode)
    : window.matchMedia 
      ? setDisplayMode('MEDIA') 
      : setDisplayMode('LIGHT')

  // If user change mode by device
  window.matchMedia && window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", e => {
      if(getDisplayMode() !== 'MEDIA') return;
      e.matches ? setDarkMode() : setLightMode();
    });

  // On display media mode toggle
  let displayModeToggler_btn = document.querySelector(`[data-toggle="displayMode"]`)
  displayModeToggler_btn.addEventListener('click', e => {
    e.preventDefault();
    let newDisplayMode = ({
      'MEDIA': () => 'LIGHT',
      'LIGHT': () => 'DARK',
      'DARK': () => window.matchMedia ? 'MEDIA' : 'LIGHT',
    })[getDisplayMode()]();
    setDisplayMode(newDisplayMode);
    displayModeToggler_btn.innerHTML = newDisplayMode;
  })

  // * For Topbar

  document.querySelectorAll('.topbar-link').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const link = item.getAttribute('href');
      const sectionY = document.querySelector(link).offsetTop;
      const topbarHeight = document.querySelector('.topbar').offsetHeight;
      window.scrollTo({
          top: sectionY - topbarHeight,
          behavior: "smooth"
      })
    })
  })

  // * For Hero Username

  const USERNAME = 'PrensDev';
  const heroUsername = document.getElementById('heroUsername');
  
  heroUsername.innerHTML = '';
  setTimeout(() => {
    USERNAME.split('').forEach((char, i) => {
      setTimeout(() => {
        heroUsername.innerHTML += `<span${ i >= 5 ? ` class="text-primary dark:text-primary-dark"` : ` class="text-secondary dark:text-secondary-dark"` }>${char}</span>`;
      }, 0+(i*200));
    });
  }, 500);

  // * For Tab Panes

  document.querySelectorAll(`[data-toggle='tab']`).forEach(elem => {
    const dataTarget = document.querySelector(elem.getAttribute('data-target'));
    const tabContent = dataTarget.parentNode;
    const navTabs = elem.parentNode.parentNode;
    elem.addEventListener('click', e => {
      e.preventDefault();
      if(elem.classList.contains('active')) return;
      navTabs.querySelectorAll('.nav-link').forEach(link => link.classList.contains('active') && link.classList.remove('active'));
      elem.classList.add('active');
      tabContent.querySelectorAll('.tab-pane').forEach(pane => pane.classList.contains('show') && pane.classList.remove('show'));
      dataTarget.classList.add('show');
    });
  });

  // * Scroll to top

  // document.getElementById('scrollToTop').addEventListener('click', () => {
  //   window.scrollTo(0, 0);
  // });

  // * For footer

  document.getElementById('credits').innerHTML = `Prens<span class="text-primary">Dev</span> © ${ (new Date()).getFullYear() }`;

  // * As the page fully loaded

  // Remove the hidden class
  document.getElementsByTagName('main')[0].classList.remove('hidden');
  document.getElementsByTagName('footer')[0].classList.remove('hidden');

  // Remove the noscript
  document.getElementsByTagName('noscript')[0].parentNode.removeChild(document.getElementsByTagName('noscript')[0]);
})();


