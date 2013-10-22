/*global google Tabletop*/
/*jslint browser:true*/

var map;

function plot( bundesliga ){

	var lat= bundesliga.latitude;
			
	var longitude= bundesliga.longitude;
		
	var position = new google.maps.LatLng ( lat, longitude );	
			
	new google.maps.Marker({
		position: position,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			fillOpacity: 0.5,
			fillColor: '#00FF00',
			strokeOpacity: 0.8,
			strokeColor: '#00FF',
			strokeWeight: 1.5,
			scale: 6//pixels
		},
		map:map
	});
}

function showInfo(data) {

    var mapOptions = {
		mapTypeControlOptions: { mapTypeIds: [ 'Styled'] },
		center: new google.maps.LatLng( 51.5167, 9.9167 ),
		zoom: 16,
		mapTypeId: 'Styled'
	};

	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	var styledMapType = new google.maps.StyledMapType([], { name: 'bundesliga' });
    map.mapTypes.set('Styled', styledMapType);  
    
    data.PostList.elements.forEach( plot );
}

window.onload = function() {
    var spreadsheet = 'https://docs.google.com/spreadsheet/pub?key=0AhLgoEUzhCg_dEFKOS1kUG5iNDJrc2dSVGg0dWZBekE&output=html';
    Tabletop.init({ key: spreadsheet, callback: showInfo });
};