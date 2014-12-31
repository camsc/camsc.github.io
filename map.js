var standardData = [];

var mathItUp = function(html) {
	var parts = [];
	while (true) {
		var i = html.indexOf("$");
		if (i == -1) {
			parts.push(html);
			break;
		} else {
			var a = html.substring(0, i);
			var bc = html.substring(i+1);
			if (bc.indexOf("$") == -1) {
				parts.push(html);
				break;
			} else {
				parts.push(a);
				var b = bc.substring(0, bc.indexOf("$"));
				parts.push(katex.renderToString(b));
				var c = bc.substring(bc.indexOf("$")+1);
				html = c;
			}
		}
	}
	var newHtml = "";
	for (var i=0; i<parts.length; i++) {
		newHtml += parts[i];
	}
	return newHtml;
}

$( document ).ready(function() {
	$('#myModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget); // Button that triggered the modal
		var modal = $(this);

		var text = ccmath[button.find(".standard-code").text()]["text"] || "";
		var example = ccmath[button.find(".standard-code").text()]["example"] || "";
		var footnote = ccmath[button.find(".standard-code").text()]["footnote"] || "";
		var type = button.attr("data-type");

		text = text.replace("{footnote}", "<sup><i class='fa fa-paw'></i></sup>");

		if (type) {
			modal.find( ".st-type" ).attr("class", "st-type fa " + standardTypes[type].iconClass);
		} else {
			modal.find( ".st-type" ).attr("class", "st-type fa");
		}

		modal.find( ".st-code" ).html(button.find(".standard-code").text().toUpperCase());
		modal.find( ".st-main" ).html(mathItUp(text));
		modal.find( ".st-example" ).html(mathItUp(example));

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
		standard.html(mathItUp(standard.html()));
		var code = standard.data("code");
		var codeParts = code.split("-");

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