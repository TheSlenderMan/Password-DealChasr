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
        resetPassword();
    });

    $(document).on("click", "#reset-password", function(){
		updatePassword();
    });
});

function updatePassword(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	var passwordOne = $("#password-one").val();
	var passwordTwo = $("#password-two").val();

	if(passwordOne == passwordTwo){
		$.ajax({
			url: "http://api.almanacmedia.co.uk/users/updatepassword",
			type: "POST",
			dataType: "JSON",
			headers: {
				"Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": "LOGIN",
				"DSUtoken": "TOKEN"
			},
			data: {
				"password": $("#password-one").val(),
				"email": $("#email-hid").val()
			},
			success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, client, updatePassword);
				} else {
					if(json.updated == 1){
						$("#password-one").hide();
						$("#password-two").hide();
						$("#reset-password").hide();
						$(".reset-text").html("YOUR PASSWORD HAS BEEN RESET.<br />YOU CAN NOW LOGIN WITH YOUR NEW PASSWORD.");
					} else {
						console.log(json.message);
						$(".error-text").html(json.message);
					}
				}
			}, error: function(e){
				console.log(e);
			}
		});
	} else {
		$(".error-text").html("PASSWORDS DO NOT MATCH. PLEASE TRY AGAIN.");
	}
}

function resetPassword(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	$.ajax({
		url: "http://api.almanacmedia.co.uk/users/reset",
		type: "POST",
		dataType: "JSON",
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": "LOGIN",
			"DSUtoken": "TOKEN"
		},
		data: {
			"email": $("#email").val()
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, client, resetPassword);
			} else {
				if(json.reset == 1){
					$("#email").hide();
					$("#reset").hide();
					$(".reset-text").html("GREAT! WE HAVE SENT YOU A LINK TO RESET YOUR PASSWORD.<br /><br />" +
						"NO EMAIL? MAKE SURE TO CHECK YOUR JUNK FOLDER!");
				} else {
					console.log(json.message);
					$(".error-text").html(json.message);
				}
			}
		}, error: function(e){
			console.log(e);
		}
	});
}