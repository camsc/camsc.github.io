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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$( document ).ready(function() {
	$('#myModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget); // Button that triggered the modal
		var modal = $(this);

		var text = ccmath[button.find(".standard-code").text()]["text"] || "";
		var example = ccmath[button.find(".standard-code").text()]["example"] || "";
		var footnote = ccmath[button.find(".standard-code").text()]["footnote"] || "";

		text = text.replace("{footnote}", "<sup><i class='fa fa-paw'></i></sup>");
		footnote = mathItUp(footnote);

		modal.find( ".st-code" ).html(button.find(".standard-code").text().toUpperCase());
		modal.find( ".st-main" ).html(mathItUp(text));
		modal.find( ".st-example" ).html(mathItUp(example));

		if ("" === footnote) {
			modal.find( ".st-footnote" ).html(footnote);
		} else {
			modal.find( ".st-footnote" ).html("<i class='footnote fa fa-paw'></i>" + footnote);
		}

		// khan exercises
		var exerciseList = modal.find(".ka-exercises");
		var exercises = ccMappings[button.find(".standard-code").text()] || [];
		var s = "";
		for (var i=0; i<exercises.length; i++) {
			s += '<li><a href="http://khanacademy.org/exercise/' + exercises[i].slug + '" target="_blank">' + exercises[i].name + '</a></li>';
		}
		exerciseList.html(s);
	});

	$('#videoModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget) // Button that triggered the modal
		var modal = $(this)
		modal.find('.video-title').text(button.attr("title"));
		modal.find('iframe').attr("src", "//www.youtube.com/embed/" + button.data("video"));
	});
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
			standard.click(function(){
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
				var s = standard.find(".standard-code").text();
				window.history.pushState(s, s.toUpperCase(), '?s=' + s);
			});
		}
	});

	var p = getParameterByName("s");
	if (p.length !== 0) {
		var e = $( ".standard[data-code='" + p.replace(".", "-").replace(".", "-") + "']" );
		$('html, body').animate({
	        scrollTop: e.closest( ".grade-level" ).offset().top
	    }, 300);
	    e.trigger( "click" );
	}
});