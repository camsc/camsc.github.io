import React from "react";
import events from "../events.js";
import mathItUp from "../util/math-it-up.js";

class Substandard extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return <div className="cc-substandard">
            <button
                className="cc-standard-btn"
                onClick={this.handleClick}
            >
                {this.props.substandard.code}
            </button>
        </div>;
    }
    handleClick() {
        events.emit("show-modal", this.props.substandard.code);
    }
}

export default class Standard extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        let children = [];
        
        if (this.props.standard.children) {
            children = this.props.standard.children.map(
                (substandard, i) => <Substandard substandard={substandard} key={i}/>
            );
        }
        
        return <div className="cc-standard">
            <button
                dangerouslySetInnerHTML={{
                    __html: mathItUp(ccmath[this.props.standard.code].name)
                }}
                className="cc-standard-btn"
                onClick={this.handleClick}
            ></button>
            <div>
                {children}
            </div>
        </div>;
    }
    handleClick() {
        events.emit("show-modal", this.props.standard.code);
    }
}
