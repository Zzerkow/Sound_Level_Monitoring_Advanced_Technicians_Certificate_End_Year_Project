<?php
header('Access-Control-Allow-Origin: *');
/*
 * @author Léo FILSNOEL
 */

//Classe d'accès au données faisant partie du modèle.La connexion PDO est encapsulée et initialisée dans le constructeur

include 'ConnectionBDD.php';

class DAOPaliers {

    public $con;

    function __construct() {
        $Connection = new ConnectionBDD();
        $Connection->Connecter_BDD();
        $this->con = $Connection->getConn();
    }

   function GetPaliers(){
        $sql= "SELECT valeur FROM curseur WHERE type IN ('maximum', 'minimum') AND installation_id = 1";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        //var_dump($result);
        return $result;
    }


    function UpdateLogiciel($Logiciel){
        $data = ['Minimum' => $Logiciel->getMinimum(),
            'Maximum' => $Logiciel->getMaximum()];

        $sql = "UPDATE curseur SET valeur=:Minimum WHERE type ='minimum' AND installation_id = 1; 
                UPDATE curseur SET valeur=:Maximum WHERE type ='maximum' AND installation_id = 1";
        $stmt = $this->con->prepare($sql);
        $stmt->execute($data);
    }
}