<?php

$insert = false;
if(isset($_POST['username'])) {
    $server = "localhost";

    $username = "root";

    $password = "";

    $con = mysqli_connect($server, $username, $password);

    if(!$con) {
        die("connection to this database failed due to" . mysqli_connect_error());
    }
    //echo "Success connecting to the db";

    $username = $_POST['username'];
    $email_id = $_POST['email_id'];
    $gender = $_POST['gender'];
    $country = $_POST['country'];
    $sql = "INSERT INTO `wpl`.`register_table` (`ID`, `username`, `email_id`, `gender`, `country`) VALUES (NULL, `$username`, `$email_id`, `$gender`, `$country`);";
    //INSERT INTO `newform` (`Sno`, `name`, `age`, `gender`, `email`, `phone`, `info`, `date`) VALUES ('1', 'umang', '22', 'male', 'nmhiji@gh.com', '68789379348', 'hidh', '2022-03-22'); 
    if ($con->query($sql) === TRUE) {
        $insert = false;
        echo "New record created successfully";
    }
    else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>