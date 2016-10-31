import React from "react";
import ReactDOM from "react-dom";
import MathStandards from "./display.jsx";

global.mathItUp = function(html) {
    if (!html) {
        return "";
    }
    var parts = [];
    while (true) {
        var i = html.indexOf("$");
        if (i == -1) {
            parts.push(html);
            break;
        } else {
            var a = html.substring(0, i);
            var bc = html.substring(i + 1);
            if (bc.indexOf("$") == -1) {
                parts.push(html);
                break;
            } else {
                parts.push(a);
                var b = bc.substring(0, bc.indexOf("$"));
                parts.push(katex.renderToString(b));
                var c = bc.substring(bc.indexOf("$") + 1);
                html = c;
            }
        }
    }
    var newHtml = "";
    for (var i = 0; i < parts.length; i++) {
        newHtml += parts[i];
    }
    return newHtml;
}

global.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

global.showModal = function(button, modal) {
    var text = ccmath[button.find(".standard-code").text()]["text"] || "";

    modal.find(".st-code").html(button.find(".standard-code").text().toUpperCase());
    modal.find(".st-main").html(mathItUp(text));

    // darken the standard that was clicked on
    $(".standard").each(function() {
        $(this).removeClass("standard-on");
    });
    button.addClass("standard-on");
};

$(document).ready(function() {
    $('#myModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var modal = $(this);
        showModal(button, modal);
        var s = button.find(".standard-code").text();
        try {
            window.history.pushState(s, s.toUpperCase(), '?s=' + s);
        } catch (e) {

        }
    });
    
    ReactDOM.render(
        <MathStandards structure={ccMathStructure} />,
        document.getElementById('map-container'),
        function() {
            var p = getParameterByName("s").replace(".", "-").replace(".", "-");
            if (p.length !== 0) {
                var standard = $(".standard[data-code='" + p + "']");
                $('html, body').animate({
                    scrollTop: standard.closest(".grade-level").offset().top
                }, 1000, function() {
                    $(".standard").each(function() {
                        $(this).removeClass("standard-on");
                    });
                    standard.addClass("standard-on");
                });
                standard.trigger("click");
            }
        }
    );
});
