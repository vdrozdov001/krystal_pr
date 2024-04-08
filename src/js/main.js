'use strict'

// imports
import '/src/sass/style.sass'

const headerCatalog = document.querySelector('.header-catalogJS'),
      headerAuthorization = document.querySelector('.header-authorizationJS');

      function docWidth () {
      const screen = window.innerWidth;
      if (screen < 540) { 
        headerCatalog.textContent = '';
        headerAuthorization.textContent = '';
      } else { 
        headerCatalog.textContent = 'Каталог';
        headerAuthorization.textContent = 'Особистий Кабінет';
      }
    }

window.onload = docWidth;
window.onresize = docWidth; 
