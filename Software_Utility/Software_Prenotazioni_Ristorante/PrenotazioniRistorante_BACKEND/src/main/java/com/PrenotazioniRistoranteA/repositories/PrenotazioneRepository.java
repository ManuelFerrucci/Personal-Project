package com.PrenotazioniRistoranteA.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.PrenotazioniRistoranteA.models.Prenotazione;
import com.PrenotazioniRistoranteA.utils.FasciaPrenotazione;

@Repository
public interface PrenotazioneRepository extends JpaRepository<Prenotazione, Long> {
	public List<Prenotazione> findByTavoloNumeroTavolo(Integer numeroTavolo);

	public List<Prenotazione> findByFasciaPrenotazione(FasciaPrenotazione fasciaPrenotazione);

	public List<Prenotazione> findByDataAndFasciaPrenotazione(LocalDate data, FasciaPrenotazione fasciaPrenotazione);
}
