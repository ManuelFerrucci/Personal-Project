package com.PrenotazioniRistoranteA.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PrenotazioniRistoranteA.models.Prenotazione;
import com.PrenotazioniRistoranteA.models.Tavolo;
import com.PrenotazioniRistoranteA.repositories.PrenotazioneRepository;
import com.PrenotazioniRistoranteA.repositories.TavoloRepository;
import com.PrenotazioniRistoranteA.utils.FasciaPrenotazione;

@Service
public class PrenotazioneService {

	@Autowired
	PrenotazioneRepository prenotazioneRepository;

	@Autowired
	TavoloRepository tavoloRepository;

	public Prenotazione creaPrenotazione(Prenotazione prenotazione) {
		List<Tavolo> listaTavoliDisponibili = trovaTavoliSenzaPrenotazioniNellaDataEFasciaPrenotazione(
				prenotazione.getData(), prenotazione.getFasciaPrenotazione());
		LocalDate dataOdierna = LocalDate.now();
		if (prenotazione.getTavolo() == null) {
			System.out.println("Prenotazione non salvata, il tavolo indicato non esiste in database.");
			return null;
		} else {
			if (prenotazione.getData().compareTo(dataOdierna) < 0) {
				System.out.println(
						"Prenotazione non salvata, la data indicata per la prenotazione e' antecedente a quella di oggi.");
				return null;
			} else {
				Boolean interruttoreSalvataggio = false;
				for (int i = 0; i < listaTavoliDisponibili.size(); i++) {
					Tavolo tavolo = listaTavoliDisponibili.get(i);
					if (prenotazione.getTavolo().getNumeroTavolo() == tavolo.getNumeroTavolo()) {
						interruttoreSalvataggio = true;
						break;
					}
				}
				if (interruttoreSalvataggio == true) {
					prenotazioneRepository.save(prenotazione);
					System.out.println("Prenotazione salvata correttamente.");
					return prenotazione;

				} else {
					System.out.println("Prenotazione non salvata, il tavolo "
							+ prenotazione.getTavolo().getNumeroTavolo() + " non risulta disponibile nella data "
							+ prenotazione.getData() + " e fascia " + prenotazione.getFasciaPrenotazione() + ".");
					return null;
				}
			}
		}
	}

	public Prenotazione modificaPrenotazione(Prenotazione prenotazione) {
		if (prenotazione == null) {
			System.out.println("La prenotazione cercata non esiste in database, non possibile modificarla.");
			return null;
		} else {
			List<Tavolo> listaTavoliDisponibili = trovaTavoliSenzaPrenotazioniNellaDataEFasciaPrenotazione(
					prenotazione.getData(), prenotazione.getFasciaPrenotazione());
			LocalDate dataOdierna = LocalDate.now();
			if (prenotazione.getTavolo() == null) {
				System.out.println("Prenotazione non modificata, il tavolo indicato non esiste in database.");
				return null;
			} else {
				if (prenotazione.getData().compareTo(dataOdierna) < 0) {
					System.out.println(
							"Prenotazione non modificata, la data indicata per la prenotazione e' antecedente a quella di oggi.");
					return null;
				} else {
					Boolean interruttoreSalvataggio = false;
					for (int i = 0; i < listaTavoliDisponibili.size(); i++) {
						Tavolo tavolo = listaTavoliDisponibili.get(i);
						if (prenotazione.getTavolo().getNumeroTavolo() == tavolo.getNumeroTavolo()) {
							interruttoreSalvataggio = true;
							break;
						}
					}
					if (interruttoreSalvataggio == true) {
						prenotazioneRepository.save(prenotazione);
						System.out.println("Prenotazione modificata correttamente.");
						return prenotazione;

					} else {
						System.out.println("Prenotazione non modificata, il tavolo "
								+ prenotazione.getTavolo().getNumeroTavolo() + " non risulta disponibile nella data "
								+ prenotazione.getData() + " e fascia " + prenotazione.getFasciaPrenotazione() + ".");
						return null;
					}
				}
			}
		}
	}

	public Prenotazione trovaPrenotazioneById(Long id) {
		if (prenotazioneRepository.existsById(id)) {
			Prenotazione prenotazioneDaCercare = prenotazioneRepository.findById(id).get();
			System.out.println("Prenotazione trovata: " + prenotazioneDaCercare);
			return prenotazioneDaCercare;
		} else {
			System.out.println("Attenzione, la prenotazione cercata non esiste in database.");
			return null;
		}
	}

	public List<Prenotazione> trovaPrenotazioniNellaData(LocalDate data) {
		List<Prenotazione> lista = prenotazioneRepository.findAll();
		List<Prenotazione> nuovaLista = new ArrayList<Prenotazione>();
		if (lista.isEmpty()) {
			System.out.println("Non ci sono prenotazioni in database.");
		} else {
			for (Prenotazione prenotazione : lista) {
				if (prenotazione.getData().compareTo(data) == 0) {
					nuovaLista.add(prenotazione);
				}
			}
			if (nuovaLista.isEmpty()) {
				System.out.println("Non sono presenti prenotazioni nella data " + data + ".");
			} else {
				System.out.println("Prenotazioni nella data indicata:");
				for (Prenotazione prenotazione : nuovaLista) {
					System.out.println(prenotazione);
				}
			}
		}
		return nuovaLista;
	}

	public List<Prenotazione> trovaPrenotazioniDelTavoloConNumero(Integer numero) {
		List<Prenotazione> lista = prenotazioneRepository.findByTavoloNumeroTavolo(numero);
		if (lista.isEmpty()) {
			System.out.println("Non sono presenti prenotazioni per questo tavolo.");
		} else {
			System.out.println("Prenotazioni al tavolo con numero indicato:");
			for (Prenotazione prenotazione : lista) {
				System.out.println(prenotazione);
			}
		}
		return lista;
	}

	public List<Prenotazione> trovaPrenotazioniTramiteFasciaPrenotazione(FasciaPrenotazione fasciaPrenotazione) {
		List<Prenotazione> lista = prenotazioneRepository.findByFasciaPrenotazione(fasciaPrenotazione);
		if (lista.isEmpty()) {
			System.out.println("La lista e' vuota. Non sono presenti prenotazioni nella fascia indicata.");
		} else {
			System.out.println("Prenotazioni trovate nella fascia di prenotazione " + fasciaPrenotazione + ":");
			for (Prenotazione prenotazione : lista) {
				System.out.println(prenotazione);
			}
		}
		return lista;
	}

	public List<Prenotazione> trovaPrenotazioniTramiteDataEFasciaPrenotazione(LocalDate data,
			FasciaPrenotazione fasciaPrenotazione) {
		List<Prenotazione> lista = prenotazioneRepository.findByDataAndFasciaPrenotazione(data, fasciaPrenotazione);
		if (lista.isEmpty()) {
			System.out.println("La lista e' vuota. Non sono presenti prenotazioni nella data con fascia indicata.");
		} else {
			System.out.println("Prenotazioni trovate nella data " + data + " con fascia di prenotazione "
					+ fasciaPrenotazione + ":");
			for (Prenotazione prenotazione : lista) {
				System.out.println(prenotazione);
			}
		}
		return lista;
	}

	public List<Tavolo> trovaTavoliSenzaPrenotazioniNellaDataEFasciaPrenotazione(LocalDate data,
			FasciaPrenotazione fasciaPrenotazione) {
		System.out.println();
		List<Tavolo> listaTavoli = tavoloRepository.findAll();
		List<Tavolo> listaTavoliNuova = new ArrayList<Tavolo>();
		List<Prenotazione> listaPrenotazioniNellaDataEFascia = prenotazioneRepository
				.findByDataAndFasciaPrenotazione(data, fasciaPrenotazione);
		if (listaPrenotazioniNellaDataEFascia.isEmpty()) {
			System.out.println(
					"La lista e' vuota. Non sono presenti prenotazioni nella data con fascia indicata, tutti i tavoli disponibili.");
			for (int i = 0; i < listaTavoli.size(); i++) {
				Tavolo tavoloPrimo = listaTavoli.get(i);
				listaTavoliNuova.add(tavoloPrimo);
			}
		} else {
			for (int i = 0; i < listaTavoli.size(); i++) {
				Tavolo tavolo = listaTavoli.get(i);
				Boolean interruttore = false;
				for (int j = 0; j < listaPrenotazioniNellaDataEFascia.size(); j++) {
					Prenotazione prenotazione = listaPrenotazioniNellaDataEFascia.get(j);
					if (tavolo.getNumeroTavolo() == prenotazione.getTavolo().getNumeroTavolo()) {
						interruttore = true;
//						System.out.println("Il tavolo numero " + tavolo.getNumeroTavolo()
//								+ " risulta prenotato nella data con fascia indicata.");
						break;
					}
				}
				if (interruttore == false) {
					listaTavoliNuova.add(tavolo);
				}
			}
			if (listaTavoliNuova.isEmpty()) {
				System.out.println();
				System.out.println("Tutti i tavoli sono prenotati nella data e fascia indicata.");
			} else {
				System.out.println();
				System.out.println("Tavoli liberi nella data e fascia indicata:");
				for (Tavolo tavolo : listaTavoliNuova) {
					System.out.println(tavolo);
				}
			}
		}
		return listaTavoliNuova;
	}

	public void eliminaPrenotazioneById(Long id) {
		if (prenotazioneRepository.existsById(id)) {
			Prenotazione prenotazioneDaCercare = prenotazioneRepository.findById(id).get();
			prenotazioneRepository.delete(prenotazioneDaCercare);
			System.out.println("Prenotazione eliminata correttamente.");
		} else {
			System.out.println("La prenotazione cercata non esiste in database, non possibile eliminarla.");
		}
	}
}
