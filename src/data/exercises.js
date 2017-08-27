const URL = "https://cdn.kastatic.org/ka-exercise-screenshots-3/types/problemTypes.json";

let problemTypes = null;

let callbacks = [];

$.getJSON(URL).done(data => {
    problemTypes = data;
    for (let callback of callbacks) {
        callback();
    }
    callbacks = [];
});

export default {
	skillsForStandard: function skillsForStandard(standard, cb = () => {}) {
		if (problemTypes) {
            cb((problemTypes[standard] || {skills: []}).skills.map(pset => ({
    			name: pset.name,
    			slug: pset.slug
    		})));
        } else {
            callbacks.push(skillsForStandard.bind(skillsForStandard, standard, cb));
        }
	}
};
