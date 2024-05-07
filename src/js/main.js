'use strict'

// imports
import '/src/sass/style.sass'
import mixitup from 'mixitup'

// Variables
const headerCatalog = document.querySelector('.header-catalogJS'),
      headerAuthorization = document.querySelector('.header-authorizationJS'), 
      burger = document.querySelector('.menu__box'),
      headerCatalogBox = document.querySelector('.header__btn-catalog'), 
      body = document.querySelector('body'), 
      popup = document.getElementById('popup'), 
      menuMobileOpenBtn = document.querySelector('.catalog__menu-mobile'), 
      menuMobileClosedBtn = document.querySelector('.mobile-menu__closed'), 
      catalogSorting = document.querySelector('.Catalog__sorting'),
      header = document.querySelector('.header').offsetHeight,
      mixer = mixitup('.js-wrapper-card'), 
      asideSorting = document.querySelectorAll('.prod-sorting-js'), 
      mobileMenuItem = document.querySelectorAll('.mobile-box__list-item');

// adapt width s

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
  autoplay: { 
    delay: 3000,
  },
  speed: 600,
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
  

  function setActiveItem() { 
    let params = new URLSearchParams(document.location.search);
    let curentFilter = params.get("filter");
    if (!curentFilter) return;
    const element = [...links].find((element) => { 
      const curentKey = element.dataset.key; 
      return curentKey === curentFilter;
    })
    element.classList.add('active');
  }
  setActiveItem();
  
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      
      let filter = this.getAttribute('data-key');
      let currentUrl = window.location.href;
      
      const url = new URL(location);
      url.searchParams.set("filter", filter);
      history.replaceState({}, "", url);
      
      
       
      
      links.forEach(function(link) { 
        link.classList.remove('active');
      });
      
      
      this.classList.add('active'); 
 
      event.stopPropagation(); 
      event.stopImmediatePropagation(); 
    });
  });
}); 


// sorting add URl 


document.querySelector('.catalog__sorting').addEventListener('change', function() {

  var selectedValue = this.value;

  const sortValue = selectedValue === "date" ?  'published-date:asc' : `default:${selectedValue}`;
  mixer.sort(!!selectedValue ? sortValue : 'default') 


  updateQueryStringParameter('sort', selectedValue);
});


function updateQueryStringParameter(key, value) {
  var currentUrl = window.location.href;
  var url = new URL(currentUrl);
  url.searchParams.set(key, value);

  history.replaceState(null, null, url);
}



// asdie sorting 

for(let index = 0; index < asideSorting.length; index++ ) { 
  asideSorting[index].addEventListener('click', ()=> { 
    
  })
}






// mobile oriented popup 


window.addEventListener("resize", function() {

  const menuContentBox = document.querySelector('.mobile-menu')
  if (window.innerWidth > window.innerHeight) {
      menuContentBox.classList.add('horizont')
  } else {
    menuContentBox.classList.remove('horizont')
  }
});


// header scroll down 


var didScroll;
var lastScrollTop = 0;
var delta = 5;


window.addEventListener('scroll', function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = window.scrollY || window.pageYOffset;
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > header){
        // Scroll Down
        document.querySelector('header').classList.remove('nav-down');
        document.querySelector('header').classList.add('nav-up');
    } else {
        // Scroll Up
        if(st + window.innerHeight < document.documentElement.scrollHeight) {
            document.querySelector('header').classList.remove('nav-up');
            document.querySelector('header').classList.add('nav-down');
        }
    }
    
    lastScrollTop = st;
}


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

for(let i = 0; i < mobileMenuItem.length; i++) { 
  mobileMenuItem[i].addEventListener('click', popupFN);
}
menuMobileOpenBtn.addEventListener('click', popupFN);


// fix kunkaLabs

// const observer = new MutationObserver((mutationsList, observer) => {

//   for (let mutation of mutationsList) {
//       // Проверяем, были ли изменены атрибуты стилей
//       if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
//           // Получаем измененный элемент
//           const targetElement = mutation.target;
//           // Получаем текущее значение свойства opacity
//           const opacityValue = targetElement.style.opacity;

//           // Если opacity установлено и не равно "1", то устанавливаем display: none
//           if (opacityValue && opacityValue !== "1") {
//               targetElement.style.display = 'none';
//           }
//       }
//   }
// });
 
// // Получаем все элементы, которые вы хотите отслеживать 
// const elements = document.querySelectorAll('.catalog-item'); 

// // Настраиваем наблюдение за изменениями в атрибутах стилей каждого элемента 
// elements.forEach(element => { 
//   observer.observe(element, { attributes: true, attributeFilter: ['style'] });
// });