<?php
include "db.php";

$nick=$_POST['nick'];
$pin=$_POST['pin'];

$sql="INSERT INTO usuarios(nick,pin) VALUES('$nick','$pin')";

if($conn->query($sql)){
echo "Usuario creado";
}else{
echo "Error o usuario existente";
}
?>