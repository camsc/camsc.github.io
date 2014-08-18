var standardData = [];
var svgOverlay;

var showStandard = function(type, name, code, text, footnote) {
	var modal = $( ".st-modal" );

	text = text.replace("{footnote}", "<sup><i class='fa fa-paw'></i></sup>")

	if (type) {
		modal.find( ".st-type" ).attr("class", "fa "+standardTypes[type].iconClass);
		modal.find( ".st-type" ).attr("title", standardTypes[type].description);
	} else {
		modal.find( ".st-type" ).attr("class", "");
		modal.find( ".st-type" ).attr("class", "");
		modal.find( ".st-type" ).attr("title", "");
	}
	modal.find( ".st-code" ).html(code.toUpperCase());
	modal.find( ".st-main" ).html(text);

	modal.find( ".st-name" ).html(name);

	if ("" === footnote) {
		modal.find( ".st-footnote" ).html(footnote);
	} else {
		modal.find( ".st-footnote" ).html("<i class='footnote fa fa-paw'></i>" + footnote);
	}
	
	modal.show();

	// if ( parseInt(standardText.css("bottom")) < 0 ) {
	// 	standardText.animate({
	// 		bottom: "0"
	// 	}, 200);
	// } else {
	// 	standardText.animate({
	// 		bottom: "0"
	// 	}, 200);
	// }
}
var hideStandard = function() {
	$( ".st-modal" ).hide();
};

$( document ).ready(function() {
	$(".st-modal").click(function() {
		hideStandard();
	});
});

$( document ).ready(function() {

	var alphabetString = "abcdefghijklmnopqrstuvwxyz";
	var alphabet = alphabetString.split("");
	$( this ).find(".standard").each( function() {
		var standard = $(this);
		var text = standard.data("code");
		var codeParts = text.split("-");

		var c = codeParts[0] + "." +
			codeParts[1] + ".";

		var ending = codeParts[2];
		if (alphabetString.indexOf(ending.substring(ending.length-1, ending.length)) > -1) {

			var indexInCluster = ending.substring(0, ending.length-1);
			var subClusterLetter = ending.substring(ending.length-1, ending.length);

			c = c + indexInCluster + subClusterLetter;
		} else {;
			c = c + ending;
		}

		if (ccmath[c]) {
			$( this ).click(function(){
				if (standard.hasClass("standard-on")) {
					standard.removeClass("standard-on");
					hideStandard();
				} else {
					var name = "" + standard.html();
					name = name.substring(name.indexOf("/i>")+3, name.indexOf("<span"));

					showStandard(standard.data("type"), name, c, ccmath[c].text, ccmath[c].footnote);
					$( ".standard" ).each( function() {
						$(this).removeClass("standard-on");
					});
					standard.addClass("standard-on");
				}
			});
		}
	});
});

$( document ).ready(function() {

	svgOverlay = $( "#svg-overlay" );

	$( ".standard" ).each( function() {

		var standard = $( this );
		var icon = standard.find(".standard-icon");

		icon.click(function() {
			var classList = icon.attr('class').split(/\s+/);

			$( ".standard" ).each( function() {

				var standard = $( this );
				var icon = standard.find(".standard-icon");

				var classList = icon.attr('class').split(/\s+/);

				$.each( classList, function(index, item){
				    if (item === 'someClass') {
				       //do something
				    }
				});
			});
		});


		// var id = standard.attr('id');
		// var dependenciesString = (standard.data("dependencies") || "");
		// var dependencies = [];
		// if (dependenciesString !== "") {
		// 	dependencies = dependenciesString.split(" ");
		// }

		// if (id && icon.length > 0) {
		// 	if (dependencies.length > 0) {
		// 		standardData.push([standard, dependencies]);
		// 	}

		// 	icon.click(function() {
				
		// 		// clear previous drawings
		// 		svgOverlay.height( $( document ).height() );
		// 		svgOverlay.html("");

		// 		// draw
		// 		doAnimation(standard, dependencies);
		// 	});
		// }
	});
});
var doAnimation = function(standard, dependencies) {
	var startPoint = standard.offset();
	// point 1
	var p1x = startPoint.left+4;
	var p1y = startPoint.top+16;

	$.each(dependencies, function( index, value ) {
		var endPoint = $( document.getElementById(value) ).offset();
		
		// point 2
		var p2x = endPoint.left+4;
		var p2y = endPoint.top+16;
		
		// control point 1
		var cp1x = p1x - 30;
		var cp1y = p1y;

		// control point 2
		var cp2x = p2x - 30;
		var cp2y = p2y;


		var path = '<path d="M' + p1x + ',' + p1y + 
					' C' + cp1x + ',' + cp1y + 
					' ' + cp2x + ',' + cp2y + 
					' ' + p2x + ',' + p2y + 
					'" fill="none" stroke="#222" stroke-width="2" class="path" />'

		var currentHTML = svgOverlay.html();
		svgOverlay.html(currentHTML + path);
	});

	$('svg path').each(function () {
		var path = $( this ).get(0);
		var length = path.getTotalLength();
		// Clear any previous transition
		path.style.transition = path.style.WebkitTransition = 'none';
		// Set up the starting positions
		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		path.getBoundingClientRect();
		// Define our transition
		path.style.transition = path.style.WebkitTransition =
		  'stroke-dashoffset 1.5s ease-in-out';
		// Go!
		path.style.strokeDashoffset = '0';
	});
};


$( document ).ready(function() {
	$.each( standardTypes, function( key, value ) {;
		$("div[data-type='" + key + "']").each( function() {
			var standard = $( this );
			var html = standard.html();
			html = "<i class='standard-icon fa " + value.iconClass + "'></i>" + html;
			standard.html(html);
		});
	});
});

$( document ).ready(function() {
	var currentStandard;
	var standardsByType = {};
	$.each( standardTypes, function( key, value ) {
		standardsByType[key] = $("div[data-type='" + key + "']");
	});
	$.each( standardsByType, function( key, elements ) {
		$.each( elements, function(index, standard) {
			$(standard).find("i").click( function() {
				if ($( standard ).hasClass("icon-on")) {
					elements.removeClass("icon-on");
				} else {
					$.each( standardsByType, function( k, v ) {
						standardsByType[k].removeClass("icon-on");
					});
					elements.addClass("icon-on");
				}
			});
		});
	});
});