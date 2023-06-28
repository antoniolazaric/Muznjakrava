package com.muznjakrava.muznjakrava.service;

import com.muznjakrava.muznjakrava.model.Krava;
import com.muznjakrava.muznjakrava.repository.KravaRepository;

import java.util.List;

public interface KravaService {
    public Krava saveKrava(Krava krava);
    public List<Krava> getAllKrava();
    public Krava updateKrava(int id, Krava updatedKrava);

    public void deleteKrava(int id);

}
