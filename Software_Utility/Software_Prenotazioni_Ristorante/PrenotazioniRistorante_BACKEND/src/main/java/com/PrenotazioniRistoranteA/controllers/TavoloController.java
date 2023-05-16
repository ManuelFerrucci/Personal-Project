package com.PrenotazioniRistoranteA.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.PrenotazioniRistoranteA.models.Tavolo;
import com.PrenotazioniRistoranteA.repositories.TavoloRepository;
import com.PrenotazioniRistoranteA.services.TavoloService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class TavoloController {

	@Autowired
	TavoloService tavoloService;

	@Autowired
	TavoloRepository tavoloRepository;

	@GetMapping("/lista-tavoli")
	public List<Tavolo> listaTavoli() {
		List<Tavolo> lista = tavoloRepository.findAll();
		if (lista.isEmpty()) {
			System.out.println("Non sono presenti tavoli.");
		} else {
			Collections.sort(lista, (tavolo1, tavolo2) -> {
				return tavolo1.getId().compareTo(tavolo2.getId());
			});
		}
		return lista;
	}

	@GetMapping("/lista-tavoli/id-tavolo/{id}")
	public Tavolo trovaTavoloTramiteId(@PathVariable Long id) {
		Tavolo tavoloTrovato = tavoloRepository.findById(id).get();
		return tavoloTrovato;
	}

	@GetMapping("/lista-tavoli/numero-tavolo/{numero}")
	public Tavolo trovaTavoloTramiteNumeroTavolo(@PathVariable Integer numero) {
		Tavolo tavoloTrovato = tavoloService.trovaTavoloByNumeroTavolo(numero);
		return tavoloTrovato;
	}

	@PostMapping("/inserisci-tavolo")
	public ResponseEntity<Tavolo> creaTavolo(@RequestBody Tavolo tavolo) {
		Tavolo tavoloDaCreare = tavoloService.creaTavolo(tavolo);
		return new ResponseEntity<Tavolo>(tavoloDaCreare, HttpStatus.OK);

	}

	@PutMapping("/modifica-tavolo")
	public ResponseEntity<Tavolo> modificaTavolo(@RequestBody Tavolo tavolo) {
		Tavolo tavoloDaModificare = tavoloService.modificaTavolo(tavolo);
		return new ResponseEntity<Tavolo>(tavoloDaModificare, HttpStatus.OK);
	}

	@DeleteMapping("/elimina-tavolo/{id}")
	public ResponseEntity<List<Tavolo>> eliminaTavolo(@PathVariable Long id) {
		tavoloService.eliminaTavoloById(id);
		List<Tavolo> lista = tavoloRepository.findAll();
		return new ResponseEntity<List<Tavolo>>(lista, HttpStatus.OK);
	}
}
