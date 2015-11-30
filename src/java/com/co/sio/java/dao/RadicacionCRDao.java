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
            sql="UPDATE CMRADICACION SET FECHA_RADICACION = TO_DATE(?,?), OFICINA = ?, PREFIJO_FACTURA = ?,"
                        + " SUFIJO_FACTURA = ? , NUMERO_FACTURA = ?, FECHA_FACTURA = TO_DATE(?,?),"
                        + " VALOR_FACTURA = ? ,MOTIVO_ESTADO = ? ,ESTADO_FACTURA = ?, TIPO_RADICACION = ?, "
                        + " IDPRESTADOR = ? WHERE ID = ?";
            db.conectar();
            db.callableStatement(sql);
             String formato = "yyyy/mm/dd hh24:mi";
                db.AsignarParametro(1, radicacioncr.getFecha_radicacion(), 1);
                /* db.AsignarParametro(2, formato, 1);
                 db.AsignarParametro(3, radicacioncr.getOficina(), 1);
                 db.AsignarParametro(4, radicacioncr.getPrefijo_factura(), 1);
                 db.AsignarParametro(5, radicacioncr.getSufijo_factura(), 1);
                 db.AsignarParametro(6, radicacioncr.getNumero_factura(), 1);
                 db.AsignarParametro(7, radicacioncr.getFecha_factura(), 1);
                 db.AsignarParametro(8, formato, 1);
                 db.AsignarParametro(9, Integer.toString(radicacioncr.getValor_factura()), 2);
                 db.AsignarParametro(10, radicacioncr.getMotivo_estado(), 1);
                 db.AsignarParametro(11, radicacioncr.getEstado_factura(), 1);
                 db.AsignarParametro(12, radicacioncr.getTipo_radicacion(), 1);
                 db.AsignarParametro(13, Integer.toString(radicacioncr.getIdprestador()), 1);
                 db.AsignarParametro(14, Integer.toString(radicacioncr.getIdradicacion()), 2);*/
            return db.registrar();
        } catch (SQLException | ParseException e) {
            throw new Exception(e.getMessage());
        }
        finally{
            db.desconectar();
        }
    }
}
