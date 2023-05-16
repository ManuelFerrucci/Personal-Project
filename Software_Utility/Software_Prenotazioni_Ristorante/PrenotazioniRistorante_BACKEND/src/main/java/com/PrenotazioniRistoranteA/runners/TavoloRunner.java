package com.PrenotazioniRistoranteA.runners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.PrenotazioniRistoranteA.models.Tavolo;
import com.PrenotazioniRistoranteA.services.TavoloService;

@Component
public class TavoloRunner implements ApplicationRunner {

	@Autowired
	TavoloService tavoloService;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println();
		System.out.println("TavoloRunner Run...");

//		Tavolo tavolo = new Tavolo();
//		tavolo.setNumeroTavolo(5);
//		tavolo.setPostiTavolo(2);
//		tavoloService.creaTavolo(tavolo);
		
//		Tavolo tavool1 = tavoloService.trovaTavoloByNumeroTavolo(5);
//		tavool1.setNumeroTavolo(1);
//		tavoloService.modificaTavolo(tavool1);

		System.out.println();
	}

}
