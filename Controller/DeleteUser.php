<?php
header('Access-Control-Allow-Origin: *');
include '../Model/DAOUsers.php';

$Dao =new DAOUsers();

$delete_User = $_POST["id"];


try{
    $Dao->DeleteUser($delete_User);
    echo"User bien supprimé !";
}
catch (Exception $e)
{
    echo $e;
}

?>

