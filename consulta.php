<?php

class consulta{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAudi():array
    {
        $sql = "SELECT * FROM audi";
        $result = $this->pdo->prepare($sql);

        $result->execute();

        $audi = $result->fetchAll(PDO::FETCH_ASSOC);
        return $audi;

    }

    public function getFerrari():array
    {
        $sql = "SELECT * FROM ferrari";
        $result = $this->pdo->prepare($sql);

        $result->execute();

        $ferrari = $result->fetchAll(PDO::FETCH_CLASS);

        return $ferrari;
    }

    public function getTesla():array
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
/*$audi = $consulta->getAudi();
$ferrari = $consulta->getFerrari();
$tesla = $consulta->getTesla();
$audi = json_encode($audi);
$ferrari = json_encode($ferrari);
$tesla = json_encode($tesla);*/

if ($_GET["nom"] == "audi"){
    $audi = $consulta->getAudi();
    $audi = json_encode($audi);
    echo $audi;
}
if ($_GET["nom"] == "ferrari"){
    $ferrari = $consulta->getFerrari();
    $ferrari = json_encode($ferrari);
    echo $ferrari;
}
if ($_GET["nom"] == "tesla"){
    $tesla = $consulta->getTesla();
    $tesla = json_encode($tesla);
    echo $tesla;
}

/*echo($audi);
echo($ferrari);
echo($tesla);*/
?>