<?php
include "../../api.almanacmedia.co.uk/classes/settings/settings.php";

$conn = new PDO('mysql:dbname=' . DS_DATABASE_NAME . ';host=' . DS_DATABASE_HOST, DS_DATABASE_USERNAME, DS_DATABASE_PASSWORD);

if(isset($_GET['code']) && isset($_GET['email'])){
    if(empty($_GET['code']) || empty($_GET['email'])){
        $error = "SORRY, SOMETHING IS NOT RIGHT HERE. PLEASE TRY AGAIN.<br /><br />IF YOU THINK THIS MESSAGE IS IN ERROR THEN PLEASE CONTACT
                    THETEAM@DEALCHASR.CO.UK - CODE E@12";
    } else {

        $validate = $conn->prepare("SELECT * FROM ds_reset WHERE code = :code AND email = :email AND used = 0");
        $validate->bindParam(":code", $_GET['code']);
        $validate->bindParam(":email", $_GET['email']);
        $validate->execute();

        $result = $validate->fetch();
        if(empty($result)){
            $val = 0;
        } else {
            $inValLink = $conn->prepare("UPDATE ds_reset SET used = 1 WHERE code = :code AND email = :email");
            $inValLink->bindParam(":code", $_GET['code']);
            $inValLink->bindParam(":email", $_GET['email']);
            $inValLink->execute();
            $val = 1;
        }

        if($val){
            $error = "";
        } else {
            $error = "SORRY, SOMETHING IS NOT RIGHT HERE. PLEASE TRY AGAIN.<br /><br />IF YOU THINK THIS MESSAGE IS IN ERROR THEN PLEASE CONTACT
                    THETEAM@DEALCHASR.CO.UK - CODE E@14";
        }
    }
} else {
    $error = "YOU MUST HAVE STUMBLED AMONG THIS PAGE ACCIDENTALLY!";
}
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>DEALCHASR - RESET YOUR PASSWORD</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href="http://password.dealchasr.co.uk/css/common.css" />

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" ></script>
        <script src="http://password.dealchasr.co.uk/js/common.js" type="text/javascript" ></script>
    </head>
    <body>
        <div id="master-container" >
            <div id="header-container" >
                <img src="http://img.almanacmedia.co.uk/dealchasrlogo.png" />
            </div>
            <div id="reset-container" >
                <span class="error-text" ><?php echo $error; ?></span><br />
                <?php
                if($error == "") {
                    ?>
                        <span class="reset-text" >
                            PLEASE ENTER YOUR NEW PASSWORD TWICE BELOW.
                        </span>
                        <input type="hidden" id="email-hid" value="<? echo $_GET['email'] ?>" />
                        <input class="text-input" type="password" name="password-one" id="password-one" value="PASSWORD"/><br/><br/>
                        <input class="text-input" type="password" name="password-two" id="password-two" value="RE-ENTER PASSWORD"/><br/><br/><br/>
                        <input class="reset-button" type="button" name="reset-password" id="reset-password" value="RESET PASSWORD"/>
                    <?
                }
                ?>
            </div>
        </div>
    </body>
</html>