import { Tavolo } from "./tavolo.interface";

export interface Prenotazione {
    id: number;
    data: Date;
    fasciaPrenotazione: string;
    cliente: string;
    recapitoCliente: string;
    tavolo: Tavolo
}
