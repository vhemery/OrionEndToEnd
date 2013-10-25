/*global google Tabletop*/
/*jslint browser:true*/

/**
 * Plots information about a single team on a map
 * @param {Object} team A single team from the Bundesliga database
 */
function plot(team){
	var position = new google.maps.LatLng ( team.latitude, team.longitude );	
	var marker = new google.maps.Marker({
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
		title: team.team,
		map: this.map
	});
	
	var contentString = '<div id="content">'+
		'<h1 class="firstHeading">' + team.team + '</h1>'+
		'<p>Web site: <a href="' + team.website + '">' + team.website + '</a>' +
		'</p>' + 
		'</div>';
	var that = this;
	google.maps.event.addListener(marker, 'click', function() {
		that.popup.setContent(contentString);
		that.popup.open(that.map, marker);
	});
}

/**
 * Creates a map and plots data from the provided spreadsheet on the map.
 * @param {Object} data The spreadsheet data object from tabletop.
 */
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
		center: new google.maps.LatLng( 51.5167, 9.9167 ),
		zoom: 5,
		mapTypeId: 'Styled'
	};

	//create and style the map
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);	
	var styledMapType = new google.maps.StyledMapType( styles, { name: 'bundesliga' } );
    map.mapTypes.set('Styled', styledMapType);  
    
    //create popup window that will be used when clicking markers
    var popup = new google.maps.InfoWindow();
    
    //plot each team on the map
    var that = {map: map, popup: popup};
    data.teams.elements.forEach(plot, that);
}

window.onload = function() {
    var spreadsheet = 'https://docs.google.com/spreadsheet/pub?key=0AhLgoEUzhCg_dEFKOS1kUG5iNDJrc2dSVGg0dWZBekE&output=html';
    Tabletop.init({ key: spreadsheet, callback: showInfo });
};