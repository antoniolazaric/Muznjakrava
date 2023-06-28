package com.muznjakrava.muznjakrava.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Date;

@Entity
public class Krava {
    @Id
    @GeneratedValue
    private int id;
    private String ime;
    private String datum;
    private String mlijeko;

    public Krava() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }

    public String getMlijeko() {
        return mlijeko;
    }

    public void setMlijeko(String mlijeko) {
        this.mlijeko = mlijeko;
    }
}
