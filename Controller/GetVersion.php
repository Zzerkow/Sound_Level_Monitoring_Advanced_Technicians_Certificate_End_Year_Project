<?php
header('Access-Control-Allow-Origin: *');

include '../Model/DAOUsers.php';
include '../Model/Base/Users.php';

$Dao =new DAOUsers();
$Users = new Users();

$Users->setprenom($_POST["Surname_User"]);

$users = $Dao->GetUsers($Users);

echo json_encode($users);

/*var_dump($Client);*/
?>

<?php
