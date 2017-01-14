var username;
var password;
var page;

function ClickEventLogin() {
	username = $('#input_username').val();
	password = $('#input_password').val();
	
	$.ajax({
		  type: 'GET',
		  url: rootURL + "/api/user/test/" + username +"/" + password,     
	      contentType: "application/json",
	      dataType: 'json',
	      success: function(data)
	      {
	    	
			  if(data=="true"){
				  window.location.href='html/admin.html';
				  page="admin";
			  }else{
				  window.location.href='html/user.html';
				  page="user";
			  } 
	      },
		  error: function(error)
		  {
			  alert("Something went wrong...");
  		  
		  }
	});
	
	
}