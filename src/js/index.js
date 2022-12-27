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

  // Display Mode Toggler
  const displayModeToggler_btn = document.querySelector(`[data-toggle="displayMode"]`)

  const setDisplayMode = mode => {
    sessionStorage.setItem(COOKIES.DISPLAY_MODE, mode);
    const currDisplayMode = getDisplayMode();
    const modes = {
      'MEDIA': {
        changeMode: window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? setDarkMode 
          : setLightMode,
        icon: window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? `<i class="fa-solid fa-sun"></i>`
          : `<i class="fa-solid fa-moon"></i>`
      },
      'LIGHT': {
        changeMode: setLightMode,
        icon: `<i class="fa-solid fa-moon"></i>`
      },
      'DARK': {
        changeMode: setDarkMode,
        icon: `<i class="fa-solid fa-sun"></i>`,
      }
    }
    const { changeMode, icon } = modes[currDisplayMode];
    changeMode();
    displayModeToggler_btn.innerHTML = icon;
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
  displayModeToggler_btn.addEventListener('click', e => {
    e.preventDefault();
    const currDisplayMode = getDisplayMode();
    const { next } = ({
      'MEDIA': {
        next: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'LIGHT' 
          : 'DARK',
      },
      'LIGHT': {
        next: 'DARK',
      },
      'DARK': {
        next: 'LIGHT',
      },
    })[currDisplayMode];
    setDisplayMode(next);
  })

  // * For Topbar Links

  document.querySelectorAll('.topbar-link').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      togglerNavbar(true);
      const link = item.getAttribute('href');
      const sectionY = document.querySelector(link).offsetTop;
      const topbarHeight = document.querySelector('.topbar').offsetHeight;
      window.scrollTo({
        top: sectionY - topbarHeight,
        behavior: "smooth"
      })
    })
  })

  // * For Navbar Toggler

  const togglerNavbar = (hide = false) => {
    const topbarLinksClassList = document.getElementsByClassName('topbar-links')[0].classList;
    topbarLinksClassList.contains('show') || hide
      ? topbarLinksClassList.remove('show') 
      : topbarLinksClassList.add('show') 
  }

  document.querySelector(`[data-navbar="toggler"]`).addEventListener('click', e => {
    e.preventDefault();
    togglerNavbar();
  })

  // * For Hero Username

  // const USERNAME = 'PrensDev';
  // const heroUsername = document.getElementById('heroUsername');
  
  // heroUsername.innerHTML = '';
  // setTimeout(() => {
  //   USERNAME.split('').forEach((char, i) => {
  //     setTimeout(() => {
  //       heroUsername.innerHTML += `<span${ i >= 5 ? ` class="text-primary dark:text-primary-dark"` : ` class="text-secondary dark:text-secondary-dark"` }>${char}</span>`;
  //     }, 0+(i*200));
  //   });
  // }, 500);

  // * For Tab Panes

  document.querySelectorAll(`[data-toggle='tab']`).forEach(elem => {
    const dataTarget = document.querySelector(elem.getAttribute('data-target'));
    const tabContent = dataTarget.parentNode;
    const navTabs = elem.parentNode.parentNode;
    elem.addEventListener('click', e => {
      e.preventDefault();
      if(elem.classList.contains('active')) return;
      navTabs.querySelectorAll('.tab-link').forEach(link => {
        if (!link.classList.contains('active')) return;
        link.classList.remove('active');
      });
      elem.classList.add('active');
      tabContent.querySelectorAll('.tab-pane').forEach(pane => {
        if(!pane.classList.contains('show')) return; 
        pane.classList.remove('show');
      });
      dataTarget.classList.add('show');
    });
  });

  // * Scroll to top

  document.querySelector(`[data-trigger="scrollToTop"]`).addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // * For footer

  document.querySelector(`[data-content="creditYear"]`).innerHTML = (new Date()).getFullYear();

  // * If page has been loaded
  window.addEventListener('load', () => {
    document.querySelector('.loader-container').classList.add('loaded');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  })
})();


