import events from "events";

let emitter = new events.EventEmitter();

let data = {
    textbook: null,
    chapter: null,
    lesson: null
};

let actions = {
    CHANGE_TEXTBOOK: 0,
    CHANGE_CHAPTER: 1,
    CHANGE_LESSON: 2,
    SHOW_RESULTS: 3,
};

function handle(action, nData = {}) {
    switch (action) {
        case actions.CHANGE_TEXTBOOK:
            data.textbook = nData;
            break;
        case actions.CHANGE_CHAPTER:
            data.chapter = nData;
            break;
        case actions.CHANGE_LESSON:
            data.lesson = nData;
            break;
    }
}

export default {
    getData(key) {
        return data[key];
    },
    dispatch(action, data) {
        handle(action, data);
        emitter.emit(action);
    },
    listenFor(action, cb) {
        emitter.on(action, cb);
    },
    actions: actions
}
