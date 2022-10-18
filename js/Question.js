import { Option } from "./Option.js"
export class Question {
    title;
    options = [];
    response;
    constructor(title, options, app) {
        this.title = title;
        this.app = app;
        options.map(opt => this.options.push(new Option(opt.title, opt.value)));
    }


    async getTemplate() {
            return `
            <div id="questionscreen" class="questionscreen">

                <h3>${this.title}</h3>
                <span>${this.response?.title}</span>
                <ul class="question__awswers">
                    ${this.options.map(opt =>  
                        `<li class="awswer ${this.response?.value == opt.value?'answer--correct':''}" 
                        value="${opt.value}"> 
                        ${opt.title}
                        </li>`
                     ).join('')}
                </ul>  
            </div>
      `;
    }

    async start(){
        await this.app.render(await this.getTemplate(), "questions", this.questionEvents);    
       // await this.loadQuestions("../assets/encuesta.json")
    }

      questionEvents =  (app = this.app) => {
         
        const btns = document.getElementsByClassName("awswer");
        for (let btn of btns) {
            btn.addEventListener("click", 
              async  (event) => {
                    const optElem =  event.target;
                    const value = optElem.getAttribute("value")
                    const activator = optElem.getAttribute("activator")
                    const nextQuestionIndex = optElem.getAttribute("nextQuestionIndex")
                    this.response = this.options.find(opt => opt.value == value )
                    if (nextQuestionIndex && value == activator) {
                       const question = await app.getNextQuestion(nextQuestionIndex)
                       question.start();
                       // app.render(survey.getQuestionScreen(nextQuestionIndex), "questions", questionScreenEvents)
                    } else {
                        const question = await app.getNextQuestion()
                        question? question.start():"";
                    }
                     app.answers.startGlobal();
                }
            )
        }
    }
     
    
    
}