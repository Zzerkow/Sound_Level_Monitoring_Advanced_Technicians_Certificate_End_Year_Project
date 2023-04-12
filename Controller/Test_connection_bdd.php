<?php
header('Access-Control-Allow-Origin: *');
include('../Model/ConnectionBDD.php');



$config = parse_ini_file('../Config.ini');

$conn = new PDO('mysql:host='.$config['IP_BDD'].';dbname='.$config['dbname'].';charset=utf8', $config['user'], $config['password']);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($conn) {
    $msg = 'Connected';
} else {
    $msg = ' not connected';
}
echo json_encode($msg);
?>
