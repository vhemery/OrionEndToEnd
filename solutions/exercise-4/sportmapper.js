/*global google Tabletop*/
/*jslint browser:true*/

function buildContent( data ){

	var twitterLogo = "	https://abs.twimg.com/a/1382598364/images/resources/twitter-bird-blue-on-white.png";
	
	var contentString = '<table class="table table-bordered">' +
							'<tbody>' +
								'<tr>' + 
									'<th>Team</th>' + 
									'<td><a href="' + data.website + '"</a>' + data.team + '</td>' +
									'<td align="center"><a href="https://twitter.com/' + data.twitter + '"</a><img src=' + twitterLogo + ' alt="Twitter" height="20" width="20"</td>' + 
								'</tr>' +
								'<tr><th>Stadium</th><td colspan="2">' + data.stadium + '</td></tr>' +
								'<tr><th>Capacity</th><td colspan="2">' + data.capacity + '</td></tr>' +
								'<tr><th>Address</th><td colspan="2">' + data.address + '</td></tr>' +
							'</tbody>' +
						'<table>';
	
	return contentString;
}


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
			fillOpacity: 0.7,
			fillColor: team.primarycolor,
			strokeOpacity: 0.9,
			strokeColor: team.secondarycolor,
			strokeWeight: 2,
			scale: 4 + parseInt(team.cups*1.5)  //pixels
		},
		title: team.team,
		map: this.map
	});
	

	var that = this;
	google.maps.event.addListener(marker, 'click', function() {
		that.popup.setContent( buildContent(team) );
		that.popup.open(that.map, marker);
	});
}

/**
 * Creates a map and plots data from the provided spreadsheet on the map.
 * @param {Object} data The spreadsheet data object from tabletop.
 */
function showInfo(data) {
	
	var water = "#228db2";
	var landscape = "#a4bfd1";
	var maplabel = "#41778d";
	
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
		center: new google.maps.LatLng( 42, -96 ),
		zoom: 4,
		mapTypeId: 'Styled'
	};

	//create and style the map
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);	
	var styledMapType = new google.maps.StyledMapType( styles, { name: 'NHL Arenas' } );
    map.mapTypes.set('Styled', styledMapType);  
    
    //create popup window that will be used when clicking markers
    var popup = new google.maps.InfoWindow();
    
    //plot each team on the map
    var that = {map: map, popup: popup};
    data.teams.elements.forEach(plot, that);
}

window.onload = function() {
    var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AnDA54eMM-5ydEJVaGNhaXR3d2RDblJ6ZEdfU3A0UXc&usp=sharing&output=html';
    //uncomment sheet below for German version
//  var spreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=0AhLgoEUzhCg_dEFKOS1kUG5iNDJrc2dSVGg0dWZBekE&usp=sharing&output=html';
    
    Tabletop.init({ key: spreadsheet, callback: showInfo });
};