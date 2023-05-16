import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../interface/prenotazione.interface';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { NgForm } from '@angular/forms';
import { Tavolo } from '../interface/tavolo.interface';
import { InserimentoPrenotazioneService } from 'src/app/service/inserimento-prenotazione.service';

@Component({
    selector: 'app-prenotazioni',
    templateUrl: './prenotazioni.component.html',
    styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent implements OnInit {

    dataAntecedente: boolean = false;
    dataNonSelezionata: boolean = false;
    tavoliNonDisponibili: boolean = false;
    clienteVuoto: boolean = false;
    recapitoClienteVuoto: boolean = false;

    listaTavoliDisponibili: Tavolo[] = [];

    tavoloCreatoAlMomento: Tavolo = {
        id: 100000,
        numeroTavolo: 0,
        postiTavolo: 0
    }

    prenotazioneCreataAlMomento: Prenotazione = {
        id: 10000,
        data: new Date(),
        fasciaPrenotazione: '',
        cliente: '',
        recapitoCliente: '',
        tavolo: this.tavoloCreatoAlMomento
    }

    ricercaDataVuoto: boolean = false;
    ricercaOperativa: boolean = false;
    ricerca: string = '';
    codiceDiControlloId: number = 0;

    listaPrenotazioni: Prenotazione[] = [];
    lista: Prenotazione[] = [];

    constructor(private prenSrv: PrenotazioniService, private insPrenSrv: InserimentoPrenotazioneService) { }

    ngOnInit(): void {
        this.prendiListaTotalePrenotazioni();
    }

    prendiListaTotalePrenotazioni() {
        this.ricercaDataVuoto = false;
        this.prenSrv.listaTotalePrenotazioni().subscribe((ris) => {
            this.listaPrenotazioni = ris;
            console.log(this.listaPrenotazioni);
        })
    }

    controlliData() {
        let inputDataPrenotazioneRicerca = <HTMLInputElement>document.querySelector('#inputDataPrenotazioneRicerca');
        let cercaPrenotazioniNellaData = <HTMLButtonElement>document.querySelector('#cercaPrenotazioniNellaData');
        cercaPrenotazioniNellaData.disabled = false;

        if (inputDataPrenotazioneRicerca.value == '') {
            cercaPrenotazioniNellaData.disabled = true;
        }
    }

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

        let modificaPrenotazione = <HTMLButtonElement>document.querySelector('#modificaPrenotazione');
        modificaPrenotazione.disabled = false;

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
            modificaPrenotazione.disabled = true;
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

    prendiListaPrenotazioniDelGiorno(formRicercaData: NgForm) {
        let inputDataPrenotazioneRicerca = <HTMLInputElement>document.querySelector('#inputDataPrenotazioneRicerca');
        let cercaPrenotazioniNellaData = <HTMLButtonElement>document.querySelector('#cercaPrenotazioniNellaData');
        cercaPrenotazioniNellaData.disabled = false;
        this.ricercaDataVuoto = false;

        let data = inputDataPrenotazioneRicerca.value;

        this.prenSrv.listaPrenotazioniDelGiorno(data).subscribe((ris) => {
            this.listaPrenotazioni = ris;
            console.log(this.listaPrenotazioni);
            if (this.listaPrenotazioni.length < 1) {
                this.ricercaDataVuoto = true;
            }
        })

        this.ricercaOperativa = true;
    }

    mostraPopupEliminazione(id: number) {
        let popupEliminaPrenotazione = <HTMLDivElement>document.querySelector('#popupEliminaPrenotazione');
        let contenitoreCardPrenotazioni = <HTMLDivElement>document.querySelector('#contenitoreCardPrenotazioni');
        this.codiceDiControlloId = id;
        this.prenSrv.listaTotalePrenotazioni().subscribe((ris) => {
            this.lista = ris;
            for (let i = 0; i < this.lista.length; i++) {
                let prenot = this.lista[i];
                if (prenot.id == this.codiceDiControlloId) {
                    this.prenotazioneCreataAlMomento = prenot;
                    break;
                }
            }
        })
        popupEliminaPrenotazione.classList.remove('invisibile');
        contenitoreCardPrenotazioni.classList.add('invisibile');
    }

    nascondiPopupEliminazione() {
        let contenitoreCardPrenotazioni = <HTMLDivElement>document.querySelector('#contenitoreCardPrenotazioni');
        let popupEliminaPrenotazione = <HTMLDivElement>document.querySelector('#popupEliminaPrenotazione');
        popupEliminaPrenotazione.classList.add('invisibile');
        contenitoreCardPrenotazioni.classList.remove('invisibile');
    }

    eliminaPrenotazione() {
        this.prenSrv.eliminaPrenotazione(this.codiceDiControlloId);
        this.nascondiPopupEliminazione();
        window.location.reload();
    }

    mostraPopupModifica(id: number) {
        let formPrenotazioniPerData = <HTMLFormElement>document.querySelector('#formPrenotazioniPerData');
        let popupModificaPrenotazione = <HTMLDivElement>document.querySelector('#popupModificaPrenotazione');
        let contenitoreCardPrenotazioni = <HTMLDivElement>document.querySelector('#contenitoreCardPrenotazioni');
        this.codiceDiControlloId = id;
        this.prenSrv.listaTotalePrenotazioni().subscribe((ris) => {
            this.lista = ris;
            for (let i = 0; i < this.lista.length; i++) {
                let prenotaz = this.lista[i];
                if (prenotaz.id == this.codiceDiControlloId) {
                    this.prenotazioneCreataAlMomento = prenotaz;
                    break;
                }
            }
        })
        popupModificaPrenotazione.classList.remove('invisibile');
        contenitoreCardPrenotazioni.classList.add('invisibile');
        formPrenotazioniPerData.classList.add('invisibile');
    }

    nascondiPopupModifica() {
        let formPrenotazioniPerData = <HTMLFormElement>document.querySelector('#formPrenotazioniPerData');
        let contenitoreCardPrenotazioni = <HTMLDivElement>document.querySelector('#contenitoreCardPrenotazioni');
        let popupModificaPrenotazione = <HTMLDivElement>document.querySelector('#popupModificaPrenotazione');
        popupModificaPrenotazione.classList.add('invisibile');
        contenitoreCardPrenotazioni.classList.remove('invisibile');
        formPrenotazioniPerData.classList.remove('invisibile');
    }

    modificaPrenotazione(formPrenotazione: NgForm) {
        let popupConferma = <HTMLDivElement>document.querySelector('#popupConferma');
        let popupModificaPrenotazione = <HTMLDivElement>document.querySelector('#popupModificaPrenotazione');
        let inputDataPrenotazione = <HTMLInputElement>document.querySelector('#inputDataPrenotazione');
        let selectFasciaPrenotazione = <HTMLSelectElement>document.querySelector('#selectFasciaPrenotazione');
        let inputClientePrenotazione = <HTMLInputElement>document.querySelector('#inputClientePrenotazione');
        let inputRecapitoClientePrenotazione = <HTMLInputElement>document.querySelector('#inputRecapitoClientePrenotazione');
        let selectTavoloPrenotazione = <HTMLSelectElement>document.querySelector('#selectTavoloPrenotazione');

        for (let i = 0; i < this.listaTavoliDisponibili.length; i++) {
            let tavoloPresente = this.listaTavoliDisponibili[i];

            if (tavoloPresente.numeroTavolo == parseInt(selectTavoloPrenotazione.value)) {
                this.prenotazioneCreataAlMomento.tavolo = tavoloPresente;
                break;
            }
        }

        let dataRicavata = new Date(inputDataPrenotazione.value);
        dataRicavata.toISOString();

        this.prenotazioneCreataAlMomento.data = dataRicavata;
        this.prenotazioneCreataAlMomento.fasciaPrenotazione = selectFasciaPrenotazione.value;
        this.prenotazioneCreataAlMomento.cliente = inputClientePrenotazione.value;
        this.prenotazioneCreataAlMomento.recapitoCliente = inputRecapitoClientePrenotazione.value;

        console.log(this.prenotazioneCreataAlMomento);
        this.prenSrv.modificaPrenotazione(this.prenotazioneCreataAlMomento);

        popupModificaPrenotazione.classList.add('invisibile');
        popupConferma.classList.remove('invisibile');
    }

    ricaricaPagina() {
        window.location.reload();
    }
}
