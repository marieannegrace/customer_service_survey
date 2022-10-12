import { Quiz } from "./quiz.js";
import { Display } from "./Display.js";

let app = new Display() //Pantalla que controla lo que se pinta en web
    //Paso 1.: Mostrar Pantalla de bienvenida
let survey = new Quiz("Encuesta de satisfacción", app);
survey.start();
//Paso 2.: Capturar los datos ingresados por el usuario.

//Paso 3.: Mostrar Primera pregunta de la encuesta

//Paso 4.: Guardar las respuestas hasta la pregunta final

//Paso 5.: Actualizar Contador estadistico.