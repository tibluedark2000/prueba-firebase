import {logEvent } from "firebase/analytics";
import {analytics} from "../../fire";

export const marcarEvento = (evento) =>{
    logEvent(analytics, evento);
}