import { Component, OnInit } from '@angular/core';
import { InserimentoTavoloService } from 'src/app/service/inserimento-tavolo.service';
import { Tavolo } from '../interface/tavolo.interface';
import { NgForm } from '@angular/forms';
import { TavoliService } from 'src/app/service/tavoli.service';

@Component({
    selector: 'app-inserimento-tavolo',
    templateUrl: './inserimento-tavolo.component.html',
    styleUrls: ['./inserimento-tavolo.component.scss']
})
export class InserimentoTavoloComponent implements OnInit {

    listaTavoliEsistenti: Tavolo[] = [];

    tavoloGiaEsistente: boolean = false;
    numeroTavoloNegativo: boolean = false;
    numeroPostiTavoloNegativo: boolean = false;

    tavolo: Tavolo = {
        id: 10000,
        numeroTavolo: 0,
        postiTavolo: 0
    }

    constructor(private insTavSrv: InserimentoTavoloService, private tavSrv: TavoliService) { }

    ngOnInit(): void {
        this.ricavaTavoliEsistenti();
    }

    ricavaTavoliEsistenti() {
        this.tavSrv.listaTotaleTavoli().subscribe((ris) => {
            this.listaTavoliEsistenti = ris;
        })
    }

    controlli() {
        let inputNumeroTavolo = <HTMLInputElement>document.querySelector('#inputNumeroTavolo');
        let inputPostiTavolo = <HTMLInputElement>document.querySelector('#inputPostiTavolo');
        let inserisciTavolo = <HTMLButtonElement>document.querySelector('#inserisciTavolo');
        inserisciTavolo.disabled = false;

        this.tavoloGiaEsistente = false;
        this.numeroTavoloNegativo = false;
        this.numeroPostiTavoloNegativo = false;

        for (let i = 0; i < this.listaTavoliEsistenti.length; i++) {
            let tavoloEsistente = this.listaTavoliEsistenti[i];

            if (tavoloEsistente.numeroTavolo == parseInt(inputNumeroTavolo.value)) {
                this.tavoloGiaEsistente = true;
            }
        }

        if (inputNumeroTavolo.value == '' || inputPostiTavolo.value == '' || this.tavoloGiaEsistente == true || parseFloat(inputNumeroTavolo.value) < 1 || parseFloat(inputPostiTavolo.value) < 1) {
            inserisciTavolo.disabled = true;
        }

        if (parseFloat(inputNumeroTavolo.value) < 1) {
            this.numeroTavoloNegativo = true;
        }
        if (parseFloat(inputPostiTavolo.value) < 1) {
            this.numeroPostiTavoloNegativo = true;
        }
    }

    creaTavolo(formTavolo: NgForm) {

        let popupConferma = <HTMLDivElement>document.querySelector('#popupConferma');
        let formDelTavolo = <HTMLFormElement>document.querySelector('#formDelTavolo');
        let inputNumeroTavolo = <HTMLInputElement>document.querySelector('#inputNumeroTavolo');
        let inputPostiTavolo = <HTMLInputElement>document.querySelector('#inputPostiTavolo');

        this.tavolo.numeroTavolo = parseInt(inputNumeroTavolo.value);
        this.tavolo.postiTavolo = parseInt(inputPostiTavolo.value);

        console.log(this.tavolo);
        this.insTavSrv.inserisciTavolo(this.tavolo);

        formDelTavolo.classList.add('invisibile');
        popupConferma.classList.remove('invisibile');
    }
}
