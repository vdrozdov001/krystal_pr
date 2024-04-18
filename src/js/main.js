'use strict'

// imports
import '/src/sass/style.sass'

const headerCatalog = document.querySelector('.header-catalogJS'),
      headerAuthorization = document.querySelector('.header-authorizationJS'), 
      burger = document.querySelector('.menu__box'),
      headerCatalogBox = document.querySelector('.header__btn-catalog');


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
}

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.link-js');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      
      event.preventDefault();
      
      let key = this.getAttribute('data-key');
      
      let newUrl = window.location.href + '?key=' + encodeURIComponent(key);
  
      window.location.href = newUrl;
    });
  });
});