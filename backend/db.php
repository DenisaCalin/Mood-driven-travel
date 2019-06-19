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

create_user('username','user@gmail.com','pas');
// $test=create_user('calindenisa','pass');
// var_dump($test);
