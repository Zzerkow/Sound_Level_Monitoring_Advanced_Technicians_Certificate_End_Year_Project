<?php

class Paliers
{
    function __construct() {
    }

    protected $Minimum;
    protected $Maximum;

    function getMinimum(){
        return $this->Minimum;
    }

    function getMaximum(){
        return $this->Maximum;
    }

    function setMinimum($Minimum){
        $this->Minimum = $Minimum;
    }

    function setMaximum($Maximum){
        $this->Maximum = $Maximum;
    }
}