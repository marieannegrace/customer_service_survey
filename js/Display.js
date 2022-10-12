import { User } from "./User.js";
import { Answers } from "./answers.js";
export class Display {
    selectorId; //string for query selector
    users = [];
    currentQuestion = 0;
    answers = new Answers(this);
    constructor(selectorId) {
        this.selectorId = selectorId;
    }

    /**
     * Function that change inner html of display selected element
     * @param {string} template 
     */
    async render(template, selectorId, events) {
        let display = document.getElementById(selectorId);
        display.innerHTML = await template;
        events();

    }

    addUser() {
        const usernameInput = document.getElementById("username");
        this.currentUser = new User(usernameInput.value)
        this.users.push(this.currentUser)
        return this.currentUser;
    }
    setQuestions(questions) {
        this.questions = questions;
    }

    showQuestionScreen = async() => {
        await this.render(survey.getQuestionScreen())
        setQuestionScreenEvents()
    }

    getNextQuestion(currentQuestion) {
        this.currentQuestion = currentQuestion >= 0 ? currentQuestion : ++this.currentQuestion;
        if (this.currentQuestion < this.questions.length) {
            return this.questions[this.currentQuestion];
        } else {
            alert("finalizado")
            this.answers.start();
        }
    }
}