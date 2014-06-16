/*global google Tabletop*/
/*jslint browser:true*/

var map;

/**
 * Plots information about a single team on a map
 * @param {Object} team A single team from the database
 */
function plot( team ){
		
	var position = new google.maps.LatLng ( team.latitude, team.longitude);	
			
	new google.maps.Marker({
		position: position,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			fillOpacity: 0.4,
			fillColor: '#FF0000',
			strokeOpacity: 0.6,
			strokeColor: '#FF0000',
			strokeWeight: 2,
			scale: 5//pixels
		},
		map:map
	});
}


function showInfo(data) {
	
	var water = "#30acd2";
	var landscape = "#95d1e1";
	var maplabel = "#ffffff";
	
	var styles = [
	  
	  { "featureType": "landscape", "stylers": [ { "visibility": "simplified" } ] },
	  { "featureType": "water", "stylers": [ { "visibility": "simplified" }, { "color": water } ] },
	  { "featureType": "landscape", "stylers": [ { "color": landscape } ] },
	  { "featureType": "road", "stylers": [ { "visibility": "off" } ] },
	  { "featureType": "poi", "stylers": [ { "visibility": "off" } ] },
	  { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": maplabel }, { "weight": 0.5 } ] },
	  { "featureType": "administrative", "elementType": "labels", "stylers": [ { "color": maplabel }, { "weight": 0.1 } ] },
	  { "featureType": "administrative.province", "stylers": [ { "visibility": "off" } ] }

	];

    var mapOptions = {
		mapTypeControlOptions: { mapTypeIds: [ 'Styled'] },
		center: new google.maps.LatLng( 43.22, 2.36 ),
		zoom: 7,
		mapTypeId: 'Styled'
	};

	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);	
	
	var styledMapType = new google.maps.StyledMapType( styles, { name: 'Elite One Championship' } );
    map.mapTypes.set('Styled', styledMapType);  
    
    data.teams.elements.forEach( plot );
}

window.onload = function() {
   var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0Ah39DYKnfRHedDlxMmpaaVBuU21WVGliTjUyV3YwRkE&usp=sharing&output=html';
    
    //uncomment sheet below for Canadian version
    //var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AnDA54eMM-5ydEJVaGNhaXR3d2RDblJ6ZEdfU3A0UXc&usp=sharing&output=html';
    //uncomment sheet below for German version
    //var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AhLgoEUzhCg_dEFKOS1kUG5iNDJrc2dSVGg0dWZBekE&usp=sharing&output=html';
    
    Tabletop.init({ key: spreadsheet, callback: showInfo });
};