var username;
var password;
var page;

var JSONRouteInfo;
var JSONRoute1;
var JSONRoute2;
var JSONRoute3;

var bypass = false;

function ClickEventLogin() {
	 //window.location.href='html/admin.html';
	 //$("#inner").load("html/admin.html");
	 //page="admin";
	
	
	username = $('#input_username').val();
	password = $('#input_password').val();
	
	$.ajax({
		  type: 'GET',
		  url: "http://localhost:8080/TestApi/api/user/test/admin/admin",     
	      contentType: "application/json",
	      dataType: 'json',
	      success: function(data)
	      {
	    	
			  if(data=="true"){
				  $("#inner").load("html/admin.html");
				  page="admin";
			  }else{
				  $("#inner").load("html/user.html");
				  page="user";
			  } 
	      },
		  error: function(error, exception)
		  {
			  if (error.status === 0) {
	                alert('Could not connect.\n \n Verify Network or check "rootURL".');
	            } else if (error.status == 404) {
	                alert('Requested page not found. [404]');
	            } else if (error.status == 500) {
	                alert('Internal Server Error [500].');
	            } else if (exception === 'parsererror') {
	                alert('Requested JSON parse failed.');
	            } else if (exception === 'timeout') {
	                alert('Time out error.');
	            } else if (exception === 'abort') {
	                alert('Ajax request aborted.');
	            } else {
	                alert('Uncaught Error.\n' + jqXHR.responseText);
	            }
  		  
		  }
	});
	
	
	
	
}

function ClickEventBypassAdmin(){
		JSONRouteInfo = '[{"id": 1,"name": "Skogstur","length": "5.8 km","duration": "1.4 timmar","info": "Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken."},{"id": 2,"name": "Julafton","length": "103 km","duration": "34.4 timmar","info": "jaaa"},{"id": 3,"name": "Bil","length": "1.8 km","duration": "0.4 timmar","info": "ar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken."}]'
		JSONRoute1 ='{"id":1,"places":[{"routeId":1,"position":{"latitude":63.70000,"longitude":20.371056},"name":"Sten","info":"Detta Ã¤r en stor sten"},{"routeId":1,"position":{"latitude":63.68228,"longitude":20.415344},"name":"Bro","info":"Detta Ãr fin bro"}],"listPoss":[{"latitude":63.690308,"longitude":20.36067},{"latitude":63.718483,"longitude":20.458431},{"latitude":63.730262,"longitude":20.387192},{"latitude":63.710957,"longitude":20.343761},{"latitude":63.685629,"longitude":20.336037}],"name":"Skogstur","info":"Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken.","length":"15 km","duration":"234 timmar"}';
		JSONRoute2 ='{"id":2,"places":[{"routeId":2,"position":{"latitude":63.700083,"longitude":20.371052},"name":"Sten","info":"Detta Ã¤r en stor sten"}],"listPoss":[{"latitude":63.689661,"longitude":20.424271},{"latitude":63.718483,"longitude":20.458431},{"latitude":63.730262,"longitude":20.387192},{"latitude":63.72,"longitude":20.343761},{"latitude":63.685629,"longitude":20.336037}],"name":"Julafton","info":"Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken.","length":"1998 km","duration":"2999 timmar"}';
		JSONRoute3 ='{"id":3,"places":[{"routeId":3,"position":{"latitude":63.690308,"longitude":20.36067},"name":"Sten","info":"Detta Ã¤r en stor sten"},{"routeId":3,"position":{"latitude":63.68228,"longitude":20.415344},"name":"Bro","info":"Detta Ãr fin bro"}],"listPoss":[{"latitude":63.689661,"longitude":20.424271},{"latitude":63.718483,"longitude":20.458431},{"latitude":63.730262,"longitude":20.387192},{"latitude":63.710957,"longitude":20.343761},{"latitude":63.685629,"longitude":20.336037}],"name":"Bil","info":"Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken.","length":"158 km","duration":"24 timmar"}';
		bypass = true		
		page="admin";
		$("#inner").load("html/admin.html");
}

function ClickEventBypassUser(){
		JSONRouteInfo = '[{"id": 1,"name": "Skogstur","length": "5.8 km","duration": "1.4 timmar","info": "Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken."},{"id": 2,"name": "Julafton","length": "103 km","duration": "34.4 timmar","info": "jaaa"},{"id": 3,"name": "Bil","length": "1.8 km","duration": "0.4 timmar","info": "ar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken."}]'
		JSONRoute1 ='{"id":1,"places":[{"routeId":1,"position":{"latitude":63.70000,"longitude":20.371056},"name":"Sten","info":"Detta Ã¤r en stor sten"},{"routeId":1,"position":{"latitude":63.68228,"longitude":20.415344},"name":"Bro","info":"Detta Ãr fin bro"}],"listPoss":[{"latitude":63.690308,"longitude":20.36067},{"latitude":63.718483,"longitude":20.458431},{"latitude":63.730262,"longitude":20.387192},{"latitude":63.710957,"longitude":20.343761},{"latitude":63.685629,"longitude":20.336037}],"name":"Skogstur","info":"Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken.","length":"15 km","duration":"234 timmar"}';
		JSONRoute2 ='{"id":2,"places":[{"routeId":2,"position":{"latitude":63.700083,"longitude":20.371052},"name":"Sten","info":"Detta Ã¤r en stor sten"}],"listPoss":[{"latitude":63.689661,"longitude":20.424271},{"latitude":63.718483,"longitude":20.458431},{"latitude":63.730262,"longitude":20.387192},{"latitude":63.72,"longitude":20.343761},{"latitude":63.685629,"longitude":20.336037}],"name":"Julafton","info":"Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken.","length":"1998 km","duration":"2999 timmar"}';
		JSONRoute3 ='{"id":3,"places":[{"routeId":3,"position":{"latitude":63.690308,"longitude":20.36067},"name":"Sten","info":"Detta Ã¤r en stor sten"},{"routeId":3,"position":{"latitude":63.68228,"longitude":20.415344},"name":"Bro","info":"Detta Ãr fin bro"}],"listPoss":[{"latitude":63.689661,"longitude":20.424271},{"latitude":63.718483,"longitude":20.458431},{"latitude":63.730262,"longitude":20.387192},{"latitude":63.710957,"longitude":20.343761},{"latitude":63.685629,"longitude":20.336037}],"name":"Bil","info":"Midvinternattens köld är hård, stjärnorna gnistra och glimma.Alla sova i enslig gårddjupt under midnattstimma.Månen vandrar sin tysta ban,snön lyser vit på fur och gran,snön lyser vit på taken.Endast tomten är vaken.","length":"158 km","duration":"24 timmar"}';
		bypass = true
		page="user";
		$("#inner").load("html/user.html");
		
	
	
}