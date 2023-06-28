package com.muznjakrava.muznjakrava.repository;

import com.muznjakrava.muznjakrava.model.Krava;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KravaRepository extends JpaRepository<Krava,Integer> {
}
