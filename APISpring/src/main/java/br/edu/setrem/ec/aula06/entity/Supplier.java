package br.edu.setrem.ec.aula06.entity;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Supplier {
	
	public Supplier() {
		this.transactions = new ArrayList<Integer>();
	}

	@Id
	private Integer id;
	private String name;
	private String address;
	private ArrayList<Integer> transactions;

	// Getters and Setters
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	public ArrayList<Integer> getTransactions() {
		return transactions;
	}
	public void setTransactions(ArrayList<Integer> transactions) {
		this.transactions = transactions;
	}
	
}
