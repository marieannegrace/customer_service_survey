import { User } from "./User.js";
import { Answers } from "./Answers.js";
import { Quiz } from "./Quiz.js";
import { Question } from "./Question.js";

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
        this.users = await JSON.parse(localStorage.getItem("users")) || []

        return `
        display
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

        //check if have survey
        let currentUser = localStorage.getItem("currentUser")
        let localQuiz = JSON.parse(localStorage.getItem("quiz"))
        let user = {};
        let questionIndex = 0;
        if (currentUser) {
            let quiz = new Quiz(`Bienvenido nuevamente ${currentUser}`, this)
            Object.entries(quiz).map(([k, v]) => quiz[k] = localQuiz[k]);
            quiz.app = this;
            quiz.title = `Bienvenido nuevamente ${currentUser}`;
            for (const key in quiz.questions) {
                const q = quiz.questions[key];
                const tq = new Question(q.title, q.options, this)
                Object.entries(q).map(([k, v]) => tq[k] = q[k])
                tq.app = this
                quiz.questions[key] = tq;
            }

            this.questions = quiz.questions;
            this.currentUser = new User(currentUser, quiz)
            this.currentQuestion = localStorage.getItem("currentQuestion");
            let q = await this.getNextQuestion(this.currentQuestion)

            //Check if last question has been reched
            q ? q.start() : this.answers.startPersonal();



        }



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
                    //this.users = JSON.parse(localStorage.getItem("users"))
                questionIndex = localStorage.getItem("currentQuestion");
                user.quiz.start(false);
            } else {
                //1.agregar usuario a array de usuarios    
                user = await this.addUser(new Quiz("Su primera encuesta", this));

            }

            this.currentQuestion = questionIndex;
            let question = await this.getNextQuestion(this.currentQuestion)
            question ? question.start() : this.answers.startPersonal();

        } catch (error) {
            console.log(error)
        }


    }

    async addUser(quiz) {
        const usernameInput = document.getElementById("username");
        this.currentUser = new User(usernameInput.value, quiz)
        const user_exist = this.updateLocalUser(this.currentUser)
        if (!user_exist) {
            quiz.title += " de " + this.currentUser.username
            localStorage.setItem("currentQuestion", 0)
            quiz.start(true)

        } else {
            alert("ya realizó la encuesta")
            quiz.start(true)
            this.currentQuestion = 21;
            localStorage.setItem("currentQuestion", 21)
            this.answers.startPersonal();
        }
        localStorage.setItem("currentUser", this.currentUser.username)
        this.answers.startGlobal();

        //return this.currentUser;
    }

    setQuestions(questions) {
        this.questions = questions;
    }

    showQuestionScreen = async() => {
        await this.render(survey.getQuestionScreen())
        setQuestionScreenEvents()
    }

    async updateLocalUser(user) {
        // update or add a user
        let localUsers = await JSON.parse(localStorage.getItem("users")) || []
        let user_exist = false;
        localUsers.map((locaUser, k) => {
            if (user.username == locaUser.username) {
                localUsers[k] = user;
                localUsers[k].quiz.app = this
                user_exist = true;

            }
        })

        if (!user_exist) {
            localUsers.push(user)
        }
        this.users = localUsers;

        await localStorage.setItem("users", JSON.stringify(localUsers, (key, value) => {
            if (key == 'app') {
                return value.id;
            } else {
                return value;
            };
        }))
        return user_exist;

    }
    async getNextQuestion(currentQuestion) {
        this.currentQuestion = currentQuestion >= 0 ? currentQuestion : this.currentQuestion;

        localStorage.setItem("currentQuestion", this.currentQuestion)
        localStorage.setItem("quiz", JSON.stringify(this.currentUser.quiz, (key, value) => {
            if (key == 'app') {
                return value.id;
            } else {
                return value;
            };
        }))

        if (this.currentQuestion < this.questions.length) {
            this.updateLocalUser(this.currentUser)
            return this.questions[this.currentQuestion++];

        } else {
            alert("ÿa finalizo esta encuesta")
            localStorage.removeItem('currentUser');
            localStorage.removeItem('quiz');
            localStorage.removeItem('currentQuestion');

            this.answers.startPersonal();
            return false;

        }

    }
}