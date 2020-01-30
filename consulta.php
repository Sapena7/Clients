<?php

class consulta{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAudi()
    {
        $sql = "SELECT * FROM audi";
        $result = $this->pdo->prepare($sql);

        $result->execute();

        $audi = $result->fetchAll(PDO::FETCH_CLASS);
        return $audi;

    }

    public function getFerrari()
    {
        $sql = "SELECT * FROM ferrari";
        $result = $this->pdo->prepare($sql);

        $result->execute();

        $ferrari = $result->fetchAll(PDO::FETCH_CLASS);

        return $ferrari;
    }

    public function getTesla()
    {
        $sql = "SELECT * FROM tesla";
        $result = $this->pdo->prepare($sql);

        $result->execute();

        $tesla = $result->fetchAll(PDO::FETCH_CLASS);

        return $tesla;
    }

}
$pdo = new PDO ( "mysql:host=localhost;dbname=cotxes;charset=utf8", "jsapena", "jsapena");
$consulta = new consulta($pdo);
$audi = $consulta->getAudi();
$ferrari = $consulta->getFerrari();
$tesla = $consulta->getTesla();
/*$audi = json_encode($audi);
$ferrari = json_encode($ferrari);
$tesla = json_encode($tesla);*/
print_r($audi);
print_r($ferrari);
print_r($tesla);
?>