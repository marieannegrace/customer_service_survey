export class Quiz {
  nQuestion;
  nConditionalQuestion;
  questionIndex;
  title;
  template;

  constructor(title) {
    this.title = title;
    this.template = `
        <div id="welcomescreen" class="welcomescreen">
            <h1 class="quiz__maintitle">Bienvenido a ${this.title}</h1>
            <p class="quiz__description">Este Quiz tiene <span class="numberOfQuestions"> ${this.getNumberOfQuestions()}</span> preguntas</p>
            <button id="welcome_btn" class="quiz__btn">Ok</button>
        </div>
  
    `;
  }
  start() {
    //Obtener el elemento main de la pagina html
    let main = document.getElementById("quiz");
    main.innerHTML = this.template;
  }

  getNumberOfQuestions() {
    return 20;
  }
  getTitle() {
    return this.title;
  }

  agregarPreguntas() {}

  agregarPreguntas() {}
}
