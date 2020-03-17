<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

define('ROOT', dirname(__FILE__));
define('FRONT_URL', 'https://ziptrak-configurator.herokuapp.com/');
require_once(ROOT . '/components/Router.php');
require_once(ROOT . '/components/Db.php');

$router = new Router();
$router->run();
