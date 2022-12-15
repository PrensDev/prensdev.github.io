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

  //* For Project List
  
  const projectList = document.getElementById('projectList');
  const projects = [
    {
      title: 'VaxxTrack',
      description: 'A COVID-19 Contact Tracing App and Vaccine Monitoring System',
      image_url: 'https://github.com/PrensDev/vaxxtrack/blob/main/public/images/screenshots/home.png?raw=true',
      link: 'https://github.com/PrensDev/vaxxtrack',
      tech_stack: ['CodeIgniter 3', 'Bootstrap 4', 'Sequelize ORM', 'Leaflet', 'PSGC API', 'HERE API']
    }, 
    {
      title: 'ABN Job Portal',
      description: 'Simple Job Portal Web Application',
      image_url: 'https://github.com/PrensDev/ABN-Job-Portal/blob/main/screenshots/Home%20Page%20-%20Hero.png?raw=true',
      link: 'https://github.com/PrensDev/ABN-Job-Portal',
      tech_stack: ['CodeIgniter 3', 'Bootstrap 4', 'Microsoft SQL Server']
    }, 
    {
      title: 'MS Word Filipino',
      description: 'Static Web App to train Filipinos in using MS Word with the use of Filipino language',
      image_url: 'https://github.com/PrensDev/MSWordFilipino/blob/main/screenshots/what_word.png?raw=true',
      link: 'https://github.com/PrensDev/MSWordFilipino',
      tech_stack: ['PHP', 'Bootstrap 4']
    }, 
    {
      title: 'PUPQC-EPMS',
      description: 'Extension Project Management System for the PUPQC',
      image_url: '',
      link: 'https://github.com/PrensDev/MSWordFilipino',
      tech_stack: ['Bootstrap 4', 'EJS', 'Sequelize ORM']
    }, 
    {
      title: 'Hospital Recruitment Management System',
      description: 'Recruitment Management System designed for a hospital',
      image_url: '',
      link: 'https://github.com/PrensDev/MSWordFilipino',
      tech_stack: ['FastAPI', 'Python', 'Bootstrap 4']
    }, 
    {
      title: 'PUPSIS App',
      description: 'Mobile Application with WebView for rendering PUP-SIS',
      image_url: '',
      link: 'https://github.com/PrensDev/MSWordFilipino',
      tech_stack: ['Flutter']
    }, 
  ]
  
  projectList.innerHTML = '';
  
  projects.forEach(project => {
    projectList.innerHTML += `
      <a href="${ project.link }" target="_blank" class="card">
        ${ project.image_url ? `<div class="card-image" style="background: url('${ project.image_url }')"></div>` : '' }
        <div class="card-body">
          <div class="card-title">${ project.title }</div>
          <div class="card-description">${ project.description }</div>
          <div class="card-badges">
            ${ project.tech_stack ? project.tech_stack.map(tech => `<div class="card-badge">${ tech }</div>`).join('') : '' }
          </div>
        </div>
      </a>
    `;
  })

  // * For Navigation Panes

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


