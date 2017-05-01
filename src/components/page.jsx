import React from "react";
import Grade from "./Grade.jsx";

export default class Page extends React.Component {
    render() {
        return <div className="container-fluid">
            {ccMathStructure.map(
                (grade, i) => <Grade grade={grade} key={i}/>
            )}
        </div>;
    }
}
