export class Answers {

    constructor(app) {
        this.app = app
    }
    async getPersonalTemplate() {
        return `
        <div id="resultscreen" class="resultscreen">
        <h2 class="quiz__subtitle">Resultados</h2>
       ${  this.app.currentUser.quiz.questions.map(q=> q.response? '<p>' + q.title +' ' + q.response?.title  + '</p>':'' ).join("\n ")}
    </div>
      `;
    }
    async getGlobalTemplate() {
        return `
        <div id="resultscreen" class="resultscreen">
        <h2 class="quiz__subtitle">Resultados</h2>
       ${  this.app.currentUser.quiz.questions.map(q=> q.response? '<p>' + q.title +' ' + q.response?.title  + '</p>':'' ).join("\n ")}
    </div>
      `;
    }
    async startPersonal() {
        await this.app.render(await this.getGlobalTemplate(), "questions", () => []);
        // await this.loadQuestions("../assets/encuesta.json")
    }
}