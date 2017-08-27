import React from "react"
import store from "../stores/textbook.js"
import exercises from "../data/exercises.js"
import mathItUp from "../util/math-it-up.js"

const KA_EXERCISE = "https://khanacademy.org/e"

class _Standard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            exercises: [],
            ccmKey: (this.props.standard
                .slice("Math.CC.".length, this.props.standard.length - 4)
                    + this.props.standard
                        .slice(this.props.standard.length - 2, this.props.standard.length))
                .toLowerCase()
        };
    }
    updateExercises() {
        exercises.skillsForStandard(this.props.standard, exercises => {
            this.setState({exercises: exercises});
        });
    }
    componentWillReceiveProps() {
        this.updateExercises();
    }
    componentWillMount() {
        this.updateExercises();
    }
    render() {
        return (
            <tr>
                <td>
                    <span dangerouslySetInnerHTML={{__html:mathItUp(ccmath[this.state.ccmKey].name)}}/>
                    <br/>
                    <span className="text-muted">{this.props.standard}</span>
                </td>
                <td dangerouslySetInnerHTML={{__html:mathItUp(ccmath[this.state.ccmKey].text)}}/>
                <td>
                    <ul>
                        {this.state.exercises.map((exercise, i) =>
                            <li key={i}>
                                <a
                                    target="_blank"
                                    href={`${KA_EXERCISE}/${exercise.slug}`}
                                >{exercise.name}</a>
                            </li>
                        )}
                    </ul>
                </td>
            </tr>
        );
    }
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lesson: null
        };
        
        store.listenFor(store.actions.SHOW_RESULTS, this.showResults.bind(this));
    }
    render() {
        if (this.state.lesson == null) {
            return <div></div>;
        } else {
            return (
                <div>
                    <h2>{store.getData("chapter").chapter.title}</h2>
                    <h3>{store.getData("lesson").lesson.title}</h3>
                    <p>{store.getData("lesson").lesson.objective}</p>
                    <table className="table table-striped table-responsive">
                        <colgroup>
                            <col className="col-xs-4"/>
                            <col className="col-xs-4"/>
                            <col className="col-xs-4"/>
                        </colgroup>
                        <tbody>
                            {store.getData("lesson").lesson.standards
                                .map((standard, i) => <_Standard key={i} standard={standard}/>)}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    showResults() {
        this.setState({lesson: store.getData("lesson")});
    }
}

export default SearchResults
