<?php
include 'cible.php';
$conn = OpenCon();
echo "Connected Successfully";
CloseCon($conn);
$nomClasse=$_POST['nomClasse'];

echo $nomClasse;
?>
