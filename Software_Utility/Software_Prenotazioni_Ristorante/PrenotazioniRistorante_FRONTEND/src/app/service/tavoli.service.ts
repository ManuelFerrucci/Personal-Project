import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Tavolo } from '../components/interface/tavolo.interface';

@Injectable({
    providedIn: 'root'
})
export class TavoliService {

    linkTavoliTotaliGET: string = 'http://localhost:8080/api/lista-tavoli';
    linkTavoliPUT: string = 'http://localhost:8080/api/modifica-tavolo';

    constructor(private httpClient: HttpClient) { }

    listaTotaleTavoli() {
        return this.httpClient.get<Tavolo[]>(this.linkTavoliTotaliGET).pipe(
            catchError((err) => {
                return throwError(this.getMessaggioErrore(err.stato))
            })
        )
    }

    modificaTavolo(tavolo: Tavolo) {
        return this.httpClient.put(this.linkTavoliPUT, tavolo)
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
