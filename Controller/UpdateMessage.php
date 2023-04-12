<?php
header('Access-Control-Allow-Origin: *');
include '../Model/DAOMessage.php';
include '../Model/Base/Message.php';
/************************************************************************************************************
Classe Controleur Artist to access DAO
(JQ==>Ajax ==>Controleur==>DAOProduit(Req)==>BDD)
 ************************************************************************************************************/

$Dao =new DAOMessage();

//Si les champs sont bien rempli, on met les valeurs dans les attributs d'un objet métier

$Message = new Message();

$Message->setmsg_green($_POST["Message_vert"]);
$Message->setmsg_orange($_POST["Message_orange"]);
$Message->setmsg_red($_POST["Message_rouge"]);

try{
    $Dao->UpdateMessage($Message);
    echo"Mise à jour des Messages effectués !";
}
catch (Exception $e)
{
    echo $e;
}

?>
<?php
