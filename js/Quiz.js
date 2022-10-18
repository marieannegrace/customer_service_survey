import { ConditionalQuestion } from "./ConditionalQuestion.js";
import { Question } from "./Question.js";


export class Quiz {
    title;
    questions = [];

    constructor(title, app) {
        this.app = app;
        this.title = title;
    }

    async loadQuestions(url) {
        let response = await fetch(url);
        let questions = await response.json();
        // this.currentQuestion = 0;
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
                ${this.app.currentQuestion> 0 &&  this.app.currentQuestion < this.app.questions.length ?  
                    `<h2>Pregunta ${+this.app.currentQuestion+1}/${     this.app.questions.length }</h2>`: 
                    `<h1 class="quiz__maintitle">${this.title}</h1>`}
                    
                    <div id="questions"></div>
               
                    <p class="quiz__description">Este Quiz tiene <span class="numberOfQuestions"> ${this.questions.length}</span> preguntas</p>
                  
                </div>
            `;
    } 

    async start(loadUrl){
         
            await this.loadQuestions("https://marieannegrace.github.io/customer_service_survey/assets/encuesta.json")
            await this.app.render(await this.getTemplate(),"quiz" ,()=>{}); 
      
         let question = await this.app.getNextQuestion()
         question?  question.start(): ""; 
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
        this.app.startBtnEvent()
     //   let question = await this.app.getNextQuestion(0)
     //   question.start()
           
    }  

}