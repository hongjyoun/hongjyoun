<?php
    require_once('lib/print.php');
    require_once('view/top.php');
?>


    <a href="create.php">create</a>    
    
    <form action="create_process.php" method="post">
        <p>
            <input type="text" name="title" placeholder="제목을 써주세요">
        </p>
        <p>
            <textarea name="description" placeholder="본문작성해주세요"></textarea>
        </p>
        <p>
            <input type="submit">        
        </p>

    
    </form>
    
    
<?php
    require_once('view/bottom.php');
?>