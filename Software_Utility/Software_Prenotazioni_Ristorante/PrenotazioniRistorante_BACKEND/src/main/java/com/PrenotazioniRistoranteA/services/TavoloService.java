package com.PrenotazioniRistoranteA.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PrenotazioniRistoranteA.models.Tavolo;
import com.PrenotazioniRistoranteA.repositories.TavoloRepository;

@Service
public class TavoloService {

	@Autowired
	TavoloRepository tavoloRepository;

	public Tavolo creaTavolo(Tavolo tavolo) {
		if (esisteTavoloByNumeroTavolo(tavolo.getNumeroTavolo()) == false) {
			tavoloRepository.save(tavolo);
			System.out.println("Tavolo salvato correttamente.");
			return tavolo;
		} else {
			System.out.println("Gia' presente in database un tavolo con il numero " + tavolo.getNumeroTavolo()
					+ ", dare un altro numero al tavolo.");
			return null;
		}
	}

	public Tavolo modificaTavolo(Tavolo tavolo) {
		if (tavolo == null) {
			System.out.println("Il tavolo cercato non esiste in database, non possibile modificarlo.");
			return null;
		} else {
			tavoloRepository.save(tavolo);
			System.out.println("Tavolo numero " + tavolo.getNumeroTavolo() + " modificato correttamente.");
			return tavolo;
		}
	}

	public Tavolo trovaTavoloByNumeroTavolo(Integer numeroTavolo) {
		if (tavoloRepository.existsTavoloByNumeroTavolo(numeroTavolo) == true) {
			Tavolo tavoloDaTrovare = tavoloRepository.findTavoloByNumeroTavolo(numeroTavolo);
			System.out.println("Tavolo trovato: " + tavoloDaTrovare);
			return tavoloDaTrovare;
		} else {
			System.out.println("Attenzione, il tavolo numero " + numeroTavolo + " non esiste in database.");
			return null;
		}
	}

	public Boolean esisteTavoloByNumeroTavolo(Integer numeroTavolo) {
		Boolean controllo = false;
		if (tavoloRepository.existsTavoloByNumeroTavolo(numeroTavolo) == true) {
			controllo = true;
		}
		return controllo;
	}

	public void eliminaTavoloById(Long id) {
		if (tavoloRepository.existsById(id)) {
			Tavolo tavoloDaCercare = tavoloRepository.findById(id).get();
			tavoloRepository.delete(tavoloDaCercare);
			System.out.println("Tavolo eliminato correttamente.");
		} else {
			System.out.println("Il tavolo cercato non esiste in database, non possibile eliminarlo.");
		}
	}
}
