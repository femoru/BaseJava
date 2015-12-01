/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.RadicacionCR;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author bmunoz
 */
public class RadicacionCRDao {
    DBControl db = new DBControl();
    String sql;
    ResultSet datoSql;
    public RadicacionCRDao(){
        RadicacionCR radicacioncr = new RadicacionCR();
    }
    
    public boolean EdicionRIPS(RadicacionCR radicacioncr)throws Exception{
        try {
            sql="SELECT R.NUMERO_FACTURA FROM CMRADICACION R INNER JOIN CMPRESTADORES P\n" +
            "ON R.IDPRESTADOR = P.ID\n" +
            "WHERE R.NUMERO_FACTURA = ? ";
            
            String [] params = {radicacioncr.getNumero_factura()};
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            
            if (consultar.size()==1) {
                
           sql="UPDATE CMRADICACION SET FECHA_RADICACION = TO_DATE(?,?),NUMERO_FACTURA = ?, FECHA_FACTURA = TO_DATE(?,?),"
                 + " VALOR_FACTURA = ? ,ESTADO_FACTURA = ?, VALORIVA = ?, TIPO_RADICACION = ?, IDPRESTADOR = ? WHERE NUMERO_FACTURA = ?";
            db.conectar();
            db.callableStatement(sql);
            String formato = "dd/mm/yyyy hh24:mi";
            db.AsignarParametro(1, radicacioncr.getFecha_radicacion(), 1);
            db.AsignarParametro(2, formato, 1);
            db.AsignarParametro(3, radicacioncr.getNumero_factura(), 1);
            db.AsignarParametro(4, radicacioncr.getFecha_factura(), 1);
            db.AsignarParametro(5, formato, 1);
            db.AsignarParametro(6, Integer.toString(radicacioncr.getValor_factura()), 2);
            db.AsignarParametro(7, "RADICADA", 1);
            db.AsignarParametro(8, Integer.toString(radicacioncr.getValor_iva()), 2);
            db.AsignarParametro(9, Integer.toString(radicacioncr.getTipo_radicacion()), 2);
            db.AsignarParametro(10,Integer.toString(radicacioncr.getIdprestador()),2);
            db.AsignarParametro(11, radicacioncr.getNumero_factura(), 1);
            
            }else{
                sql = "INSERT INTO CUENTASMEDICAS.CMRADICACION ( FECHA_RADICACION, NUMERO_FACTURA, FECHA_FACTURA, "
                        + " VALOR_FACTURA,ESTADO_FACTURA, TIPO_RADICACION, IDPRESTADOR, VALORIVA, TIPO_PLAN, TIPO_CUENTA, FACTURA_FISICA) "+
                        "  VALUES (TO_DATE(?,?),?,TO_DATE(?,?),?,?,?,?,?,?,?,?)";
                db.conectar();
                db.callableStatement(sql);
                String formato = "dd/mm/yyyy hh24:mi";
                db.AsignarParametro(1,radicacioncr.getFecha_radicacion(),1);
                db.AsignarParametro(2,formato,1);
                db.AsignarParametro(3, radicacioncr.getNumero_factura(),1);
                db.AsignarParametro(4, radicacioncr.getFecha_factura(),1);
                db.AsignarParametro(5,formato,1);
                db.AsignarParametro(6,Integer.toString(radicacioncr.getValor_factura()),1);
                db.AsignarParametro(7,radicacioncr.getEstado_factura(),1);
                db.AsignarParametro(8,Integer.toString(radicacioncr.getTipo_radicacion()),2);
                db.AsignarParametro(9,Integer.toString(radicacioncr.getIdprestador()),2);
                db.AsignarParametro(10,Integer.toString(radicacioncr.getValor_iva()),2);
                db.AsignarParametro(11,Integer.toString(radicacioncr.getTipo_plan()),2);
                db.AsignarParametro(12,Integer.toString(radicacioncr.getTipo_cuenta()),2);
                db.AsignarParametro(13,Integer.toString(radicacioncr.getFactura_fisica()),2);

            }
            return db.registrar();
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }
        finally{
            db.desconectar();
        }
    }
}
