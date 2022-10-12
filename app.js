[{
        "type": "conditional",
        "title": "todo bn?",
        "options": { "si": 1, "no": 2 }
    },
    {
        "type": "normal",
        "title": "hola 2",
        "options": { "op1": 1, "op31": 2, "op3": 3 }
    },
    {
        "type": "conditional",
        "title": "hola 3",
        "options": { "op1": 1, "op31": 2, "op3": 3 }
    },
    {
        "type": "conditional",
        "title": "hola 3",
        "options": { "op1": 1, "op31": 2, "op3": 3 }
    },
    {
        "type": "conditional",
        "title": "hola 3",
        "options": { "op1": 1, "op31": 2, "op3": 3 }
    },
    {
        "type": "conditional",
        "title": "hola 3",
        "options": { "op1": 1, "op31": 2, "op3": 3 }
    }



] this.answers.forEach((answer, index) => {
    let elAnswer = document.createElement("li")
    elAnswer.classList.add("awswer")
    elAnswer.textContent = answer
    elAnswer.id = index + 1
    elAnswer.addEventListener("click", this.checkAnswer)
    questionAnswers.append(elAnswer)
})

elQuestionScreen.append(questionAnswers)
}

this.checkAnswer = (event) => {
    let anwserSelected = event.target
    if (this.isCorrectAnswer(anwserSelected.id)) {
        anwserSelected.classList.add('answer--correct')
        quiz.counter++
    } else {
        anwserSelected.classList.add('answer--wrong')
        let elCorrectAnswer = document.getElementById(this.correctAnswer)
        elCorrectAnswer.classList.add('answer--correct')
    }

    setTimeout(function() {
        elQuestionScreen.textContent = ''
        quiz.indexCurrentQuestion++
            quiz.showCurrentQuestion()
    }, 1000)
}
}

let question1 = new Question('What is the only thing that computers understand?', ["Machine Code", "High Level Languages", "Low Level Languages", "Algorithms"], 1)
let question2 = new Question('A list of instructions that enable a computer to perform a specific task is a...', ['Computer Program', 'Machine Code', 'Algorithm', 'Binary Code'], 3)
let question3 = new Question('Before a computer can understand a program it must be...', ['Translated into its machine code', 'Translated into a low level language', 'Translated into a high level language'], 1)
let question4 = new Question('Pregunta 4', ['op1', 'op2'], 1)

let quiz = new Quiz()
quiz.addQuestion(question1)
quiz.addQuestion(question2)
quiz.addQuestion(question3)
quiz.addQuestion(question4)
    // quiz.launch()
    // console.log(quiz)

// // let elCorrectAnswers = document.getElementById("correctAnswers")
// let elCorrectAnswers = document.querySelector("#correctAnswers")
// // console.log(elCorrectAnswers)
// // elCorrectAnswers.textContent = quiz.counter
// elCorrectAnswers.innerHTML = quiz.counter

// let elNumberOfQuestions = document.getElementsByClassName("numberOfQuestions")
let elNumberOfQuestions = document.querySelectorAll(".numberOfQuestions")
    // for (let i=0; i<elNumberOfQuestions.length; i++) {
    //     elNumberOfQuestions[i].textContent = quiz.questions.length
    // }

elNumberOfQuestions.forEach(function(elnumberofquestions) {
    elnumberofquestions.textContent = quiz.questions.length
})

function seeFirstQuestion() {
    let elWelcomeScr = document.getElementById("welcomescreen")
        // elWelcomeScr.style.display = 'none'
    elWelcomeScr.classList.add('hidden')


    elQuestionScreen.style.display = "block"

    quiz.showCurrentQuestion()
}

let elWelcomeBtn = document.getElementById("welcome_btn")
elWelcomeBtn.addEventListener("click", seeFirstQuestion)