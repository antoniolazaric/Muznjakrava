package com.muznjakrava.muznjakrava.controller;

import com.muznjakrava.muznjakrava.model.Krava;
import com.muznjakrava.muznjakrava.repository.KravaRepository;
import com.muznjakrava.muznjakrava.service.KravaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/krava")
@CrossOrigin(origins ="http://localhost:3000" )
public class KravaController {
    @Autowired
    private KravaService kravaService;
    @Autowired
    private KravaRepository kravaRepository;

    @PostMapping("/add")
    public String add(@RequestBody Krava krava){
        kravaService.saveKrava(krava);
        return "New krava is added";
    }
    @GetMapping("/getAll")
    public List<Krava> getAllKrava(){
        return kravaService.getAllKrava();
    }
    @PutMapping("update/{id}")
    public ResponseEntity<Krava> updateKrava(@PathVariable int id, @RequestBody Krava updatedKrava) {
        Krava updatedEntity = kravaService.updateKrava(id, updatedKrava);
        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteKrava(@PathVariable int id) {
        kravaService.deleteKrava(id);
        return ResponseEntity.noContent().build();
    }


}
