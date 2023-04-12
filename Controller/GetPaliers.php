<?php
header('Access-Control-Allow-Origin: *');

include '../Model/DAOPaliers.php';
include '../Model/Base/Paliers.php';


$Dao =new DAOPaliers();
$Paliers = $Dao->GetPaliers();
echo json_encode($Paliers);

/*var_dump($Client);*/
?>
