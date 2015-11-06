/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.model;

/**
 *
 * @author bmunoz
 */
public class Radicacion {
    private int id;
    private String consultorio_medico;
    private String nombre;
    private int idciudad;
    private String direccion;
    private String telefono;
    private int idprestador;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the consultorio_medico
     */
    public String getConsultorio_medico() {
        return consultorio_medico;
    }

    /**
     * @param consultorio_medico the consultorio_medico to set
     */
    public void setConsultorio_medico(String consultorio_medico) {
        this.consultorio_medico = consultorio_medico;
    }

    /**
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return the idciudad
     */
    public int getIdciudad() {
        return idciudad;
    }

    /**
     * @param idciudad the idciudad to set
     */
    public void setIdciudad(int idciudad) {
        this.idciudad = idciudad;
    }

    /**
     * @return the direccion
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * @param direccion the direccion to set
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * @return the telefono
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     * @param telefono the telefono to set
     */
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    /**
     * @return the idprestador
     */
    public int getIdprestador() {
        return idprestador;
    }

    /**
     * @param idprestador the idprestador to set
     */
    public void setIdprestador(int idprestador) {
        this.idprestador = idprestador;
    }
}
