'use strict'

// imports
import '/src/sass/style.sass'

const headerCatalog = document.querySelector('.header-catalogJS'),
      headerAuthorization = document.querySelector('.header-authorizationJS'), 
      burger = document.querySelector('.menu__box'),
      headerCatalogBox = document.querySelector('.header__btn-catalog'), 
      body = document.querySelector('body'), 
      popup = document.getElementById('popup'), 
      menuMobileOpenBtn = document.querySelector('.catalog__menu-mobile'), 
      menuMobileClosedBtn = document.querySelector('.mobile-menu__closed');


      function docWidth () {
      const screen = window.innerWidth;
      if (screen < 540) { 
        headerCatalog.textContent = '';
        headerAuthorization.textContent = '';
      } else { 
        headerCatalog.textContent = 'Каталог';
        headerAuthorization.textContent = 'Особистий Кабінет';
      }

      if (screen < 1045) { 
        headerCatalogBox.addEventListener('click', burgerOpenfn);
      } else { 
        return;
      }
    }

window.onload = docWidth;
window.onresize = docWidth; 


// swiper 

new Swiper('.swiper-container', { 
  navigation: { 
    nextEl: '.swiper-button-next', 
    prevEl: '.swiper-button-prev'
  },
  pagination: { 
    el: '.swiper-pagination', 
    clickable: true,
  },
  
  spaceBetween: '20', 
  loop: true,
  initialSlide: 2,
});

// burger open 

function burgerOpenfn () { 
  headerCatalogBox.classList.toggle('active');
  burger.classList.toggle('active');
  body.classList.toggle('over');
}

// url add data-key

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.link-js');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      let key = this.getAttribute('data-key');
      let currentUrl = window.location.href;
      
      if (currentUrl.includes('?key=')) {
        let regex = /(\?|&)key=([^&]*)(&|$)/;
        let newUrl = currentUrl.replace(regex, '$1key=' + encodeURIComponent(key) + '$3');
        window.location.href = newUrl;
      } else {
        let newUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'key=' + encodeURIComponent(key);
        window.location.href = newUrl;
      }
      
      event.stopPropagation();
      event.stopImmediatePropagation();
    });

    const currentKey = new URLSearchParams(window.location.search).get('key');

    if (link.getAttribute('data-key') === currentKey) {
      link.classList.add('active');
    }
  });
});




// popup

function popupFN () { 
  if (popup.classList.contains("active")) { 
    popup.classList.remove('active');
    body.classList.remove('over');
  } else { 
    popup.classList.add('active');
    body.classList.add('over');
  }

  menuMobileClosedBtn.addEventListener("click", ()=> { 
    popup.classList.remove('active');
    body.classList.remove('over');
  })
}

menuMobileOpenBtn.addEventListener('click', popupFN);