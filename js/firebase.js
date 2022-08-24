/** Authentication */

const admins = ['VSU3YIwScdV4LiQo86gK22jyLdk2'];
// listen for auth status changes
firebase
	.auth()
	.onAuthStateChanged( user => {
		if ( user ) {
			// console.log("USER DATA:")
			// console.log(user.uid);
			// console.log(user.displayName);
			// console.log(user.email);
			// console.log(user.photoURL);

			$( '#account-btn img' ).attr("src", "https://firebasestorage.googleapis.com/v0/b/dc-travel-mood.appspot.com/o/avatars%2Fdefault_avatar_dctravelmood.jpg?alt=media&token=cf88cf89-493a-456f-978e-93a9842ac42d");

			if(user.photoURL) {
				$( '#account-btn img' ).attr("src", user.photoURL + `?v=${new Date().getTime()}`);
			}
			else {
				setTimeout(function(){
					$( '#account-btn img' ).attr("src", user.photoURL + `?v=${new Date().getTime()}`);
				}, 3000);
			}

			$('section.most-read').show();

			if ( admins.includes(user.uid) ) {
				if (!document.querySelector("#li-admin-access")) {
					const liAdmin = document.createElement( 'li' );
					liAdmin.className = 'logged-in';
					liAdmin.id = "li-admin-access";
					let redirectLocation = "http://localhost/lubdub/index.html"; // Redirect destination
					// Page location and redirectLocation should not be the same
					if (window.location.href !== redirectLocation) {
						liAdmin.innerHTML = `<a href="../pages/admin.html">ADMIN</a>`;
					} else {
						liAdmin.innerHTML = `<a href="./pages/admin.html">ADMIN</a>`;
					}
					document.querySelector('.site-nav').appendChild(liAdmin);
					liAdmin.style.display = 'block';
				}
			}
			let i = 0;
			let moods = [];

			firebase
			.firestore()
			.collection( 'moods' )
			.onSnapshot( snapshot => {
				let changes = snapshot.docChanges();
				for (const change of changes) {							
					i++;									
					let mood = {
						"moodID" : change.doc.id,
						"moodData" : change.doc.data()
					}
					moods.push(mood);
					getMoods( change, i, user );
				}
			});


			let count = 0;
			firebase
			.firestore()
			.collection( 'ideas' )
			.orderBy("counter", "desc")
			.onSnapshot( snapshot => {
				let changes = snapshot.docChanges();
				for (const change of changes) {	
					count ++;
					getIdeas(moods, change, count, user);
				}
			});

			firebase
			.firestore()
			.collection( 'reviews' )
			.orderBy("dateAndTime", "desc")
			.onSnapshot( snapshot => {
				let changes = snapshot.docChanges();
				for (const change of changes) {	
					getComments(change);
				}
			});
			
			firebase
			.firestore()
			.collection( 'wishlist' )
			.where('userUID', '==', user.uid)
			.onSnapshot( snapshot => {
				let changes = snapshot.docChanges();
				$( "#no-ideas" ).hide();

				for (const change of changes) {	
					if( change.type == "added") {
						renderWishlist(change.doc.data(), change.doc.id);
					}
					else if( change.type == "removed")  {
						let wishlistItem = document.querySelector( '[data-id="' + change.doc.id + '"]' );
						document.querySelector( "ul.wish-list" ).removeChild( wishlistItem );
					}
				}
				if(snapshot.empty) {
					$( "#no-ideas" ).show();
				}
			});

			setupUI( user );

		} else {
			console.log( 'user logged out' );
			$('section.most-read').hide();

			var redirectLocation = "http://localhost/lubdub/index.html"; // Redirect destination
			// Page location and redirectLocation should not be the same
			if (window.location.href !== redirectLocation) {
				// Redirect logic
				window.location.replace(redirectLocation);
			}

			setupUI(0);

		}
	} );

// sign up
const signupButton = document.querySelector( '#signup-btn' );
if ( signupButton ) {
	const signupForm = document.querySelector( '#signup-form' );
	// default avatar
	$('#uploaderAvatar').hide();
	let uploaderAvatarSignup = document.querySelector('#uploaderAvatar');
	let fileButtonAvatarSignup = document.querySelector('#fileButtonAvatar');
	// upload avatar image
	fileButtonAvatarSignup.addEventListener('change', function(e) {
		$('#uploaderAvatar').show();
		document.querySelector( '#signup-avatar_upload span' ).innerHTML = 'Uploading...';
		// Get file
		let file = e.target.files[0];
		// Create storage ref
		let email = signupForm.email.value;
		if(!email) {
			email = Math.random().toString(36).substring(7);
		}
		let storageRef = storage.ref('avatars/' + email + '.jpg');
		// Save name for storing in moods collection
		signupForm.avatar.value = file.name;
		// Upload file
		let task = storageRef.put(file);
		// Update progress bar
		task.on('state_changed',
			function progress(snapshot) {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				uploaderAvatarSignup.value = percentage;
				if (percentage < 100) {
					document.querySelector( '#signup-avatar_upload span' ).innerHTML = 'Uploading...';
				} else {
					document.querySelector( '#signup-avatar_upload span' ).innerHTML = 'Uploaded';
				}
			},
			function error(err) {
	
			},
			function complete() {
				storageRef
					.getDownloadURL()
					.then(avatar => {
						signupForm.avatarURL.value = avatar;
					});
			}
		)
	})
	// get user info
	$('#signup-password, #signup-password-confirm').on('keyup', function () {
		if ($('#signup-password').val() == $('#signup-password-confirm').val()) {
			$('#signup-error-message').html('<i class="fas fa-check"></i> Passwords are matching').css('color', 'green');
			signupForm.addEventListener( 'submit', ( e ) => {
				e.preventDefault();
				const userName = signupForm[ 'signup-username' ].value;
				const avatar = signupForm[ 'signup-avatar_url' ].value;
				const email = signupForm[ 'signup-email' ].value;
				const password = signupForm[ 'signup-password' ].value;
				if( signupForm.avatar.value == '' || signupForm.avatarURL.value == '') {
					signupForm.avatar.value = "Default";
					signupForm.avatarURL.value = "https://firebasestorage.googleapis.com/v0/b/dc-travel-mood.appspot.com/o/avatars%2Fdefault_avatar_dctravelmood.jpg?alt=media&token=cf88cf89-493a-456f-978e-93a9842ac42d";
				}
				// sign up the user
				firebase
					.auth()
					.createUserWithEmailAndPassword( email, password )
					.then( cred => {
						$( '#modal-signup' ).modal( 'hide' );
						const currentUser = firebase.auth().currentUser;
						currentUser.updateProfile({
							displayName: userName,
							photoURL: signupForm.avatarURL.value
							}).then(() => {
								// console.log(profile);
								signupForm.reset();
								location.reload();
							}).catch((error) => {
								$('#signup-error-message').html('<i class="fas fa-exclamation"></i> ' + error.message).css('color', 'red');
							});	 
					})
					.catch( error => {
						$('#signup-error-message').html('<i class="fas fa-exclamation"></i> ' + error.message).css('color', 'red');
					});
				});
		} else {
			$('#signup-error-message').html('<i class="fas fa-exclamation"></i> Passwords are not matching').css('color', 'red');
		}
	});

}

// log out
const logoutBtn = document.querySelector( '#logout-btn' );
logoutBtn.addEventListener( 'click', ( e ) => {
	e.preventDefault();
	location.reload();

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
		.catch( error => {
			$('#login-error-message').html('<i class="fas fa-exclamation"></i> ' + error.message).css('color', 'red');
		});
} )

// edit account info
const accountButton = document.querySelector( '#account-btn' );
if ( accountButton ) {

	const accountForm = document.querySelector( '#account-form' );

	//get account info 
	accountButton.addEventListener('click', function(e) {
		accountForm.reset();
		const currentUser = firebase.auth().currentUser;
		const defaultAvatarURL ="https://firebasestorage.googleapis.com/v0/b/dc-travel-mood.appspot.com/o/avatars%2Fdefault_avatar_dctravelmood.jpg?alt=media&token=cf88cf89-493a-456f-978e-93a9842ac42d";
		if( currentUser.photoURL == defaultAvatarURL) {
			accountForm.avatar.value = "Default";
		}
		accountForm.avatarURL.value = currentUser.photoURL;
		accountForm.accountUsername.value = currentUser.displayName;
		accountForm.accountEmail.value = currentUser.email;
		document.querySelector( '#account-avatar_upload span' ).innerHTML = 'Change avatar';
		document.querySelector('#uploaderAvatarEdit').value = 0;
		$('#uploaderAvatarEdit').hide();
		$('.show-message').empty();
		$('#account-error-message').empty();
	});
	
	// avatar
	let uploaderAvatarEdit = document.querySelector('#uploaderAvatarEdit');
	let fileButtonAvatarEdit = document.querySelector('#fileButtonAvatarEdit');
	// upload avatar image
	fileButtonAvatarEdit.addEventListener('change', function(e) {
		$('#uploaderAvatarEdit').show();
		document.querySelector( '#account-avatar_upload span' ).innerHTML = 'Uploading...';
		// Get file
		let file = e.target.files[0];
		// Create storage ref
		const currentUser = firebase.auth().currentUser;
		let storageRef = storage.ref('avatars/' + currentUser.email + '.jpg');
		// Save name for storing in avatars collection
		accountForm.avatar.value = file.name;
		// Upload file
		let task = storageRef.put(file);
		// Update progress bar
		task.on('state_changed',
			function progress(snapshot) {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				uploaderAvatarEdit.value = percentage;
				if (percentage < 100) {
					document.querySelector( '#account-avatar_upload span' ).innerHTML = 'Uploading...';
				} else {
					document.querySelector( '#account-avatar_upload span' ).innerHTML = 'Uploaded';
				}
			},
			function error(err) {
	
			},
			function complete() {
				storageRef
					.getDownloadURL()
					.then(avatar => {
						accountForm.avatarURL.value = avatar;
					});
			}
		)
	})

	// UPDATE user info
	accountForm.addEventListener( 'submit', ( e ) => {
		e.preventDefault();

		const defaultAvatarURL ="https://firebasestorage.googleapis.com/v0/b/dc-travel-mood.appspot.com/o/avatars%2Fdefault_avatar_dctravelmood.jpg?alt=media&token=cf88cf89-493a-456f-978e-93a9842ac42d";
		if( accountForm.avatarURL.value == '') {
			accountForm.avatarURL.value = defaultAvatarURL;
		}
		// update the user data
		const newAvatar = accountForm.avatarURL.value;
		const newUserName = accountForm.accountUsername.value;
		const newEmail = accountForm.accountEmail.value;
		const oldPassword = accountForm.accountOldPassword.value;
		const newPassword = accountForm.accountPassword.value;

		const currentUser = firebase.auth().currentUser;

		if(currentUser.photoURL != newAvatar) {
			currentUser.updateProfile({
				photoURL: accountForm.avatarURL.value,
			}).then(() => {
				$('#account-avatar-message').html('<i class="fas fa-check"></i>').css('color', 'green');
				$("#account-avatar-message ").attr('title', 'Avatar updated!');
				$('#account-avatar-message').tooltip({placement: 'top'}).tooltip('show');
				setTimeout(function() {
					$("#account-avatar-message").hide('blind', {}, 700)
					$('#account-avatar-message').tooltip('hide');
				}, 3000);
				$( '#account-btn img' ).attr("src", currentUser.photoURL);
				console.log("Avatar updated!");
			});
		}

		if(currentUser.displayName != newUserName ) {
			currentUser.updateProfile({
				displayName: accountForm.accountUsername.value,
			}).then(() => {
				$('#account-username-message').html('<i class="fas fa-check"></i>').css('color', 'green');
				$("#account-username-message").attr('title', 'Username updated!');
				$('#account-username-message').tooltip({placement: 'top'}).tooltip('show');
				setTimeout(function() {
					$("#account-username-message").hide('blind', {}, 700)
					$('#account-username-message').tooltip('hide');
				}, 3000);
				console.log("Username updated!");
			});
		}

		if( currentUser.email != newEmail ) {
			if(oldPassword == "") {
				$('#account-error-message').html('<i class="fas fa-exclamation"></i> Current password is required').css('color', 'red');
			} else {
				$('#account-error-message').empty();
	
				firebase.auth()
				.signInWithEmailAndPassword(currentUser.email, oldPassword)
				.then(function(userCredential) {
					userCredential.user.updateEmail(newEmail).then( function () {
						$('#account-email-message').html('<i class="fas fa-check"></i>').css('color', 'green');
						$("#account-email-message ").attr('title', 'Email updated!');
						$('#account-email-message').tooltip({placement: 'top',trigger: 'manual'}).tooltip('show');
						setTimeout(function() {
							$("#account-email-message").hide('blind', {}, 700)
							$('#account-email-message').tooltip('hide');
						}, 3000);
						console.log("Email updated!");
					}).then
				}).catch((error) => { 
					$('#account-error-message').html('<i class="fas fa-exclamation"></i> ' + error.message).css('color', 'red');
				});
			}
		}

		if( newPassword != '' ) {
			if( oldPassword == '' ) {
				$('#account-error-message').html('<i class="fas fa-exclamation"></i> Current password is required.').css('color', 'red');
			} else {
				if( newPassword == oldPassword ) {
					$('#account-error-message').html('<i class="fas fa-exclamation"></i> Current password is the same as new password.').css('color', 'red');
				}
				else {
					if ($('#account-password').val() != $('#account-password-confirm').val()) {
						$('#account-error-message').html('<i class="fas fa-exclamation"></i> Passwords are not matching.').css('color', 'red');
					}
					else {
						$('#account-error-message').empty();
		
						firebase
						.auth()
						.signInWithEmailAndPassword(currentUser.email, oldPassword)
						.then(function(userCredential) {
							currentUser.updatePassword(accountForm.accountPassword.value).then(() => {
								$('#account-new-password-message').html('<i class="fas fa-check"></i>').css('color', 'green');
								$("#account-new-password-message ").attr('title', 'Password updated!');
								$('#account-new-password-message').tooltip({placement: 'top',trigger: 'manual'}).tooltip('show');
								setTimeout(function() {
									$("#account-new-password-message").hide('blind', {}, 700)
									$('#account-new-password-message').tooltip('hide');
								}, 3000);
								console.log("Password updated!");
							}).catch((error) => {
								$('#account-error-message').html('<i class="fas fa-exclamation"></i> ' + error.message).css('color', 'red');
							});
						}).catch((error) => { 
							$('#account-error-message').html('<i class="fas fa-exclamation"></i> ' + error.message).css('color', 'red');
						});
					}
				}
			}
		}
	});

	$('#account-password, #account-password-confirm').on('keyup', function () {
		if ($('#account-password').val() == $('#account-password-confirm').val()) {
			$('#account-error-message').html('<i class="fas fa-check"></i> Passwords are matching').css('color', 'green');
		} else {
			$('#account-error-message').html('<i class="fas fa-exclamation"></i> Passwords are not matching').css('color', 'red');
		}
	});

}
// TODO: admin role backend
// TODO: wishlist
// TODO: extra: in mood page, add search by location


/** END Authentication */







/** Cloud Firestore */
let moodsHeader = document.querySelector( '#moods-dropdown' );
let moodsFooter = document.querySelector( '#moods-list' );

let moodsListContainer = document.querySelector( '#moods-list-container' );
let adminPage = document.querySelector( '#admin' );
let adminMoods = document.querySelector( '#admin .moods' );
let adminIdeas = document.querySelector( '#admin .ideas' );
let selectedMood = document.querySelector( "#mood-page" );
let ideaPage = document.querySelector( "#idea-page" );
let mostRead = document.querySelector("#most-read-ideas");


/** create elements and render MOODS */
function renderMoodsHeader( moodRef ) {

	let path = '../pages/travel-mood.html';
	if ( window.location.pathname == "/lubdub/index.html" ) {
		path = './pages/travel-mood.html';
	}

	let li = document.createElement( 'li' );
	li.setAttribute( 'data-id', moodRef.id );
	li.innerHTML = `
    <a href="${path}?mood=${moodRef.data().name}">
      <div class="title">
        ${moodRef.data().name}
      </div>
      <div class="description">
        ${moodRef.data().motto}
      </div>
    </a>`;

	moodsHeader.appendChild( li );
}

function renderMoodsFooter( moodRef ) {
	let path = '../pages/travel-mood.html';
	if ( window.location.pathname == "/lubdub/index.html" ) {
		path = './pages/travel-mood.html';
	}
	let li = document.createElement( 'li' );
	li.setAttribute( 'data-id', moodRef.id );
	li.innerHTML = `
    <a href="${path}?mood=${moodRef.data().name}">
        ${moodRef.data().name}
    </a>`;

	moodsFooter.appendChild( li );
}

function renderMoodsList( moodRef, i) {
	let div = document.createElement( 'div' );
	div.setAttribute( 'data-id', moodRef.id );
	if ( i % 2 == 0 ) {
		div.className = 'row';
		div.innerHTML = `
      <div class="col col-lg-9 col-md-8">
        <div class="bg-container" style="background-image: url('${moodRef.data().imageURL}');">
        </div>
      </div>
      <div class="col col-lg-3 col-md-4">
        <div class="description">
          <img src="${moodRef.data().iconURL}" alt="${moodRef.data().icon}">
          <h5 class="m-3">${moodRef.data().name}</h5>
          <p>
            ${moodRef.data().description}
          </p>
          <a href="../pages/travel-mood.html?mood=${moodRef.data().name}" class="secondary-btn unfilled">Choose this mood</a>
        </div>
      </div>`;
	} else {
		div.className = 'row row-invert';
		div.innerHTML = `
      <div class="col col-lg-3 col-md-4">
        <div class="description">
          <img src="${moodRef.data().iconURL}" alt="${moodRef.data().name}">
          <h5 class="m-3">${moodRef.data().name}</h5>
          <p>
          ${moodRef.data().description}
          </p>
          <a href="../pages/travel-mood.html?mood=${moodRef.data().name}" class="secondary-btn unfilled">Choose this mood</a>
        </div>
      </div>
      <div class="col col-lg-9 col-md-8">
        <div class="bg-container" style="background-image: url('${moodRef.data().imageURL}');">
        </div>
      </div>`;
	}

	moodsListContainer.appendChild( div );
}

function renderMoodsSelect( moodRef ) {

	let option = document.createElement( 'option' );
	option.setAttribute( 'value', moodRef.id );
	option.innerHTML = `${moodRef.data().name}`;

	document.querySelector( "#add-idea-form_select-mood" ).appendChild( option );
}

function renderMood( moodRef ) {
	
	selectedMood.innerHTML = `
		<div class="hero-half mood-hero" style="background-image: url('${moodRef.data().imageURL}');">
			<div class="bg-shadow">
			</div>
			<div class="container">
				<h1 class="mood-title">${moodRef.data().name} Mood</h1>
			</div>
		</div>
		<div class="container">
			<ul class="idea-list">
			</ul>
	  `;
}

function renderIdeasList( moodRef ) {
	firebase
		.firestore()
		.collection( 'ideas' )
		.onSnapshot( snapshot => {
			let changes = snapshot.docChanges();
			for (const change of changes) {
				let ideaRef = change.doc;
				if (ideaRef.data().mood == moodRef.id) {
					let ideasList = document.querySelector( ".idea-list" );
					let li = document.createElement( 'li' );
					li.className = 'item mt-3 mb-3';
					li.innerHTML = `
						<div class="item-img">
							<span>
								<img src="${ideaRef.data().backgroundURL}" alt="${ideaRef.data().background}">
							</span>
						</div>
						<div class="item-info">
							<div class="ml-3 mb-3 mt-1">
								<img src="${moodRef.data().iconURL}" alt="${moodRef.data().icon}">
								<span class="small ml-2">${moodRef.data().name}</span>
							</div>
							<div class="item-title ml-3 m-2"><strong>${ideaRef.data().name}</strong></div>
							<button class="primary-btn goto" type="button" name="button">
								<a href="../pages/travel-idea.html?idea=${ideaRef.id}">Go to</a>
								<span>.</span><span>.</span><span>.</span>
							</button>
						</div>
						`;
					ideasList.appendChild( li );
				}
			}
		});
}

function renderIdeaPage( moodRef, ideaRef, user ) {
	
	ideaPage.innerHTML = `
		<div class="hero-half" id="idea_bg" style="background-image: url('${ideaRef.data().backgroundURL}');">
			<div class="bg-shadow">
			</div>
			<div class="container">
				<h1 id="idea_title">${ideaRef.data().name}</h1>
			</div>
		</div>
		<section class="idea">
			<div class="container">
			</div>
		</section>
	`;

	let ideaData = document.querySelector( ".idea .container" );
	ideaData.innerHTML = `
		<div class="idea-header">
			<ul>
			<li id="idea_mood">
				<img id="idea_mood-icon" src="${moodRef.iconURL}" alt="${moodRef.icon}">
				<span id="idea_mood-name">${moodRef.name}</span>
			</li>
			<li id="idea_location">
				<div class="pt-3">
				<i class="fas fa-map-marker-alt pr-2"></i> <span id="idea_location-name">${ideaRef.data().location}</span>
				</div>
			</li>
			</ul>
			<button id="add-to-wishlist-btn" class="primary-btn add-to-wishlist" type="button" name="button"><i uk-icon="heart" class="pr-2 pb-1"></i><span>Add to Wishlist</span></button>

		</div>
		<div class="idea-body">
			<ul class="plans-list">
			<li class="step">
				<div class="step-header">
					<h4 class="step-title"><span>Short Description</span></h4>
				</div>
				<div class="step-body" id="idea_short-description">
					${ideaRef.data().description}
				</div>
			</li>
			<li class="step">
				<div class="step-header">
					<h4 class="step-title"><span>Best Experiences</span></h4>
				</div>
				<div class="step-body">
					${ideaRef.data().bestExperiences}
				</div>
				<div class="step-body mt-5">
					<h5 class="step-subtitle"><span>How to get there</span></h5>
					<div id="idea_activities">
						${ideaRef.data().getThere}
					</div>
				</div>
			</li>
			</ul>
		</div>
		`;
	
	// update no of idea views
	firebase
	.firestore()
	.collection( 'ideas' )
	.doc( ideaRef.id)
	.update({
		counter: ideaRef.data().counter + 1
	});

	// set hidden comment fields

	document.querySelector("#commentIdeaID").value = ideaRef.id;
	document.querySelector("#commentUserName").value = user.displayName;

	// ADD 	To Wish List
	const addToWishListBtn = $("#add-to-wishlist-btn");
	if( addToWishListBtn ) {

		let userUID = String(user.uid);
		let ideaID = String(ideaRef.id);

		// console.log(userUID, " => ", ideaID);

		firebase
		.firestore()
		.collection( 'wishlist' )
		.where('userUID', '==', userUID)
		.where('ideaID', '==', ideaID)
		.get()
		.then((querySnapshot) => {
			if(!querySnapshot.empty){
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
						addToWishListBtn.addClass("added");
						$("#add-to-wishlist-btn span").html('Added to Wishlist');
						addToWishListBtn.prop('disabled', true);
						// console.log("already added");
						// doc.data() is never undefined for query doc snapshots
				})
			}
			else {
				// console.log("not added");
				if ( !addToWishListBtn.hasClass("added") ) {

					addToWishListBtn.one( "click", function() {
						const currentUser = firebase.auth().currentUser;
		
						if(currentUser) {
							addToWishListBtn.addClass("added");
							$("#add-to-wishlist-btn span").html('Added to Wishlist');
							addToWishlist(currentUser.uid, ideaRef);
						}
					})
				}
			}
		}).catch((error) => {
					console.log("Error getting documents: ", error);
			});
		
	}	
}

function addToWishlist (userID, ideaRef) {
	firebase
	.firestore()
	.collection( 'wishlist' )
	.add( {
		userUID: userID,
		ideaID: ideaRef.id
	} )
	.then ( function () {
		// console.log("added to wishlist");
	})
}

function renderWishlist (wishlistRef, wishlistItemID) {
	firebase.firestore().collection( 'ideas' ).doc(wishlistRef.ideaID).get().then((ideaRef) => {
		if (ideaRef.exists) {
			let docMoodRef = firebase.firestore().collection( 'moods' ).doc(ideaRef.data().mood);
			docMoodRef.get().then((moodRef) => {
				if (moodRef.exists) {
					// console.log("Document data:", ideaRef.data());
					let wishList = document.querySelector( "ul.wish-list" );
					if( wishList ) {
						let li = document.createElement( 'li' );
						li.className = 'item mt-3 mb-3';
						li.setAttribute( 'data-id', wishlistItemID );
						li.innerHTML = `
							<div class="item-img">
								<span>
									<img src="${ideaRef.data().backgroundURL}" alt="${ideaRef.data().background}">
								</span>
							</div>
							<div class="item-info">
								<div class="ml-3 mb-3 mt-1">
									<img src="${moodRef.data().iconURL}" alt="${moodRef.data().icon}">
									<span class="small ml-2">${moodRef.data().name}</span>
								</div>
								<div class="item-title ml-3 m-2"><strong>${ideaRef.data().name}</strong></div>
								<button class="primary-btn goto" type="button" name="button">
									<a href="../pages/travel-idea.html?idea=${ideaRef.id}">Go to</a>
									<span>.</span><span>.</span><span>.</span>
								</button>
								<input type="text" val="${wishlistItemID}" hidden>
								<button data-id="${wishlistItemID}" class="primary-btn delete delete-wishlist-item" onclick="deleteFromWishlist('${wishlistItemID}')" type="button" name="button"><i class="far fa-trash-alt"></i><span>Delete</span> </button>
							</div>
						`;
						wishList.appendChild( li );
					}
				}
			});
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});
}

function deleteFromWishlist(wishlistItemID) {
	// console.log("to be deleted")
	firebase
	.firestore()
	.collection( 'wishlist' )
	.doc( wishlistItemID )
	.delete().then( () => {
		// console.log("removed");
	});
}

function renderMostReadIdeas(moodRef, ideaRef, count) {
	let ribbonType = (moodRef.name).toString().toLowerCase();
	if( count == 1 || count == 2 ) {
		let col = document.createElement( 'div' );
		col.className = 'col col-md-6 col-sm-12 col-xs-12 p-3';
		col.innerHTML = `
			<div class="hovereffect">
				<div class="bg-container" style="background-image:url('${ideaRef.data().backgroundURL}');">
				</div>
				<a href="./pages/travel-idea.html?idea=${ideaRef.id}">
					<div class="overlay">
						<span class="ribbon ribbon-${ribbonType}">
							${moodRef.name}
						</span>
						<div class="title">${ideaRef.data().name}</div>
					</div>
				</a>
			</div>
			`;
		mostRead.appendChild( col );
	}	

	if( count == 3 ) {
		let col = document.createElement( 'div' );
		col.className = 'col col-md-12 col-sm-12 col-xs-12 p-3';
		col.innerHTML = `
			<div class="hovereffect">
				<div class="bg-container" style="background-image:url('${ideaRef.data().backgroundURL}');">
				</div>
				<a href="./pages/travel-idea.html?idea=${ideaRef.id}">
					<div class="overlay">
						<span class="ribbon ribbon-${ribbonType}">
							${moodRef.name}
						</span>
						<div class="title title-full">${ideaRef.data().name}</div>
					</div>
				</a>
			</div>
			`;
		mostRead.appendChild( col );
	}

	if( count == 4 || count == 5 || count == 6 ) {
		let col = document.createElement( 'div' );
		col.className = 'col col-md-4 col-sm-12 col-xs-12 p-3';
		col.innerHTML = `
			<div class="hovereffect">
				<div class="bg-container" style="background-image:url('${ideaRef.data().backgroundURL}');">
				</div>
				<a href="./pages/travel-idea.html?idea=${ideaRef.id}">
					<div class="overlay">
						<span class="ribbon ribbon-${ribbonType}">
							${moodRef.name}
						</span>
						<div class="title">${ideaRef.data().name}</div>
					</div>
				</a>
			</div>
			`;
		mostRead.appendChild( col );
	}
}

// ADD comment
function toTimestamp( strDate ) {
	var datum = Date.parse(strDate);
	return datum/1000;
}

const commentsForm = document.querySelector( '#add-comment-form' );

if(commentsForm) {
	
	document.querySelector("#add-comment-btn").addEventListener( 'click', ( e ) => { 
		e.preventDefault();
		e.stopPropagation();
		
		const currentUser = firebase.auth().currentUser;

		if(currentUser) {

			const today = new Date().toLocaleString();
			const timestamp = toTimestamp(today);

			firebase
				.firestore()
				.collection( 'reviews' )
				.add( {
					comment:commentsForm.commentContent.value,
					dateAndTime: timestamp,
					ideaID: commentsForm.commentIdeaID.value,
					userName: currentUser.displayName,
					userAvatar: currentUser.photoURL
				} ). then ( function () {
	
					commentsForm.commentContent.value = '';
					commentsForm.commentDateTime.value = '';
				})
		}
	
		})
}

function renderComments(commentRef) {
	// console.log(toTimestamp(new Date().toLocaleString()));
	const timestamp = commentRef.data().dateAndTime;
	const dateAndTime = new Date(timestamp * 1000);
	const year = dateAndTime.getFullYear(); // year
	const date = dateAndTime.getDate(); // day
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	  ];
	const monthName = months[dateAndTime.getMonth()];

	const days = [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat'
	]
	const dayName = days[dateAndTime.getDay()];
	const hour = dateAndTime.getHours();
	const minutes = dateAndTime.getMinutes();
	let formatted = `${dayName}, ${date} ${monthName} ${year}, ${hour}:${minutes}`

	const today = new Date();
	if( today.toLocaleDateString() == dateAndTime.toLocaleDateString()) {
		formatted = `Today, ${hour}:${minutes}`
	}

	let userAvatar = "https://firebasestorage.googleapis.com/v0/b/dc-travel-mood.appspot.com/o/avatars%2Fdefault_avatar_dctravelmood.jpg?alt=media&token=cf88cf89-493a-456f-978e-93a9842ac42d";

	if (commentRef.data().userAvatar) {
		userAvatar = commentRef.data().userAvatar;
		// console.log("comment");
		// console.log(userAvatar);
	}
	
	let ideasList = document.querySelector( ".comment-list" );
	let li = document.createElement( 'li' );
	li.className = 'comment';
	li.innerHTML = `
		<div class="user-icon"><span>
			<img src="${userAvatar}">
			</span>
		</div>
		<div class="comment-body">
			<span class="comment-time text-muted small">${formatted}</span>
			<span><strong>@${commentRef.data().userName}</strong></span>
			<div>${commentRef.data().comment}</div>
		</div>
		`;
	ideasList.appendChild( li );
}




/** ADMIN */

if (adminPage) {

	function renderMoodsAdmin( moodRef, i ) {	
		let div = document.createElement( 'div' );
		div.setAttribute( 'data-id', moodRef.id );
	
		if ( i % 2 == 0 ) {
			div.className = 'row';
			div.innerHTML = `
				<div class="col col-lg-9 col-md-8 pl-0">
					<div class="bg-container" style="background-image: url('${moodRef.data().imageURL}');">
					</div>
				</div>
				<div class="col col-lg-3 col-md-4">
					<div class="description">
					<img src="${moodRef.data().iconURL}" alt="${moodRef.data().icon}">
					<h5 class="m-3">${moodRef.data().name}</h5>
					<div class="motto">${moodRef.data().motto}</div>
					<p>
						${moodRef.data().description}
					</p>
					<button onclick="redirectToMood('${moodRef.id}');" class="secondary-btn unfilled">Choose this mood</button>
					</div>
				</div>
				`;
		} else {
			div.className = 'row row-invert';
			div.innerHTML = `
				<div class="col col-lg-3 col-md-4">
					<div class="description">
					<img src="${moodRef.data().iconURL}" alt="${moodRef.data().icon}">
					<h5 class="m-3">${moodRef.data().name}</h5>
					<div class="motto">${moodRef.data().motto}</div>
					<p>
					${moodRef.data().description}
					</p>
					<button onclick="redirectToMood('${moodRef.id}');" class="secondary-btn unfilled">Choose this mood</button>
					</div>
				</div>
				<div class="col col-lg-9 col-md-8 pr-0">
					<div class="bg-container" style="background-image: url('${moodRef.data().imageURL}');">
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
	
	function renderIdeaAdmin( moodRef, ideaRef ) {
		
		let ideasList = document.querySelector( ".idea-list" );
		let li = document.createElement( 'li' );
		li.className = 'item mt-3 mb-3';
		li.innerHTML = `
			<div class="item-img">
				<span>
					<img src="${ideaRef.data().backgroundURL}" alt="${ideaRef.data().background}">
				</span>
			</div>
			<div class="item-info">
				<div class="ml-3 mb-3 mt-1">
					<img src="${moodRef.iconURL}" alt="${moodRef.icon}">
					<span class="small ml-2">${moodRef.name}</span>
				</div>
				<div class="item-title ml-3 m-2"><strong>${ideaRef.data().name}</strong></div>
				<button class="primary-btn goto" type="button" name="button">
					<a href="../pages/travel-idea.html?idea=${ideaRef.id}">Go to</a>
					<span>.</span><span>.</span><span>.</span>
				</button>
			</div>
			`;
		ideasList.appendChild( li );
	
	}
	
	function redirectToMood( moodID ) {
		firebase
			.firestore()
			.collection( 'moods' )
			.doc( moodID )
			.get()
			.then( ( moodRef ) => {
				let redirectLocation = "../pages/travel-mood.html?mood=" + moodRef.data().name;
				window.location.replace(redirectLocation);
			});
	}

	// ADD MOOD
	const moodsForm = document.querySelector( '#add-mood-form' );
	// upload mood icon image
	let uploaderIcon = document.querySelector('#uploaderIcon');
	let fileButtonIcon = document.querySelector('#fileButtonIcon');
	// upload mood background image 
	let uploader = document.querySelector('#uploader');
	let fileButton = document.querySelector('#fileButton');

	function addMood() {
		moodsForm.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
			e.stopPropagation();
			
			firebase
				.firestore()
				.collection( 'moods' )
				.add( {
					name: moodsForm.name.value,
					motto: moodsForm.motto.value,
					icon: moodsForm.icon.value,
					iconURL: moodsForm.iconURL.value,
					image: moodsForm.image.value,
					imageURL: moodsForm.imageURL.value,
					description: moodsForm.description.value
				} );

			moodsForm.name.value = '';
			moodsForm.motto.value = '';
			moodsForm.icon.value = '';
			moodsForm.iconURL.value = '';
			moodsForm.image.value = '';
			moodsForm.imageURL.value = '';
			moodsForm.description.value = '';
			uploaderIcon.value = 0;
			document.querySelector( '#add-mood-form_icon-upload span' ).innerHTML = 'Upload icon';
			uploader.value = 0;
			document.querySelector( '#add-mood-form_bg-upload span' ).innerHTML = 'Upload background image';
		});
	}
	// upload mood icon image
	fileButtonIcon.addEventListener('change', function(e) {
		document.querySelector( '#add-mood-form_icon-upload span' ).innerHTML = 'Uploading...';
		// Get file
		let file = e.target.files[0];
		// Create storage ref
		let storageRef = storage.ref('icons/' + file.name);
		// Save name for storing in moods collection
		document.querySelector( '#add-mood-form' ).icon.value = file.name;
		// Upload file
		let task = storageRef.put(file);
		// Update progress bar
		task.on('state_changed',
			function progress(snapshot) {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				uploaderIcon.value = percentage;
				if (percentage < 100) {
					document.querySelector( '#add-mood-form_icon-upload span' ).innerHTML = 'Uploading...';
				} else {
					document.querySelector( '#add-mood-form_icon-upload span' ).innerHTML = 'Uploaded';
				}
			},
			function error(err) {

			},
			function complete() {
				storageRef
					.getDownloadURL()
					.then(icon => {
						moodsForm.iconURL.value = icon;
					});
			}
		)
	})

	// upload mood background image 
	fileButton.addEventListener('change', function(e) {
		document.querySelector( '#add-mood-form_bg-upload span' ).innerHTML = 'Uploading...';
		// Get file
		let file = e.target.files[0];
		// Create storage ref
		let storageRef = storage.ref('backgrounds/' + file.name);
		// Save name for storing in moods collection
		document.querySelector( '#add-mood-form' ).image.value = file.name;
		// Upload file
		let task = storageRef.put(file);
		// Update progress bar
		task.on('state_changed',
			function progress(snapshot) {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				uploader.value = percentage;
				if (percentage < 100) {
					document.querySelector( '#add-mood-form_bg-upload span' ).innerHTML = 'Uploading...';
				} else {
					document.querySelector( '#add-mood-form_bg-upload span' ).innerHTML = 'Uploaded';
				}
			},
			function error(err) {

			},
			function complete() {
				storageRef
					.getDownloadURL()
					.then(bg => {
						moodsForm.imageURL.value = bg;
					});
			}
		)
	});

	// EDIT MOOD
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
						<input type="text" name="edit-icon" placeholder="Icon" value="${docRef.data().icon}" style="cursor:not-allowed" readonly>
						<input type="text" name="edit-image" placeholder="Image" value="${docRef.data().image}" style="cursor:not-allowed" readonly>
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
		
	
	// ADD IDEA
	const ideaForm = document.querySelector( '#add-idea-form' );
	// upload idea background image 
	const uploaderIdea = document.querySelector('#uploaderIdea');
	const fileButtonIdea = document.querySelector('#fileButtonIdea');

	function addIdea() {
		ideaForm.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
			e.stopPropagation();

			firebase
				.firestore()
				.collection( 'ideas' )
				.add( {
					name: ideaForm.ideaName.value,
					background: ideaForm.ideaBgTitle.value,
					backgroundURL:ideaForm.ideaBgURL.value,
					mood: ideaForm.ideaMood.value,
					location: ideaForm.ideaLocation.value,
					description: ideaForm.ideaDescription.value,
					bestExperiences: ideaForm.ideaBestExperiences.value,
					getThere: ideaForm.ideaGetThere.value,
					counter: 0
				} );
		
			ideaForm.ideaName.value = '';
			ideaForm.ideaBgTitle.value = '';
			ideaForm.ideaBgURL.value = '';
			ideaForm.ideaMood.value = '';
			ideaForm.ideaLocation.value = '';
			ideaForm.ideaDescription.value = '';
			ideaForm.ideaBestExperiences.value = '';
			ideaForm.ideaGetThere.value = '';

			uploaderIdea.value = 0;
			document.querySelector( '#add-idea-form_bg-upload span' ).innerHTML = 'Upload background image';

		});
	}

	// upload idea background image 
	fileButtonIdea.addEventListener('change', function(e) {
		document.querySelector( '#add-idea-form_bg-upload span' ).innerHTML = 'Uploading...';
		// Get file
		let file = e.target.files[0];
		// Create storage ref
		let storageRef = storage.ref('backgrounds/' + file.name);
		// Save name for storing in moods collection
		document.querySelector( '#add-idea-form' ).ideaBgTitle.value = file.name;
		// Upload file
		let task = storageRef.put(file);
		// Update progress bar
		task.on('state_changed',
			function progress(snapshot) {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				uploaderIdea.value = percentage;
				if (percentage < 100) {
					document.querySelector( '#add-idea-form_bg-upload span' ).innerHTML = 'Uploading...';
				} else {
					document.querySelector( '#add-idea-form_bg-upload span' ).innerHTML = 'Uploaded';
				}
			},
			function error(err) {

			},
			function complete() {
				storageRef
				.getDownloadURL()
				.then(bg => {
					ideaForm.ideaBgURL.value = bg;
				});
			}
		)
	});
}


/** END ADMIN */


/** Getting Moods --  Real time listener */
function getMoods( change, i, user ) {
	
	if ( change.type == 'added' ) {				

		if ( adminPage ) {
			renderMoodsAdmin(change.doc, i);
			renderMoodsSelect(change.doc);
		}
		if ( moodsHeader ) {
			renderMoodsHeader( change.doc );
		}
		if ( moodsFooter ) {
			renderMoodsFooter( change.doc );
		}
		if ( moodsListContainer ) {
			renderMoodsList( change.doc, i);
		}
		if ( selectedMood ) {
			let url = new URL(window.location.href);
			let searchParams = new URLSearchParams(url.search);
			let selectedMoodName = searchParams.get('mood');
			if(selectedMoodName == change.doc.data().name) {
				renderMood( change.doc );
				renderIdeasList( change.doc );
			}
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
}

/** Getting Ideas --  Real time listener */
function getIdeas( moodRef, change, count, user ) {
	let moodForIdea = moodRef.find(mood => mood.moodID == change.doc.data().mood);
	if(moodForIdea) {
		let moodData = moodForIdea.moodData;
		if ( change.type == 'added' ) {
	
			if ( adminPage ) {
				renderIdeaAdmin(moodData, change.doc);
			}
	
			if ( ideaPage ) {
				let url = new URL(window.location.href);
				let searchParams = new URLSearchParams(url.search);
				let selectedIdeaID = searchParams.get('idea');
				if( selectedIdeaID == change.doc.id ) {
					renderIdeaPage(moodData, change.doc, user);
				}
			}
	
			if ( mostRead ) {
				if( count <= 6 ) {
					renderMostReadIdeas(moodData, change.doc, count);
				}
			}
		}
	}
}

function getComments( commentRef ) {
	if( ideaPage ) {
		let url = new URL(window.location.href);
		let searchParams = new URLSearchParams(url.search);
		let selectedIdeaID = searchParams.get('idea');
		if( selectedIdeaID == commentRef.doc.data().ideaID ) {
			renderComments(commentRef.doc);
		}
	}
}

/** END Getting Moods --  Real time listener */

/**  END Cloud Firestore */
///////////////////////////