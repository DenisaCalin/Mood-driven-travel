<?php
require_once "./idiorm.php";
session_start();
ORM::configure('mysql:host=localhost:3306;dbname=mooddriven');
ORM::configure('username','root');
ORM::configure('password', '');

// ORM::get_db()->exec("DROP TABLE IF EXISTS users;");
// ORM::get_db()->exec(
//   'CREATE TABLE users ('.
//     'id INT PRIMARY KEY AUTO_INCREMENT,' .
//     'name VARCHAR(50) NOT NULL, ' .
//     'email VARCHAR(50) NOT NULL, ' .
//     'password VARCHAR(50), ' .
//     'UNIQUE KEY id(id), ' .
//     'UNIQUE KEY email (email)) '
//   );

// ORM::get_db()->exec("DROP TABLE IF EXISTS moods;");
// ORM::get_db()->exec(
//   'CREATE TABLE moods ('.
//     'id INT PRIMARY KEY AUTO_INCREMENT,' .
//     'bgImg VARCHAR(100) NOT NULL, ' .
//     'mood VARCHAR(20) NOT NULL, ' .
//     'icon VARCHAR(100) NOT NULL, ' .
//     'description VARCHAR(1000) NOT NULL, ' .
//     'UNIQUE KEY id(id), ' .
//     'UNIQUE KEY mood (mood)) '
//   );

// ORM::get_db()->exec("DROP TABLE IF EXISTS ideas;");
// ORM::get_db()->exec(
//   'CREATE TABLE ideas ('.
//     'id INT PRIMARY KEY AUTO_INCREMENT,' .
//     'img VARCHAR(100) NOT NULL, ' .
//     'mood_fk VARCHAR(20) NOT NULL, ' .
//     'destination VARCHAR(50) NOT NULL,' .
//     'title VARCHAR(100) NOT NULL, ' .
//     'shortDescription VARCHAR(5000) NOT NULL, ' .
//     'expectations VARCHAR(5000) NOT NULL, ' .
//     'UNIQUE KEY id(id), ' .
//     'UNIQUE KEY title(title), ' .
//     'FOREIGN KEY (mood_fk) REFERENCES moods(mood))'
//   );

// ORM::get_db()->exec("DROP TABLE IF EXISTS reviews;");
// ORM::get_db()->exec(
//   'CREATE TABLE reviews ('.
//     'id INT PRIMARY KEY AUTO_INCREMENT,' .
//     'review VARCHAR(5000) NOT NULL, ' .
//     'added_date DATE NOT NULL, ' .
//     'title_fk VARCHAR(100) NOT NULL, ' .
//     'user_fk VARCHAR(50) NOT NULL,' .
//     'UNIQUE KEY id(id), ' .
//     'FOREIGN KEY (title_fk) REFERENCES ideas(title),' .
//     'FOREIGN KEY (user_fk) REFERENCES users(email))'
//   );

// ORM::get_db()->exec("DROP TABLE IF EXISTS wishlist;");
// ORM::get_db()->exec(
//   'CREATE TABLE wishlist ('.
//     'id INT PRIMARY KEY AUTO_INCREMENT,' .
//     'title_fk VARCHAR(100) NOT NULL, ' .
//     'user_fk VARCHAR(50) NOT NULL,' .
//     'UNIQUE KEY id(id), ' .
//     'FOREIGN KEY (user_fk) REFERENCES users(email),' .
//     'FOREIGN KEY (title_fk) REFERENCES ideas(title))'
//   );

function create_idea($img, $mood_fk, $destination, $title, $shortDescription, $expectations){
  $response = array(
    'status'=>'success',
    'message'=>''
  );

  if(idea_exists($title)){
    $response['status']='error';
    $response['message']='This idea already exists.';
  }

  if($response['status'] == 'success'){
    $idea = ORM::for_table('ideas')->create();
    $idea->img = $img;
    $idea->mood_fk = $mood_fk;
    $idea->destination = $destination;
    $idea->title = $title;
    $idea->shortDescription = $shortDescription;
    $idea->expectations = $expectations;
    $idea->save();
    $response['message'] = 'Idea has been added.';
  }

  return $response;
}


function idea_exists($idea){
  $idea = ORM::for_table('ideas')->where('title',$idea)->find_one();
  if($idea != null){
    return true;
  } else {
    return false;
  }
}


function create_mood($bgImg, $name, $icon, $description){
  $response = array(
    'status'=>'success',
    'message'=>''
  );

  if(mood_exists($name)){
    $response['status']='error';
    $response['message']='This mood already exists.';
  }

  if($response['status'] == 'success'){
    $mood = ORM::for_table('moods')->create();
    $mood->bgImg = $bgImg;
    $mood->mood = $name;
    $mood->icon = $icon;
    $mood->description = $description;
    $mood->save();
    $response['message'] = 'Mood has been added.';
  }

  return $response;
}

function mood_exists($mood){
  $mood = ORM::for_table('moods')->where('mood',$mood)->find_one();
  if($mood != null){
    return true;
  } else {
    return false;
  }
}

function create_user($name,$email,$password){
  $response = array(
    'status'=>'success',
    'message'=>''
  );

  if(email_exists($email)){
    $response['status']='error';
    $response['message']='This email already exists.';
  }

  if($response['status'] == 'success'){
    $user = ORM::for_table('users')->create();
    $user->name=$name;
    $user->email = $email;
    $user->password = $password;
    $user->save();
    $response['message']='User has been added.';
  }

  return $response;
}

function email_exists($email){
  $user = ORM::for_table('users')->where('email',$email)->find_one();
  if($user != null){
    return true;
  } else {
    return false;
  }
}

// create_user('username','user@gmail.com','pas');
// $test=create_user('calindenisa','pass');
// var_dump($test);

// create_mood('../assets/images/active-mood.jpg', 'Active', '../assets/images/active.svg',"Activities, trips, walks, museums, climbs, downhills, streets, sidewalks, historic buildings, paintings and any other experiences you look for when you're in active mood travel." );
// create_mood('../assets/images/adventure-mood.jpg', 'Adventure', '../assets/images/adventure.svg',"Typically bold, sometimes risk, undertaking. This kind of travel is for people passionate of extreme sensations." );
// create_mood('../assets/images/getaway-mood.jpg', 'Getaway', '../assets/images/getaway.svg',"When you feel caught between work and home you need an escape." );
// create_mood('../assets/images/explore-mood.jpg', 'Explore', '../assets/images/explore.svg',"Everybody travels, but you want to travel “off the beaten track”. Discover." );
// create_mood('../assets/images/relax-mood.jpg', 'Relax', '../assets/images/relax.svg',"When was the last time you spent a quiet moment just doing nothing - just sitting and looking at the sea, or watching the wind blowing the tree limbs, or waves rippling on a pond or children playing in the park?" );
// create_mood('../assets/images/romantic-mood.jpg', 'Romantic', '../assets/images/romantic.svg',"What we find in a soulmate is not something wild to tame, but something wild to run with." );

create_idea('../assets/images/active-mood.jpg','Active','','Come to us, guadalajarians', 'By the number of architectural monuments per square kilometer, Rome has long been the undisputed leader. Here you can just wander the streets, turning, wherever you look, get lost, find yourself in strange and interesting places.
We tried to build a route for you, including the main sights of Rome,in such a way that you can go through them all in one day! Immediately make a reservation, you definitely do not have enough time to thoroughly examine and visit each object, but you can put a tick in the personal list “I saw it with my own eyes”!', 'something');
