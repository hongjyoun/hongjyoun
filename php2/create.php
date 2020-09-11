<?php
$conn= mysqli_connect('localhost', 'root', 'eric4901', 'lol');

$sql = "SELECT * FROM topic";
$result = mysqli_query($conn, $sql);
$list = '';
while ($row = mysqli_fetch_array($result)){
    $escaped_title = htmlspecialchars($row['title']);
    $list = $list."<li><a href=\"index.php?id={$row['id']}\">{$escaped_title}</a></li>";
}

$sql = "SELECT * FROM author";
$result = mysqli_query($conn, $sql);
$select_form = '<select name="author_id">';
while($row=mysqli_fetch_array($result)){
    $select_form .= '<option value="'.$row['id'].'">'.$row['name'].'</option>';
}
$select_form .='</select>';

?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>hello</title>
</head>
<body> 
    <h1><a href="index.php">lists</a></h1>
    <ol>
        <?=$list;?>
    </ol>
    <a href="create.php">create</a>
    <form action="process_create.php" method="POST">
        <p><input type="text" name="title" placeholder="제목"></p>
        <p><textarea name="description" placeholder="본문"></textarea></p>
        <?=$select_form?>
        <p><input type="submit"></p>
    </form>

    
</body>
</html>