import { ConditionalQuestion } from "./ConditionalQuestion.js";
import { Question } from "./Question.js";


export class Quiz {
    nQuestions;
    nConditionalQuestions;
    questionIndex;
    title;
    questions = [];

    constructor(title, app) {
        this.app = app;
        this.title = title;
    }

    async loadQuestions(url) {
        let response = await fetch(url);
        let questions = await response.json();
        this.currentQuestion = 0;
        questions.forEach(question => {
            if (question.type == "conditional") {
                this.questions.push(new ConditionalQuestion(question.title, question.options, this.app, question.activator, question.nextQuestionIndex))
            } else {
                this.questions.push(new Question(question.title, question.options, this.app))
            }
        });
        this.app.setQuestions(this.questions);


    }

    async getTemplate() {
            return `
                <div id="welcomescreen" class="welcomescreen">
                ${this.currentQuestion> 0 &&  this.currentQuestion < this.questions.length ?  
                    `<h2>Pregunta ${+this.currentQuestion+1}/${     this.questions.length }</h2>`: 
                    `<h1 class="quiz__maintitle">${this.title}</h1>`}
                    
                    <div id="questions"></div>
                    <p>Ingrese su nombre de usuario para iniciar</p>
                    <input type="text" name="username" id="username" placeholder="username" />
                    <p class="quiz__description">Este Quiz tiene <span class="numberOfQuestions"> ${this.questions.length}</span> preguntas</p>
                  
                </div>
            `;
    } 

    async start(){
        await this.loadQuestions("../assets/encuesta.json")
        await this.app.render(await this.getTemplate(),"questions" ,this.setEvents); 
        let question = this.app.getNextQuestion(0)
        question.start()
        this.app.answers.startGlobal();   
 
    }
    

    setEvents = () => {
        let app = this.app;
        let survey = this.survey;
        //Start Event
        let btn = document.getElementById("welcome_btn");
        btn.addEventListener("click", this.startBtnEvent)

    }
    startBtnEvent = async () =>{
        //1.agregar usuario a array de usuarios    
       // this.app.addUser(new Quiz("Encuesta 2", this.app));
        //2. cargar primera Pregunta
        let question = this.app.getNextQuestion(0)
        question.start()
           
    }  

}