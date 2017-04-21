<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require_once './connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT p.id,p.title,p.description,p.categoryId,c.name FROM posts p INNER JOIN categories c ON p.categoryId=c.id order by p.id desc";
    $result = $conn->query($sql);
    $jsonData = [];

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $jsonData[] = $row;
        }
        echo json_encode($jsonData);
    } else {
        echo "0 results";
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postData = json_decode(file_get_contents('php://input'), true);

    $errorBag = checkValidations($postData);

    if (empty($errorBag)) {
        $postData = implode("','", $postData);
        $postData = "'".$postData."'";

        $sql = "INSERT INTO posts (title, description, categoryId) VALUES ($postData)";

        if(mysqli_query($conn, $sql)){
            $data = array('results' => 'Post is added successfully.');
        } else{
            $data = array('error' => array('connect_error' => 'Server is not available.'));
        }
    } else {
        $data = array('error' => $errorBag);
    }
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // sql to delete a record
    $sql = "DELETE FROM posts WHERE id=".$_REQUEST['id'];

    if(mysqli_query($conn, $sql)){
        echo true;
    } else{
        echo false;
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $postData = json_decode(file_get_contents('php://input'), true);
    $errorBag = checkValidations($postData);
    
    if (empty($errorBag)) {
        $sql = "UPDATE posts SET title='" . $postData['title'] . "', description='" . $postData['description'] . "', categoryId='" . $postData['category'] . "' WHERE id=" . $_REQUEST['id'];
        if(mysqli_query($conn, $sql)){
            $data = array('results' => 'Post is updated successfully.');
        } else{
            $data = array('error' => array('connect_error' => 'Server is not available.'));
        }
    }
    else {
        $data = array('error' => $errorBag);
    }
    echo json_encode($data);
}

function checkValidations($postData){
    $errorBag = [];
    if (empty($postData['title'])) {
        $errorBag['title'] = 'Title is required field.';
    }
    if (empty($postData['description'])) {
        $errorBag['description'] = 'Description is required field.';
    }
    if (empty($postData['category'])) {
        $errorBag['category'] = 'Category is required field.';
    }

    return $errorBag;
}

$conn->close();
?>
