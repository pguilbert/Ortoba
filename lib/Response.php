<?php
/**
 * Created by PhpStorm.
 * User: Paul
 * Date: 4/19/14
 * Time: 6:18 PM
 */

namespace lib;

use \JsonSerializable;
use \stdClass;

class Response implements JsonSerializable{
    private $status = array();
    private $result = null;
    private $error = false;

    public function addStatusMessage($theStatus){
        if($theStatus->getLevel()=="danger"){
            $this->error = true;
        }
        $this->status[] = $theStatus;
    }

    /**
     * @return boolean
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * @param null $result
     */
    public function setResult($result)
    {
        $this->result = $result;
    }

    public function jsonSerialize() {
        return array("status" => $this->status, "result" => $this->result);
    }
}


class Status implements JsonSerializable{
    private $level = "info";
    private $message = "";

    function __construct($level, $message)
    {
        $this->level = $level;
        $this->message = $message;
    }

    /**
     * @return string
     */
    public function getLevel()
    {
        return $this->level;
    }

    public function jsonSerialize() {
        $obj = new stdClass;
        $obj->level = $this->level;
        $obj->message = $this->message;
        return $obj;
    }
}