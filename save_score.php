<?php
include "db.php";

$nick=$_POST['nick'];
$score=$_POST['score'];

$sql="SELECT highscore FROM usuarios WHERE nick='$nick'";
$r=$conn->query($sql);
$row=$r->fetch_assoc();

if($score > $row['highscore']){
$conn->query("UPDATE usuarios SET highscore=$score WHERE nick='$nick'");
}
?>