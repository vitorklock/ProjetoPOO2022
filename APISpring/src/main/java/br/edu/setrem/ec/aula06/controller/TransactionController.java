package br.edu.setrem.ec.aula06.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.setrem.ec.aula06.entity.Transaction;
import br.edu.setrem.ec.aula06.repository.TransactionRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/transaction")
public class TransactionController {
	
	@Autowired
	private TransactionRepository repository;
	
	@GetMapping
	public List<Transaction> listar() {
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
	public Transaction find(@PathVariable Integer id) {
		return repository.findById(id).get();
	}
	
	@PostMapping
	public Transaction save(@RequestBody Transaction transaction) {
		return repository.save(transaction);
	}
	
	@DeleteMapping("/{id}")
	public String delete(@PathVariable Integer id) {
		repository.deleteById(id);
		return "OK";
	}

}
