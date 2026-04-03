<?php
include "db.php";

$nick=$_POST['nick'];
$pin=$_POST['pin'];

$sql="SELECT * FROM usuarios WHERE nick='$nick' AND pin='$pin'";
$r=$conn->query($sql);

if($r->num_rows>0){
echo "ok";
}else{
echo "error";
}
?>