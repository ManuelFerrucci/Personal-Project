package com.PrenotazioniRistoranteA.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.PrenotazioniRistoranteA.models.Tavolo;

@Repository
public interface TavoloRepository extends JpaRepository<Tavolo, Long> {
	public Tavolo findTavoloByNumeroTavolo(Integer numeroTavolo);

	public Boolean existsTavoloByNumeroTavolo(Integer numeroTavolo);
}
