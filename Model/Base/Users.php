<?php

class Users
{
    function __construct() {
    }

    protected $id;
    protected $prenom;
    protected $nom;
    protected $password;
    protected $auth;
    protected $identifiant;
    protected $image;
    protected $installation_id;

    function getid(){
        return $this->id;
    }

    function getprenom(){
        return $this->prenom;
    }

    function getnom(){
        return $this->nom;
    }

    function getpassword(){
        return $this->password;
    }

    function getauth(){
        return $this->auth;
    }

    function getidentifiant(){
        return $this->identifiant;
    }

    function getimage(){
        return $this->image;
    }

    function getinstallation_id(){
        return $this->installation_id;
    }

    function setid($id){
        $this->id = $id;
    }

    function setprenom($prenom){
        $this->prenom = $prenom;
    }

    function setnom($nom){
        $this->nom = $nom;
    }

    function setpassword($password){
        $this->password = $password;
    }

    function setauth($auth){
        $this->auth = $auth;
    }

    function setidentifiant($identifiant){
        $this->identifiant = $identifiant;
    }

    function setimage($image){
        $this->image = $image;
    }

    function setinstallation_id($installation_id){
        $this->installation_id = $installation_id;
    }
}