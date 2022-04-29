<!-- <?php
    $server = "localhost";
    $username = "root";
    $password = "";
    $con = mysqli_connect($server, $username, $password);
    $sql="SELECT * FROM `movie`.`movielist`";
    $res=$con->query($sql);
    $img=array();
    $title=array();
    $id=array();
    while($row = $res->fetch_assoc()){
        array_push($img, $row['Image']);
        array_push($title, $row['Name']);
        array_push($id, $row['Sr no']);
    }
    for ($i = 0; $i < count($img); $i++){
        echo "
        <script type='text/javascript'>
            var table = document.getElementById('list');
            table.innerHTML+='\
            <tr>\
                <td><img src=$img[$i] width=70 height=100></td>\
                <td>$title[$i]</td>\
                <td><button>Edit</button><br>\
                <button id=$id[$i] onclick= myFunction(this.id)>Delete</button></td>\
            </tr>';
        </script>";
    }
?> -->

<?php
    if(isset($_POST['submit'])) {

        //Process the image that is uploaded by the user

        $target_dir = "img/";
        $target_file = $target_dir . basename($_FILES["imageUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

        if (move_uploaded_file($_FILES["imageUpload"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["imageUpload"]["name"]). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }

        $image=basename( $_FILES["imageUpload"]["name"],".jpg"); // used to store the filename in a variable

        //storind the data in your database
        $query= "INSERT INTO `wpl`.`img` (`id`, `image`,) VALUES (NULL,'$image')";
        mysql_query($query);

        // require('heading.php');
        // echo "Your add has been submited, you will be redirected to your account page in 3 seconds....";
        // header( "Refresh:3; url=account.php", true, 303);
    }

?>