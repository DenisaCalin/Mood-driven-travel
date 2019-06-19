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

  if ((distance <= 0) && !stuck) {
    document.body.classList.add('header-sticky');
    stuck = true;
  } else if (stuck && (offset <= stickPoint)) {
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


$("#carouselExample").on("slide.bs.carousel", function(e) {
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 3;
  var totalItems = $(".carousel-item").length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == "left") {
        $(".carousel-item")
          .eq(i)
          .appendTo(".carousel-inner");
      } else {
        $(".carousel-item")
          .eq(0)
          .appendTo(".carousel-inner");
      }
    }
  }
});

const formHolder = document.querySelector(".form-holder");
if (formHolder) {
  const signupBtn = formHolder.querySelector(".form-nav .signup-toggle");
  const loginBtn = formHolder.querySelector(".form-nav .login-toggle");
  const form = formHolder.querySelector(".form-content form");

  signupBtn.onclick = () => {
    loginBtn.classList.remove("active");
    signupBtn.classList.add("active");
    form.innerHTML = `
      <div class="input-block">
        <span uk-icon="icon: user"></span>
        <input class="custom-input" type="text" name="first-last-name" value="" placeholder="First & Last name" required>
      </div>
      <div class="input-block">
        <span uk-icon="icon: mail"></span>
        <input class="custom-input" type="email" name="email" value="" placeholder="Email" required>
      </div>
      <div class="input-block">
        <span uk-icon="icon: lock"></span>
        <input class="custom-input" type="password" name="password" value="" placeholder="Your password" required>
      </div>
      <button class="primary-btn filled" type="submit" name="signup-submit">Create An Account</button>
    `;
  }

  loginBtn.onclick = () => {
    signupBtn.classList.remove("active");
    loginBtn.classList.add("active");
    form.innerHTML = `
      <div class="input-block">
        <span uk-icon="icon: user"></span>
        <input class="custom-input" type="text" name="username-or-email" value="" placeholder="Your email" required>
      </div>
      <div class="input-block">
        <span uk-icon="icon: lock"></span>
        <input class="custom-input" type="password" name="password" value="" placeholder="Your password" required>
      </div>
      <div class="input-block flex-between">
        <div class="with-checkbox">
          <input id="remember-me" type="checkbox" name="remember-me" value="">
          <label for="remember-me">Remember me</label>
        </div>
        <a class="text-link small" href="#">Forgot your password?</a>
      </div>
      <button class="primary-btn filled" type="submit" name="login-submit">Log In</button>
    `;
  }
}

// let moduleTitles = document.querySelector(".module-title");
// moduleTitles.forEach(function(m){
//   document.write(m);
// });
