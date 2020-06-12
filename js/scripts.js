/** Cloud Firestore */
let moodsHeader = document.querySelector( '#moods-dropdown' );
let moodsFooter = document.querySelector( '#moods-list' );

let moodsListContainer = document.querySelector( '#moods-list-container' );
let admin = document.querySelector( '#admin' );
let adminMoods = document.querySelector( '#admin .moods' )

/** create elements and render MOODS */

function renderMoodsHeader( doc ) {

	let path = '../pages/travel-mood.html';
	if ( window.location.pathname == "index.html" ) {
		path = './pages/travel-mood.html';
	}

	let li = document.createElement( 'li' );
	li.setAttribute( 'data-id', doc.id );
	li.innerHTML = `
    <a href="${path}?mood=${doc.data().name}">
      <div class="title">
        ${doc.data().name}
      </div>
      <div class="description">
        ${doc.data().motto}
      </div>
    </a>`;

	moodsHeader.appendChild( li );
}

function renderMoodsFooter( doc ) {

	let path = '../pages/travel-mood.html';
	if ( window.location.pathname == "index.html" ) {
		path = './pages/travel-mood.html';
	}

	let li = document.createElement( 'li' );
	li.innerHTML = `
    <a href="${path}?mood=${doc.data().name}">
        ${doc.data().name}
    </a>`;

	moodsFooter.appendChild( li );
}

function renderMoodsList( doc, i ) {
	let div = document.createElement( 'div' );
	if ( i % 2 == 0 ) {
		div.className = 'row';
		div.innerHTML = `
      <div class="col col-lg-9 col-md-8">
        <div class="bg-container" style="background-image: url('../assets/images/${doc.data().image}');">
        </div>
      </div>
      <div class="col col-lg-3 col-md-4">
        <div class="description">
          <img src="../assets/images/${doc.data().icon}" alt="">
          <h5 class="m-3">${doc.data().name}</h5>
          <p>
            ${doc.data().description}
          </p>
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled active-btn">Choose this mood</a>
        </div>
      </div>`;
	} else {
		div.className = 'row row-invert';
		div.innerHTML = `
      <div class="col col-lg-3 col-md-4">
        <div class="description">
          <img src="../assets/images/${doc.data().icon}" alt="">
          <h5 class="m-3">${doc.data().name}</h5>
          <p>
          ${doc.data().description}
          </p>
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled active-btn">Choose this mood</a>
        </div>
      </div>
      <div class="col col-lg-9 col-md-8">
        <div class="bg-container" style="background-image: url('../assets/images/${doc.data().image}');">
        </div>
      </div>`;
	}

	moodsListContainer.appendChild( div );
}

function renderMoodsAdmin( doc, i ) {
	let div = document.createElement( 'div' );
	if ( i % 2 == 0 ) {
		div.className = 'row delete';
		div.setAttribute('data-id', doc.id);
		div.innerHTML = `
      <div class="col col-lg-9 col-md-8 pl-0">
        <div class="bg-container" style="background-image: url('../assets/images/${doc.data().image}');">
        </div>
      </div>
      <div class="col col-lg-3 col-md-4">
        <div class="description">
          <img src="../assets/images/${doc.data().icon}" alt="">
          <h5 class="m-3">${doc.data().name}</h5>
          <div class="motto">${doc.data().motto}</div>
          <p>
            ${doc.data().description}
          </p>
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled active-btn">Choose this mood</a>
        </div>
	  </div>
	  <div class="delete-shadow"><button type="button" class="btn btn-link btn-delete-mood"><i class="fa fa-times" aria-hidden="true"></i></button></div>
	  `;
	} else {
		div.className = 'row row-invert';
		div.setAttribute('data-id', doc.id);
		div.innerHTML = `
      <div class="col col-lg-3 col-md-4">
        <div class="description">
          <img src="../assets/images/${doc.data().icon}" alt="">
          <h5 class="m-3">${doc.data().name}</h5>
          <div class="motto">${doc.data().motto}</div>
          <p>
          ${doc.data().description}
          </p>
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled active-btn">Choose this mood</a>
        </div>
      </div>
      <div class="col col-lg-9 col-md-8 pr-0">
        <div class="bg-container" style="background-image: url('../assets/images/${doc.data().image}');">
        </div>
	  </div>
	  <div class="delete-shadow"></div>
	  <i class="fa fa-times cross" aria-hidden="true"></i>
	  `;
	}
	adminMoods.appendChild( div );

	//deleting data

	let cross = document.querySelector('.cross');
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
	})
}

let i = 0;
//getting data
firebase.firestore().collection( 'moods' ).get().then( ( querySnapshot ) => {
	querySnapshot.docs.forEach( ( doc ) => {
		i++;
		if ( moodsHeader ) {
			renderMoodsHeader( doc );
		}
		if ( moodsFooter ) {
			renderMoodsFooter( doc );
		}
		if ( moodsListContainer ) {
			renderMoodsList( doc, i );
		}
		if ( admin ) {
			renderMoodsAdmin( doc, i );
		}
	} );
} );
/** END create elements and render MOODS */
///////////////////////////////////////////

/** add MOOD */
const moodsForm = document.querySelector( '#add-mood-form' );

moodsForm.addEventListener( 'submit', ( e ) => {
	e.preventDefault();
	firebase.firestore().collection( 'moods' ).add( {
		name: moodsForm.name.value,
		motto: moodsForm.motto.value,
		icon: moodsForm.icon.value,
		image: moodsForm.image.value,
		description: moodsForm.description.value
	} )
	moodsForm.name.value = '';
	moodsForm.motto.value = '';
	moodsForm.icon.value = '';
	moodsForm.image.value = '';
	moodsForm.description.value = '';
	let alert = document.querySelector('.alert');
	alert.classList = 'alert alert-warning d-block';

} )
//adding data

// `${doc.id} => ${doc.data().description}`

/**  END Cloud Firestore */
///////////////////////////


/**  Sticky Header On Scroll */
const h = document.querySelector( ".sticky-part" );
let stuck = false;
let stickPoint = getDistance( h );

function getDistance( h ) {
	if ( h ) {
		let topDist = h.offsetTop;
		return topDist;
	}
}

window.onscroll = function ( e ) {
	let distance = getDistance( h ) - window.pageYOffset;
	let offset = window.pageYOffset;

	if ( ( distance <= 0 ) && !stuck ) {
		document.body.classList.add( 'header-sticky' );
		stuck = true;
	} else if ( stuck && ( offset <= stickPoint ) ) {
		document.body.classList.remove( 'header-sticky' );
		stuck = false;
	}
}
/** END Sticky Header On Scroll */
//////////////////////////////////

/** Navigation */
const nav = document.querySelector( "nav" );
const burgerNav = document.querySelector( ".burger-nav" );
const closeNav = document.querySelector( "nav .close-nav" );

if ( burgerNav ) {
	burgerNav.onclick = () => {
		nav.classList.add( "slide-out" );
		dropdownHolder.classList.remove( "dropdown-active" );
	}
}

if ( closeNav ) {
	closeNav.onclick = () => {
		nav.classList.remove( "slide-out" );
		dropdownHolder.classList.remove( "dropdown-active" );
	}
}

const dropdownHolder = document.querySelector( ".dropdown-holder" );
if ( dropdownHolder ) {
	const link = dropdownHolder.querySelector( "a" );

	if ( link ) {
		link.onclick = () => {
			if ( window.innerWidth <= 992 ) {
				dropdownHolder.classList.toggle( "dropdown-active" );
			}
		}

		link.addEventListener( "click", function ( event ) {
			if ( window.innerWidth <= 992 ) {
				event.preventDefault();
			}
		} );
	}
}
/** END Navigation */
//////////////////////


/** Slider Resources */
$( "#carouselExample" ).on( "slide.bs.carousel", function ( e ) {
	var $e = $( e.relatedTarget );
	var idx = $e.index();
	var itemsPerSlide = 3;
	var totalItems = $( ".carousel-item" ).length;

	if ( idx >= totalItems - ( itemsPerSlide - 1 ) ) {
		var it = itemsPerSlide - ( totalItems - idx );
		for ( var i = 0; i < it; i++ ) {
			// append slides to end
			if ( e.direction == "left" ) {
				$( ".carousel-item" )
					.eq( i )
					.appendTo( ".carousel-inner" );
			} else {
				$( ".carousel-item" )
					.eq( 0 )
					.appendTo( ".carousel-inner" );
			}
		}
	}
} );
/** END Slider Resources */
//////////////////////////

/** Authentication */
const formHolder = document.querySelector( ".form-holder" );
if ( formHolder ) {
	const signupBtn = formHolder.querySelector( ".form-nav .signup-toggle" );
	const loginBtn = formHolder.querySelector( ".form-nav .login-toggle" );
	const form = formHolder.querySelector( ".form-content form" );

	signupBtn.onclick = () => {
		loginBtn.classList.remove( "active" );
		signupBtn.classList.add( "active" );
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
		signupBtn.classList.remove( "active" );
		loginBtn.classList.add( "active" );
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
      </div>
      <button class="primary-btn filled" type="submit" name="login-submit">Log In</button>
    `;
	}
}
/** END Authentication */
////////////////////////

// let moduleTitles = document.querySelector(".module-title");
// moduleTitles.forEach(function(m){
//   document.write(m);
// });