<?php
header('Access-Control-Allow-Origin: *');

include '../Model/DAOMessage.php';
include '../Model/Base/Message.php';


$Dao =new DAOMessage();
$Message = $Dao->GetMessageLive();
echo json_encode($Message);

/*var_dump($Client);*/
?>
<?php
