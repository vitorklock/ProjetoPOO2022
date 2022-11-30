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

import br.edu.setrem.ec.aula06.entity.Supplier;
import br.edu.setrem.ec.aula06.repository.SupplierRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/supplier")
public class SupplierController {

	@Autowired
	private SupplierRepository repository;

	@GetMapping
	public List<Supplier> listar() {
		return repository.findAll();
	}

	@PostMapping
	public Supplier save(@RequestBody Supplier newSupplier) {
		return repository.save(newSupplier);
	}

	@GetMapping("/{id}")
	public Supplier find(@PathVariable Integer id) {
		return repository.findById(id).get();
	}

	@DeleteMapping("/{id}")
	public Boolean delete(@PathVariable Integer id) {
		repository.deleteById(id);
		return true;
	}
}
