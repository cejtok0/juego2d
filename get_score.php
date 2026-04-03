<?php
include "db.php";

$nick=$_GET['nick'];

$r=$conn->query("SELECT highscore FROM usuarios WHERE nick='$nick'");
$row=$r->fetch_assoc();

echo $row['highscore'];
?>