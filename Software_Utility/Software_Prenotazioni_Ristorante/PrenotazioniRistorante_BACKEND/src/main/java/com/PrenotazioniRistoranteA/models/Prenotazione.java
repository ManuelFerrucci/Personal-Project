package com.PrenotazioniRistoranteA.models;

import java.time.LocalDate;

import com.PrenotazioniRistoranteA.utils.FasciaPrenotazione;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "prenotazioni")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Prenotazione {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private LocalDate data;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private FasciaPrenotazione fasciaPrenotazione;

	@Column(nullable = false)
	private String cliente;

	@Column(nullable = false)
	private String recapitoCliente;

	@ManyToOne
	@JoinColumn(name = "id_tavolo", nullable = false)
	private Tavolo tavolo;

	@Override
	public String toString() {
		return "Prenotazione [id=" + id + ", data=" + data + ", fasciaPrenotazione=" + fasciaPrenotazione + ", cliente="
				+ cliente + ", recapitoCliente=" + recapitoCliente + ", tavolo=" + getTavolo() + "]";
	}
}
