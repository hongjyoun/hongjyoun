<?php
    file_put_contents('data/'.$_POST['title'], $_POST['description']);
    header('Location: /php/11.php?id='.$_POST['title']);
?>