/** Authentication */

// listen for auth status changes
firebase
	.auth()
	.onAuthStateChanged( user => {
		if ( user ) {
			console.log( 'user logged in' );

			let i = 0;
			firebase
				.firestore()
				.collection( 'moods' )
				.onSnapshot( snapshot => {
					let changes = snapshot.docChanges();
					getMoods( changes, i );
				});
			setupUI( user );

		} else {
			console.log( 'user logged out' );
			getMoods(0);
			setupUI(0);

		}

	} )

// sign up
const signupForm = document.querySelector( '#signup-form' );
signupForm.addEventListener( 'submit', ( e ) => {
	e.preventDefault();

	// get user info
	const displayName = signupForm[ 'signup-username' ].value;
	const email = signupForm[ 'signup-email' ].value;
	const password = signupForm[ 'signup-password' ].value;

	// sign up the user
	firebase
		.auth()
		.createUserWithEmailAndPassword( email, password )
		.then( cred => {
			$( '#modal-signup' ).modal( 'hide' );
			signupForm.reset();
			location.reload();
		} );
} );

// log out
const logoutBtn = document.querySelector( '#logout-btn' );
logoutBtn.addEventListener( 'click', ( e ) => {
	e.preventDefault();

	firebase
		.auth()
		.signOut();
} );

// log in 
const loginForm = document.querySelector( '#login-form' );
loginForm.addEventListener( 'submit', ( e ) => {
	e.preventDefault();

	const email = loginForm[ 'login-email' ].value;
	const password = loginForm[ 'login-password' ].value;

	firebase
		.auth()
		.signInWithEmailAndPassword( email, password )
		.then( () => {
			//close login modal and reset form
			$( '#modal-login' ).modal( 'hide' );
			loginForm.reset();
			location.reload();
		} )
} )


/** END Authentication */







/** Cloud Firestore */
let moodsHeader = document.querySelector( '#moods-dropdown' );
let moodsFooter = document.querySelector( '#moods-list' );

let moodsListContainer = document.querySelector( '#moods-list-container' );
let admin = document.querySelector( '#admin' );
let adminMoods = document.querySelector( '#admin .moods' );


/** create elements and render MOODS */
function renderMoodsHeader( doc ) {

	let path = '../pages/travel-mood.html';
	if ( window.location.pathname == "/lubdub/index.html" ) {
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
	if ( window.location.pathname == "/lubdub/index.html" ) {
		path = './pages/travel-mood.html';
	}
	let li = document.createElement( 'li' );
	li.setAttribute( 'data-id', doc.id );
	li.innerHTML = `
    <a href="${path}?mood=${doc.data().name}">
        ${doc.data().name}
    </a>`;

	moodsFooter.appendChild( li );
}

function renderMoodsList( doc, i ) {
	let div = document.createElement( 'div' );
	div.setAttribute( 'data-id', doc.id );
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
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled">Choose this mood</a>
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
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled">Choose this mood</a>
        </div>
      </div>
      <div class="col col-lg-9 col-md-8">
        <div class="bg-container" style="background-image: url('../assets/images/${doc.data().image}');">
        </div>
      </div>`;
	}

	moodsListContainer.appendChild( div );
}

/** ADMIN */
function renderMoodsAdmin( doc, i ) {
	let div = document.createElement( 'div' );
	div.setAttribute( 'data-id', doc.id );

	if ( i % 2 == 0 ) {
		div.className = 'row';
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
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled">Choose this mood</a>
        </div>
	  </div>
	  `;
	} else {
		div.className = 'row row-invert';
		div.innerHTML = `
      <div class="col col-lg-3 col-md-4">
        <div class="description">
          <img src="../assets/images/${doc.data().icon}" alt="">
          <h5 class="m-3">${doc.data().name}</h5>
          <div class="motto">${doc.data().motto}</div>
          <p>
          ${doc.data().description}
          </p>
          <a href="../pages/travel-mood.html?mood=${doc.data().name}" class="secondary-btn unfilled">Choose this mood</a>
        </div>
      </div>
      <div class="col col-lg-9 col-md-8 pr-0">
        <div class="bg-container" style="background-image: url('../assets/images/${doc.data().image}');">
        </div>
	  </div>
	  `;
	}

	let edit = document.createElement( 'span' );
	edit.classList.add( 'edit' );
	edit.textContent = 'Edit';
	div.appendChild( edit );

	let cross = document.createElement( 'i' );
	cross.classList.add( 'fa', 'fa-times', 'cross' );
	cross.setAttribute( 'aria-hidden', 'true' );
	cross.setAttribute( 'data-toggle', 'tooltip' );
	cross.setAttribute( 'data-placement', 'top' );
	cross.setAttribute( 'title', 'Delete' );
	div.appendChild( cross );

	let deleteShadow = document.createElement( 'div' );
	deleteShadow.classList.add( 'delete-shadow' );
	div.appendChild( deleteShadow );

	adminMoods.appendChild( div );

	//deleting data
	cross.addEventListener( 'click', ( e ) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute( 'data-id' );
		firebase
		.firestore()
		.collection( 'moods' )
		.doc( id )
		.delete();
	} )

	// updating data
	edit.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		let id = e.target.parentElement.getAttribute( 'data-id' );
		let parent = e.target.parentElement;

		editMoodById( id, div, parent, function () {
			let editForm = div.querySelector( '.edit-mood-form' );
			editForm.classList.toggle( 'hide' );
		} );

	} )
}

function editMoodById( id, div, parent, callback ) {
	firebase
		.firestore()
		.collection( 'moods' )
		.doc( id )
		.get()
		.then( ( docRef ) => {
			let editForm = document.createElement( 'form' );
			editForm.classList.add( 'edit-mood-form', 'row', 'mt-5', 'hide' );
			editForm.innerHTML = `
					<input type="text" name="edit-name" placeholder="Name" value="${docRef.data().name}" required>
					<input type="text" name="edit-motto" placeholder="Motto" value="${docRef.data().motto}" required>
					<input type="text" name="edit-icon" placeholder="Icon" value="${docRef.data().icon}" required>
					<input type="text" name="edit-image" placeholder="Image" value="${docRef.data().image}" required>
					<textarea type="text" name="edit-description" placeholder="Description" required>${docRef.data().description}</textarea>
			`;
			let editSaveBtn = document.createElement( 'button' );
			editSaveBtn.classList.add( 'secondary-btn', 'unfilled' );
			editSaveBtn.textContent = 'Save';
			editForm.appendChild( editSaveBtn );

			editSaveBtn.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				e.stopPropagation();
				editForm.classList.toggle( 'hide' );
				let nameEdited = editForm.querySelector( '[name="edit-name"]' ).value;
				let iconEdited = editForm.querySelector( '[name="edit-icon"]' ).value;
				let mottoEdited = editForm.querySelector( '[name="edit-motto"]' ).value;
				let imageEdited = editForm.querySelector( '[name="edit-image"]' ).value;
				let descriptionEdited = editForm.querySelector( '[name="edit-description"]' ).value;

				firebase
					.firestore()
					.collection( 'moods' )
					.doc( id )
					.update( {
						name: nameEdited,
						motto: mottoEdited,
						icon: iconEdited,
						image: imageEdited,
						description: descriptionEdited
					} ).then( function () {
						parent.querySelector( 'h5' ).textContent = nameEdited;
						parent.querySelector( 'img' ).textContent = iconEdited;
						parent.querySelector( '.motto' ).textContent = mottoEdited;
						parent.querySelector( '.bg-container' ).style.backgroundImage = "url('../assets/images/" + imageEdited + "');";
						parent.querySelector( 'p' ).textContent = descriptionEdited;
					} );


			} );

			div.appendChild( editForm );
			callback();
		} );
}

if (admin) {
	let uploader = document.querySelector('#uploader');
	let fileButton = document.querySelector('#fileButton');

	fileButton.addEventListener('change', function(e){
		// Get file
		let file = e.target.files[0];
		// Create storage ref
		let storageRef = storage.ref('images/' + file.name);
		// Upload file
		let task = storageRef.put(file);
		// Update progress bar
		task.on('state_changed',
			function progress(snapshot) {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				uploader.value = percentage;
			},
			function error(err) {

			},
			function complete() {

			}
			)
	})

}
var uploader 

/** END ADMIN */


/** Getting Moods --  Real time listener */
function getMoods(changes, i) {
	if(changes){
		changes.forEach( change => {
			console.log( change.type );
			if ( change.type == 'added' ) {
				i++;
				if ( moodsHeader ) {
					renderMoodsHeader( change.doc );
				}
				if ( moodsFooter ) {
					renderMoodsFooter( change.doc );
				}
				if ( moodsListContainer ) {
					renderMoodsList( change.doc, i );
				}
				if ( admin ) {
					renderMoodsAdmin( change.doc, i );
				}
			} else if ( change.type == 'removed' ) {
				if ( moodsHeader ) {
					let liHeader = moodsHeader.querySelector( '[data-id="' + change.doc.id + '"]' );
					moodsHeader.removeChild( liHeader );
				}

				if ( moodsFooter ) {
					let liFooter = moodsFooter.querySelector( '[data-id="' + change.doc.id + '"]' );
					moodsFooter.removeChild( liFooter );
				}

				if ( moodsListContainer ) {
					let moodsItem = moodsListContainer.querySelector( '[data-id="' + change.doc.id + '"]' );
					moodsHeader.removeChild( moodsItem );
				}

				if ( adminMoods ) {
					let moodsItemAdmin = adminMoods.querySelector( '[data-id="' + change.doc.id + '"]' );
					adminMoods.removeChild( moodsItemAdmin );
				}
			}
		} );
	}
	else {
		var redirectLocation = "http://localhost/lubdub/index.html"; // Redirect destination

		// Page location and redirectLocation should not be the same
		if (window.location.href !== redirectLocation) {
			// Redirect logic
			window.location.replace(redirectLocation);
		}
	}
} 
/** END Getting Moods --  Real time listener */

/** add MOOD */
function addMood() {
	const moodsForm = document.querySelector( '#add-mood-form' );
	moodsForm.addEventListener( 'submit', ( e ) => {
		e.preventDefault();

		firebase
			.firestore()
			.collection( 'moods' )
			.add( {
				name: moodsForm.name.value,
				motto: moodsForm.motto.value,
				icon: moodsForm.icon.value,
				image: moodsForm.image.value,
				description: moodsForm.description.value
			} );

		moodsForm.name.value = '';
		moodsForm.motto.value = '';
		moodsForm.icon.value = '';
		moodsForm.image.value = '';
		moodsForm.description.value = '';

	} );
}
/** END add MOOD */

/**  END Cloud Firestore */
///////////////////////////