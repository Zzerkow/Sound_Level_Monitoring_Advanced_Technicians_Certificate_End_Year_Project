<?php
header("Access-Control-Allow-Origin:*");

try{

    $test = parse_ini_file('../Config.ini');

    $data = array( 'Lien' => $test['Lien'],
                   'IP_Rasp' => $test['IP'],
                   'Port_Rasp' => $test['Port'],
                   'IP_BDD' => $test['IP_BDD'],
                   'Port_BDD' => $test['Port_BDD'],
                   'dbname' => $test['dbname'],
                   'user' => $test['user'],
                   'password' => $test['password'],
                   'version' => $test['Ver']);

    echo json_encode($data);
}
catch (Exception $e)
{
    echo $e;
}
