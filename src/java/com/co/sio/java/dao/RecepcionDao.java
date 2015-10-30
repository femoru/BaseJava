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
             sql = "SELECT  r.id, TO_CHAR(r.fecha_recibido,'yyyy/mm/dd hh24:mi') AS FECHA_RECIBIDO,r.radicacion,r.nit,r.prestador,\n" +
                    "r.remitente,TO_CHAR(r.fecha_entrega,'yyyy/mm/dd hh24:mi')AS FECHA_ENTREGA,r.tipo_documento,r.numero_guia,r.cd,r.usb,r.detalle,\n" +
                    "r.entregado_a,r.entregado_por,(CONCAT(u.nombres,CONCAT(' ', u.apellidos ))) AS USUARIO\n" +
                    "FROM CMRECEPCION r INNER JOIN CMUSUARIOS u\n" +
                    "ON r.idusuario = u.idusuario\n" +
                    "WHERE r.estado = 1";
            ArrayList<HashMap<String, Object>> consultar = db.consultar(sql,null);
            JSONArray arr = new JSONArray(consultar);

            return arr.toString();
              
        } catch (SQLException ex) {
           throw new Exception(ex.getMessage());
        }

    }
    public boolean insertar(Recepcion recepcion) throws Exception{
        try {
            sql = "INSERT INTO CMRECEPCION (FECHA_RECIBIDO,RADICACION,NIT,PRESTADOR,REMITENTE,FECHA_ENTREGA,TIPO_DOCUMENTO,"
                    + "NUMERO_GUIA,CD,USB,DETALLE,ENTREGADO_A,ENTREGADO_POR,IDUSUARIO,ESTADO)"
                    + "VALUES(TO_DATE(?,?),?,?,?,?,TO_DATE(?,?),?,?,?,?,?,?,?,?,?)";
            db.conectar();
             
             db.callableStatement(sql);
             String formato = "yyyy/mm/dd hh24:mi";
             

             db.AsignarParametro(1, recepcion.getFecha_recibido(), 1);
             db.AsignarParametro(2, formato, 1);
             db.AsignarParametro(3, recepcion.getRadicacion(), 1);
             db.AsignarParametro(4, recepcion.getNit(), 1);
             db.AsignarParametro(5, recepcion.getPrestador(), 1);
             db.AsignarParametro(6, recepcion.getRemitente(), 1);
             db.AsignarParametro(7, recepcion.getFecha_entrega(), 1);
             db.AsignarParametro(8, formato, 1);
             db.AsignarParametro(9,Integer.toString(recepcion.getTipo_documento()), 1);
             db.AsignarParametro(10, recepcion.getNumero_guia(), 1);
             db.AsignarParametro(11, recepcion.getCd(), 1);
             db.AsignarParametro(12, recepcion.getUsb(), 1);
             db.AsignarParametro(13, recepcion.getDetalle(), 1);
             db.AsignarParametro(14, recepcion.getEntregado_a(), 1);
             db.AsignarParametro(15, recepcion.getEntregado_por(), 1);
             db.AsignarParametro(16, "1", 1);//usuario administrador
             db.AsignarParametro(17, "1", 1);//estado del registro
             
             
             //db.AsignarParametro(14,Integer.toString(recepcion.getIdusuario()), 1);

            return db.registrar();
              
         } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }
 
    }
    public boolean actualizar(Recepcion recepcion)throws Exception{
        try {
            sql = "UPDATE CMRECEPCION SET FECHA_RECIBIDO = TO_DATE(?, ?),RADICACION = ?, NIT = ?, PRESTADOR = ?, REMITENTE = ?,"
                + "FECHA_ENTREGA = TO_DATE(?, ?), TIPO_DOCUMENTO = ?, NUMERO_GUIA = ?, CD = ?, USB = ?, DETALLE = ?,"
                + "ENTREGADO_A = ?, ENTREGADO_POR = ?, IDUSUARIO = ? WHERE ID = ?"; 
            
            db.conectar();
            db.callableStatement(sql);
             
            String formato = "yyyy/mm/dd hh24:mi";
            db.AsignarParametro(1, recepcion.getFecha_recibido(), 1);
            db.AsignarParametro(2, formato, 1);
            db.AsignarParametro(3, recepcion.getRadicacion(), 1);
            db.AsignarParametro(4, recepcion.getNit(), 1);
            db.AsignarParametro(5, recepcion.getPrestador(), 1);
            db.AsignarParametro(6, recepcion.getRemitente(), 1);
            db.AsignarParametro(7, recepcion.getFecha_entrega(), 1);
            db.AsignarParametro(8, formato, 1);
            db.AsignarParametro(9,Integer.toString(recepcion.getTipo_documento()), 1);
            db.AsignarParametro(10, recepcion.getNumero_guia(), 1);
            db.AsignarParametro(11, recepcion.getCd(), 1);
            db.AsignarParametro(12, recepcion.getUsb(), 1);
            db.AsignarParametro(13, recepcion.getDetalle(), 1);
            db.AsignarParametro(14, recepcion.getEntregado_a(), 1);
            db.AsignarParametro(15, recepcion.getEntregado_por(), 1);
            db.AsignarParametro(16, "1", 1);//usuario administrador
            db.AsignarParametro(17, Integer.toString(recepcion.getId()), 1);
             
             
             //db.AsignarParametro(14,Integer.toString(recepcion.getIdusuario()), 1);
 
            return db.registrar();
           
              
         } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }
    }
    public boolean borrar(Recepcion recepcion) throws Exception{
         try {
            sql = "UPDATE CMRECEPCION SET ESTADO = 0 WHERE ID = ?"; 
            
            db.conectar();
            db.callableStatement(sql);
            
            db.AsignarParametro(1, Integer.toString(recepcion.getId()), 1);

            return db.registrar();
   
         } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }

    }
    public String Prueba()throws Exception{
        try {
            sql = "SELECT PRESTADOR FROM CMRECEPCION";
            ArrayList<HashMap<String, Object>> consultar = db.consultar(sql,null);
            JSONArray arr = new JSONArray(consultar);
            
          return arr.toString();
              
        } catch (SQLException ex) {
           throw new Exception(ex.getMessage());
        }
    }
}
