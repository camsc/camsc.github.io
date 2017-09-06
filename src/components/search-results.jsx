import React from "react"
import store from "../stores/textbook.js"
import exercises from "../data/exercises.js"
import mathItUp from "../util/math-it-up.js"
import textbooks from "../data/get-textbook-data.js"

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

class _LessonResults extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>{this.props.lesson.title}</h3>
                <p>{this.props.lesson.objective}</p>
                <table className="table table-striped table-responsive">
                    <colgroup>
                        <col className="col-xs-4"/>
                        <col className="col-xs-4"/>
                        <col className="col-xs-4"/>
                    </colgroup>
                    <tbody>
                        {this.props.lesson.standards
                            .map((standard, i) => <_Standard key={i} standard={standard}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class _ChapterResults extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lessons: this.props.lesson != null ? [this.props.lesson.lesson] : []
        };
    }
    componentDidMount() {
        if (!this.state.lessons.length) {
            textbooks.getLessons(this.props.textbookID, this.props.chapterID, (lessons) => {
                this.setState({
                    lessons: lessons
                });
            });
        }
    }
    render() {
        return (
            <div>
                <h2>{this.props.chapter.title}</h2>
                {this.state.lessons.map((lesson, i) =>
                    <_LessonResults
                        key={i}
                        lesson={lesson}
                    />)}
            </div>
        );
    }
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            textbookID: null,
            chapters: []
        };
        
        store.listenFor(store.actions.SHOW_RESULTS, this.showResults.bind(this));
    }
    render() {
        return (
            <div>
                {this.state.chapters.map((chapter, i) =>
                    <_ChapterResults
                        key={i}
                        chapter={chapter}
                        chapterID={chapter.id}
                        textbookID={this.state.textbookID}
                        lesson={store.getData("lesson")}
                    />)}
            </div>
        );
    }
    showResults() {
        this.setState({
            textbookID: store.getData("textbook").id,
            chapters: store.getData("chapter") != null ?
                [store.getData("chapter").chapter] : []
        });
        
        if (store.getData("chapter") == null) {
            textbooks.getChapters(store.getData("textbook").id, (chapters) => {
                this.setState({
                    chapters: chapters
                });
            });
        }
    }
}

export default SearchResults
