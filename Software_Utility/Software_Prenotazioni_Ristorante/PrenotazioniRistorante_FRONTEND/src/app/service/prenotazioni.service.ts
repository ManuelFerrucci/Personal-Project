import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Prenotazione } from '../components/interface/prenotazione.interface';

@Injectable({
    providedIn: 'root'
})
export class PrenotazioniService {

    linkPrenotazioniTotaliGET: string = 'http://localhost:8080/api/lista-prenotazioni';
    linkPrenotazioniPUT: string = 'http://localhost:8080/api/modifica-prenotazione';

    constructor(private httpClient: HttpClient) { }

    listaTotalePrenotazioni() {
        return this.httpClient.get<Prenotazione[]>(this.linkPrenotazioniTotaliGET).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
    }

    listaPrenotazioniDelGiorno(data: string) {
        let linkPrenotazioniDelGiornoGET: string = `http://localhost:8080/api/lista-prenotazioni/data-prenotazione/${data}`;
        return this.httpClient.get<Prenotazione[]>(linkPrenotazioniDelGiornoGET).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
    }

    modificaPrenotazione(prenotazione: Prenotazione) {
        return this.httpClient.put(this.linkPrenotazioniPUT, prenotazione)
            .subscribe()
    }

    eliminaPrenotazione(id: number) {
        let linkEliminaPrenotazioneDELETE: string = `http://localhost:8080/api/elimina-prenotazione/${id}`;
        return this.httpClient.delete(linkEliminaPrenotazioneDELETE)
            .subscribe()
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
