<?php
$conn= mysqli_connect('localhost', 'root', 'eric4901', 'lol');

$sql = "SELECT * FROM topic";
$result = mysqli_query($conn, $sql);
$list = '';
while ($row = mysqli_fetch_array($result)){
    $escaped_title = htmlspecialchars($row['title']);
    $list = $list."<li><a href=\"index.php?id={$row['id']}\">{$escaped_title}</a></li>";
}

$article = array(
    'title' => 'Welcome',
    'description' => 'Helloworld'
);

$update_link = '';
if(isset($_GET['id'])){
    $filtered_id = mysqli_real_escape_string($conn, $_GET['id']);
    $sql = "SELECT * FROM topic WHERE id={$filtered_id}";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $article['title'] = htmlspecialchars($row['title']);
    $article['description'] = htmlspecialchars($row['description']);

    $update_link= '<a href="update.php?id='.$_GET['id'].'">update</a>';
}
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
    <form action="process_update.php" method="POST">
        <input type="hidden" name="id" value="<?=$_GET['id']?>">
        <p><input type="text" name="title" placeholder="제목" value="<?=$article['title']?>"></p>
        <p><textarea name="description" placeholder="본문"><?=$article['description']?></textarea></p>
        <p><input type="submit"></p>
    </form>

    
</body>
</html>