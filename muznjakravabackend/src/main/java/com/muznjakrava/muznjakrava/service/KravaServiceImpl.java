package com.muznjakrava.muznjakrava.service;

import com.muznjakrava.muznjakrava.model.Krava;
import com.muznjakrava.muznjakrava.repository.KravaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KravaServiceImpl implements KravaService{
@Autowired
private KravaRepository kravaRepository;

    @Override
    public Krava saveKrava(Krava krava) {
        return kravaRepository.save(krava);
    }

    @Override
    public List<Krava> getAllKrava() {
        return kravaRepository.findAll() ;
    }

    @Override
    public Krava updateKrava(int id, Krava updatedKrava) {
        Optional<Krava> existingKravaOptional = kravaRepository.findById(id);
        if (existingKravaOptional.isPresent()) {
            Krava existingKrava = existingKravaOptional.get();
            existingKrava.setIme(updatedKrava.getIme());
            existingKrava.setDatum(updatedKrava.getDatum());
            existingKrava.setMlijeko(updatedKrava.getMlijeko());
            return kravaRepository.save(existingKrava);
        } else {
            throw new IllegalArgumentException("Krava with ID " + id + " does not exist.");
        }
    }

    @Override
    public void deleteKrava(int id) {
        kravaRepository.deleteById(id);
    }
}