import React from "react";
import Topic from "./Topic.jsx";

export default class Grade extends React.Component {
    render() {
        return <div className="cc-grade">
            <h2
                dangerouslySetInnerHTML={{
                    __html: this.props.grade.name
                }}
            />
            <div className="row">
                {this.props.grade.strands.map(
                    (strand, i) => <Topic topic={strand} key={i}/>
                )}
            </div>
        </div>;
    }
}
