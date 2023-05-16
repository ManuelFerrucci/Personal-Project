import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Prenotazione } from '../components/interface/prenotazione.interface';
import { Tavolo } from '../components/interface/tavolo.interface';

@Injectable({
    providedIn: 'root'
})
export class InserimentoPrenotazioneService {

    linkInserimentoPrenotazionePOST: string = 'http://localhost:8080/api/inserisci-prenotazione';

    constructor(private httpClient: HttpClient) { }

    inserisciPrenotazione(prenotazione: Prenotazione) {
        return this.httpClient.post(this.linkInserimentoPrenotazionePOST, prenotazione)
            .subscribe()
    }

    prendiTavoliLiberiPerPrenotazione(data: string, fascia: string) {
        let linkTavoliLiberiNellaDataEFascia: string = `http://localhost:8080/api/lista-tavoli-liberi/${data}/${fascia}`;
        return this.httpClient.get<Tavolo[]>(linkTavoliLiberiNellaDataEFascia).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
    }

    getMessaggioErrore(stato: number) {
        let messaggio: string = '';
        if (199 < stato && stato < 299) {
            messaggio = 'TUTTO OK';
        } else if (stato < 399) {
            messaggio = 'PROBLEMI DI COMUNICAZIONE DATI';
        } else {
            messaggio = 'PROBLEMI GENERICI';
        }
    }
}
