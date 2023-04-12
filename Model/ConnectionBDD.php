<?php
header('Access-Control-Allow-Origin: *');

//Dans ce fichier PHP, on externalise la connexion PDO à la base de données qui est sur un serveur web


class ConnectionBDD
{
    private $conn;

    function __construct(){

    }

    public function Connecter_BDD(){

        $config = parse_ini_file('../Config.ini');

       /* $host = "127.0.0.1"; // Adresse IP du serveur
        $dbname = "sns_bdd"; // Nom de la base de données
        $user = "root"; // Pour se connecter à la base de données
        $password = " "; // Pour se connecter à la base de données*/

        $host = $config['IP_BDD']; // Adresse IP du serveur
        $dbname = $config['dbname']; // Nom de la base de données
        $user = $config['user']; // Pour se connecter à la base de données
        $password = $config['password']; // Pour se connecter à la base de données
        //$port ="";
        $this->conn = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8', $user, $password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function setConn($conn) {
        $this->conn = $conn;
    }

    public function getConn() {
        return $this->conn;
    }
}

try {
    $Connect =new ConnectionBDD();
    $Connect->Connecter_BDD();
    /*echo "DataBase Connected";*/
}

catch (PDOException $e) {
    echo "ERROR 404: Connection impossible au serveur<br>" . $e->getMessage();
}

?>
