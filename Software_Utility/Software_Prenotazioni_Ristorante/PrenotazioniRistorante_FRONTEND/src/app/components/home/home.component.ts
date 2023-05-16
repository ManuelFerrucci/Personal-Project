import { Component, OnInit } from '@angular/core';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { TavoliService } from 'src/app/service/tavoli.service';
import { Prenotazione } from '../interface/prenotazione.interface';
import { Tavolo } from '../interface/tavolo.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    listaPrenotazioni: Prenotazione[] = [];
    listaTavoli: Tavolo[] = [];

    orarioAttuale: string = '';

    mattina: boolean = false;
    pomeriggio: boolean = false;
    sera: boolean = false;

    numeroPrenotazioni: number = 0;
    prenotazioniPranzo: number = 0;
    prenotazioniCena: number = 0;

    numeroTavoli: number = 0;
    tavoliDa2: number = 0;
    tavoliDa4: number = 0;
    tavoliDa6: number = 0;
    numeroAltriTavoli: number = 0;

    constructor(private prenSrv: PrenotazioniService, private tavSrv: TavoliService) { }

    ngOnInit(): void {
        this.prendiListaPrenotazioni();
        this.prendiListaTavoli();
        this.calcolaOrarioAttuale();
    }

    prendiListaPrenotazioni() {
        this.prenSrv.listaTotalePrenotazioni().subscribe((ris) => {
            this.listaPrenotazioni = ris;
            for (let i = 0; i < this.listaPrenotazioni.length; i++) {
                let prenotazione = this.listaPrenotazioni[i];

                if (prenotazione.fasciaPrenotazione == 'PRANZO') {
                    this.prenotazioniPranzo += 1;
                } else if (prenotazione.fasciaPrenotazione == 'CENA') {
                    this.prenotazioniCena += 1;
                }

                this.numeroPrenotazioni += 1;
            }
        })
    }

    prendiListaTavoli() {
        this.tavSrv.listaTotaleTavoli().subscribe((ris) => {
            this.listaTavoli = ris;
            for (let i = 0; i < this.listaTavoli.length; i++) {
                let tavolo = this.listaTavoli[i];

                if (tavolo.postiTavolo == 2) {
                    this.tavoliDa2 += 1;
                } else if (tavolo.postiTavolo == 4) {
                    this.tavoliDa4 += 1;
                } else if (tavolo.postiTavolo == 6) {
                    this.tavoliDa6 += 1;
                    this.numeroAltriTavoli += 1;
                } else {
                    this.numeroAltriTavoli += 1;
                }

                this.numeroTavoli += 1;
            }
        })
    }

    calcolaOrarioAttuale() {
        let data: Date = new Date();
        let ora: number = data.getHours();
        let minuti: number = data.getMinutes();

        this.orarioAttuale = ora + ':' + minuti;

        if (parseInt(this.orarioAttuale) >= 3 && parseInt(this.orarioAttuale) < 13) {
            this.mattina = true;
        } else if (parseInt(this.orarioAttuale) >= 13 && parseInt(this.orarioAttuale) < 20) {
            this.pomeriggio = true;
        } else {
            this.sera = true;
        }
    }
}
