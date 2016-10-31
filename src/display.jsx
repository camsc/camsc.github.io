import React from "react";
import ReactDOM from "react-dom";

var MathStandards = React.createClass({
    render: function() {
        var structure = this.props.structure;
        return (
            <div>
        {structure.map(function(grade) {
          return <Grade key={grade.name} grade={grade} />;
        })}
      </div>
        );
    }
});

var Grade = React.createClass({
    render: function() {
        var grade = this.props.grade;
        return (
            <div className="grade-level">
      	<h2 className="grade-name" dangerouslySetInnerHTML={{__html: grade.name}} />
      	<div className="strand-container">
	      	{grade.strands.map(function(strand) {
	          return <Strand key={strand.name} strand={strand} />;
	        })}
        </div>
      </div>
        );
    }
});

var Strand = React.createClass({
    render: function() {
        var strand = this.props.strand;
        return (
            <div className={"strand " + strand.code}>
      	<h2 className="strand-name">{strand.name}&nbsp;{/*this allows for the "hidden strand" in grades 1 and 2*/}</h2>
      	{strand.clusters.map(function(cluster, i) {
          return <Cluster key={i} cluster={cluster} />;
        })}
      </div>
        );
    }
});

var Cluster = React.createClass({
    render: function() {
        var cluster = this.props.cluster;
        return (
            <div className="cluster">
      	<h3 className="cluster-name">{cluster.name}</h3>
      	{cluster.standards.map(function(standard) {
      	  if (standard.children) {
      	  	return (
      	  		<SubCluster key={standard.code} standard={standard} />
      	  		)
      	  } else {
      	  	return <Standard key={standard.code} standard={standard} />;
      	  }
        })}
      </div>
        );
    }
});

var SubCluster = React.createClass({
    render: function() {
        var standard = this.props.standard;
        var innerHtml = "" + mathItUp(standard.name) + "<span class='standard-code'>" + standard.code + "</span>";
        return (
            <div>
        <div
        className="standard parent-standard"
        data-toggle="modal"
        data-target="#myModal"
        data-code={standard.code.replace(/\./, "-").replace(/\./, "-")}
        dangerouslySetInnerHTML={{__html: innerHtml}} />
        <div className="sub-cluster">
      	  {standard.children.map(function(child) {
      	    return <Standard key={child.code} standard={child} />;
          })}
        </div>
      </div>
        );
    }
});

var Standard = React.createClass({
    render: function() {
        var code = this.props.standard.code;
        var innerHtml = "" + mathItUp(ccmath[code].name) + "<span class='standard-code'>" + code + "</span>";
        return (
            <div
        className="standard"
        data-toggle="modal"
        data-target="#myModal"
        data-code={code.replace(/\./, "-").replace(/\./, "-")}
        dangerouslySetInnerHTML={{__html: innerHtml}} />
        );
    }
});

export default MathStandards;
