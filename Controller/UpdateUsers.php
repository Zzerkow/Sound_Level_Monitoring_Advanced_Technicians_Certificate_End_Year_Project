<?php
header('Access-Control-Allow-Origin: *');
include '../Model/DAOUsers.php';
include '../Model/Base/Users.php';
/************************************************************************************************************
Classe Controleur Artist to access DAO
(JQ==>Ajax ==>Controleur==>DAOProduit(Req)==>BDD)
 ************************************************************************************************************/

$Dao =new DAOUsers();

//Si les champs sont bien rempli, on met les valeurs dans les attributs d'un objet métier

$Users = new Users();


$Users->setnom($_POST["Nom"]);
$Users->setprenom($_POST["Prenom"]);
$password = $_POST["Password"];
$Users->setpassword(hash_hmac('sha256',$password, 'uEOZOYfGk2bSWsWJ', false));
$Users->setauth($_POST["Auth"]);
$Users->setidentifiant($_POST["Identifiant"]);
$Users->setimage($_POST["Picture"]);
$Users->setid($_POST["id"]);
/*
$Users->setnom('Rogette');
$Users->setprenom('Delgadeaux');
$Users->setpassword(hash_hmac('sha256', 'bonjour', parse_ini_file("../../view/src/Key.ini")['secret'], false));
$Users->setauth('admin');
$Users->setidentifiant('rogettedelgadeaux');
$Users->setimage('aze21e56');
$Users->setid(19);*/

try{
    $Dao->UpdateUsers($Users);
    echo"Mise à jour du User effectué !";
}
catch (Exception $e)
{
    echo $e;
}

?>
