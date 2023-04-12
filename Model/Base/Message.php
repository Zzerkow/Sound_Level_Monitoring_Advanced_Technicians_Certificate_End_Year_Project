<?php

class Message
{
    function __construct() {
    }

    protected $msg_green;
    protected $msg_orange;
    protected $msg_red;

    function getmsg_green(){
        return $this->msg_green;
    }

    function getmsg_orange(){
        return $this->msg_orange;
    }

    function getmsg_red(){
        return $this->msg_red;
    }

    function setmsg_green($msg_green){
        $this->msg_green = $msg_green;
    }

    function setmsg_orange($msg_orange){
        $this->msg_orange = $msg_orange;
    }

    function setmsg_red($msg_red){
        $this->msg_red = $msg_red;
    }
}