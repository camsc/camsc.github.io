import React from "react"
import store from "../stores/textbook.js"
import textbooks from "../data/get-textbook-data.js"

const defaultValue = "not a textbook";

let {dispatch, listenFor, actions} = store;

class _Select extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="form-group col-12 col-sm-3">
                <select
                    onChange={this.props.onChange}
                    className="form-control"
                    disabled={!!this.props.disabled}
                    value={this.props.value || defaultValue}
                >
                    <option
                        disabled={this.props.hideDefault}
                        value={defaultValue}
                    >{this.props.defaultText}</option>
                    {this.props.children}
                </select>
            </div>
        );
    }
}

class _TextbookSelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            textbook: null,
            textbooks: []
        };
    }
    componentDidMount() {
        textbooks.getTextbooks((textbooks) => {
            this.setState({textbooks: textbooks});
        });        
    }
    render() {
        return (
            <_Select
                defaultText="Select textbook"
                value={this.state.textbook}
                onChange={this.handleChange.bind(this)}
                hideDefault
            >
                {this.state.textbooks.map((textbook, i) =>
                    <option key={i} value={i}>{textbook.title}</option>)}
            </_Select>
        );
    }
    handleChange(evt) {
        dispatch(actions.CHANGE_LESSON, null);
        dispatch(actions.CHANGE_CHAPTER, null);
        
        if (evt.target.value === defaultValue) {
            dispatch(actions.CHANGE_TEXTBOOK, null);
        } else {
            dispatch(actions.CHANGE_TEXTBOOK, {
                textbook: this.state.textbooks[evt.target.value],
                id: evt.target.value
            });
            this.setState({textbook: store.getData("textbook").id});
        }
    }
}

class _ChapterSelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            disabled: true,
            chapter: null,
            chapters: []
        };
        
        listenFor(actions.CHANGE_TEXTBOOK, this.handleTextbookChange.bind(this));
    }
    render() {
        if (this.state.disabled) {
            return (
                <_Select
                    defaultText="Select chapter"
                    disabled={this.state.disabled}
                    onChange={this.handleChange.bind(this)}
                />
            );
        } else {
            return (
                <_Select
                    defaultText="All chapters"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.chapter}
                >
                    {this.state.chapters.map((chapter, i) =>
                        <option key={i} value={i}>{chapter.title}</option>)}
                </_Select>
            );
        }
    }
    handleChange(evt) {
        if (evt.target.value === defaultValue) {
            dispatch(actions.CHANGE_CHAPTER, null);
        } else {
            dispatch(actions.CHANGE_CHAPTER, {
                chapter: this.state.chapters[evt.target.value],
                id: evt.target.value
            });
            this.setState({chapter: store.getData("chapter").id});
        }
    }
    handleTextbookChange() {
        this.setState({
            disabled: true,
            chapter: null,
            chapters: []
        });
        
        if (store.getData("textbook") != null) {
            textbooks.getChapters(store.getData("textbook").id, (chapters) => {
                this.setState({disabled: false, chapters: chapters})
            });
        }
    }
}

class _LessonSelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            disabled: true,
            lessons: [],
            lesson: null
        };
        
        listenFor(actions.CHANGE_CHAPTER, this.handleChapterChange.bind(this));
    }
    render() {
        if (this.state.disabled) {
            return (
                <_Select
                    defaultText="Select lesson"
                    disabled={this.state.disabled}
                    onChange={this.handleChange.bind(this)}
                />
            );
        } else {
            return (
                <_Select
                    defaultText="All lessons"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.lesson}
                >
                    {this.state.lessons.map((chapter, i) =>
                        <option key={i} value={i}>{chapter.title}</option>)}
                </_Select>
            );
        }
    }
    handleChange(evt) {
        if (evt.target.value === defaultValue) {
            dispatch(actions.CHANGE_LESSON, null);
        } else {
            dispatch(actions.CHANGE_LESSON, {
                lesson: this.state.lessons[evt.target.value],
                id: evt.target.value
            });
            this.setState({lesson: store.getData("lesson").id});
        }
    }
    handleChapterChange() {
        this.setState({
            disabled: true,
            lesson: null,
            lessons: []
        });
        
        if (store.getData("chapter") != null) {
            textbooks.getLessons(store.getData("textbook").id, store.getData("chapter").id,
                lessons => {
                    this.setState({disabled: false, lessons: lessons})
                });
        }
    }
}

class SearchSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <_TextbookSelect/>
                <_ChapterSelect/>
                <_LessonSelect/>
            </div>
        );
    }
    
}

export default SearchSelect
