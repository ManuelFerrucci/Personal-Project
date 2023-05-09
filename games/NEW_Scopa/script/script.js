class Carta {
    seme;
    valore;
    valorePerPrimiera;

    constructor(seme, valore) {
        this.seme = seme;
        this.valore = valore;
    }
}

class MazzoDiCarteNapoletane {
    carteContenute = [Carta];

    constructor(carteContenute = popolaMazzoDiCarte()) {
        this.carteContenute = carteContenute;
    }
}

const SEMI = ['Denari', 'Spade', 'Bastoni', 'Coppe'];
const VALORI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MAZZODICARTE = new MazzoDiCarteNapoletane;
let carteNelMazzo = MAZZODICARTE.carteContenute;
// console.log(carteNelMazzo);

const CARTEAVVERSARIO = [];
const CARTEATERRA = [];
const CARTEGIOCATORE = [];
const CARTEPRESEDAAVVERSARIO = [];
const CARTEPRESEDAGIOCATORE = [];
let SCOPEGIOCATORE = 0;
let SCOPEAVVERSARIO = 0;

//FUNZIONE AUTOMATICA DI POPOLAMENTO, MA MI SERVONO LE IMMAGINI
function popolaMazzoDiCarte() {
    return SEMI.flatMap(seme => {
        return VALORI.map(valore => {
            let carta = new Carta(seme, valore);
            return carta;
        })
    })
}

function dai3Carte(array) {
    for (let i = 0; i < 3; i++) {
        let carta = carteNelMazzo[Math.floor(Math.random() * carteNelMazzo.length)];
        array.push(carta);
        carteNelMazzo.splice(carteNelMazzo.indexOf(carta), 1);
    }
}

function metti4CarteATerra(array) {
    for (let i = 0; i < 4; i++) {
        let carta = carteNelMazzo[Math.floor(Math.random() * carteNelMazzo.length)];
        array.push(carta);
        carteNelMazzo.splice(carteNelMazzo.indexOf(carta), 1);
    }
}

function inserisciImmagineCondizione(carta, div) {
    if (carta.seme == 'Denari') {
        switch (carta.valore) {
            case 1:
                div.classList.add('assoDenari');
                break;
            case 2:
                div.classList.add('dueDenari');
                break;
            case 3:
                div.classList.add('treDenari');
                break;
            case 4:
                div.classList.add('quattroDenari');
                break;
            case 5:
                div.classList.add('cinqueDenari');
                break;
            case 6:
                div.classList.add('seiDenari');
                break;
            case 7:
                div.classList.add('setteDenari');
                break;
            case 8:
                div.classList.add('ottoDenari');
                break;
            case 9:
                div.classList.add('noveDenari');
                break;
            case 10:
                div.classList.add('dieciDenari');
                break;
            default:
                break;
        }
    } else if (carta.seme == 'Spade') {
        switch (carta.valore) {
            case 1:
                div.classList.add('assoSpade');
                break;
            case 2:
                div.classList.add('dueSpade');
                break;
            case 3:
                div.classList.add('treSpade');
                break;
            case 4:
                div.classList.add('quattroSpade');
                break;
            case 5:
                div.classList.add('cinqueSpade');
                break;
            case 6:
                div.classList.add('seiSpade');
                break;
            case 7:
                div.classList.add('setteSpade');
                break;
            case 8:
                div.classList.add('ottoSpade');
                break;
            case 9:
                div.classList.add('noveSpade');
                break;
            case 10:
                div.classList.add('dieciSpade');
                break;
            default:
                break;
        }
    } else if (carta.seme == 'Bastoni') {
        switch (carta.valore) {
            case 1:
                div.classList.add('assoBastoni');
                break;
            case 2:
                div.classList.add('dueBastoni');
                break;
            case 3:
                div.classList.add('treBastoni');
                break;
            case 4:
                div.classList.add('quattroBastoni');
                break;
            case 5:
                div.classList.add('cinqueBastoni');
                break;
            case 6:
                div.classList.add('seiBastoni');
                break;
            case 7:
                div.classList.add('setteBastoni');
                break;
            case 8:
                div.classList.add('ottoBastoni');
                break;
            case 9:
                div.classList.add('noveBastoni');
                break;
            case 10:
                div.classList.add('dieciBastoni');
                break;
            default:
                break;
        }
    } else if (carta.seme == 'Coppe') {
        switch (carta.valore) {
            case 1:
                div.classList.add('assoCoppe');
                break;
            case 2:
                div.classList.add('dueCoppe');
                break;
            case 3:
                div.classList.add('treCoppe');
                break;
            case 4:
                div.classList.add('quattroCoppe');
                break;
            case 5:
                div.classList.add('cinqueCoppe');
                break;
            case 6:
                div.classList.add('seiCoppe');
                break;
            case 7:
                div.classList.add('setteCoppe');
                break;
            case 8:
                div.classList.add('ottoCoppe');
                break;
            case 9:
                div.classList.add('noveCoppe');
                break;
            case 10:
                div.classList.add('dieciCoppe');
                break;
            default:
                break;
        }
    }
}

function inserisciCarteGiocatoreInHTML() {
    let contenitoreCarteGiocatore = document.querySelector('#contenitoreCarteGiocatore');
    contenitoreCarteGiocatore.innerHTML = '';
    for (let i = 0; i < CARTEGIOCATORE.length; i++) {
        let carta = CARTEGIOCATORE[i];
        let div = document.createElement('div');
        let p = document.createElement('p');
        div.classList.add('carta');
        div.classList.add('cartaGiocatore');
        p.classList.add('invisibile');
        inserisciImmagineCondizione(carta, div);

        p.innerText = `${carta.valore} ${carta.seme}`;
        div.appendChild(p);
        contenitoreCarteGiocatore.appendChild(div);
    }
}

function inserisciCarteAvversarioInHTML() {
    let contenitoreCarteAvversario = document.querySelector('#contenitoreCarteAvversario');
    contenitoreCarteAvversario.innerHTML = '';
    for (let i = 0; i < CARTEAVVERSARIO.length; i++) {
        let carta = CARTEAVVERSARIO[i];
        let div = document.createElement('div');
        let p = document.createElement('p');
        div.classList.add('carta');
        div.classList.add('cartaAvversario');
        p.classList.add('invisibile');
        inserisciImmagineCondizione(carta, div);
        div.classList.add('retroCarta');

        p.innerText = `${carta.valore} ${carta.seme}`;
        div.appendChild(p);
        contenitoreCarteAvversario.appendChild(div);
    }
}

function inserisciCarteATerraInHTML() {
    let contenitoreCarteGioco = document.querySelector('#contenitoreCarteGioco');
    contenitoreCarteGioco.innerHTML = '';
    for (let i = 0; i < CARTEATERRA.length; i++) {
        let carta = CARTEATERRA[i];
        let div = document.createElement('div');
        let p = document.createElement('p');
        div.classList.add('carta');
        div.classList.add('cartaATerra');
        p.classList.add('invisibile');
        inserisciImmagineCondizione(carta, div);

        p.innerText = `${carta.valore} ${carta.seme}`;
        div.appendChild(p);
        contenitoreCarteGioco.appendChild(div);
    }
}

function selezionaCarte() {
    let carteInGioco = document.querySelectorAll('.cartaATerra');
    for (let i = 0; i < carteInGioco.length; i++) {
        let carta = carteInGioco[i];
        carta.addEventListener('click', () => {
            carta.classList.toggle('cartaSelezionata');
            effettuaUnaGiocata();
        })
    }

    let carteGiocatore = document.querySelectorAll('.cartaGiocatore');
    for (let i = 0; i < carteGiocatore.length; i++) {
        let carta = carteGiocatore[i];
        carta.addEventListener('click', () => {
            for (let j = 0; j < carteGiocatore.length; j++) {
                let carta2 = carteGiocatore[j];
                carta2.classList.remove('cartaSelezionata');
            }
            carta.classList.add('cartaSelezionata');
            effettuaUnaGiocata();
        })
    }
}

function convertiCartaHTMLInCartaJS(cartaHTML) {
    let contenutoCarta = cartaHTML.textContent;
    let arrayCartaSplittata = contenutoCarta.split(' ');
    let convertiValoreDaStringaInNumero = parseInt(arrayCartaSplittata[0]);
    let cartaCreata = new Carta(arrayCartaSplittata[1], convertiValoreDaStringaInNumero);
    // console.log(cartaCreata);
    return cartaCreata;
}

function inserisciInUnAltroArray(arrayGlobalePartenza, arrayLocaleCreato, arrayGlobaleDestinazione) {
    for (let i = 0; i < arrayGlobalePartenza.length; i++) {
        for (let j = 0; j < arrayLocaleCreato.length; j++) {
            let carta1 = arrayGlobalePartenza[i];
            let carta2 = arrayLocaleCreato[j];
            if (carta2.seme == carta1.seme && carta2.valore == carta1.valore) {
                arrayGlobaleDestinazione.push(carta1);
                arrayGlobalePartenza.splice(arrayGlobalePartenza.indexOf(carta1), 1);
            }
        }
    }
}

function effettuaUnaGiocata() {

    let mioTurno = document.querySelector('#mioTurno');
    let buttonPresaCarteAvversario = document.querySelector('#buttonPresaCarteAvversario');
    let buttonMettiCartaATerra = document.querySelector('#buttonMettiCartaATerra');
    let buttonPresaCarte = document.querySelector('#buttonPresaCarte');

    let arrayPerAnimazione = [];
    let arrayCarteATerraDaPrendere = [];
    let carteInGioco = document.querySelectorAll('.cartaATerra');
    let sommaCarteATerraSelezionate = 0;
    for (let i = 0; i < carteInGioco.length; i++) {
        let carta = carteInGioco[i];
        if (carta.classList.contains('cartaSelezionata')) {
            arrayPerAnimazione.push(carta);
            let cartaTrovata = convertiCartaHTMLInCartaJS(carta);
            sommaCarteATerraSelezionate += cartaTrovata.valore;
            arrayCarteATerraDaPrendere.push(cartaTrovata);
        }
    }
    // console.log(arrayCarteATerraDaPrendere);

    let arrayCartaGiocatoreSelezionata = [];
    let carteGiocatore = document.querySelectorAll('.cartaGiocatore');
    let valoreCartaGiocatoreSelezionata = 0;
    let cartaANIMAZIONEGiocatore;
    for (let i = 0; i < carteGiocatore.length; i++) {
        let carta = carteGiocatore[i];
        if (carta.classList.contains('cartaSelezionata')) {
            cartaANIMAZIONEGiocatore = carta;
            let cartaTrovata = convertiCartaHTMLInCartaJS(carta);
            valoreCartaGiocatoreSelezionata = cartaTrovata.valore;
            arrayCartaGiocatoreSelezionata.push(cartaTrovata);
        }
    }

    if (valoreCartaGiocatoreSelezionata != 0 && sommaCarteATerraSelezionate == 0 || (valoreCartaGiocatoreSelezionata != 0 && sommaCarteATerraSelezionate != 0) && valoreCartaGiocatoreSelezionata != sommaCarteATerraSelezionate) {
        buttonPresaCarte.classList.add('invisibile');
        buttonMettiCartaATerra.classList.remove('invisibile');

        buttonMettiCartaATerra.addEventListener('click', () => {
            if (CARTEATERRA.length == 0) {
                SCOPEAVVERSARIO += 1;
                console.log('SCOPA AVVERSARIO!');
            }

            // console.log('CARTE A TERRA AGGIORNATE:');
            // console.log(CARTEATERRA);
            // console.log(CARTEATERRA.length);

            cartaANIMAZIONEGiocatore.classList.add('mettiCartaATerraGiocatore');
            let myTimeout = setTimeout(inserisciInUnAltroArray, 500, CARTEGIOCATORE, arrayCartaGiocatoreSelezionata, CARTEATERRA);

            buttonMettiCartaATerra.classList.add('invisibile');
            mioTurno.classList.add('invisibile');
            buttonPresaCarteAvversario.classList.remove('invisibile');

            let myTimeout2 = setTimeout(inserisciCarteGiocatoreInHTML, 800);
            let myTimeout3 = setTimeout(inserisciCarteATerraInHTML, 800);
            // let myTimeouttt = setTimeout(giocataAutomaticaAvversario, 2500);
        })
    } else if ((valoreCartaGiocatoreSelezionata != 0 && sommaCarteATerraSelezionate != 0) && valoreCartaGiocatoreSelezionata == sommaCarteATerraSelezionate) {
        buttonMettiCartaATerra.classList.add('invisibile');
        buttonPresaCarte.classList.remove('invisibile');

        buttonPresaCarte.addEventListener('click', () => {
            if (CARTEATERRA.length == 0) {
                SCOPEAVVERSARIO += 1;
                console.log('SCOPA AVVERSARIO!');
            }

            // console.log('CARTE A TERRA AGGIORNATE:');
            // console.log(CARTEATERRA);
            // console.log(CARTEATERRA.length);

            cartaANIMAZIONEGiocatore.classList.add('presaGiocatore');
            for (let i = 0; i < arrayPerAnimazione.length; i++) {
                let carta = arrayPerAnimazione[i];
                carta.classList.add('cartaPresaATerraGiocatore');
            }

            let myTimeout = setTimeout(inserisciInUnAltroArray, 800, CARTEGIOCATORE, arrayCartaGiocatoreSelezionata, CARTEPRESEDAGIOCATORE);
            let myTimeout2 = setTimeout(inserisciInUnAltroArray, 800, CARTEATERRA, arrayCarteATerraDaPrendere, CARTEPRESEDAGIOCATORE);

            buttonPresaCarte.classList.add('invisibile');
            mioTurno.classList.add('invisibile');
            buttonPresaCarteAvversario.classList.remove('invisibile');

            let myTimeout3 = setTimeout(inserisciCarteGiocatoreInHTML, 1200);
            let myTimeout4 = setTimeout(inserisciCarteATerraInHTML, 1200);

            // let myTimeouttt = setTimeout(giocataAutomaticaAvversario, 2500);
        })
    }
    controllaCarteRifornimento();
}

function prendiCartaAvversarioRandom() {
    let carteAvversario = document.querySelectorAll('.cartaAvversario');
    let arrayCartaAvversarioSelezionata = [];
    let carta = carteAvversario[Math.floor(Math.random() * carteAvversario.length)];
    let cartaJSGenerata = convertiCartaHTMLInCartaJS(carta);
    arrayCartaAvversarioSelezionata.push(cartaJSGenerata);
    return arrayCartaAvversarioSelezionata;
}

function prendiCarteATerraRandom() {
    let arrayCarteATerraCasuali = [];
    let carteInGioco = document.querySelectorAll('.cartaATerra');
    numeroRandom = Math.floor(Math.random() * carteInGioco.length);
    // console.log(numeroRandom);
    if (carteInGioco.length == 0) {
        arrayCarteATerraCasuali = [];
    } else {
        for (let i = 0; i <= numeroRandom; i++) {
            numeroRandom2 = Math.floor(Math.random() * carteInGioco.length);
            let carta = carteInGioco[numeroRandom2];
            if (carta.classList.contains('selezionataInAutomatico')) {
                i--;
            } else {
                carta.classList.add('selezionataInAutomatico');
                let cartaJSGenerata = convertiCartaHTMLInCartaJS(carta);
                arrayCarteATerraCasuali.push(cartaJSGenerata);
            }
        }
    }
    return arrayCarteATerraCasuali;
}

function arrayTreCarte(array) {
    let arrayDefinitivo = [];
    let carta = new Carta;
    let carta2 = new Carta;
    let carta3 = new Carta;

    for (let i = 0; i < array.length; i++) {
        carta = array[i];
        for (let j = 0; j < array.length; j++) {
            carta2 = array[j];
            for (let w = 0; w < array.length; w++) {
                carta3 = array[w];
                let arrayParziale = [carta, carta2, carta3];
                if ((carta != undefined && carta2 != undefined && carta3 != undefined) && ((carta.valore + carta2.valore + carta3.valore) <= 10)) {
                    if ((carta.seme != carta2.seme || carta.valore != carta2.valore) && (carta.seme != carta3.seme || carta.valore != carta3.valore) && (carta2.seme != carta3.seme || carta2.valore != carta3.valore)) {
                        arrayDefinitivo.push(arrayParziale);
                    }
                }
            }
        }
    }
    // console.log('RACCOLTA DI ARRAY DA TRE CARTE');
    // console.log(arrayDefinitivo);
    return arrayDefinitivo;
}

function giocataAutomaticaAvversario() {

    if (CARTEATERRA.length == 0) {
        SCOPEGIOCATORE += 1;
        console.log('SCOPA GIOCATORE!');
    }

    // console.log('CARTE A TERRA AGGIORNATE:');
    // console.log(CARTEATERRA);
    // console.log(CARTEATERRA.length);

    let carteInGioco = document.querySelectorAll('.cartaATerra');
    let mioTurno = document.querySelector('#mioTurno');
    let buttonPresaCarteAvversario = document.querySelector('#buttonPresaCarteAvversario');
    let arrayCartaAvversarioCasuale = prendiCartaAvversarioRandom();
    let arrayCarteATerraDaPrendereCasuale = prendiCarteATerraRandom();

    let arrayCombinazioniDiDueCarteFattibili = [];
    let arrayCombinazioniDiTreCarteFattibili = arrayTreCarte(CARTEATERRA);
    CARTEATERRA.flatMap((v, i) => {
        return CARTEATERRA.slice(i + 1).map(w => {
            if ((v.valore + w.valore) <= 10) {
                let arrayNuovo = [v, w];
                arrayCombinazioniDiDueCarteFattibili.push(arrayNuovo);
                // console.log('CARTE CHE SI POSSONO PRENDERE IL CUI RISULTATO MINORE O UGUALE A 10');
                // console.log(arrayNuovo);
                return arrayNuovo;
            }
        })
    })
    // console.log('RACCOLTA DI ARRAY DA DUE CARTE');
    // console.log(arrayCombinazioniDiDueCarteFattibili);

    for (let k = 0; k < arrayCartaAvversarioCasuale.length; k++) {
        let cartaAvversarioCasuale = arrayCartaAvversarioCasuale[k];
        let interruttore2 = false;

        for (let i = 0; i < arrayCombinazioniDiDueCarteFattibili.length; i++) {
            let arrayNuovo2 = arrayCombinazioniDiDueCarteFattibili[i];
            // console.log(arrayNuovo2);
            let sommaValoreCarte = 0;
            for (let j = 0; j < arrayNuovo2.length; j++) {
                let carta = arrayNuovo2[j];
                sommaValoreCarte += carta.valore;
            }
            // console.log('SOMMA VALORE CARTE ARRAY NUMERO ' + i);
            // console.log(sommaValoreCarte);
            if (cartaAvversarioCasuale.valore == sommaValoreCarte) {
                arrayCarteATerraDaPrendereCasuale = arrayNuovo2;
                interruttore2 = true;
                // console.log('ARRAY DI DUE CARTE SCELTO');
                // console.log(arrayCarteATerraDaPrendereCasuale);
                break;
            }
        }

        if (interruttore2 == false) {
            for (let z = 0; z < arrayCombinazioniDiTreCarteFattibili.length; z++) {
                let arrayNuovoTreCarte = arrayCombinazioniDiTreCarteFattibili[z];
                let sommaValoreCarte = 0;
                for (let j = 0; j < arrayNuovoTreCarte.length; j++) {
                    let carta = arrayNuovoTreCarte[j];
                    sommaValoreCarte += carta.valore;
                }

                if (cartaAvversarioCasuale.valore == sommaValoreCarte) {
                    arrayCarteATerraDaPrendereCasuale = arrayNuovoTreCarte;
                    // console.log('ARRAY DI TRE CARTE SCELTO');
                    // console.log(arrayCarteATerraDaPrendereCasuale);
                    break;
                }
            }
        }
    }

    if (arrayCarteATerraDaPrendereCasuale.length == 0) {
        inserisciInUnAltroArray(CARTEAVVERSARIO, arrayCartaAvversarioCasuale, CARTEATERRA);

        inserisciCarteATerraInHTML();
        inserisciCarteAvversarioInHTML();

        mioTurno.classList.remove('invisibile');
        buttonPresaCarteAvversario.classList.add('invisibile');
    } else {
        let sommaValoreCarteATerraSelezioneAutomatica = 0;
        for (let i = 0; i < arrayCarteATerraDaPrendereCasuale.length; i++) {
            let cartaAutomatica = arrayCarteATerraDaPrendereCasuale[i];
            sommaValoreCarteATerraSelezioneAutomatica += cartaAutomatica.valore;
        }

        for (let j = 0; j < arrayCartaAvversarioCasuale.length; j++) {
            let carta = arrayCartaAvversarioCasuale[j];
            // console.log('carta casuale');
            // console.log(carta);

            let arrayCartaUguale = [];
            let interruttoreDiControllo = false;
            for (let i = 0; i < carteInGioco.length; i++) {
                let cartanew = carteInGioco[i];
                let cartaNuova = convertiCartaHTMLInCartaJS(cartanew);
                // console.log('carta html trasformata');
                // console.log(cartaNuova);


                if (carta.valore == cartaNuova.valore) {

                    console.log('AVVERSARIO PRENDE ' + cartaNuova.valore + ' ' + cartaNuova.seme + ' CON ' + carta.valore + ' ' + carta.seme);
                    arrayCartaUguale.push(cartaNuova);
                    inserisciInUnAltroArray(CARTEAVVERSARIO, arrayCartaAvversarioCasuale, CARTEPRESEDAAVVERSARIO);
                    inserisciInUnAltroArray(CARTEATERRA, arrayCartaUguale, CARTEPRESEDAAVVERSARIO);

                    inserisciCarteATerraInHTML();
                    inserisciCarteAvversarioInHTML();

                    interruttoreDiControllo = true;

                    break;
                }
            }
            if (carta.valore == sommaValoreCarteATerraSelezioneAutomatica && interruttoreDiControllo == false) {
                let consoleLogPresaAvversario = 'AVVERSARIO PRENDE ';

                for (let i = 0; i < arrayCarteATerraDaPrendereCasuale.length; i++) {
                    let cartaTerra = arrayCarteATerraDaPrendereCasuale[i];
                    consoleLogPresaAvversario += cartaTerra.valore + ' ' + cartaTerra.seme + ' ';
                }

                for (let i = 0; i < arrayCartaAvversarioCasuale.length; i++) {
                    let cartaAvversarioCasuale2 = arrayCartaAvversarioCasuale[i];
                    consoleLogPresaAvversario += 'CON ' + cartaAvversarioCasuale2.valore + ' ' + cartaAvversarioCasuale2.seme;
                }
                console.log(consoleLogPresaAvversario);

                inserisciInUnAltroArray(CARTEAVVERSARIO, arrayCartaAvversarioCasuale, CARTEPRESEDAAVVERSARIO);
                inserisciInUnAltroArray(CARTEATERRA, arrayCarteATerraDaPrendereCasuale, CARTEPRESEDAAVVERSARIO);

                inserisciCarteATerraInHTML();
                inserisciCarteAvversarioInHTML();

                mioTurno.classList.remove('invisibile');
                buttonPresaCarteAvversario.classList.add('invisibile');

                break;
            } else {
                inserisciInUnAltroArray(CARTEAVVERSARIO, arrayCartaAvversarioCasuale, CARTEATERRA);

                inserisciCarteATerraInHTML();
                inserisciCarteAvversarioInHTML();

                mioTurno.classList.remove('invisibile');
                buttonPresaCarteAvversario.classList.add('invisibile');
            }
        }
    }

    controllaCarteRifornimento();
    // selezionaCarte();
}

let buttonPresaCarteAvversario = document.querySelector('#buttonPresaCarteAvversario');
buttonPresaCarteAvversario.addEventListener('click', () => {
    giocataAutomaticaAvversario();
    selezionaCarte();
})

function puntoCarteQuantita(array) {
    let puntoCarteQuantita = false;

    if (array.length > 20) {
        puntoCarteQuantita = true;
    }

    return puntoCarteQuantita;
}

function puntoCarteDenari(array) {
    let puntoCarteDenari = false;
    let arrayCarteDenari = [];

    for (let i = 0; i < array.length; i++) {
        let carta = array[i];
        if (carta.seme == 'Denari') {
            arrayCarteDenari.push(carta);
        }
    }

    if (arrayCarteDenari.length > 5) {
        puntoCarteDenari = true;
    }

    return puntoCarteDenari;
}

function puntoSettebello(array) {
    let puntoSettebello = false;

    for (let i = 0; i < array.length; i++) {
        let carta = array[i];
        if (carta.seme == 'Denari' && carta.valore == 7) {
            puntoSettebello = true;
        }
    }

    return puntoSettebello;
}

function valoriPerPrimiera(arrayDiCarte) {
    for (let i = 0; i < arrayDiCarte.length; i++) {
        let carta = arrayDiCarte[i];
        switch (carta.valore) {
            case 1:
                carta.valorePerPrimiera = 16;
                break;
            case 2:
                carta.valorePerPrimiera = 12;
                break;
            case 3:
                carta.valorePerPrimiera = 13;
                break;
            case 4:
                carta.valorePerPrimiera = 14;
                break;
            case 5:
                carta.valorePerPrimiera = 15;
                break;
            case 6:
                carta.valorePerPrimiera = 18;
                break;
            case 7:
                carta.valorePerPrimiera = 21;
                break;
            case 8:
                carta.valorePerPrimiera = 10;
                break;
            case 9:
                carta.valorePerPrimiera = 10;
                break;
            case 10:
                carta.valorePerPrimiera = 10;
                break;
            default:
                break;
        }
    }
}

function calcolaPrimiera(arrayDiCarte) {
    let arrayDenari = [];
    let arrayCoppe = [];
    let arraySpade = [];
    let arrayBastoni = [];
    for (let i = 0; i < arrayDiCarte.length; i++) {
        let carta = arrayDiCarte[i];
        switch (carta.seme) {
            case 'Denari':
                arrayDenari.push(carta);
                break;
            case 'Coppe':
                arrayCoppe.push(carta);
                break;
            case 'Spade':
                arraySpade.push(carta);
                break;
            case 'Bastoni':
                arrayBastoni.push(carta);
                break;
            default:
                break;
        }
    }

    let cartaMassimaDenari = new Carta;
    if (arrayDenari.length > 0) {
        let numeroMassimoRilevato = Math.max(...arrayDenari.map(o => o.valorePerPrimiera));
        for (let i = 0; i < arrayDenari.length; i++) {
            let carta = arrayDenari[i];
            if (carta.valorePerPrimiera == numeroMassimoRilevato) {
                cartaMassimaDenari = carta;
                break;
            }
        }
    }

    let cartaMassimaCoppe = new Carta;
    if (arrayCoppe.length > 0) {
        let numeroMassimoRilevato = Math.max(...arrayCoppe.map(o => o.valorePerPrimiera));
        for (let i = 0; i < arrayCoppe.length; i++) {
            let carta = arrayCoppe[i];
            if (carta.valorePerPrimiera == numeroMassimoRilevato) {
                cartaMassimaCoppe = carta;
                break;
            }
        }
    }

    let cartaMassimaSpade = new Carta;
    if (arraySpade.length > 0) {
        let numeroMassimoRilevato = Math.max(...arraySpade.map(o => o.valorePerPrimiera));
        for (let i = 0; i < arraySpade.length; i++) {
            let carta = arraySpade[i];
            if (carta.valorePerPrimiera == numeroMassimoRilevato) {
                cartaMassimaSpade = carta;
                break;
            }
        }
    }

    let cartaMassimaBastoni = new Carta;
    if (arrayBastoni.length > 0) {
        let numeroMassimoRilevato = Math.max(...arrayBastoni.map(o => o.valorePerPrimiera));
        for (let i = 0; i < arrayBastoni.length; i++) {
            let carta = arrayBastoni[i];
            if (carta.valorePerPrimiera == numeroMassimoRilevato) {
                cartaMassimaBastoni = carta;
                break;
            }
        }
    }

    let arrayPrimieraDefinitivo = [];

    if (cartaMassimaDenari.valorePerPrimiera != undefined) {
        arrayPrimieraDefinitivo.push(cartaMassimaDenari);
    }

    if (cartaMassimaCoppe.valorePerPrimiera != undefined) {
        arrayPrimieraDefinitivo.push(cartaMassimaCoppe);
    }

    if (cartaMassimaSpade.valorePerPrimiera != undefined) {
        arrayPrimieraDefinitivo.push(cartaMassimaSpade);
    }

    if (cartaMassimaBastoni.valorePerPrimiera != undefined) {
        arrayPrimieraDefinitivo.push(cartaMassimaBastoni);
    }
    console.log('CARTE DELLA PRIMIERA');
    console.log(arrayPrimieraDefinitivo);

    let valorePrimieraArray = 0;
    for (let i = 0; i < arrayPrimieraDefinitivo.length; i++) {
        let carta = arrayPrimieraDefinitivo[i];
        valorePrimieraArray += carta.valorePerPrimiera;
    }
    console.log('VALORE DELLA PRIMIERA');
    console.log(valorePrimieraArray);

    return valorePrimieraArray;
}

function controllaCarteRifornimento() {
    let mioTurno = document.querySelector('#mioTurno');
    let buttonPresaCarteAvversario = document.querySelector('#buttonPresaCarteAvversario');
    let spazioGioco = document.querySelector('#spazioGioco');
    if (CARTEAVVERSARIO.length == 0 && CARTEGIOCATORE.length == 0) {
        if (carteNelMazzo.length > 0) {
            dai3Carte(CARTEGIOCATORE);
            // console.log(CARTEGIOCATORE);
            dai3Carte(CARTEAVVERSARIO);
            // console.log(CARTEAVVERSARIO);
            inserisciCarteAvversarioInHTML();
            inserisciCarteGiocatoreInHTML();
            console.log('CARTE FORNITE DALLA FUNZIONE "controllaCarteRifornimento()"');
        } else {
            // per il momento mando tutto al giocatore, in attesa di funzione che controlla chi ha preso per ultimo
            let carteInGioco = document.querySelectorAll('.cartaATerra');
            let arrayCarteFinali = [];
            for (let i = 0; i < carteInGioco.length; i++) {
                let carta = carteInGioco[i];
                let cartaTrovata = convertiCartaHTMLInCartaJS(carta);
                arrayCarteFinali.push(cartaTrovata);
            }
            inserisciInUnAltroArray(CARTEATERRA, arrayCarteFinali, CARTEPRESEDAGIOCATORE);

            mioTurno.classList.add('invisibile');
            buttonPresaCarteAvversario.classList.add('invisibile');
            spazioGioco.innerHTML = '';

            fineMano();
        }
    }
}

function fineMano() {
    let spazioGioco = document.querySelector('#spazioGioco');

    valoriPerPrimiera(CARTEPRESEDAGIOCATORE);
    valoriPerPrimiera(CARTEPRESEDAAVVERSARIO);

    let carteDenariG = [];
    let carteDenariA = [];

    for (let i = 0; i < CARTEPRESEDAGIOCATORE.length; i++) {
        let carta = CARTEPRESEDAGIOCATORE[i];
        if (carta.seme == 'Denari') {
            carteDenariG.push(carta);
        }
    }

    for (let i = 0; i < CARTEPRESEDAAVVERSARIO.length; i++) {
        let carta = CARTEPRESEDAAVVERSARIO[i];
        if (carta.seme == 'Denari') {
            carteDenariA.push(carta);
        }
    }

    let puntiGiocatore = 0;
    let confermaSettebelloGiocatore = '';
    if (puntoCarteQuantita(CARTEPRESEDAGIOCATORE) == true) {
        puntiGiocatore += 1;
    }
    if (puntoCarteDenari(CARTEPRESEDAGIOCATORE) == true) {
        puntiGiocatore += 1;
    }
    if (puntoSettebello(CARTEPRESEDAGIOCATORE) == true) {
        puntiGiocatore += 1;
        confermaSettebelloGiocatore = 'SI';
    } else {
        confermaSettebelloGiocatore = 'NO';
    }
    puntiGiocatore += SCOPEGIOCATORE;

    let puntiAvversario = 0;
    let confermaSettebelloAvversario = '';
    if (puntoCarteQuantita(CARTEPRESEDAAVVERSARIO) == true) {
        puntiAvversario += 1;
    }
    if (puntoCarteDenari(CARTEPRESEDAAVVERSARIO) == true) {
        puntiAvversario += 1;
    }
    if (puntoSettebello(CARTEPRESEDAAVVERSARIO) == true) {
        puntiAvversario += 1;
        confermaSettebelloAvversario = 'SI';
    } else {
        confermaSettebelloAvversario = 'NO';
    }
    puntiAvversario += SCOPEAVVERSARIO;

    let primieraGiocatore = calcolaPrimiera(CARTEPRESEDAGIOCATORE);
    let primieraAvversario = calcolaPrimiera(CARTEPRESEDAAVVERSARIO);
    let confermaPrimieraGiocatore = '';
    let confermaPrimieraAvversario = '';

    if (primieraGiocatore > primieraAvversario) {
        puntiGiocatore += 1;
        confermaPrimieraGiocatore = 'SI';
        confermaPrimieraAvversario = 'NO';
    } else if (primieraAvversario > primieraGiocatore) {
        puntiAvversario += 1;
        confermaPrimieraAvversario = 'SI';
        confermaPrimieraGiocatore = 'NO';
    }

    let giocatoreStorage = localStorage.getItem('PUNTI GIOCATORE');
    if (giocatoreStorage) {
        let giocatoreInStorage = localStorage.getItem('PUNTI GIOCATORE');
        let puntiPrecedenti = parseInt(giocatoreInStorage);
        localStorage.setItem('PUNTI GIOCATORE', (puntiGiocatore + puntiPrecedenti));
    } else {
        localStorage.setItem('PUNTI GIOCATORE', puntiGiocatore);
    }

    let avversarioStorage = localStorage.getItem('PUNTI AVVERSARIO');
    if (avversarioStorage) {
        let avversarioInStorage = localStorage.getItem('PUNTI AVVERSARIO');
        let puntiPrecedenti = parseInt(avversarioInStorage);
        localStorage.setItem('PUNTI AVVERSARIO', (puntiAvversario + puntiPrecedenti));
    } else {
        localStorage.setItem('PUNTI AVVERSARIO', puntiAvversario);
    }

    let giocatoreInStorage2 = localStorage.getItem('PUNTI GIOCATORE');
    let avversarioInStorage2 = localStorage.getItem('PUNTI AVVERSARIO');
    if ((parseInt(giocatoreInStorage2) >= 11 || parseInt(avversarioInStorage2) >= 11) && parseInt(giocatoreInStorage2) != parseInt(avversarioInStorage2)) {

        let divContenitore = document.createElement('div');
        divContenitore.classList.add('divContenitorePunteggi');
        let punteggioFinale = document.createElement('h2');

        if (parseInt(giocatoreInStorage2) > parseInt(avversarioInStorage2)) {
            punteggioFinale.innerText = 'PARTITA FINITA, GIOCATORE VINCE ' + parseInt(giocatoreInStorage2) + ' A ' + parseInt(avversarioInStorage2);
        } else if (parseInt(avversarioInStorage2) > parseInt(giocatoreInStorage2)) {
            punteggioFinale.innerText = 'PARTITA FINITA, AVVERSARIO VINCE ' + parseInt(avversarioInStorage2) + ' A ' + parseInt(giocatoreInStorage2);
        }

        punteggioFinale.classList.add('allinea');

        let divContenitorePulsanti = document.createElement('div');
        divContenitorePulsanti.id = 'divContenitorePulsanti';

        let buttonNuovaPartita = document.createElement('button');
        buttonNuovaPartita.id = 'buttonNuovaPartita';
        buttonNuovaPartita.innerText = 'Nuova partita';

        divContenitorePulsanti.appendChild(buttonNuovaPartita);

        divContenitore.appendChild(punteggioFinale);
        divContenitore.appendChild(divContenitorePulsanti);

        spazioGioco.appendChild(divContenitore);

        buttonNuovaPartita.addEventListener('click', () => {
            localStorage.removeItem('PUNTI GIOCATORE');
            localStorage.removeItem('PUNTI AVVERSARIO');

            location.reload();
        })

    } else {
        let divContenitore = document.createElement('div');
        divContenitore.classList.add('divContenitorePunteggi');

        let fineGioco = document.createElement('h2');
        fineGioco.innerText = 'CARTE FINITE, MANO TERMINATA.';

        let giocatore = document.createElement('h3');
        giocatore.innerText = 'RIEPILOGO GIOCATORE:';

        let carteGiocatore = document.createElement('p');
        carteGiocatore.innerText = 'CARTE TOTALI PRESE DA GIOCATORE: ' + CARTEPRESEDAGIOCATORE.length;
        console.log('CARTE GIOCATORE');
        console.log(CARTEPRESEDAGIOCATORE);

        let carteDenariGiocatore = document.createElement('p');
        carteDenariGiocatore.innerText = 'CARTE DENARI PRESE DA GIOCATORE: ' + carteDenariG.length;
        console.log('CARTE DENARI GIOCATORE');
        console.log(carteDenariG);

        let settebelloGiocatore = document.createElement('p');
        settebelloGiocatore.innerText = 'SETTEBELLO GIOCATORE: ' + confermaSettebelloGiocatore;

        let primieraGiocatore = document.createElement('p');
        primieraGiocatore.innerText = 'PRIMIERA GIOCATORE: ' + confermaPrimieraGiocatore;

        let scopeGiocatore = document.createElement('p');
        scopeGiocatore.innerText = 'SCOPE GIOCATORE: ' + SCOPEGIOCATORE;

        let puntiFattiDalGiocatore = document.createElement('p');
        puntiFattiDalGiocatore.innerText = 'Punti fatti nella mano dal Giocatore: ' + puntiGiocatore;

        let giocatoreStorageAggiornato = localStorage.getItem('PUNTI GIOCATORE');
        let puntiTotaliFattiDaGiocatore = document.createElement('h2');
        puntiTotaliFattiDaGiocatore.innerText = 'Punti totali GIOCATORE: ' + parseInt(giocatoreStorageAggiornato);

        let avversario = document.createElement('h3');
        avversario.innerText = 'RIEPILOGO AVVERSARIO:';

        let carteAvversario = document.createElement('p');
        carteAvversario.innerText = 'CARTE TOTALI PRESE DA AVVERSARIO: ' + CARTEPRESEDAAVVERSARIO.length;
        console.log('CARTE AVVERSARIO');
        console.log(CARTEPRESEDAAVVERSARIO);

        let carteDenariAvversario = document.createElement('p');
        carteDenariAvversario.innerText = 'CARTE DENARI PRESE DA AVVERSARIO: ' + carteDenariA.length;
        console.log('CARTE DENARI AVVERSARIO');
        console.log(carteDenariA);

        let settebelloAvversario = document.createElement('p');
        settebelloAvversario.innerText = 'SETTEBELLO AVVERSARIO: ' + confermaSettebelloAvversario;

        let primieraAvversario = document.createElement('p');
        primieraAvversario.innerText = 'PRIMIERA AVVERSARIO: ' + confermaPrimieraAvversario;

        let scopeAvversario = document.createElement('p');
        scopeAvversario.innerText = 'SCOPE AVVERSARIO: ' + SCOPEAVVERSARIO;

        let puntiFattiDaAvversario = document.createElement('p');
        puntiFattiDaAvversario.innerText = 'Punti fatti nella mano da Avversario: ' + puntiAvversario;

        let avversarioStorageAggiornato = localStorage.getItem('PUNTI AVVERSARIO');
        let puntiTotaliFattiDaAvversario = document.createElement('h2');
        puntiTotaliFattiDaAvversario.innerText = 'Punti totali AVVERSARIO: ' + parseInt(avversarioStorageAggiornato);

        let divContenitorePulsanti = document.createElement('div');
        divContenitorePulsanti.id = 'divContenitorePulsanti';

        let buttonNuovaPartita = document.createElement('button');
        buttonNuovaPartita.id = 'buttonNuovaPartita';
        buttonNuovaPartita.innerText = 'Nuova partita';

        let buttonContinuaPartita = document.createElement('button');
        buttonContinuaPartita.id = 'buttonContinuaPartita';
        buttonContinuaPartita.innerText = 'Continua';

        fineGioco.classList.add('allinea');

        giocatore.classList.add('allinea');
        carteGiocatore.classList.add('allinea');
        carteDenariGiocatore.classList.add('allinea');
        settebelloGiocatore.classList.add('allinea');
        primieraGiocatore.classList.add('allinea');
        scopeGiocatore.classList.add('allinea');
        puntiFattiDalGiocatore.classList.add('allinea');
        puntiTotaliFattiDaGiocatore.classList.add('allinea');

        avversario.classList.add('allinea');
        carteAvversario.classList.add('allinea');
        carteDenariAvversario.classList.add('allinea');
        settebelloAvversario.classList.add('allinea');
        primieraAvversario.classList.add('allinea');
        scopeAvversario.classList.add('allinea');
        puntiFattiDaAvversario.classList.add('allinea');
        puntiTotaliFattiDaAvversario.classList.add('allinea');

        divContenitore.appendChild(fineGioco);

        divContenitore.appendChild(giocatore);
        divContenitore.appendChild(carteGiocatore);
        divContenitore.appendChild(carteDenariGiocatore);
        divContenitore.appendChild(settebelloGiocatore);
        divContenitore.appendChild(primieraGiocatore);
        divContenitore.appendChild(scopeGiocatore);
        divContenitore.appendChild(puntiFattiDalGiocatore);
        divContenitore.appendChild(puntiTotaliFattiDaGiocatore);

        divContenitore.appendChild(avversario);
        divContenitore.appendChild(carteAvversario);
        divContenitore.appendChild(carteDenariAvversario);
        divContenitore.appendChild(settebelloAvversario);
        divContenitore.appendChild(primieraAvversario);
        divContenitore.appendChild(scopeAvversario);
        divContenitore.appendChild(puntiFattiDaAvversario);
        divContenitore.appendChild(puntiTotaliFattiDaAvversario);

        divContenitorePulsanti.appendChild(buttonNuovaPartita);
        divContenitorePulsanti.appendChild(buttonContinuaPartita);
        divContenitore.appendChild(divContenitorePulsanti);

        spazioGioco.appendChild(divContenitore);

        buttonNuovaPartita.addEventListener('click', () => {
            localStorage.removeItem('PUNTI GIOCATORE');
            localStorage.removeItem('PUNTI AVVERSARIO');

            location.reload();
        })

        buttonContinuaPartita.addEventListener('click', () => {
            location.reload();
        })
    }
}

// localStorage.removeItem('PUNTI GIOCATORE');
// localStorage.removeItem('PUNTI AVVERSARIO');

function nuovaPartita() {
    metti4CarteATerra(CARTEATERRA);
    inserisciCarteATerraInHTML();
    controllaCarteRifornimento();
    selezionaCarte();
}
nuovaPartita();
arrayTreCarte(CARTEATERRA);