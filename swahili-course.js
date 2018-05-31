// Swahili course wrapper file -- swahili-course.js
// Class for encapsulating all client-side functionalities
// By: Sean Miller
// 2018-05-30

export class SwahiliCourse {

    static isLearningSwahili() {
        const learningState = JSON.parse(localStorage.getItem("duo.state"));
        return learningState.user.learningLanguage === "sw";
    }
}