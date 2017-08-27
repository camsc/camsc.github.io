import React from "react"
import store from "../stores/textbook.js"

class SearchButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            disabled: true
        };
        
        store.listenFor(store.actions.CHANGE_LESSON, this.handleLessonChange.bind(this));
    }
    render() {
        return (
            <div className="form-group col-12 col-sm-3">
                <button
                    disabled={this.state.disabled}
                    className="btn btn-primary btn-block"
                    onClick={this.handleClick}
                >Search Standards</button>
            </div>
        );
    }
    handleClick() {
        store.dispatch(store.actions.SHOW_RESULTS);
    }
    handleLessonChange() {
        this.setState({disabled: store.getData("lesson") == null})
    }
}

export default SearchButton
