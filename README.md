# Mood- driven travel web application
-- Graduation Thesis -- 


My web application’s main purpose is to offer a simplified search for all the steps a traveler has to make when planning a journey. It offers a user-friendly interface, and, after authentication, it displays ideas of travel based on some filters, the necessary preparations for obtaining the most of a travel experience, the supposed expectations a traveler has when he first visits a location and the possibility to store the preferred ideas on the personal wish-list which further could be accessed by him.

The front-end part of the application was implemented using HTML5 – for the skeleton, CSS – for the design and JavaScript – for the interactivity.
I have used HTML5 semantic tags to make the code structure clearer and more logical. As a result, the header, navigation menu, the main section and the footer content are distinguishable, being marked with the appropriate tags.
The power of scalable vector graphics animation was used to obtain the logo of the website. The logo is represented by a hippie van that appears to be moving thanks to CSS keyframes feature. The keyframes modifies the car’s position by changing the bottom property per each fraction of time.

The application is functional on multiple screens and its design is adaptable depending on the device on which the website is opened.
The menu for screens smaller than a laptop, for example tablet or phone, is hamburger menu or three-line menu - a compact solution that hides the traditional file menu until click. In the case of screens with higher resolution, like laptops and 4K monitors, the menu is horizontal and sticky – or persistent, meaning that it does not disappear on scroll.
Also, depending on the device’s size, some elements from the page, like the three icons aligned horizontally, above the “Pick your travel mood” button, are hidden or shown, in order to maintain a clean and clear screen.

The Firebase Authentication gives the developer the ability to specify whether a registered user state should be cleared when the window closes, cleared when the page is reloaded or should be persisted indefinitely until explicit command, when user signs out. For my application I used the behavior where the user’s session persists even after browser closing. That approach is convenient because the user is not required to re-login every time after closing the page on the same device. When an unregistered user accesses the website from his browser, most of the functionality and all the data are unavailable.
If the user is not authenticated, in the menu appear 2 buttons, stylized with Bootstrap and CSS. One button triggers the Sign-up modal on click, with the following fields: username, email and password.
When the user wants to create an account, Firebase Authentication functions are called, verifying the uniqueness of the email and the password length. In the modal’s footer, it is a notice about term and conditions agreement and privacy policy, both triggering overlaying modals, to make the user aware of the use of personal info, according to GDPR.
If registration succeeds, the user is saved in the database and is logged in.
If the Log in button is clicked, the corresponding modal is shown and already registered user enters his credentials - email and password, and the Firebase Auth verifies the correctness. For both modals, implemented using the Bootstrap modal plugin, corresponding authentication errors appear.

After the authentication step is passed, the user has access to a multitude of features and data. In the menu, the buttons described above are replaced with two other buttons: one that triggers a modal – Account information, and one for Log Out.
By accessing the Account Information modal, the user has as options to change his email or his password, which are saved in the database after user confirms these changes.
The “Most read travel ideas” section has as components items of different sizes having background image with dark faded overlay and one more overlay that contains the travel mood type with the corresponding icon and trip idea’s title. On hover, the faded overlay gradually disappears by increasing its opacity and the background image is zoomed in.

The ideas in this section depend on the numbers of users that accessed them, being generated only the ones with the highest ranking, stored in the database as a counter.
In the last section from the webpage’s main components, it is situated a carousel element which displays resources that could be accessed by the user. Each resource is placed in a carousel item. By clicking on one of them, the new tab with a resource’s official website will be opened. These items are animated by sliding the whole list with an interval of 5 seconds. Also, there are two buttons to make it possible to navigate between them manually. This feature was implemented using Bootstrap 4.

In the footer section could be found contact information, a list of travel moods with corresponding links, about us section with the modals displaying the terms and conditions and the privacy policy, and two social links, to Instagram and Facebook.
After authentication, the menu is populated with three more options: Travel Moods, Travel Plan and Wish list. Travel Moods has a dropdown attached which is displayed on hover, containing the name of the travel mood and its motto, taken from the Firestore. When this option is clicked, the Travel Moods page is opened. On that page is generated a list of travel moods, of course, from JavaScript, which is populated from the Firestore collection named “moods” with the name, icon, background, and description. A “Choose this mood” button is in each item of the list, with a link to that mood.

The admin, recognized at authentication by Firebase Authentication, has the right to add, edit and delete moods and ideas from the frontend. On his dedicated page, he has a form to add a mood which is saved in the database and attached, without refresh, to a list with similar design as that displayed on the Travel Moods page. The difference is that when hovering on an item, he sees 2 options: to edit or to delete it. The same functionality is for managing ideas.

There are 6 travel moods: Active, Adventure, Getaway, Explore, Relax and Romantic.
After selecting the desired travel mood, from that list or from the menu’s dropdown, the user is redirected to the list of ideas with the respective mood. He has as options two buttons: to go to the travel idea’s full specification page by clicking on “Go to…” button, or to add the idea to wish list, and, as well, to remove it from there.
The user has as option to add a travel idea to the wish list both from the destinations list page or from the travel idea page.
When user presses the button “Add to wish list”, the event onclick runs the function assigned to it. This function creates request with the data about the selected idea and sends it to the Firebase, which stores the information about the user’s preferred idea to the database and establishes a relation between them. The wish list page consists of a list with all ideas selected by the user as favorites. Each item of this list has a link to the page with more details about the travel idea, and a delete button which, when clicked, removes the item from the list.
The ideas that are in the wish list, are marked with a filled red heart. By clicking multiple times on that button, the icon toggles between filled and unfilled, and the data are added and deleted from the Firestore.

The page containing a travel idea has as main components a representative image and a title, a section with details like the corresponding mood and the location, followed by a section with a short description and another section that informs the user about what tot expect from that experience.

This page also contains a comment section where users could add their opinion or ask questions. The comments are added in real time and the user’s name, the content and the time will be displayed for each one.

The “Travel Plan” option from the menu displays a page with information about all the aspects to be considered when planning a vacation, the necessary steps, and some recommendations.

At log out, the session is closed, and the user is redirected to the initial homepage for unauthenticated users.
