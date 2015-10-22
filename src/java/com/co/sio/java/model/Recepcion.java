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
public class Recepcion {
    private int id;
    private String fecha_recibido;
    private String radicacion;
    private String nit;
    private String prestador;
    private String remitente;
    private String fecha_entrega;
    private int tipo_documento;
    private String numero_guia;
    private String cd;
    private String usb;
    private String detalle;
    private String entregado_a;
    private String entregado_por;
    private int idusuario;


    public String getFecha_recibido() {
        return fecha_recibido;
    }
    public void setFecha_recibido(String fecha_recibido) {
        this.fecha_recibido = fecha_recibido;
    }
    public String getNit() {
        return nit;
    }
    public void setNit(String nit) {
        this.nit = nit;
    }
    public String getPrestador() {
        return prestador;
    }
    public void setPrestador(String prestador) {
        this.prestador = prestador;
    }
    public String getRemitente() {
        return remitente;
    }
    public void setRemitente(String remitente) {
        this.remitente = remitente;
    }
    public String getFecha_entrega() {
        return fecha_entrega;
    }
    public void setFecha_entrega(String fecha_entrega) {
        this.fecha_entrega = fecha_entrega;
    }
    public int getTipo_documento() {
        return tipo_documento;
    }
    public void setTipo_documento(int tipo_documento) {
        this.tipo_documento = tipo_documento;
    }
    public String getNumero_guia() {
        return numero_guia;
    }
    public void setNumero_guia(String numero_guia) {
        this.numero_guia = numero_guia;
    }
    public String getCd() {
        return cd;
    }
    public void setCd(String cd) {
        this.cd = cd;
    }
    public String getUsb() {
        return usb;
    }
    public void setUsb(String usb) {
        this.usb = usb;
    }
    public String getDetalle() {
        return detalle;
    }
    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }
    public String getEntregado_a() {
        return entregado_a;
    }
    public void setEntregado_a(String entregado_a) {
        this.entregado_a = entregado_a;
    }
    public String getEntregado_por() {
        return entregado_por;
    }
    public void setEntregado_por(String entregado_por) {
        this.entregado_por = entregado_por;
    }

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
     * @return the idusuario
     */
    public int getIdusuario() {
        return idusuario;
    }

    /**
     * @param idusuario the idusuario to set
     */
    public void setIdusuario(int idusuario) {
        this.idusuario = idusuario;
    }

    /**
     * @return the radicacion
     */
    public String getRadicacion() {
        return radicacion;
    }

    /**
     * @param radicacion the radicacion to set
     */
    public void setRadicacion(String radicacion) {
        this.radicacion = radicacion;
    }
    
}
