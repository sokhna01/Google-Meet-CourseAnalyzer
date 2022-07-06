<?php
    header("Content-Type: text/plain");
    
    foreach ($_GET['nomMatiere'] as $selectedOption)
        echo $selectedOption."\n"; 
        echo $_POST['nomClasse'];
        ?>