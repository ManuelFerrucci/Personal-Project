package com.PrenotazioniRistoranteA.runners;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.PrenotazioniRistoranteA.models.Prenotazione;
import com.PrenotazioniRistoranteA.models.Tavolo;
import com.PrenotazioniRistoranteA.services.PrenotazioneService;
import com.PrenotazioniRistoranteA.services.TavoloService;
import com.PrenotazioniRistoranteA.utils.FasciaPrenotazione;

@Component
public class PrenotazioneRunner implements ApplicationRunner {

	@Autowired
	PrenotazioneService prenotazioneService;

	@Autowired
	TavoloService tavoloService;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println();
		System.out.println("PrenotazioneRunner Run...");

//		Tavolo tavolo1 = tavoloService.trovaTavoloByNumeroTavolo(1);
//		Tavolo tavolo2 = tavoloService.trovaTavoloByNumeroTavolo(2);
//		Tavolo tavolo3 = tavoloService.trovaTavoloByNumeroTavolo(3);
//		Tavolo tavolo4 = tavoloService.trovaTavoloByNumeroTavolo(4);
//		Tavolo tavolo5 = tavoloService.trovaTavoloByNumeroTavolo(5);
//
//		Prenotazione prenotazione = new Prenotazione();
//		prenotazione.setData(LocalDate.of(2023, 5, 16));
//		prenotazione.setFasciaPrenotazione(FasciaPrenotazione.PRANZO);
//		prenotazione.setCliente("Agnelli Caio");
//		prenotazione.setRecapitoCliente("3331122333");
//		prenotazione.setTavolo(tavolo2);
//		prenotazioneService.creaPrenotazione(prenotazione);

//		Prenotazione prenotazioen1 = prenotazioneService.trovaPrenotazioneById(7l);
//		prenotazioen1.setRecapitoCliente("3331234567");
//		prenotazioneService.modificaPrenotazione(prenotazioen1);
//		prenotazioneService.eliminaPrenotazioneById(6l);

//		prenotazioneService.trovaPrenotazioniNellaData(LocalDate.of(2023, 5, 7));

//		prenotazioneService.trovaPrenotazioniDelTavoloConNumero(2);

//		prenotazioneService.trovaPrenotazioniTramiteFasciaPrenotazione(FasciaPrenotazione.CENA);
//		prenotazioneService.trovaPrenotazioniTramiteDataEFasciaPrenotazione(LocalDate.of(2023, 5, 11),
//				FasciaPrenotazione.CENA);
//		prenotazioneService.trovaTavoliSenzaPrenotazioniNellaDataEFasciaPrenotazione(LocalDate.of(2023, 5, 12),
//				FasciaPrenotazione.CENA);
	}
}
