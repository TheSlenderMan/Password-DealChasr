$(document).ready(function(){
    $(document).on("focus", "#email", function(){
        var email = $(this);
        if(email.val() == "EMAIL"){
            email.css("color", "#111111");
            email.val("");
        }
    });
    $(document).on("blur", "#email", function(){
        var email = $(this);
        if(email.val() == ""){
            email.css("color", "#9d9d9d");
            email.val("EMAIL");
        }
    });

    $(document).on("focus", "#password-one", function(){
        var email = $(this);
        if(email.val() == "PASSWORD"){
            email.css("color", "#111111");
            email.val("");
        }
    });
    $(document).on("blur", "#password-one", function(){
        var email = $(this);
        if(email.val() == ""){
            email.css("color", "#9d9d9d");
            email.val("PASSWORD");
        }
    });

    $(document).on("focus", "#password-two", function(){
        var email = $(this);
        if(email.val() == "RE-ENTER PASSWORD"){
            email.css("color", "#111111");
            email.val("");
        }
    });
    $(document).on("blur", "#password-two", function(){
        var email = $(this);
        if(email.val() == ""){
            email.css("color", "#9d9d9d");
            email.val("RE-ENTER PASSWORD");
        }
    });

    $(document).on("click", "#reset", function(){
        $.ajax({
            url: "http://api.almanacmedia.co.uk/users/reset",
            type: "POST",
            dataType: "JSON",
            headers: {
                "Authorization": "DS1k1Il68_uPPoD"
            },
            data: {
                "email": $("#email").val()
            },
            success: function(json){
                if(json.reset == 1){
                    $("#email").hide();
                    $("#reset").hide();
                    $(".reset-text").html("GREAT! WE HAVE SENT YOU A LINK TO RESET YOUR PASSWORD.<br /><br />" +
                        "NO EMAIL? MAKE SURE TO CHECK YOUR JUNK FOLDER!");
                } else {
                    console.log(json.message);
                    $(".error-text").html(json.message);
                }
            }, error: function(e){
                console.log(e);
            }
        });
    });

    $(document).on("click", "#reset-password", function(){
        var passwordOne = $("#password-one").val();
        var passwordTwo = $("#password-two").val();

        if(passwordOne == passwordTwo){
            $.ajax({
                url: "http://api.almanacmedia.co.uk/users/updatepassword",
                type: "POST",
                dataType: "JSON",
                headers: {
                    "Authorization": "DS1k1Il68_uPPoD"
                },
                data: {
                    "password": $("#password-one").val(),
                    "email": $("#email-hid").val()
                },
                success: function(json){
                    if(json.updated == 1){
                        $("#password-one").hide();
                        $("#password-two").hide();
                        $("#reset-password").hide();
                        $(".reset-text").html("YOUR PASSWORD HAS BEEN RESET.<br />YOU CAN NOW LOGIN WITH YOUR NEW PASSWORD.");
                    } else {
                        console.log(json.message);
                        $(".error-text").html(json.message);
                    }
                }, error: function(e){
                    console.log(e);
                }
            });
        } else {
            $(".error-text").html("PASSWORDS DO NOT MATCH. PLEASE TRY AGAIN.");
        }

    });
});