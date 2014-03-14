/*global google Tabletop*/
/*jslint browser:true*/


/**
 * Build content information about a single team on a map
 * @param {Object} team A single team from the Bundesliga database
 * 
 */
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

function append( data ){
	
	var container = document.getElementById( 'tables' );	
	var wrapper = document.createElement( 'div' );	
	var content = buildContent( data );	
	wrapper.innerHTML = content;
	
	container.appendChild( wrapper );
}

function showInfo(data) {	
    data.teams.elements.forEach( append );
}

window.onload = function() {
    var spreadsheet = 'https://docs.google.com/spreadsheet/pub?key=0AnDA54eMM-5ydEJVaGNhaXR3d2RDblJ6ZEdfU3A0UXc&output=html';
//    var spreadsheet = 'https://docs.google.com/spreadsheet/pub?key=0AhLgoEUzhCg_dEFKOS1kUG5iNDJrc2dSVGg0dWZBekE&output=html';
    Tabletop.init({ key: spreadsheet, callback: showInfo });
};