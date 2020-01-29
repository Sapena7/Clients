<?php

namespace App;

use PDO;

class DBConnection
{
    private $host;
    private $dbname;
    private $user;
    private $pass;
    private $connection;


    /**
     * DBConnection constructor.
     */
    public function __construct()
    {
        $json = file_get_contents('config/app.json', true);
        $data = json_decode($json, true);
        $this->user = $data['database']['username'];
        $this->pass = $data['database']['password'];
        $this->connection = $data['database']['connection'];

    }


    /**
     * @return PDO
     */
    public function getConnection():PDO {
        $pdo = new PDO($this->connection,$this->user, $this->pass);
        #Perquè generi excepcions a l'hora de reportar errors.
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$pdo->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, false);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        return $pdo;

    }
}