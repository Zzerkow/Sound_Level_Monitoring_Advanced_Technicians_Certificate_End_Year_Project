<?php
header('Access-Control-Allow-Origin: *');
include '../Model/DAOSocket.php';
/************************************************************************************************************
Classe Controleur SEND_COMMAND pour envoyer des demandes de Mesures
BY LEO FILSNOEL
 ************************************************************************************************************/

$Dao =new DAOSocket();


$message = $_POST["test_socket"];

try{

    $Dao->Connect();
    $Dao->sendMesg($message);
    $result =$Dao->RecMesg($message);
    $Dao->CloseCon();
    echo $result;
}
catch (Exception $e)
{
    echo "Error";
}

?>
