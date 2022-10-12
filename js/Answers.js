export class Answers {

    constructor(app) {
        this.app = app
    }
    async getTemplate() {
        return `
        <div id="resultscreen" class="resultscreen">
        <h2 class="quiz__subtitle">Resultados</h2>
        <p class="quiz__description">
            <span id="correctAnswers">X</span> correctas de
            <span class="numberOfQuestions">Y</span>
        </p>
    </div>
      `;
    }
    async start() {
        await this.app.render(await this.getTemplate(), "questions", () => {});
        // await this.loadQuestions("../assets/encuesta.json")
    }
}