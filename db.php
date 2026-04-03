<?php
$host="mysql-repoclase.alwaysdata.net";
$user="repoclase";
$pass="clase1234";
$db="repoclase_juego2d";

$conn = new mysqli($host,$user,$pass,$db);

if($conn->connect_error){
die("Error DB");
}
?>