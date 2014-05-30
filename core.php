<?php

require 'vendor/autoload.php';
require 'Helpers/DbHelper.php';
require 'lib/Response.php';

use \Slim\Slim;
use \Helpers\DbHelper;
use \lib\Response;
use \lib\Status;

$app = new Slim();

$app->get('/teams', function () {
    $response = new Response();

    $db = DbHelper::getDb();
    $team = $db->query("SELECT * FROM team ORDER BY score DESC");
    $response->setResult($team->fetchAll(PDO::FETCH_ASSOC));

    echo json_encode($response);
});

$app->post('/teams', function () {
    $response = new Response();

    $app = Slim::getInstance();
    $request = $app->request();
    $name = $request->post('name');
    $city = $request->post('city');
    $db = DbHelper::getDb();
    $db->query("INSERT INTO team (name, city) VALUES ('".$name."', '".$city."')");

    $response->addStatusMessage(new Status("success", "L'équipe $name ( $city ) a bien été ajoutée"));

    echo json_encode($response);
});

$app->get('/matchs', function () {
    $response = new Response();

    $db = DbHelper::getDb();
    $team = $db->query("SELECT meeting.id, team1.name AS teamname1, team2.name AS teamname2, scoreTeam1, scoreTeam2 FROM meeting, team AS team1, team AS team2 WHERE team1.id=teamId1 AND team2.id=teamId2");

    $response->setResult($team->fetchAll(PDO::FETCH_ASSOC));

    echo json_encode($response);
});

$app->post('/matchs', function () {
    $response = new Response();

    $app = Slim::getInstance();
    $request = $app->request();
    $scoreTeam1 = $request->post('scoreTeam1');
    $scoreTeam2 = $request->post('scoreTeam2');
    $teamId1 = $request->post('teamId1');
    $teamId2 = $request->post('teamId2');
    //echo "INSERT INTO meeting (scoreTeam1, scoreTeam2, teamId1, teamId2) VALUES ('".$scoreTeam1."', '".$scoreTeam2."',  '".$teamId1."', '".$teamId2."')";
    $db = DbHelper::getDb();
    $db->exec("INSERT INTO meeting (scoreTeam1, scoreTeam2, teamId1, teamId2) VALUES ('".$scoreTeam1."', '".$scoreTeam2."',  '".$teamId1."', '".$teamId2."')");

    $response->addStatusMessage(new Status("success", "Match ajouté !"));

    echo json_encode($response);
});

$app->run();