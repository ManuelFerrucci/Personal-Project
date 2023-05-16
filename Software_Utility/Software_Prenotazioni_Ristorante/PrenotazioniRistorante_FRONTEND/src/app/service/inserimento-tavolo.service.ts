import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Tavolo } from '../components/interface/tavolo.interface';

@Injectable({
    providedIn: 'root'
})
export class InserimentoTavoloService {

    linkInserimentoTavoloPOST: string = 'http://localhost:8080/api/inserisci-tavolo';

    constructor(private httpClient: HttpClient) { }

    inserisciTavolo(tavolo: Tavolo) {
        return this.httpClient.post(this.linkInserimentoTavoloPOST, tavolo)
            .subscribe()
    }
}
