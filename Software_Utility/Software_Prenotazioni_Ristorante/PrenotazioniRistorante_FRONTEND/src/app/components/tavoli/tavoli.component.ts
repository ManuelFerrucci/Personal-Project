import { Component, OnInit } from '@angular/core';
import { Tavolo } from '../interface/tavolo.interface';
import { TavoliService } from 'src/app/service/tavoli.service';
import { Prenotazione } from '../interface/prenotazione.interface';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-tavoli',
    templateUrl: './tavoli.component.html',
    styleUrls: ['./tavoli.component.scss']
})
export class TavoliComponent implements OnInit {

    tavoloDaModificare: Tavolo = {
        id: 10000,
        numeroTavolo: 0,
        postiTavolo: 0
    }

    numeroPostiTavoloNegativo: boolean = false;
    codiceDiControlloNumeroTavolo: number = 0;

    listaTavoliEsistenti: Tavolo[] = [];

    constructor(private tavSrv: TavoliService) { }

    ngOnInit(): void {
        this.ricavaTavoliEsistenti();
    }

    ricavaTavoliEsistenti() {
        this.tavSrv.listaTotaleTavoli().subscribe((ris) => {
            this.listaTavoliEsistenti = ris;
        })
    }

    mostraPopupModifica(numeroTavolo: number) {
        let popupModificaTavolo = <HTMLDivElement>document.querySelector('#popupModificaTavolo');
        let contenitoreCardTavoli = <HTMLDivElement>document.querySelector('#contenitoreCardTavoli');

        this.codiceDiControlloNumeroTavolo = numeroTavolo;
        for (let i = 0; i < this.listaTavoliEsistenti.length; i++) {
            let tavoloEsistente = this.listaTavoliEsistenti[i];
            if (tavoloEsistente.numeroTavolo == this.codiceDiControlloNumeroTavolo) {
                this.tavoloDaModificare = tavoloEsistente;
            }
        }
        popupModificaTavolo.classList.remove('invisibile');
        contenitoreCardTavoli.classList.add('invisibile');
    }

    nascondiPopupModifica() {
        let popupModificaTavolo = <HTMLDivElement>document.querySelector('#popupModificaTavolo');
        let contenitoreCardTavoli = <HTMLDivElement>document.querySelector('#contenitoreCardTavoli');
        popupModificaTavolo.classList.add('invisibile');
        contenitoreCardTavoli.classList.remove('invisibile');
    }

    controlli() {
        let inputPostiTavolo = <HTMLInputElement>document.querySelector('#inputPostiTavolo');
        let modificaTavolo = <HTMLButtonElement>document.querySelector('#modificaTavolo');
        modificaTavolo.disabled = false;

        this.numeroPostiTavoloNegativo = false;

        if (inputPostiTavolo.value == '' || parseFloat(inputPostiTavolo.value) < 1) {
            modificaTavolo.disabled = true;
        }
        if (parseFloat(inputPostiTavolo.value) < 1) {
            this.numeroPostiTavoloNegativo = true;
        }
    }

    modificaTavolo(formModificaTavolo: NgForm) {
        let popupModificaTavolo = <HTMLDivElement>document.querySelector('#popupModificaTavolo');
        let popupConferma = <HTMLDivElement>document.querySelector('#popupConferma');
        let inputPostiTavolo = <HTMLInputElement>document.querySelector('#inputPostiTavolo');

        this.tavoloDaModificare.postiTavolo = parseInt(inputPostiTavolo.value);

        this.tavSrv.modificaTavolo(this.tavoloDaModificare);
        popupModificaTavolo.classList.add('invisibile');
        popupConferma.classList.remove('invisibile');
    }

    ricaricaPagina() {
        window.location.reload();
    }
}
