import { User } from "./User.js";
import { Answers } from "./answers.js";
import { Quiz } from "./quiz.js";

export class Display {
    selectorId; //string for query selector
    users = [];
    currentUser;
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
    async getTemplate() {
        return `
            <div id="welcomescreen" class="welcomescreen">
         
                
                <div id="questions"></div>
                <p>Ingrese su nombre de usuario para iniciar</p>
                <input type="text" name="username" id="username" placeholder="username" />
                <button id="welcome_btn" class="quiz__btn">Iniciar</button>
            </div>
        `;
    }


    async start() {
        await this.render(await this.getTemplate(), "quiz", this.setEvents);
        this.answers.startGlobal();

    }
    setEvents = () => {
        let app = this.app;
        let survey = this.survey;
        //Start Event
        let btn = document.getElementById("welcome_btn");
        btn.addEventListener("click", this.startBtnEvent)

    }
    startBtnEvent = async() => {
        //1.agregar usuario a array de usuarios    
        this.addUser(new Quiz("Encuesta 2", this));
        //2. cargar primera Pregunta
        let question = this.app.getNextQuestion(0)
        question.start()

    }
    addUser(quiz) {
        const usernameInput = document.getElementById("username");
        this.currentUser = new User(usernameInput.value, quiz)
        quiz.title += " de " + this.currentUser.username
        quiz.start();
        this.users.push(this.currentUser)
        this.answers.startGlobal();

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
        if (this.currentQuestion <= this.questions.length) {
            return this.questions[this.currentQuestion];
        } else {
            alert("finalizado")
            this.answers.startPersonal();
        }
    }
}