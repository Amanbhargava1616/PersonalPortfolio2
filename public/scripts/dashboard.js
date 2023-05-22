$( function () {

	$( ".icon_div" ).click( function () {
		$( ".project_display" ).attr( "src", $( this ).attr( "value" ) );
		$( "#visitProjectAnchorTag" ).attr( "href", $( this ).attr( "value" ) );
	} );
} );
