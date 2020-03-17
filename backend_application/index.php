<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

define('ROOT', dirname(__FILE__));
define('FRONT_URL', 'http://192.168.1.204:3000/');
require_once(ROOT . '/components/Router.php');
require_once(ROOT . '/components/Db.php');

$router = new Router();
$router->run();
