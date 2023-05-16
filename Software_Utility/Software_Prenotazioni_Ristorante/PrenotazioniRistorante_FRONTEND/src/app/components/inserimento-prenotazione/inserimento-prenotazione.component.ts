import { Component } from '@angular/core';
import { Prenotazione } from '../interface/prenotazione.interface';
import { Tavolo } from '../interface/tavolo.interface';
import { TavoliService } from 'src/app/service/tavoli.service';
import { InserimentoPrenotazioneService } from 'src/app/service/inserimento-prenotazione.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { throwError, catchError, Subject } from 'rxjs';

@Component({
    selector: 'app-inserimento-prenotazione',
    templateUrl: './inserimento-prenotazione.component.html',
    styleUrls: ['./inserimento-prenotazione.component.scss']
})
export class InserimentoPrenotazioneComponent {

    dataAntecedente: boolean = false;
    dataNonSelezionata: boolean = false;
    tavoliNonDisponibili: boolean = false;
    clienteVuoto: boolean = false;
    recapitoClienteVuoto: boolean = false;

    listaTavoliDisponibili: Tavolo[] = [];

    tavoloDaCreare: Tavolo = {
        id: 10000,
        numeroTavolo: 0,
        postiTavolo: 0
    }

    prenotazioneDaCreare: Prenotazione = {
        id: 1000000,
        data: new Date(),
        fasciaPrenotazione: '',
        cliente: '',
        recapitoCliente: '',
        tavolo: this.tavoloDaCreare
    }

    constructor(private insPrenSrv: InserimentoPrenotazioneService) { }

    controlloTavolo() {
        let inputDataPrenotazione = <HTMLInputElement>document.querySelector('#inputDataPrenotazione');
        let selectFasciaPrenotazione = <HTMLSelectElement>document.querySelector('#selectFasciaPrenotazione');

        let data = inputDataPrenotazione.value;
        let fascia = selectFasciaPrenotazione.value;

        if (inputDataPrenotazione.value != '') {
            this.insPrenSrv.prendiTavoliLiberiPerPrenotazione(data, fascia).subscribe((ris) => {
                this.listaTavoliDisponibili = ris;
                console.log(this.listaTavoliDisponibili);
                if (inputDataPrenotazione.value != '' && this.listaTavoliDisponibili.length < 1) {
                    this.tavoliNonDisponibili = true;
                }
            })
        }
    }

    controlli() {

        let inserisciPrenotazione = <HTMLButtonElement>document.querySelector('#inserisciPrenotazione');
        inserisciPrenotazione.disabled = false;

        this.dataAntecedente = false;
        this.dataNonSelezionata = false;
        this.tavoliNonDisponibili = false;
        this.clienteVuoto = false;
        this.recapitoClienteVuoto = false;

        let inputDataPrenotazione = <HTMLInputElement>document.querySelector('#inputDataPrenotazione');
        let inputClientePrenotazione = <HTMLInputElement>document.querySelector('#inputClientePrenotazione');
        let inputRecapitoClientePrenotazione = <HTMLInputElement>document.querySelector('#inputRecapitoClientePrenotazione');
        let selectTavoloPrenotazione = <HTMLSelectElement>document.querySelector('#selectTavoloPrenotazione');

        let dataInserita = new Date(inputDataPrenotazione.value);
        let dataAttuale = new Date();

        if (inputDataPrenotazione.value == '' || inputClientePrenotazione.value.trim() == '' || inputRecapitoClientePrenotazione.value.trim() == '' || selectTavoloPrenotazione.value == '' || dataInserita < dataAttuale) {
            inserisciPrenotazione.disabled = true;
        }
        if (inputDataPrenotazione.value == '') {
            this.dataNonSelezionata = true;
        }
        if (inputClientePrenotazione.value.trim() == '') {
            this.clienteVuoto = true;
        }
        if (inputRecapitoClientePrenotazione.value.trim() == '') {
            this.recapitoClienteVuoto = true;
        }
        if (dataInserita < dataAttuale) {
            this.dataAntecedente = true;
        }
    }

    creaPrenotazione(formPrenotazione: NgForm) {
        let popupConferma = <HTMLDivElement>document.querySelector('#popupConferma');
        let formDellaPrenotazione = <HTMLFormElement>document.querySelector('#formDellaPrenotazione');
        let inputDataPrenotazione = <HTMLInputElement>document.querySelector('#inputDataPrenotazione');
        let selectFasciaPrenotazione = <HTMLSelectElement>document.querySelector('#selectFasciaPrenotazione');
        let inputClientePrenotazione = <HTMLInputElement>document.querySelector('#inputClientePrenotazione');
        let inputRecapitoClientePrenotazione = <HTMLInputElement>document.querySelector('#inputRecapitoClientePrenotazione');
        let selectTavoloPrenotazione = <HTMLSelectElement>document.querySelector('#selectTavoloPrenotazione');

        for (let i = 0; i < this.listaTavoliDisponibili.length; i++) {
            let tavoloPresente = this.listaTavoliDisponibili[i];

            if (tavoloPresente.numeroTavolo == parseInt(selectTavoloPrenotazione.value)) {
                this.prenotazioneDaCreare.tavolo = tavoloPresente;
                break;
            }
        }

        let dataRicavata = new Date(inputDataPrenotazione.value);
        dataRicavata.toISOString();

        this.prenotazioneDaCreare.data = dataRicavata;
        this.prenotazioneDaCreare.fasciaPrenotazione = selectFasciaPrenotazione.value;
        this.prenotazioneDaCreare.cliente = inputClientePrenotazione.value;
        this.prenotazioneDaCreare.recapitoCliente = inputRecapitoClientePrenotazione.value;

        console.log(this.prenotazioneDaCreare);
        this.insPrenSrv.inserisciPrenotazione(this.prenotazioneDaCreare);

        formDellaPrenotazione.classList.add('invisibile');
        popupConferma.classList.remove('invisibile');
    }
}