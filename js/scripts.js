const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const setupUI = (user) => {
	if( user ) {
		// toggle UI elements
		loggedOutLinks.forEach(item => item.style.display = 'none' );
		loggedInLinks.forEach(item => item.style.display = 'block' );
	} else {
		// toggle UI elements
		loggedInLinks.forEach(item => item.style.display = 'none');
		loggedOutLinks.forEach(item => item.style.display = 'flex' );
	}
}
 
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

/** Show/Hide Password */
$('#show-account-password').click(function(){
	if('password' == $('#account-password').attr('type')) {
		$('#account-password').prop('type', 'text');
		$('#show-account-password').html('<i class="far fa-eye-slash"></i>');
	} else {
		$('#account-password').prop('type', 'password');
		$('#show-account-password').html('<i class="far fa-eye"></i>');
   }
});
$('#show-account-old-password').click(function(){
	if('password' == $('#account-old-password').attr('type')) {
		$('#account-old-password').prop('type', 'text');
		$('#show-account-old-password').html('<i class="far fa-eye-slash"></i>');
	} else {
		$('#account-old-password').prop('type', 'password');
		$('#show-account-old-password').html('<i class="far fa-eye"></i>');
   }
});

$('#show-signup-password').click(function(){
	if('password' == $('#signup-password').attr('type')) {
		$('#signup-password').prop('type', 'text');
		$('#show-signup-password').html('<i class="far fa-eye-slash"></i>');
	} else {
		$('#signup-password').prop('type', 'password');
		$('#show-signup-password').html('<i class="far fa-eye"></i>');
   }
});

$('#show-login-password').click(function(){
	if('password' == $('#login-password').attr('type')) {
		$('#login-password').prop('type', 'text');
		$('#show-login-password').html('<i class="far fa-eye-slash"></i>');
	} else {
		$('#login-password').prop('type', 'password');
		$('#show-login-password').html('<i class="far fa-eye"></i>');
   }
});