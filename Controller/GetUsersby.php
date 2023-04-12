<?php
header('Access-Control-Allow-Origin: *');

include '../Model/DAOUsers.php';
include '../Model/Base/Users.php';

$Dao =new DAOUsers();
$Users = new Users();

$Users->setidentifiant($_POST["identifiant"]);

$users = $Dao->GetUsersby($Users);

echo json_encode($users);

/*var_dump($Client);*/
?>

