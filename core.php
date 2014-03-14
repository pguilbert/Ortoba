<?php

require 'vendor/autoload.php';
require '/Helpers/DbHelper.php';

use \Slim\Slim;
use \Helpers\DbHelper;

$app = new Slim();

$app->get('/team/all', function () {
    $db = DbHelper::getDb();
    $team = $db->query("SELECT * FROM team");
    echo json_encode($team->fetchAll(PDO::FETCH_ASSOC));
});

$app->run();