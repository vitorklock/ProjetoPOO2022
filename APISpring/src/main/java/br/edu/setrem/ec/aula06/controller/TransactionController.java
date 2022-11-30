package br.edu.setrem.ec.aula06.controller;

import java.util.ArrayList;
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

import br.edu.setrem.ec.aula06.entity.Supplier;
import br.edu.setrem.ec.aula06.entity.Transaction;
import br.edu.setrem.ec.aula06.repository.SupplierRepository;
import br.edu.setrem.ec.aula06.repository.TransactionRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/transaction")
public class TransactionController {

	@Autowired
	private TransactionRepository repository;
	
	@Autowired
	private SupplierRepository supplierRepository;
	
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
		Integer supplierId = transaction.getSupplier().getId();
		
		//System.out.println(transaction.getSupplier().getId());
		if(!supplierId.equals(0)) {	
			Supplier supplier = supplierRepository.findById(supplierId).get();
			ArrayList<Integer> transactions = supplier.getTransactions();
			System.out.println(supplier);
			transactions.add(transaction.getId());
		}
		
		return repository.save(transaction);
	}
	
	@DeleteMapping("/{id}")
	public Boolean delete(@PathVariable Integer id) {
		Transaction transaction = repository.findById(id).get();
		transaction.getSupplier().getTransactions().remove(id);
		
		repository.deleteById(id);
		return true;
	}
}
