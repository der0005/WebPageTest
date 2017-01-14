var JSONRouteInfoObj=[];
var JSONRouteObj=[];

var tempPath = new Array();
var tempPoints = new Array();
var latLngBounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow();
var map;
var rownumber;

var markers; 
var polylines;



/*-------------------------------------------------------------------->
 Defining map
---------------------------------------------------------------------*/
function defineMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 10,
	      center: new google.maps.LatLng(63.707346, 20.425301),
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });
	
	// create map click listener
	if(page=="admin"){
	  google.maps.event.addListener(map, "click", function (e) {
		  if(whataction=="line"){ //check if you want to add a point or line
			  JSONRouteObj[0]["listPoss"].push({"latitude":e.latLng.lat(),"longitude":e.latLng.lng()});
			  tempPath.push(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()))
			  if(tempPath.length>1){
	 			  addLineArray([tempPath[tempPath.length-2],tempPath[tempPath.length-1]]);
	 			  polylines[polylines.length-1].setMap(map); 
			  }
			  
		  }else{
			  JSONRouteObj[0]["places"].push({"routeId":"2","position":{"latitude":e.latLng.lat(),"longitude":e.latLng.lng()},"name":"New Point","info":""}); 	    	
			  addMarkerArray(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));			  			
			  tempPoints.push(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
			  markers[markers.length-1].setMap(map);
			  var indextable = $('#tablepoints tr').length;
			  $('#tablepoints').append( '<tr id = '+indextable+'> <td>'+ 'New Point' +'</td> </tr>' );
			  $('#tablepoints tr').click(getDataPoints);
			  
			
		  }
	  });
	  
	  var temp ='{"id":-1,"places":[{"routeId":"2","position":{"latitude":20,"longitude":20},"name":"New Point","info":""}],"listPoss":[{"latitude":20,"longitude":20}],"name":"","info":"","length":"","duration":""}';
		JSONRouteObj = JSON.parse("[" +temp+ "]");
		alterData();
		markers=[]; 
		polylines=[];
		
		JSONRouteObj[0].places.splice(0,1);
		tempPoints.splice(0,1);
		
		JSONRouteObj[0].listPoss.splice(0,1); //remove from jsonObject (if saved)
		tempPath.splice(0,1);
		polylines.splice(0,1);
		
		if(cityCircle!=null){
			  cityCircle.setMap(null);
		  }
		cityCircle = new google.maps.Circle();
	  
	  
	}
}

function firstSetup() {
	
// Get Information from all routs in Json and create an object.
//-------------------------------------------------------------
	
	$.ajax({
        type: 'GET',
        url: rootURL + '/api/route/info',
        dataType: 'application/json',
        success: function(data){
        	
            $("#tabletrips").empty();
        	JSONRouteInfoObj = JSON.parse(data);
        	$("#tabletrips").empty();
        	for (var i = 0; i <  Object.keys(JSONRouteInfoObj).length; i++) {
        		$('#tabletrips').append( '<tr id = '+i+'> <td>'+ JSONRouteInfoObj[i].name +'</td> <td>'+ JSONRouteInfoObj[i].length +'</td> <td>'+ JSONRouteInfoObj[i].duration +'</td></tr>' );
        	}
        },
		error: function(error){
		  alert("Something went wrong...");
	  
		}
    });
    
	/* test
	$("#tabletrips").empty();
	JSONRouteInfoObj = JSON.parse(JSONRouteInfo);
	for (var i = 0; i <  Object.keys(JSONRouteInfoObj).length; i++) {
		$('#tabletrips').append( '<tr id = '+i+'> <td>'+ JSONRouteInfoObj[i].name +'</td> <td>'+ JSONRouteInfoObj[i].length +'</td> <td>'+ JSONRouteInfoObj[i].duration +'</td></tr>' );
	}	
	*/

	

	
}

/*-------------------------------------------------------------------->
Get All information from a specific route in Json and create an object.
---------------------------------------------------------------------*/
function routePressed(){
	
	// highlight selected row
	var selected = $(this).hasClass('highlight');
	$("#tabletrips tr").removeClass('highlight');
    if(!selected){
        $(this).addClass('highlight');
    }
    
    rownumber =	$(this).attr('id');
    
	
	$.ajax({
		  type: 'GET',
		  url: rootURL + "/api/route/info/" + JSONRouteInfoObj[rownumber].id,     
	      contentType: "application/json",
	      dataType: 'json',
	      success: function(data)
	      {
		    	    JSONRouteObj = JSON.parse("[" +data+ "]");
		    	    alterData();
		    	    setupMap();
	
	      },
		  error: function(error)
		  {
			  alert("Something went wrong...");		  
		  }
	});
		
	/* test
	if(rownumber == "0"){
   		JSONRouteObj = JSON.parse("[" +JSONRoute1+ "]");
   	}else if(rownumber=="1"){
   		JSONRouteObj = JSON.parse("[" +JSONRoute2+ "]");
   	}else{
   		JSONRouteObj = JSON.parse("[" +JSONRoute3+ "]");
   	}
	
	alterData();
	setupMap();
	*/
}

/*-------------------------------------------------------------------->
create Array for Points,Line and size of map.
---------------------------------------------------------------------*/
function alterData() {	   	
	   	tempPath = new Array();
	   	tempPoints = new Array();
	   	latLngBounds = new google.maps.LatLngBounds();
	   	infowindow = new google.maps.InfoWindow();
	   	
	   	
	   	for (var i = 0; i <  Object.keys(JSONRouteObj[0].listPoss).length; i++) {
	   		tempPath.push(new google.maps.LatLng(JSONRouteObj[0].listPoss[i].latitude, JSONRouteObj[0].listPoss[i].longitude));
	   	}
	   	
	   	for (var i = 0; i <  Object.keys(JSONRouteObj[0].places).length; i++) {
	   		tempPoints.push(new google.maps.LatLng(JSONRouteObj[0].places[i].position.latitude, JSONRouteObj[0].places[i].position.longitude));
	   	}
	   	
	   	for (i = 0; i < tempPath.length; i++) {  
	   		latLngBounds.extend(tempPath[i]);
	   	}
	   	
	   	for (i = 0; i < tempPoints.length; i++) {  
	   		latLngBounds.extend(tempPoints[i]);
	   	}   	
	   	
}
/*-------------------------------------------------------------------->
add stuff to map
---------------------------------------------------------------------*/
function setupMap(){
	
	if(polylines!=null){
		for (i = 0; i < polylines.length; i++) { 
	   		polylines[i].setMap(null);
		}
	}
	
	if(markers!=null){
		for (i = 0; i < markers.length; i++) { 
			markers[i].setMap(null);
		}
	}
	
	markers=[]; 
	polylines=[];
	
   	map.fitBounds(latLngBounds);
   	

   	//show route on map
   	
   	
   	for (i = 1; i < tempPath.length; i++) { 
   		addLineArray([tempPath[i-1],tempPath[i]]);	    
	}
   	
   	for (i = 0; i < polylines.length; i++) { 
   		polylines[i].setMap(map); 
	}
   	
    //show positions on map
   	
   	for (i = 0; i < tempPoints.length; i++) { 
   		addMarkerArray(tempPoints[i]);		    
	}
   	
   	for (i = 0; i < markers.length; i++) { 
   		markers[i].setMap(map); 
	}
   	
   	
   	if(page=="user"){
   		showInfoUser();
	}else{
		showInfoAdmin();	
	}
   	  	
}

/*-------------------------------------------------------------------->
show info about a specific route in text
---------------------------------------------------------------------*/

function showInfoUser(){
	<!-- show info route-->
   	var stringDisplay = "Selected Path: <br> <br> Name: " +JSONRouteObj[0].name + " <br> " + " Length: " +JSONRouteObj[0].length + " <br> " +"Duration: " +JSONRouteObj[0].duration + " <br> <br>"+ "Info: <br> " + JSONRouteObj[0].info;
   	$('#innerinner_text_path').html(stringDisplay);
   	
   	
   	<!-- show info point-->
   	for (i = 0; i < markers.length; i++) { 
   		google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
   	        return function() {
   	          infowindow.setContent(JSONRouteObj[0].places[i].name);
   	          infowindow.open(map, markers[i]);
   	          
   	          var stringDisplay = "Interesting points along the path: <br> <br> Name: "+JSONRouteObj[0].places[i].name+" <br> <br> Info: <br>" + JSONRouteObj[0].places[i].info;
   	  	   		$('#innerinner_text_points').html(stringDisplay);
   	        }
   	      })(markers[i], i));
   	
	}
   	
}
   	


/*-------------------------------------------------------------------->
build marker array
---------------------------------------------------------------------*/
function addMarkerArray(poss){
	var marker = new google.maps.Marker({
		position: poss
	});
	
	markers.push(marker);
      
}

/*-------------------------------------------------------------------->
build line array
---------------------------------------------------------------------*/
function addLineArray(path1){
	var polyline = new google.maps.Polyline({
        path: path1,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });   
	
	polylines.push(polyline);
}
