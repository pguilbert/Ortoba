<?php
/**
 * Created by PhpStorm.
 * User: Paul
 * Date: 3/14/14
 * Time: 11:04 PM
 */

namespace Helpers;

use \PDO;

class DbHelper {
    private static $db;
    public static function getDb(){
        if(DbHelper::$db === null){
            $dsn = 'mysql:host=localhost;dbname=ortoba';
            $username = 'root';
            $passwd = '';
            DbHelper::$db = new PDO( $dsn, $username, $passwd );
        }

        return DbHelper::$db;
    }
} 