var standardData = [];

$( document ).ready(function() {
	$('#myModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget); // Button that triggered the modal
		var modal = $(this);

		var text = ccmath[button.find(".standard-code").text()].text;
		var footnote = ccmath[button.find(".standard-code").text()].footnote;
		var name = button.text().trim();

		text = text.replace("{footnote}", "<sup><i class='fa fa-paw'></i></sup>");
		name = name.substring(0, name.indexOf("\n"));

		// if (type) {
		// 	modal.find( ".st-type" ).attr("class", "fa " + standardTypes[type].iconClass);
		// 	modal.find( ".st-type" ).attr("title", standardTypes[type].description);
		// } else {
		// 	modal.find( ".st-type" ).attr("class", "");
		// 	modal.find( ".st-type" ).attr("class", "");
		// 	modal.find( ".st-type" ).attr("title", "");
		// }


		modal.find( ".st-code" ).html(button.find(".standard-code").text().toUpperCase());
		modal.find( ".st-main" ).html(text);
		modal.find( ".st-name" ).html(name);

		if ("" === footnote) {
			modal.find( ".st-footnote" ).html(footnote);
		} else {
			modal.find( ".st-footnote" ).html("<i class='footnote fa fa-paw'></i>" + footnote);
		}
	})
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
				} else {
					var name = "" + standard.html();
					name = name.substring(name.indexOf("/i>")+3, name.indexOf("<span"));

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