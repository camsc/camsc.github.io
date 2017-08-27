import data from "./textbook-test-data.js"

export default {
    getTextbooks(cb) {
        cb(data.textbooks.map(textbook => ({title: textbook.title})));
    },
    getChapters(textbook, cb) {
        cb(data.textbooks[textbook].chapters.map(chapter => ({title: chapter.title})));
    },
    getLessons(textbook, chapter, cb) {
        cb(data.textbooks[textbook].chapters[chapter].lessons);
    }
}
