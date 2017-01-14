var rownumberPoints;
var rowPointsMarked=false;
var map;
var cityCircle;
var firstTimeTablePoinntClick;
var whataction="line"; <!--om (map listener) skall bli en punkt eller förlänga linjen --->

function showInfoAdmin(){

 	  // add information in input and text box
	  $('#route_name').val(JSONRouteObj[0].name);
	  $('#route_length').val(JSONRouteObj[0].length);
	  $('#route_duration').val(JSONRouteObj[0].duration);
	  $('#route_info').val(JSONRouteObj[0].info);	  
	  $('#point_name').val("");
	  $('#point_info').val("");	  
	  
	
	  // populate table points
	  $("#tablepoints").empty();
	  for (var i = 0; i <  Object.keys(JSONRouteObj[0].places).length; i++) {
		  $('#tablepoints').append( '<tr id = '+i+'> <td>'+ JSONRouteObj[0].places[i].name +'</td> </tr>' );
	  }
	  
	  // add listener for table point element
	  $('#tablepoints tr').click(getDataPoints);
	  
	  
	  
	  // define circle object;
	  if(cityCircle!=null){
		  cityCircle.setMap(null);
	  }
	  cityCircle = new google.maps.Circle();
	  
	  
	  // define that it is the first time table points are clicked (no need to save the data)
	  rowPointsMarked=false;

}

/*-------------------------------------------------------------------->
if point table row are pressed
---------------------------------------------------------------------*/
function getDataPoints(){
	
	var selected = $(this).hasClass('highlight');
	$("#tablepoints tr").removeClass('highlight');
    if(!selected){
        $(this).addClass('highlight');
       
    }
	
	if(rowPointsMarked){
		$('#tablepoints td').eq(rownumberPoints).html($('#point_name').val());
		
		// save info about the point (info could have been changed)
		JSONRouteObj[0].places[rownumberPoints].name=$('#point_name').val();
		JSONRouteObj[0].places[rownumberPoints].info=$('#point_info').val();
		
	}
	rowPointsMarked=true;
	rownumberPoints = $(this).attr('id');
	
	$('#point_name').val(JSONRouteObj[0].places[rownumberPoints].name);
	$('#point_info').val(JSONRouteObj[0].places[rownumberPoints].info);
	
	cityCircle.setMap(null); // remove circle
	
	cityCircle = new google.maps.Circle({
	      strokeColor: '#FF0000',
	      strokeOpacity: 1,
	      strokeWeight: 2,
	      fillOpacity: 0,
	      map: map,
	      center: tempPoints[rownumberPoints],
	      radius: 250
	    });
	
	
	
}

<!-------------------------------------------------------------------->
function clickEventRemoveline(){
	
	
	if(polylines.length>0){		
		polylines[polylines.length-1].setMap(null); // remove from map
		polylines.splice(-1,1); //remove from line list
	}
	if(tempPath.length>0){
		JSONRouteObj[0].listPoss.splice(-1,1); //remove from jsonObject (if saved)
		tempPath.splice(-1,1);
	}
	
	
}
<!-------------------------------------------------------------------->
function clickEventRemovepoint(){
	if(rowPointsMarked){
		
		JSONRouteObj[0].places.splice(rownumberPoints,1);
		markers[rownumberPoints].setMap(null);
		markers.splice(rownumberPoints,1);
		tempPoints.splice(rownumberPoints,1);
			
		$("#tablepoints").empty();
	    for (var i = 0; i <  Object.keys(JSONRouteObj[0].places).length; i++) {
		  $('#tablepoints').append( '<tr id = '+i+'> <td>'+ JSONRouteObj[0].places[i].name +'</td> </tr>' );
	    }
	    $('#tablepoints tr').click(getDataPoints);
		
		$('#point_name').val(" ");
		$('#point_info').val(" ");
		
		cityCircle.setMap(null);

	}
	rowPointsMarked=false;

}

<!-------------------------------------------------------------------->
function clickEventChangePointLine(){
	if (whataction=="line"){
		whataction="point"
			$('#changePointLine').text("Press to change map interaction to EXTEND PATH");
	}else{
		whataction="line"
			$('#changePointLine').text("Press to change map interaction to ADD PONT");
	}
	
}


<!-------------------------------------------------------------------->
function clickEventSaveNew(){
	
	JSONRouteObj[0].name=$('#route_name').val();
	JSONRouteObj[0].info=$('#route_info').val();
	JSONRouteObj[0].length=$('#route_length').val();
	JSONRouteObj[0].duration=$('#route_duration').val();
	if(rowPointsMarked){
		JSONRouteObj[0].places[rownumberPoints].name=$('#point_name').val();
		JSONRouteObj[0].places[rownumberPoints].info=$('#point_info').val();
	}
	alert(JSONRouteObj[0]);
	var postData = JSON.stringify(JSONRouteObj);
	

	$.ajax({
        type: 'POST',
        url: rootURL + "/api/route/" + username +"/" + password,     
	    contentType: "application/json",
        dataType: "json",
        data: postData,
        success: function(data, textStatus, jqXHR){
            alert('Data created successfully');
            buildTable();
            
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error: ' + textStatus);
            buildTable();
            
            
        }
    });

}

<!-------------------------------------------------------------------->
function clickEventDelete(){
	if(JSONRouteObj[0].id!="-1"){
		
		$.ajax({
	        type: 'DELETE',
	        url: rootURL + "/api/route/"+ JSONRouteObj[0].id +"/" + username +"/" + password,     
		    contentType: "application/json",
	        dataType: "json",
	        success: function(data, textStatus, jqXHR){
	            alert('Data deleted successfully');
	            buildTable();
	            
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('error: ' + textStatus);
	            buildTable();
	            
	            
	        }
	    });
	}

}

<!-------------------------------------------------------------------->
function clickEventUpdate(){
	if(JSONRouteObj[0].id!="-1"){
		JSONRouteObj[0].name=$('#route_name').val();
		JSONRouteObj[0].info=$('#route_info').val();
		JSONRouteObj[0].length=$('#route_length').val();
		JSONRouteObj[0].duration=$('#route_duration').val();
		if(first!="true"){
			JSONRouteObj[0].places[rownumberPoints].name=$('#point_name').val();
			JSONRouteObj[0].places[rownumberPoints].info=$('#point_info').val();
		}
		var postData = JSON.stringify(JSONRouteObj);
		
	
		$.ajax({
	        type: 'PUT',
	        url: rootURL + "/api/route/"+ JSONRouteObj[0].id +"/" + username +"/" + password,     
		    contentType: "application/json",
	        dataType: "json",
	        data: postData,
	        success: function(data, textStatus, jqXHR){
	            alert('Data Updated successfully');
	            buildTable();
	            
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('error: ' + textStatus);
	            buildTable();
	            
	            
	        }
	    });
	}else{
		clickEventSaveNew();
	}
}
