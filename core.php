<?php

require 'vendor/autoload.php';
require '/Helpers/DbHelper.php';

use \Slim\Slim;
use \Helpers\DbHelper;

$app = new Slim();

$app->get('/team/all', function () {
    $db = DbHelper::getDb();
    $team = $db->query("SELECT * FROM team ORDER BY score DESC");
    echo json_encode($team->fetchAll(PDO::FETCH_ASSOC));
});

$app->post('/team/create', function () {
    $app = Slim::getInstance();
    $request = $app->request();
    $name = $request->post('name');
    $city = $request->post('city');
    $db = DbHelper::getDb();
    $db->query("INSERT INTO team (name, city) VALUES ('".$name."', '".$city."')");
});

$app->run();