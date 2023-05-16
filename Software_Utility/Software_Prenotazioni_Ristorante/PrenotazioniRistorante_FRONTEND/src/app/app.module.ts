import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { TavoliComponent } from './components/tavoli/tavoli.component';
import { HttpClientModule } from '@angular/common/http';
import { InserimentoTavoloComponent } from './components/inserimento-tavolo/inserimento-tavolo.component';
import { InserimentoPrenotazioneComponent } from './components/inserimento-prenotazione/inserimento-prenotazione.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PrenotazioniComponent,
        TavoliComponent,
        InserimentoTavoloComponent,
        InserimentoPrenotazioneComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
