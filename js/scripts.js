const h = document.querySelector(".sticky-part");
let stuck = false;
let stickPoint = getDistance(h);

function getDistance(h) {

    if (h) {
        let topDist = h.offsetTop;
        return topDist;
    }
}

window.onscroll = function(e) {
    let distance = getDistance(h) - window.pageYOffset;
    let offset = window.pageYOffset;

    if ( (distance <= 0) && !stuck) {
        document.body.classList.add('header-sticky');
        stuck = true;
    } else if (stuck && (offset <= stickPoint)){
        document.body.classList.remove('header-sticky');
        stuck = false;
    }
}

const nav = document.querySelector("nav");
const burgerNav = document.querySelector(".burger-nav");
const closeNav = document.querySelector("nav .close-nav");

if (burgerNav) {
  burgerNav.onclick = () => {
    nav.classList.add("slide-out");
    dropdownHolder.classList.remove("dropdown-active");
  }
}

if (closeNav) {
  closeNav.onclick = () => {
    nav.classList.remove("slide-out");
    dropdownHolder.classList.remove("dropdown-active");
  }
}

const dropdownHolder = document.querySelector(".dropdown-holder");
if (dropdownHolder) {
  const link = dropdownHolder.querySelector("a");

  if (link) {
    link.onclick = () => {
      if (window.innerWidth <= 992) {
        dropdownHolder.classList.toggle("dropdown-active");
      }
    }

    link.addEventListener("click", function(event) {
      if (window.innerWidth <= 992) {
        event.preventDefault();
      }
    });
  }
}

$('.carousel.carousel-multi-item.v-2 .carousel-item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i=0;i<4;i++) {
    next=next.next();
    if (!next.length) {
      next=$(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});
