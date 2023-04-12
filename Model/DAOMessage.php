<?php
header('Access-Control-Allow-Origin: *');
/*
 * @author Léo FILSNOEL
 */

//Classe d'accès au données faisant partie du modèle.La connexion PDO est encapsulée et initialisée dans le constructeur

include 'ConnectionBDD.php';

class DAOMessage {

    public $con;

    function __construct() {
        $Connection = new ConnectionBDD();
        $Connection->Connecter_BDD();
        $this->con = $Connection->getConn();
    }

    function GetMessage(){
        $sql= "SELECT alerte FROM message WHERE type IN ('vert', 'orange', 'rouge') AND installation_id = 1";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        //var_dump($result);
        return $result;
    }

    function GetMessageLive(){
        $sql= "SELECT * FROM message WHERE type IN ('vert', 'orange', 'rouge') AND installation_id = 1";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        //var_dump($result);
        return $result;
    }

    function UpdateMessage($Logiciel){
        $data = ['Message_vert' => $Logiciel->getmsg_green(),
            'Message_orange' => $Logiciel->getmsg_orange(),
            'Message_rouge' => $Logiciel->getmsg_red()
        ];

        $sql = "UPDATE message SET alerte=:Message_vert WHERE type ='vert' AND installation_id = 1;
                UPDATE message SET alerte=:Message_orange WHERE type ='orange' AND installation_id = 1;
                UPDATE message SET alerte=:Message_rouge WHERE type ='rouge' AND installation_id = 1;";
        $stmt = $this->con->prepare($sql);
        $stmt->execute($data);
    }
}