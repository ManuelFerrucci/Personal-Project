package com.PrenotazioniRistoranteA.controllers;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PrenotazioniRistoranteA.models.Prenotazione;
import com.PrenotazioniRistoranteA.models.Tavolo;
import com.PrenotazioniRistoranteA.repositories.PrenotazioneRepository;
import com.PrenotazioniRistoranteA.services.PrenotazioneService;
import com.PrenotazioniRistoranteA.utils.FasciaPrenotazione;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class PrenotazioneController {

	@Autowired
	PrenotazioneService prenotazioneService;

	@Autowired
	PrenotazioneRepository prenotazioneRepository;

	@GetMapping("/lista-prenotazioni")
	public List<Prenotazione> listaPrenotazioni() {
		List<Prenotazione> lista = prenotazioneRepository.findAll();
		if (lista.isEmpty()) {
			System.out.println("Non sono presenti prenotazioni.");
		} else {
			Collections.sort(lista, (prenotazione1, prenotazione2) -> {
				return prenotazione1.getId().compareTo(prenotazione2.getId());
			});
		}
		return lista;
	}

	@GetMapping("/lista-prenotazioni/id-prenotazione/{id}")
	public Prenotazione trovaPrenotazioneTramiteId(@PathVariable Long id) {
		Prenotazione prenotazioneTrovata = prenotazioneRepository.findById(id).get();
		return prenotazioneTrovata;
	}

	@GetMapping("/lista-prenotazioni/data-prenotazione/{data}")
	public List<Prenotazione> listaPrenotazioniInData(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate data) {
		List<Prenotazione> lista = prenotazioneService.trovaPrenotazioniNellaData(data);
		if (lista.isEmpty()) {
			System.out.println("PRENOTAZIONE CONTROLLER RICERCA PER DATA - La lista non contiene elementi.");
		} else {
			Collections.sort(lista, (prenotazione1, prenotazione2) -> {
				return prenotazione1.getId().compareTo(prenotazione2.getId());
			});
		}
		return lista;
	}

	@GetMapping("/lista-prenotazioni/fascia-prenotazione/{fasciaPrenotazione}")
	public List<Prenotazione> listaPrenotazioniInData(@PathVariable FasciaPrenotazione fasciaPrenotazione) {
		List<Prenotazione> lista = prenotazioneService.trovaPrenotazioniTramiteFasciaPrenotazione(fasciaPrenotazione);
		if (lista.isEmpty()) {
			System.out.println("PRENOTAZIONE CONTROLLER RICERCA PER FASCIA - La lista non contiene elementi.");
		} else {
			Collections.sort(lista, (prenotazione1, prenotazione2) -> {
				return prenotazione1.getId().compareTo(prenotazione2.getId());
			});
		}
		return lista;
	}

	@GetMapping("/lista-tavoli-liberi/{data}/{fasciaPrenotazione}")
	public List<Tavolo> listaTavoliSenzaPrenotazioniNellaDataEFasciaPrenotazione(
			@PathVariable FasciaPrenotazione fasciaPrenotazione,
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate data) {
		List<Tavolo> lista = prenotazioneService.trovaTavoliSenzaPrenotazioniNellaDataEFasciaPrenotazione(data,
				fasciaPrenotazione);
		if (lista.isEmpty()) {
			System.out.println(
					"PRENOTAZIONE CONTROLLER RICERCA TAVOLI LIBERI PER DATA E FASCIA - Non ci sono tavoli liberi.");
		} else {
			Collections.sort(lista, (tavolo1, tavolo2) -> {
				return tavolo1.getId().compareTo(tavolo2.getId());
			});
		}
		return lista;
	}

	@PostMapping("/inserisci-prenotazione")
	public ResponseEntity<Prenotazione> creaPrenotazione(@RequestBody Prenotazione prenotazione) {
		Prenotazione prenotazioneDaCreare = prenotazioneService.creaPrenotazione(prenotazione);
		return new ResponseEntity<Prenotazione>(prenotazioneDaCreare, HttpStatus.OK);
	}

	@PutMapping("/modifica-prenotazione")
	public ResponseEntity<Prenotazione> modificaPrenotazione(@RequestBody Prenotazione prenotazione) {
		Prenotazione prenotazioneDaModificare = prenotazioneService.modificaPrenotazione(prenotazione);
		return new ResponseEntity<Prenotazione>(prenotazioneDaModificare, HttpStatus.OK);
	}

	@DeleteMapping("/elimina-prenotazione/{id}")
	public ResponseEntity<List<Prenotazione>> eliminaPrenotazione(@PathVariable Long id) {
		prenotazioneService.eliminaPrenotazioneById(id);
		List<Prenotazione> lista = prenotazioneRepository.findAll();
		return new ResponseEntity<List<Prenotazione>>(lista, HttpStatus.OK);
	}

}
