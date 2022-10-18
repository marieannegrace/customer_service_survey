export class Answers {
    results = [];
    constructor(app) {
        this.app = app

    }
    async getPersonalTemplate() {
        return `
        <div id="resultscreen" class="resultscreen">
        <h2 class="quiz__subtitle">Resultados de ${ this.app.currentUser.username}</h2>
        <p class="red"><strong>**Ya finalizó esta encuesta</strong></p>

        ${  this.app.currentUser.quiz.questions.map(q=> q.response? '<p>' + q.title +'<span class="red"> ' + q.response?.title  + '</span></p>':'' ).join("\n ")}
    </div>
      `;
    }
    async getGlobalTemplate() {

            await this.getResult()
            return `
            <div id="resultscreen" class="resultscreen welcomescreen">
            <h2 class="quiz__subtitle">Usuarios</h2>
            ${   
             
                 this.app.users.map(user => 
                     `<ul><p> ${ user.username }</p></ul>  `
                 ).join(" - ")
                 
              }
            </div>

        <div id="resultscreen" class="resultscreen welcomescreen">
        <h2 class="quiz__subtitle">Resultados</h2>
       ${   
        
            this.results.map(result => 
                `<ul><h3> ${ result.title }</h3></ul> 
                    ${result.options.map(opt=> 
                        `<li>${opt.title} : ${opt.value}  </li> `
                        )}`
                    )
            .join("<br>")
         }
    </div>
      `;
    }
    getResult = async () => {
        //get results from local or empty
         
       
        let results = []
        await this.app.questions?.map(async question => {
            let countQ ={"title": question.title,"options":[] } 
            await question.options.map(async opt => {
                let countQopt = {"title":opt.title, "value":0}
                //get localstorage users
                const users = await JSON.parse(localStorage.getItem("users"))
                users
                .map(user => user.quiz.questions
                .map(q => {
                    if(q.response && question.title == q.title){
                        if(q.response.value == opt.value){
                            countQopt.value +=1 
                        }
                    }
                }))
                countQ["options"].push(countQopt) 
             })
             results.push(countQ);
        
        })
        this.results =   results;
       console.log(this.results) 
    }
    async startPersonal() {
        
        await this.app.render(await this.getPersonalTemplate(), "questions", () => []);
        // await this.loadQuestions("../assets/encuesta.json")
    }
    async startGlobal() {
        
      
        await this.app.render(await this.getGlobalTemplate(), "result-screen", () => []);
        // await this.loadQuestions("../assets/encuesta.json")
    }
}