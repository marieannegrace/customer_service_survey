import { Question } from "./Question.js"

export class ConditionalQuestion extends Question {

    activator;
    nextQuestionIndex;

    constructor(title, options, app, activator, nextQuestionIndex) {

        super(title, options, app);
        this.activator = activator;
        this.nextQuestionIndex = nextQuestionIndex;
    }

    async getTemplate() {
            return `
        <div id="questionscreen" class="questionscreen">
            
            <h3>${this.title} si opcion es ${this.activator}  salta a ${this.nextQuestionIndex}</h3>
            <ul class="question__awswers">
                ${this.options.map(opt =>  
                    `<li class="awswer" 
                    value="${opt.value}" activator="${this.activator}"  nextQuestionIndex="${this.nextQuestionIndex}"> 
                    ${opt.title} 
                    </li>`
                 ).join('')}
            </ul>  
        </div>
  `;
}
}