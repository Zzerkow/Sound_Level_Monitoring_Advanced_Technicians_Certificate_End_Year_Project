<?php
header('Access-Control-Allow-Origin: *');
include '../Model/DAOUsers.php';
include '../Model/Base/Users.php';

$Dao =new DAOUsers();
//Si les champs sont bien rempli, on met les valeurs dans les attributs d'un objet métier
$Users = new Users();

/*
$Users->setnom($_POST["Nom"]);
$Users->setprenom($_POST["Prenom"]);
$Users->setidentifiant($_POST["Identifiant"]);
$Users->setauth($_POST["Auth"]);
$Users->setimage($_POST["Image"]);
$Users->setpassword($_POST["Password"]);*/


$Users->setnom($_POST["Nom"]);
$Users->setprenom($_POST["Prenom"]);
$Users->setidentifiant($_POST["Identifiant"]);
$Users->setauth($_POST["Auth"]);
$Users->setimage($_POST["Image"]);
$password = $_POST["Password"];
$Users->setpassword(hash_hmac('sha256',$password, 'uEOZOYfGk2bSWsWJ', false));

try{
    $Dao->AddUsers($Users);
    echo"Users bien ajouté !";
}
catch (Exception $e)
{
    echo $e;
}

?>

