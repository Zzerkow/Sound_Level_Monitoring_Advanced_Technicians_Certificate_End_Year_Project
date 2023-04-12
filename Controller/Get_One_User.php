<?php
header('Access-Control-Allow-Origin: *');

include '../Model/DAOUsers.php';
include '../Model/Base/Users.php';

$Dao =new DAOUsers();
$User = new Users();

$User->setidentifiant($_POST["Identifiant"]);

/*
$User->setprenom("Leo");
$User->setnom("Filsnoel");*/

$Users = $Dao->GetUser($User);
echo json_encode($Users);

/*var_dump($Client);*/
?>

