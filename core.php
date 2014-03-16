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

$app->get('/match/all', function () {
    $db = DbHelper::getDb();
    $team = $db->query("SELECT meeting.id, team1.name AS teamname1, team2.name AS teamname2, scoreTeam1, scoreTeam2 FROM meeting, team AS team1, team AS team2 WHERE team1.id=teamId1 AND team2.id=teamId2");
    echo json_encode($team->fetchAll(PDO::FETCH_ASSOC));
});

$app->post('/match/create', function () {
    $app = Slim::getInstance();
    $request = $app->request();
    $scoreTeam1 = $request->post('scoreTeam1');
    $scoreTeam2 = $request->post('scoreTeam2');
    $teamId1 = $request->post('teamId1');
    $teamId2 = $request->post('teamId2');
    //echo "INSERT INTO meeting (scoreTeam1, scoreTeam2, teamId1, teamId2) VALUES ('".$scoreTeam1."', '".$scoreTeam2."',  '".$teamId1."', '".$teamId2."')";
    $db = DbHelper::getDb();
    $db->exec("INSERT INTO meeting (scoreTeam1, scoreTeam2, teamId1, teamId2) VALUES ('".$scoreTeam1."', '".$scoreTeam2."',  '".$teamId1."', '".$teamId2."')");

});

$app->run();