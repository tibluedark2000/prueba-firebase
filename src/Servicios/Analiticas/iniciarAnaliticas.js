import {logEvent } from "firebase/analytics";
import {analytics} from "../../fire";

export const iniciarAnaliticas = () =>{
    logEvent(analytics, 'Ingreso a pagina');
}