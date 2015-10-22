/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;
import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Recepcion;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONArray;

/**
 *
 * @author bmunoz
 */
public class RecepcionDao {
    DBControl db = new DBControl();
     String sql;
     ResultSet datoSql;

    public RecepcionDao() { 
        Recepcion recepcion =  new Recepcion();
    }
    
    public String ListaRecepcion()throws Exception{
        try {
            
            
             sql = "SELECT  r.id,r.fecha_recibido,r.radicacion,r.nit,r.prestador,\n" +
                    "r.remitente,r.fecha_entrega,r.tipo_documento,r.numero_guia,r.cd,r.usb,r.detalle,\n" +
                    "r.entregado_a,r.entregado_por,(CONCAT(u.nombres,CONCAT(' ', u.apellidos ))) as usuario\n" +
                    "FROM CMRECEPCION r INNER JOIN CMUSUARIOS u\n" +
                    "ON r.idusuario = u.idusuario\n" +
                    "";
            ArrayList<HashMap<String, Object>> consultar = db.consultar(sql,null);
            JSONArray arr = new JSONArray(consultar);

            return arr.toString();
              
        } catch (SQLException ex) {
           throw new Exception(ex.getMessage());
        }

    }
    public boolean insertar(Recepcion recepcion) throws Exception{
        try {
             sql = "INSERT INTO CUENTASMEDICAS.CMRECEPCION (ID, FECHA_RECIBIDO,RADICACION, NIT, PRESTADOR, REMITENTE, "
                     + "FECHA_ENTREGA, TIPO_DOCUMENTO, NUMERO_GUIA, CD, USB, DETALLE, ENTREGADO_A, ENTREGADO_POR,"
                     + " IDUSUARIO) \n" +
                "VALUES ()";
             
             db.callableStatement(sql);
            // db.AsignarParametro(1,Integer.toString(recepcion.getId()), 1);
             db.AsignarParametro(1, recepcion.getFecha_recibido(), 1);
             db.AsignarParametro(2, recepcion.getRadicacion(), 1);
             db.AsignarParametro(3, recepcion.getNit(), 1);
             db.AsignarParametro(4, recepcion.getPrestador(), 1);
             db.AsignarParametro(5, recepcion.getRemitente(), 1);
             db.AsignarParametro(6, recepcion.getFecha_entrega(), 1);
             db.AsignarParametro(7,Integer.toString(recepcion.getTipo_documento()), 1);
             db.AsignarParametro(8, recepcion.getNumero_guia(), 1);
             db.AsignarParametro(9, recepcion.getCd(), 1);
             db.AsignarParametro(10, recepcion.getUsb(), 1);
             db.AsignarParametro(11, recepcion.getDetalle(), 1);
             db.AsignarParametro(12, recepcion.getEntregado_a(), 1);
             db.AsignarParametro(13, recepcion.getEntregado_por(), 1);
             db.AsignarParametro(14,Integer.toString(recepcion.getIdusuario()), 1);
             

            return db.registrar();
             
         } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
 
    }
}
