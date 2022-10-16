import { User } from "./User.js";
import { Answers } from "./Answers.js";
import { Quiz } from "./Quiz.js";

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
                <span id="message"></span>
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
        try {
            //check if have survey
            let currentUser = localStorage.getItem("currentUser")
            let user = {};
            let questionIndex = 0;
            if (currentUser) {
                user = this.currentUser = new User(currentUser, new Quiz(`Bienvenido nuevamente ${currentUser}`, this))
                questionIndex = localStorage.getItem("currentQuestion");
            } else {
                //1.agregar usuario a array de usuarios    
                user = await this.addUser(new Quiz("Su primera encuesta", this));
            }
            user.quiz.start();
            let question = this.getNextQuestion(questionIndex)
            question.start()

        } catch (error) {
            console.log(error)
        }


    }

    async addUser(quiz) {
        const usernameInput = document.getElementById("username");
        this.currentUser = new User(usernameInput.value, quiz)
        quiz.title += " de " + this.currentUser.username
        this.users.push(this.currentUser)
            //Add to localStorage
        localStorage.setItem("currentUser", this.currentUser.username)
        localStorage.setItem("questionIndex", 0)

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
        this.currentQuestion = currentQuestion >= 0 ? currentQuestion : this.currentQuestion = +this.currentQuestion + 1;
        if (this.currentQuestion <= this.questions.length) {
            localStorage.setItem("currentQuestion", this.currentQuestion)
            return this.questions[this.currentQuestion];

        } else {
            alert("finalizado")
                //this.answers.startPersonal();
            return false;

        }
    }
}