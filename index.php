<?php

$insert = false;
if(isset($_POST['userid'])) {
    $server = "localhost";

    $username = "root";

    $password = "";

    $con = mysqli_connect($server, $username, $password);

    if(!$con) {
        die("connection to this database failed due to" . mysqli_connect_error());
    }
    //echo "Success connecting to the db";

    $userid = $_POST['userid'];
    $pswrd = $_POST['pswrd'];
    $sql = "INSERT INTO `user_login`.`login_table` (`Sr.no.`, `userid`, `pswrd`) VALUES (NULL, '$userid', '$pswrd');";
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