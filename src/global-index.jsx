import React from "react";
import ReactDOM from "react-dom";
import Page from "./components/page.jsx";
import events from "./events.js";
import mathItUp from "./util/math-it-up.js";
import exercises from "./data/exercises.js";

$(document).ready(function() {
    ReactDOM.render(
        <Page/>,
        document.getElementById("map-container")
    );
    
    let $modal = $("#myModal");
    let $exercises = $modal.find(".ka-exercises");
    let $exercisesTitle = $modal.find(".exercises-title");
    
    events.on("show-modal", function(code, standard) {
        $exercises.html("");
        $exercisesTitle.css("display", "none");
        
        exercises.skillsForStandard(standard, skills => {
            for (let skill of skills) {
                $exercises.append(
                    $("<li>").append(
                        $("<a>")
                            .text(skill.name)
                            .attr("href", `https://khanacademy.org/e/${skill.slug}`)
                            .attr("target", "_blank")
                    )
                );
            }
            
            if (skills.length) {
                $exercisesTitle.css("display", "block");
            }
        });
        
        $modal.find(".st-code").html(mathItUp(ccmath[code].name));
        $modal.find(".st-main").html(mathItUp(ccmath[code].text));
        $modal.modal();
    });
});
