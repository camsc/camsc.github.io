import React from "react";
import Standard from "./standard.jsx";

class Cluster extends React.Component {
    render() {
        return <div>
            <h4>{this.props.cluster.name}</h4>
            <div>
                {this.props.cluster.standards.map(
                    (standard, i) => <Standard standard={standard} key={i}/>
                )}
            </div>
        </div>;
    }
}

export default class Topic extends React.Component {
    render() {
        return <div className="col-sm-2 cc-topic">
            <h3>{this.props.topic.name}</h3>
            <div>
                {this.props.topic.clusters.map(
                    (cluster, i) => <Cluster cluster={cluster} key={i}/>
                )}
            </div>
        </div>;
    }
}
