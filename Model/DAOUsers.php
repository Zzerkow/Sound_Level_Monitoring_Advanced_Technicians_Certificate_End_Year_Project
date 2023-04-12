<?php
header('Access-Control-Allow-Origin: *');
/*
 * @author Léo FILSNOEL
 */

//Classe d'accès au données faisant partie du modèle.La connexion PDO est encapsulée et initialisée dans le constructeur

include 'ConnectionBDD.php';

class DAOUsers {

    public $con;

    function __construct() {
        $Connection = new ConnectionBDD();
        $Connection->Connecter_BDD();
        $this->con = $Connection->getConn();
    }

    function GetUsers(){
        $sql= "SELECT * FROM utilisateur WHERE installation_id = 1;";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        //var_dump($result);
        return $result;
    }

    function GetUsersby($Users){
        $data = [$id = $Users->getidentifiant().'%'];
        $sql= "SELECT * FROM utilisateur WHERE prenom LIKE '$id' AND installation_id=1;";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        //var_dump($result);
        return $result;
    }

    function GetUser($User){
        $data = ['identifiant' => $User->getidentifiant()];
        $sql= "SELECT * FROM utilisateur WHERE identifiant=:identifiant;";
        $stmt = $this->con->prepare($sql);
        $stmt->execute($data);
        $result_1 = $stmt->fetchAll();
        return $result_1;
    }

    function AddUsers($Users){

        $data = ['Nom' => $Users->getnom(),
            'Prenom' => $Users->getprenom(),
            'Password' => $Users->getpassword(),
            'Identifiant' => $Users->getidentifiant(),
            'Image' => $Users->getimage(),
            'Auth' => $Users->getauth(),
        ];
        $sql = "INSERT INTO utilisateur (id,prenom,nom,password,auth,identifiant,image,installation_id) VALUES(NULL,:Prenom,:Nom,:Password,:Auth,:Identifiant,:Image,'1');";
        $stmt = $this->con->prepare($sql);
        $stmt->execute($data);
    }

    function UpdateUsers($Logiciel){
        $data = ['Prenom' => $Logiciel->getprenom(),
            'Nom' => $Logiciel->getnom(),
            'Password' => $Logiciel->getpassword(),
            'auth' => $Logiciel->getauth(),
            'identifiant' => $Logiciel->getidentifiant(),
            'id' => $Logiciel->getid(),
            'img' => $Logiciel->getimage()];
        $sql = "UPDATE utilisateur SET prenom=:Prenom, nom=:Nom, password=:Password,auth=:auth, identifiant=:identifiant,image=:img WHERE id=:id  AND installation_id = 1;";
        $stmt = $this->con->prepare($sql);
        $stmt->execute($data);
    }

    function DeleteUser($delete_User){
        $data = ['id' => $delete_User,];
        $sql = "DELETE FROM utilisateur WHERE id=:id AND installation_id=1;";
        $stmt = $this->con->prepare($sql);
        $stmt->execute($data);
    }
}