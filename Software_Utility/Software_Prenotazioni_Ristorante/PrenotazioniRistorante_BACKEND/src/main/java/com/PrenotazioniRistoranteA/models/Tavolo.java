package com.PrenotazioniRistoranteA.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tavoli")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Tavolo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Integer numeroTavolo;

	@Column(nullable = false)
	private Integer postiTavolo;

	@Override
	public String toString() {
		return "Tavolo [id=" + id + ", numeroTavolo=" + numeroTavolo + ", postiTavolo=" + postiTavolo + "]";
	}
}
