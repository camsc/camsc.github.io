import React from "react";
import ReactDOM from "react-dom";
import store from "./stores/textbook.js"

import TextbookSearch from "./components/textbook-search.jsx"

$(document).ready(function() {
    ReactDOM.render(
        <TextbookSearch/>,
        document.getElementById("textbook-search")
    );
    
    store.listenFor(store.actions.SHOW_RESULTS, () => {
        $("#nav-title").text(store.getData("textbook").textbook.title);
    });
});
