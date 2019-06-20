<?php
require_once "../backend/idiorm.php";
session_start();

ORM::configure('mysql:host=localhost:3306;dbname=mooddriven');
ORM::configure('username','root');
ORM::configure('password', '');

$mood = ORM::for_table('moods')->where('mood', 'Relax')->find_one()->as_array();

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Plan Your Trip | MoodDriven</title>
  <link rel="icon" type="image/png" href="../assets/images/explore-mood.jpg">
  <link href="https://fonts.googleapis.com/css?family=Megrim|Raleway:300,400,600,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
  <header>
    <div class="sticky-part">
      <div class="container d-flex align-items-center">
        <a href="../index.php" class="logo">
          <span class="logo-name">MoodDriven</span>
          <div id="wrapper">
            <div id="car-body">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                <g id="surf-board">
                  <path id="XMLID_34_" class="st6" d="M418.3,59.4c-14.5-4-106.5-10.5-120.5-10.5s-92.7,0.8-108.5,3c-14.1,2-43.4,4.5-57,7.5H418.3z" />
                  <path id="XMLID_21_" class="st6" d="M415.3,60.4c14.5,5,19.5,12.5,19.5,12.5l-165.2-3l-165.2,3c0,0-3.3-2,0-5.5
              c3.3-3.5,10.6-3.1,20.8-6c1.1-0.3,2.6-1,4.3-1H415.3z" />
                  <path id="XMLID_23_" class="st6" d="M360.7,51.6c0,0-0.9-5.2,10.6-17.3s21.6-11.9,21.6-11.9h11.9l6.5,2.2L399.1,42l-3.8,12.6
              L360.7,51.6z" />
                  <rect id="XMLID_22_" x="146.3" y="73" class="st6" width="6.8" height="12" />
                  <rect id="XMLID_24_" x="390.3" y="72.9" class="st6" width="7.5" height="12" />
                </g>
                <g id="body">
                  <g id="XMLID_15_">
                    <path id="XMLID_29_" class="st7" d="M213.4,161.9l0-67.7c-73.1,0.3-134.6,1.1-136.6,2.7c-5,4-28.1,49.6-28.1,58.1
                c0,2,0,4.6,0,7.4L213.4,161.9z" />
                    <path id="XMLID_27_" class="st8" d="M213.4,161.2l0.4,76.3h-29.5l-16.5-30h-42.5l-18.5,30h-56l-2-54.9c0,0,0-11.8,0-21.1
                L213.4,161.2z" />
                    <polygon id="XMLID_31_" class="st9" points="205.8,160.4 205.8,196.4 116.1,197.6 107.8,215.4 86.3,215.4 85.9,160.4       " />
                    <polyline id="XMLID_14_" class="st10" points="86.9,161.4 87.3,150.4 106.8,98.7 206.8,97.9 206.8,161.4       " />
                    <path id="XMLID_86_" class="st7" d="M97.1,240.3H48.6c-4.3,0-7.7-3.5-7.7-7.8v0c0-4.3,3.5-7.7,7.7-7.7h48.5
                c4.3,0,7.7,3.5,7.7,7.7v0C104.8,236.8,101.3,240.3,97.1,240.3z" />
                    <path id="XMLID_87_" class="st11" d="M118.6,106.4l-3.6-0.1l-3.6,2.1l-10.1,30.1c0,0-0.8,4.4,0,6.8s6.5,3,6.5,3s93.2,0,95,0
                s2-2.9,2-4.3c0-1.4,0-36.4,0-36.4l-0.4-1.6l-1.1,0.3H118.6z" />
                    <path id="XMLID_5_" class="st11" d="M76.8,103.7c0,0,9,2.2,11.5,3.3s2.5,4,2.5,4s-12.8,29.8-14,32.2s-7,5.3-7,5.3h-17l-2-1
                c0,0,3.1-10.8,8.8-23.1c4.7-10.1,11.1-19.4,12.2-19.9C74.3,103.3,76.8,103.7,76.8,103.7z" />
                    <path id="XMLID_16_" class="st5" d="M201.3,176.2h-12c-0.8,0-1.5-0.7-1.5-1.5v-1.1c0-0.8,0.7-1.5,1.5-1.5h12
                c0.8,0,1.5,0.7,1.5,1.5v1.1C202.8,175.6,202.1,176.2,201.3,176.2z" />
                    <rect id="XMLID_4_" x="85.8" y="155.9" class="st12" width="122.5" height="5.5" />
                    <rect id="XMLID_13_" x="48.8" y="155.9" class="st12" width="37.1" height="5.5" />
                  </g>
                  <g id="XMLID_39_">
                    <path id="XMLID_20_" class="st7" d="M271.8,161.4l205-1c0,0,0-16.6,0-19.4c0-10.6-9.1-42.6-14.1-46.1c-3-2.1-139.9-3.1-250.9-2.7
                v54.2l0.6,15H271.8z" />
                    <polygon id="XMLID_25_" class="st8" points="476.8,159.3 476.8,237.4 447.3,237.4 437.8,222.4 376.3,222.4 366.8,237.4
                212.8,237.4 212.1,159.9       " />
                    <path id="XMLID_3_" class="st7" d="M480.1,239.4h-17c-4.3,0-7.8-3.5-7.8-7.8v0c0-4.3,3.5-7.7,7.8-7.7h17c4.3,0,7.8,3.5,7.8,7.7v0
                C487.8,235.9,484.3,239.4,480.1,239.4z" />
                    <path id="XMLID_85_" class="st11" d="M260.8,147.4h-29c-6.6,0-12-5.4-12-12v-19.5c0-6.6,5.4-12,12-12h29c6.6,0,12,5.4,12,12v19.5
                C272.8,142,267.4,147.4,260.8,147.4z" />
                    <path id="XMLID_88_" class="st11" d="M325.3,147.4h-29c-6.6,0-12-5.4-12-12v-19.5c0-6.6,5.4-12,12-12h29c6.6,0,12,5.4,12,12v19.5
                C337.3,142,331.9,147.4,325.3,147.4z" />
                    <path id="XMLID_89_" class="st11" d="M388.8,146.9h-29c-6.6,0-12-5.4-12-12v-19.5c0-6.6,5.4-12,12-12h29c6.6,0,12,5.4,12,12v19.5
                C400.8,141.5,395.4,146.9,388.8,146.9z" />
                    <line id="XMLID_6_" class="st13" x1="407.8" y1="167.9" x2="447.8" y2="167.9" />
                    <line id="XMLID_8_" class="st13" x1="407.8" y1="173.9" x2="447.8" y2="173.9" />
                    <line id="XMLID_9_" class="st13" x1="407.8" y1="179.9" x2="447.8" y2="179.9" />
                    <line id="XMLID_10_" class="st13" x1="407.8" y1="185.9" x2="447.8" y2="185.9" />
                    <line id="XMLID_12_" class="st13" x1="407.8" y1="191.9" x2="447.8" y2="191.9" />
                    <path id="XMLID_7_" class="st14" d="M471.5,216.1h-10.9c-0.6,0-1.1-0.5-1.1-1.1v-5.8c0-0.6,0.5-1.1,1.1-1.1h10.9
                c0.6,0,1.1,0.5,1.1,1.1v5.8C472.6,215.6,472.1,216.1,471.5,216.1z" />
                    <path id="XMLID_11_" class="st4" d="M477.3,203.9v-8h3.4c0.9,0,1.6,0.7,1.6,1.6v4.9c0,0.9-0.7,1.6-1.6,1.6H477.3z" />
                    <line id="XMLID_18_" class="st15" x1="213.4" y1="97.9" x2="212.8" y2="161.4" />
                    <rect id="XMLID_19_" x="204.8" y="155.9" class="st12" width="272" height="5.5" />
                    <line id="XMLID_28_" class="st16" x1="212.8" y1="161.4" x2="212.8" y2="236.4" />
                  </g>
                  <g id="XMLID_26_">
                    <path id="XMLID_90_" class="st7" d="M72.3,99.4h395c0,0-6-6.1-8.7-8c-2.8-1.9-8.1-6-13.4-6s-345.1,0-345.1,0l-7.5,0.5
                c0,0-8.7,2.6-11.8,4.4C77.7,92,72.3,99.4,72.3,99.4z" />
                    <line id="XMLID_32_" class="st15" x1="73.8" y1="99.4" x2="465.8" y2="99.4" />
                  </g>
                </g>
              </svg>
            </div><!-- Car Body -->
            <div id="wheel">
              <div class="wheel wheel-front">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                  <circle id="outer" class="st3" cx="146.3" cy="245.9" r="34" />
                  <path id="white-space" class="st4" d="M146.6,230.5c8.7,0,15.7,7,15.7,15.7s-7,15.7-15.7,15.7s-15.7-7-15.7-15.7
              S137.9,230.5,146.6,230.5" />
                  <path id="inner" class="st5 inner-tire" d="M146.8,239c-4.1,0-7.3,3.2-7.3,7.2c0,4,3.3,7.2,7.3,7.2c0-2.3,0-4.7,0-7c2.8,0,4.7,0,7.3,0
              c0-0.1,0-0.2,0-0.2C154.1,242.2,150.9,239,146.8,239z">
                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 146.3 245.9" to="0 146.3 245.9" begin="0s" dur="0.6s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div> <!-- Wheel Front -->
              <div class="wheel wheel-back">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                  <circle id="outer_1_" class="st3" cx="408.3" cy="245.9" r="34" />
                  <circle id="white-space_1_" class="st4" cx="408.6" cy="246.2" r="15.7" />
                  <path id="inner_1_" class="st5 inner-tire" d="M408.8,239c-4.1,0-7.3,3.2-7.3,7.2c0,4,3.3,7.2,7.3,7.2c0-2.3,0-4.7,0-7c2.8,0,4.7,0,7.3,0
              c0-0.1,0-0.2,0-0.2C416.1,242.2,412.9,239,408.8,239z">
                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 408.3 245.9" to="0 408.3 245.9" begin="0s" dur="0.6s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div> <!-- Wheel Back -->
            </div> <!-- Wheel -->
            <div id="smoke">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 93.1 79.3" style="enable-background:new 0 0 93.1 79.3;" xml:space="preserve">
                <path class="st5" d="M36.7,11c-1.8-8-7-10-7-10l-19-1c-17.8,8-8,29-8,29c5.5,5.5,17,7,17,7c-12.7,14.8-7,26-7,26c4,3.8,17,2,17,2v6c3.5,12,25,9,25,9c4.5-2,6-5,6-5l1-3h18c7.3-2.8,6-9,6-9l-1-9c11.3-7.8,8-25,8-25c-7.1-4-13.6-4.1-15.5-4c7-9-0.5,0-0.5,0l1-10c-9-6-16-8-16-8c-4.3-1.8-19-1-19-1L36.7,11z" />
              </svg>
            </div> <!-- Smoke -->
            <div id="shadow">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                <path class="st2" d="M461.1,288.4H70.3c-5.8,0-10.5-4.7-10.5-10.5l0,0c0-5.8,4.7-10.5,10.5-10.5h390.8c5.8,0,10.5,4.7,10.5,10.5l0,0C471.6,283.7,466.8,288.4,461.1,288.4z" />
              </svg>
            </div> <!-- Shadow -->
          </div>
        </a>
        <div class="burger-nav">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav class="w-100">
          <div class="close-nav">
            <span class="line"></span>
            <span class="line"></span>
          </div>
          <ul class="site-nav">
            <li class="dropdown-holder">
              <a href="../pages/travel-moods.php">Travel Moods<span class="angle"></span></a>
              <ul class="dropdown">
                <li>
                  <a href="#">
                    <div class="title">
                      Active
                    </div>
                    <div class="description">
                      if you feel energetic
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="title">
                      Adventure
                    </div>
                    <div class="description">
                      if you are feeling daring
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="title">
                      Getaway
                    </div>
                    <div class="description">
                      if you need a bolt of freedom
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="title">
                      Explore
                    </div>
                    <div class="description">
                      if you're curious
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="title">
                      Relax
                    </div>
                    <div class="description">
                      if you need to chill
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="title">
                      Romantic
                    </div>
                    <div class="description">
                      if you are in love
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="../pages/travel-plan.php">Travel Plan</a>
            </li>
            <?php if(isset($_SESSION['username']) && !empty($_SESSION['username'])) :?>
              <li>
                <a href="../pages/wishlist.php">Wish List</a>
              </li>
            <?php endif; ?>
          </ul>
          <?php if(isset($_SESSION['username']) && !empty($_SESSION['username'])) :?>
            <form class="auth-nav" action="../index.php" method="post">
              <div class="username"><i class="far fa-user pr-2"></i>
                <?php echo $_SESSION['username'] ?>
              </div>
              <button type="submit" name="logout-btn" class="auth-button bordered-button">Log Out</button>
            </form>
          <?php else :?>
            <form class="auth-nav" action="../pages/auth-form.php" method="post">
              <button type="submit" name="login-btn" class="auth-button">Login</button>
              <button type="submit" name="signup-btn" class="auth-button bordered-button">Sign Up</button>
            </form>
          <?php endif; ?>
        </nav>
      </div>
    </div>
  </header>
  <main>

    <div class="hero-half" style="background-image:url(<?php echo $mood['bgImg'] ?>)">
      <div class="bg-shadow">
      </div>
      <div class="container">
        <h1><?php  echo $mood['mood'] ?> Mood</h1>
      </div>
    </div>

  </main>
  <footer>
    <div class="container">
      <div class="row row-wrap">
        <div class="col col-sm-12 col-md-4">
          <ul>
            <li class="logo">
              <span class="logo-name">MoodDriven</span>
              <div id="wrapper">
                <div id="car-body">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                    <g id="surf-board">
                      <path id="XMLID_34_" class="st6" d="M418.3,59.4c-14.5-4-106.5-10.5-120.5-10.5s-92.7,0.8-108.5,3c-14.1,2-43.4,4.5-57,7.5H418.3z" />
                      <path id="XMLID_21_" class="st6" d="M415.3,60.4c14.5,5,19.5,12.5,19.5,12.5l-165.2-3l-165.2,3c0,0-3.3-2,0-5.5
                        c3.3-3.5,10.6-3.1,20.8-6c1.1-0.3,2.6-1,4.3-1H415.3z" />
                      <path id="XMLID_23_" class="st6" d="M360.7,51.6c0,0-0.9-5.2,10.6-17.3s21.6-11.9,21.6-11.9h11.9l6.5,2.2L399.1,42l-3.8,12.6
                        L360.7,51.6z" />
                      <rect id="XMLID_22_" x="146.3" y="73" class="st6" width="6.8" height="12" />
                      <rect id="XMLID_24_" x="390.3" y="72.9" class="st6" width="7.5" height="12" />
                    </g>
                    <g id="body">
                      <g id="XMLID_15_">
                        <path id="XMLID_29_" class="st7" d="M213.4,161.9l0-67.7c-73.1,0.3-134.6,1.1-136.6,2.7c-5,4-28.1,49.6-28.1,58.1
                          c0,2,0,4.6,0,7.4L213.4,161.9z" />
                        <path id="XMLID_27_" class="st8" d="M213.4,161.2l0.4,76.3h-29.5l-16.5-30h-42.5l-18.5,30h-56l-2-54.9c0,0,0-11.8,0-21.1
                          L213.4,161.2z" />
                        <polygon id="XMLID_31_" class="st9" points="205.8,160.4 205.8,196.4 116.1,197.6 107.8,215.4 86.3,215.4 85.9,160.4       " />
                        <polyline id="XMLID_14_" class="st10" points="86.9,161.4 87.3,150.4 106.8,98.7 206.8,97.9 206.8,161.4       " />
                        <path id="XMLID_86_" class="st7" d="M97.1,240.3H48.6c-4.3,0-7.7-3.5-7.7-7.8v0c0-4.3,3.5-7.7,7.7-7.7h48.5
                          c4.3,0,7.7,3.5,7.7,7.7v0C104.8,236.8,101.3,240.3,97.1,240.3z" />
                        <path id="XMLID_87_" class="st11" d="M118.6,106.4l-3.6-0.1l-3.6,2.1l-10.1,30.1c0,0-0.8,4.4,0,6.8s6.5,3,6.5,3s93.2,0,95,0
                          s2-2.9,2-4.3c0-1.4,0-36.4,0-36.4l-0.4-1.6l-1.1,0.3H118.6z" />
                        <path id="XMLID_5_" class="st11" d="M76.8,103.7c0,0,9,2.2,11.5,3.3s2.5,4,2.5,4s-12.8,29.8-14,32.2s-7,5.3-7,5.3h-17l-2-1
                          c0,0,3.1-10.8,8.8-23.1c4.7-10.1,11.1-19.4,12.2-19.9C74.3,103.3,76.8,103.7,76.8,103.7z" />
                        <path id="XMLID_16_" class="st5" d="M201.3,176.2h-12c-0.8,0-1.5-0.7-1.5-1.5v-1.1c0-0.8,0.7-1.5,1.5-1.5h12
                          c0.8,0,1.5,0.7,1.5,1.5v1.1C202.8,175.6,202.1,176.2,201.3,176.2z" />
                        <rect id="XMLID_4_" x="85.8" y="155.9" class="st12" width="122.5" height="5.5" />
                        <rect id="XMLID_13_" x="48.8" y="155.9" class="st12" width="37.1" height="5.5" />
                      </g>
                      <g id="XMLID_39_">
                        <path id="XMLID_20_" class="st7" d="M271.8,161.4l205-1c0,0,0-16.6,0-19.4c0-10.6-9.1-42.6-14.1-46.1c-3-2.1-139.9-3.1-250.9-2.7
                          v54.2l0.6,15H271.8z" />
                        <polygon id="XMLID_25_" class="st8" points="476.8,159.3 476.8,237.4 447.3,237.4 437.8,222.4 376.3,222.4 366.8,237.4
                          212.8,237.4 212.1,159.9       " />
                        <path id="XMLID_3_" class="st7" d="M480.1,239.4h-17c-4.3,0-7.8-3.5-7.8-7.8v0c0-4.3,3.5-7.7,7.8-7.7h17c4.3,0,7.8,3.5,7.8,7.7v0
                          C487.8,235.9,484.3,239.4,480.1,239.4z" />
                        <path id="XMLID_85_" class="st11" d="M260.8,147.4h-29c-6.6,0-12-5.4-12-12v-19.5c0-6.6,5.4-12,12-12h29c6.6,0,12,5.4,12,12v19.5
                          C272.8,142,267.4,147.4,260.8,147.4z" />
                        <path id="XMLID_88_" class="st11" d="M325.3,147.4h-29c-6.6,0-12-5.4-12-12v-19.5c0-6.6,5.4-12,12-12h29c6.6,0,12,5.4,12,12v19.5
                          C337.3,142,331.9,147.4,325.3,147.4z" />
                        <path id="XMLID_89_" class="st11" d="M388.8,146.9h-29c-6.6,0-12-5.4-12-12v-19.5c0-6.6,5.4-12,12-12h29c6.6,0,12,5.4,12,12v19.5
                          C400.8,141.5,395.4,146.9,388.8,146.9z" />
                        <line id="XMLID_6_" class="st13" x1="407.8" y1="167.9" x2="447.8" y2="167.9" />
                        <line id="XMLID_8_" class="st13" x1="407.8" y1="173.9" x2="447.8" y2="173.9" />
                        <line id="XMLID_9_" class="st13" x1="407.8" y1="179.9" x2="447.8" y2="179.9" />
                        <line id="XMLID_10_" class="st13" x1="407.8" y1="185.9" x2="447.8" y2="185.9" />
                        <line id="XMLID_12_" class="st13" x1="407.8" y1="191.9" x2="447.8" y2="191.9" />
                        <path id="XMLID_7_" class="st14" d="M471.5,216.1h-10.9c-0.6,0-1.1-0.5-1.1-1.1v-5.8c0-0.6,0.5-1.1,1.1-1.1h10.9
                          c0.6,0,1.1,0.5,1.1,1.1v5.8C472.6,215.6,472.1,216.1,471.5,216.1z" />
                        <path id="XMLID_11_" class="st4" d="M477.3,203.9v-8h3.4c0.9,0,1.6,0.7,1.6,1.6v4.9c0,0.9-0.7,1.6-1.6,1.6H477.3z" />
                        <line id="XMLID_18_" class="st15" x1="213.4" y1="97.9" x2="212.8" y2="161.4" />
                        <rect id="XMLID_19_" x="204.8" y="155.9" class="st12" width="272" height="5.5" />
                        <line id="XMLID_28_" class="st16" x1="212.8" y1="161.4" x2="212.8" y2="236.4" />
                      </g>
                      <g id="XMLID_26_">
                        <path id="XMLID_90_" class="st7" d="M72.3,99.4h395c0,0-6-6.1-8.7-8c-2.8-1.9-8.1-6-13.4-6s-345.1,0-345.1,0l-7.5,0.5
                          c0,0-8.7,2.6-11.8,4.4C77.7,92,72.3,99.4,72.3,99.4z" />
                        <line id="XMLID_32_" class="st15" x1="73.8" y1="99.4" x2="465.8" y2="99.4" />
                      </g>
                    </g>
                  </svg>
                </div><!-- Car Body -->
                <div id="wheel">
                  <div class="wheel wheel-front">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                      <circle id="outer" class="st3" cx="146.3" cy="245.9" r="34" />
                      <path id="white-space" class="st4" d="M146.6,230.5c8.7,0,15.7,7,15.7,15.7s-7,15.7-15.7,15.7s-15.7-7-15.7-15.7
                        S137.9,230.5,146.6,230.5" />
                      <path id="inner" class="st5 inner-tire" d="M146.8,239c-4.1,0-7.3,3.2-7.3,7.2c0,4,3.3,7.2,7.3,7.2c0-2.3,0-4.7,0-7c2.8,0,4.7,0,7.3,0
                        c0-0.1,0-0.2,0-0.2C154.1,242.2,150.9,239,146.8,239z">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 146.3 245.9" to="0 146.3 245.9" begin="0s" dur="0.6s" repeatCount="indefinite" />
                      </path>
                    </svg>
                  </div> <!-- Wheel Front -->
                  <div class="wheel wheel-back">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                      <circle id="outer_1_" class="st3" cx="408.3" cy="245.9" r="34" />
                      <circle id="white-space_1_" class="st4" cx="408.6" cy="246.2" r="15.7" />
                      <path id="inner_1_" class="st5 inner-tire" d="M408.8,239c-4.1,0-7.3,3.2-7.3,7.2c0,4,3.3,7.2,7.3,7.2c0-2.3,0-4.7,0-7c2.8,0,4.7,0,7.3,0
                        c0-0.1,0-0.2,0-0.2C416.1,242.2,412.9,239,408.8,239z">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 408.3 245.9" to="0 408.3 245.9" begin="0s" dur="0.6s" repeatCount="indefinite" />
                      </path>
                    </svg>
                  </div> <!-- Wheel Back -->
                </div> <!-- Wheel -->
                <div id="smoke">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 93.1 79.3" style="enable-background:new 0 0 93.1 79.3;" xml:space="preserve">
                    <path class="st5" d="M36.7,11c-1.8-8-7-10-7-10l-19-1c-17.8,8-8,29-8,29c5.5,5.5,17,7,17,7c-12.7,14.8-7,26-7,26c4,3.8,17,2,17,2v6c3.5,12,25,9,25,9c4.5-2,6-5,6-5l1-3h18c7.3-2.8,6-9,6-9l-1-9c11.3-7.8,8-25,8-25c-7.1-4-13.6-4.1-15.5-4c7-9-0.5,0-0.5,0l1-10c-9-6-16-8-16-8c-4.3-1.8-19-1-19-1L36.7,11z" />
                  </svg>
                </div> <!-- Smoke -->
                <div id="shadow">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 545.6 313.5" style="enable-background:new 0 0 545.6 313.5;" xml:space="preserve">
                    <path class="st2" d="M461.1,288.4H70.3c-5.8,0-10.5-4.7-10.5-10.5l0,0c0-5.8,4.7-10.5,10.5-10.5h390.8c5.8,0,10.5,4.7,10.5,10.5l0,0C471.6,283.7,466.8,288.4,461.1,288.4z" />
                  </svg>
                </div> <!-- Shadow -->
              </div>
            </li>
            <li class="mt-4"><i class="fas fa-phone mr-2"></i>(+40) 723 817 182</li>
            <li><i class="fas fa-at mr-2"></i>calin.stefaniadenisa@gmail.com</li>
          </ul>
        </div>
        <div class="col">
          <a class="heading-text" href="../pages/travel-moods.php">TRAVEL MOODS</a>
          <ul>
            <li><a href="../pages/active-mood.php">Active</a></li>
            <li><a href="../pages/adventure-mood.php">Adventure</a></li>
            <li><a href="../pages/getaway-mood.php">Getaway</a></li>
            <li><a href="../pages/explore-mood.php">Explore</a></li>
            <li><a href="../pages/relax-mood.php">Relax</a></li>
            <li><a href="../pages/romantic-mood.php">Romantic</a></li>
          </ul>
        </div>
        <div class="col">
          ABOUT US
          <ul>
            <li>
              <button type="button" class="btn btn-link" data-toggle="modal" data-target="#termsAndConditionsModal">
                Terms and Conditions
              </button>
              <div class="modal fade" id="termsAndConditionsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="termsAndConditionsModalTitle">Terms and Conditions</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>Welcome to MoodDrivenTravel!</p>
                      <p>These terms and conditions outline the rules and regulations for the use of MoodDrivenTravel's Website, located at www.mooddriventravel.ro.</p>
                      <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use MoodDrivenTravel if you do not agree to take all of the terms and conditions stated on this page. Our Terms and Conditions
                        were created with the help of the <a href="https://www.termsandconditionsgenerator.com">Terms And Conditions Generator</a>.</p>
                      <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the
                        Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and
                        consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated
                        services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and
                        therefore as referring to same.</p>
                      <h5><strong>Cookies</strong></h5>
                      <p>We employ the use of cookies. By accessing MoodDrivenTravel, you agreed to use cookies in agreement with the MoodDrivenTravel's Privacy Policy.</p>
                      <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some
                        of our affiliate/advertising partners may also use cookies.</p>
                      <h5><strong>License</strong></h5>
                      <p>Unless otherwise stated, MoodDrivenTravel and/or its licensors own the intellectual property rights for all material on MoodDrivenTravel. All intellectual property rights are reserved. You may access this from
                        MoodDrivenTravel for your own personal use subjected to restrictions set in these terms and conditions.</p>
                      <p>You must not:</p>
                      <ul>
                        <li>Republish material from MoodDrivenTravel</li>
                        <li>Sell, rent or sub-license material from MoodDrivenTravel</li>
                        <li>Reproduce, duplicate or copy material from MoodDrivenTravel</li>
                        <li>Redistribute content from MoodDrivenTravel</li>
                      </ul>
                      <p>This Agreement shall begin on the date hereof.</p>
                      <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. MoodDrivenTravel does not filter, edit, publish or review Comments prior to their presence
                        on the website. Comments do not reflect the views and opinions of MoodDrivenTravel,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted
                        by applicable laws, MoodDrivenTravel shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this
                        website.</p>
                      <p>MoodDrivenTravel reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
                      <p>You warrant and represent that:</p>
                      <ul>
                        <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                        <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                        <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                        <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                      </ul>
                      <p>You hereby grant MoodDrivenTravel a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
                      <h5><strong>Hyperlinking to our Content</strong></h5>
                      <p>The following organizations may link to our Website without prior written approval:</p>
                      <ul>
                        <li>Government agencies;</li>
                        <li>Search engines;</li>
                        <li>News organizations;</li>
                        <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                        <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                      </ul>
                      <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the
                        linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>
                      <p>We may consider and approve other link requests from the following types of organizations:</p>
                      <ul>
                        <li>commonly-known consumer and/or business information sources;</li>
                        <li>dot.com community sites;</li>
                        <li>associations or other groups representing charities;</li>
                        <li>online directory distributors;</li>
                        <li>internet portals;</li>
                        <li>accounting, law and consulting firms; and</li>
                        <li>educational institutions and trade associations.</li>
                      </ul>
                      <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records
                        with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of MoodDrivenTravel; and (d) the link is in the context of general resource information.</p>
                      <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c)
                        fits within the context of the linking party’s site.</p>
                      <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to MoodDrivenTravel. Please include your name, your organization name,
                        contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
                      <p>Approved organizations may hyperlink to our Website as follows:</p>
                      <ul>
                        <li>By use of our corporate name; or</li>
                        <li>By use of the uniform resource locator being linked to; or</li>
                        <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
                      </ul>
                      <p>No use of MoodDrivenTravel's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
                      <h5><strong>iFrames</strong></h5>
                      <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
                      <h5><strong>Content Liability</strong></h5>
                      <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be
                        interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
                      <h5><strong>Your Privacy</strong></h5>
                      <p>Please read Privacy Policy</p>
                      <h5><strong>Reservation of Rights</strong></h5>
                      <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and
                        conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
                      <h5><strong>Removal of links from our website</strong></h5>
                      <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you
                        directly.</p>
                      <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up
                        to date.</p>
                      <h5><strong>Disclaimer</strong></h5>
                      <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
                      <ul>
                        <li>limit or exclude our or your liability for death or personal injury;</li>
                        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                      </ul>
                      <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including
                        liabilities arising in contract, in tort and for breach of statutory duty.</p>
                      <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn primary-btn unfilled" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <button type="button" class="btn btn-link" data-toggle="modal" data-target="#privacyPolicyModal">
                Privacy Policy
              </button>
              <div class="modal fade" id="privacyPolicyModal" tabindex="-1" role="dialog" aria-labelledby="privacyPolicyModalTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="privacyPolicyModalTitle">Privacy Policy</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>Effective date: June 17, 2019</p>
                      <p>MoodDrivenTravel ("us", "we", or "our") operates the www.mooddriventravel.ro website (the "Service").</p>
                      <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for MoodDrivenTravel is
                        created with the help of the <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator.php">Free Privacy Policy Generator</a>.</p>
                      <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in
                        this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from www.mooddriventravel.ro</p>
                      <h5><strong>Information Collection And Use</strong></h5>
                      <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                      <h4><strong>Types of Data Collected</strong></h4>
                      <h5><strong>Personal Data</strong></h5>
                      <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is
                        not limited to:</p>
                      <ul>
                        <li>Email address</li>
                        <li>First name and last name</li>
                        <li>Cookies and Usage Data</li>
                      </ul>
                      <h5><strong>Usage Data</strong></h5>
                      <p>We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version,
                        the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                      <h5><strong>Tracking & Cookies Data</strong></h5>
                      <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                      <p>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and
                        scripts to collect and track information and to improve and analyze our Service.</p>
                      <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                      <p>Examples of Cookies we use:</p>
                      <ul>
                        <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
                        <li><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
                        <li><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
                      </ul>
                      <h5><strong>Use of Data</strong></h5>
                      <p>MoodDrivenTravel uses the collected data for various purposes:</p>
                      <ul>
                        <li>To provide and maintain the Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                        <li>To provide customer care and support</li>
                        <li>To provide analysis or valuable information so that we can improve the Service</li>
                        <li>To monitor the usage of the Service</li>
                        <li>To detect, prevent and address technical issues</li>
                      </ul>
                      <h5><strong>Transfer Of Data</strong></h5>
                      <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ
                        than those from your jurisdiction.</p>
                      <p>If you are located outside Romania and choose to provide information to us, please note that we transfer the data, including Personal Data, to Romania and process it there.</p>
                      <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                      <p>MoodDrivenTravel will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a
                        country unless there are adequate controls in place including the security of your data and other personal information.</p>
                      <h5><strong>Disclosure Of Data</strong></h5>
                      <h4><strong>Legal Requirements</strong></h4>
                      <p>MoodDrivenTravel may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                      <ul>
                        <li>To comply with a legal obligation</li>
                        <li>To protect and defend the rights or property of MoodDrivenTravel</li>
                        <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                        <li>To protect the personal safety of users of the Service or the public</li>
                        <li>To protect against legal liability</li>
                      </ul>
                      <h5><strong>Security Of Data</strong></h5>
                      <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect
                        your Personal Data, we cannot guarantee its absolute security.</p>
                      <h5><strong>Service Providers</strong></h5>
                      <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is
                        used.</p>
                      <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
                      <h5><strong>Links To Other Sites</strong></h5>
                      <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site
                        you visit.</p>
                      <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
                      <h5><strong>Children's Privacy</strong></h5>
                      <p>Our Service does not address anyone under the age of 18 ("Children").</p>
                      <p>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If
                        we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
                      <h5><strong>Changes To This Privacy Policy</strong></h5>
                      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                      <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
                      <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                      <h5><strong>Contact Us</strong></h5>
                      <p>If you have any questions about this Privacy Policy, please contact us:</p>
                      <ul>
                        <li>By phone number: (+40) 723 817 182</li>
                      </ul>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn primary-btn unfilled" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col">
          FOLLOW US
          <ul>
            <li class="social-link">
              <a href="https://www.instagram.com/denisacalin6/" target="_blank">
                <i class="fab fa-instagram pr-2"></i>Instagram
              </a>
            </li>
            <li class="social-link">
              <a href="https://www.facebook.com/calin.stefaniadenisa" target="_blank">
                <i class="fab fa-facebook-square pr-2"></i>Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <span class="col motto pt-3 pb-3">
          Travel in a heart beat
        </span>
        <span class="col copyright pt-3 pb-3">&copy; CalinStefaniaDenisa
        </span>
      </div>
    </div>
  </footer>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.5/js/uikit.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.5/js/uikit-icons.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js"></script>


  <script type="text/javascript" src="../js/scripts.js"></script>
</body>

</html>