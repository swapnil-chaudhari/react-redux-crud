<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require_once './connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM users order by id desc";
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
    $postData = implode("','", $postData);
    $postData = "'".$postData."'";

    $sql = "INSERT INTO users (e_name, e_email, e_phone, e_department) VALUES ($postData)";
    if(mysqli_query($conn, $sql)){
        echo true;
    } else{
        echo false;
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // sql to delete a record
    $sql = "DELETE FROM users WHERE id=".$_REQUEST['id'];

    if(mysqli_query($conn, $sql)){
        echo true;
    } else{
        echo false;
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $postData = json_decode(file_get_contents('php://input'), true);

    $sql = "UPDATE users SET e_name='" . $postData['e_name'] . "', e_email='" . $postData['e_email'] . "', e_phone='" . $postData['e_phone'] . "', e_department='" . $postData['e_department'] . "' WHERE id=" . $_REQUEST['id'];
    if(mysqli_query($conn, $sql)){
        echo true;
    } else{
        echo false;
    }
}

$conn->close();
?>
