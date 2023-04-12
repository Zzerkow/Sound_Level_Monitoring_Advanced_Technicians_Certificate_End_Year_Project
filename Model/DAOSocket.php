<?php
header('Access-Control-Allow-Origin: *');

/************************************************************************************************************
 *                                  Classe Socket
 *                                  FILSNOEL Léo
 ************************************************************************************************************/


class DAOSocket {

    public $socket;
    public $result;

    public function Connect()
    {
        $config = parse_ini_file('../Config.ini');

        $host = $config['IP']; /*172.31.254.90*/
        $port = $config['Port']; /*2011*/
        //Pas de timeout
        set_time_limit(0);

        //Création du socket
        $this->socket = socket_create(AF_INET,SOCK_STREAM, 0) or die("Impossible de créer un socket\n");

        //Connection au serveur
        $result = socket_connect($this->socket, $host, $port) or die("Impossible de se connecter à la Raspberry\n");

    }

    public function SendMesg($message)
    {
        //Envoie un string au serveur
        socket_write($this->socket, $message, strlen($message)) or die("Impossible d'envoyer les données au serveur");
    }

    public function RecMesg()
    {

            $this->result= socket_read($this->socket,6) or die("Impossible de lire la réponse du serveur\n");

        return $this->result;
    }

    function CloseCon()
    {
        //Ferme le socket
        socket_close( $this->socket);
    }
}

?>