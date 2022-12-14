<?php
session_start();
// Получаем массив url
$url = explode("/", $_SERVER['REQUEST_URI']);
// for($i = 0; 0 < var_dump($url); $i++){
// 	echo $url[$i];
// };
// переносим код из user в router с помощью require_once
require_once("php/bd.php");
require_once("php/User.php");


// Проверяем url под индексом [1]
if ($url[1] == "game") {
	$content = file_get_contents("pages/game.html");
} else if ($url[1] == "account") {
	$content = file_get_contents("pages/account.html");
} else if ($url[1] == "authorization") {
	$content = file_get_contents("pages/auth.html");
} else if ($url[1] == "register") {
	$content = file_get_contents("pages/reg.html");
} else if ($url[1] == 'addUser') {
	echo User::addUser($_POST["nickname"], $_POST["email"], $_POST["password"]);
} else if ($url[1] == 'authUser') {
	echo User::authUser($_POST["email"], $_POST["password"]);
} else {
	$content = file_get_contents("pages/main.html");
}

// если content не пустой 
if (!empty($content))
require_once("template.php");
