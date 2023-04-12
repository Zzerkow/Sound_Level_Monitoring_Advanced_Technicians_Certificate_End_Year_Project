<?php
header('Access-Control-Allow-Origin: *');
include '../Model/DAOPaliers.php';
include '../Model/Base/Paliers.php';
/************************************************************************************************************
Classe Controleur Artist to access DAO
(JQ==>Ajax ==>Controleur==>DAOProduit(Req)==>BDD)
 ************************************************************************************************************/

$Dao =new DAOPaliers();

//Si les champs sont bien rempli, on met les valeurs dans les attributs d'un objet métier

$paliers = new Paliers();

$paliers->setMinimum($_POST["val_min"]);
$paliers->setMaximum($_POST["val_max"]);

try{
    $Dao->UpdateLogiciel($paliers);
    echo"Mise à jour des paliers du son effectués !";
}
catch (Exception $e)
{
    echo $e;
}

?>
