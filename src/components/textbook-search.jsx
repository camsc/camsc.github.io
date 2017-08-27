import React from "react"
import SearchSelect from "./search-select.jsx"
import SearchButton from "./search-button.jsx"
import SearchResults from "./search-results.jsx"

class TextbookSearch extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <SearchSelect/>
                    <SearchButton/>
                </div>
                <div className="row">
                    <SearchResults/>
                </div>
            </div>
        );
    }
}

export default TextbookSearch
