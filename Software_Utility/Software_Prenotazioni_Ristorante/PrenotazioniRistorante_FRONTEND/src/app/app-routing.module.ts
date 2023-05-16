import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { TavoliComponent } from './components/tavoli/tavoli.component';
import { InserimentoTavoloComponent } from './components/inserimento-tavolo/inserimento-tavolo.component';
import { InserimentoPrenotazioneComponent } from './components/inserimento-prenotazione/inserimento-prenotazione.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'prenotazioni',
        component: PrenotazioniComponent
    },
    {
        path: 'inserimento-prenotazione',
        component: InserimentoPrenotazioneComponent
    },
    {
        path: 'tavoli',
        component: TavoliComponent
    },
    {
        path: 'inserimento-tavolo',
        component: InserimentoTavoloComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
