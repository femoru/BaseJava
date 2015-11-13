/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Radicacion;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONArray;

/**
 *
 * @author bmunoz
 */
public class RadicacionDao {
    DBControl db = new DBControl();
    String sql;
    String sql2;
    ResultSet datosql;
    
    public RadicacionDao(){
       Radicacion radicacion = new Radicacion();
    }
    
    public String PrestadorCodigo(String codigo_interno)throws Exception{
        try {
            sql="SELECT P.ID AS IDPRESTADOR,P.IPS_ADSCRITA,P.CODIGO_INTERNO,P.IDENTIFICACION,P.NOMBRE AS NOMBREPRESTADOR,\n" +
                "S.ID AS IDSUCURSAL,S.CONSULTORIO_MEDICO,S.NOMBRE AS NOMBRESUCURSAL,S.DIRECCION,S.TELEFONO,\n" +
                "C.ID AS IDCIUDAD,C.CIUDAD FROM CMPRESTADORES P INNER JOIN (CMSUCURSALES S INNER JOIN CMCIUDADES C \n" +
                "ON S.IDCIUDAD = C.ID)ON P.ID = S.IDPRESTADOR WHERE P.CODIGO_INTERNO = ?\n" +
                "";
            
            String [] params = {codigo_interno};
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            JSONArray json = new JSONArray(consultar);
            return json.toString();
  
        } catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }
    }
    public String RadicacionCodigo(String codigo_interno)throws Exception{
        try {
            sql="SELECT R.ID AS IDRADICACION, TO_CHAR(R.FECHA_RADICACION, 'yyyy/mm/dd hh24:mi') AS FECHA_RADICACION,"
             + "R.OFICINA, R.PREFIJO_FACTURA, R.SUFIJO_FACTURA ,R.NUMERO_FACTURA, "
             + "TO_CHAR(R.FECHA_FACTURA,'yyyy/mm/dd hh24:mi')AS FECHA_FACTURA, R.VALOR_FACTURA, R.MOTIVO_ESTADO,"
             + " R.ESTADO_FACTURA, R.TIPO_RADICACION, R.IDPRESTADOR "+
                "FROM CMRADICACION R INNER JOIN CMPRESTADORES P\n" +
                "ON R.IDPRESTADOR = P.ID\n" +
                "WHERE P.CODIGO_INTERNO = ?";
            String [] params = {codigo_interno};
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            JSONArray json = new JSONArray(consultar);
            return json.toString();
            //, R.MOTIVO_ESTADO, R.ESTADO_FACTURA, R.TIPO_RADICACION, R.IDPRESTADOR
        } catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }
    }
    
     public String PrestadorIdentificacion(String identificacion)throws Exception{
        try {
            sql="SELECT P.ID AS IDPRESTADOR,P.IPS_ADSCRITA,P.CODIGO_INTERNO,P.IDENTIFICACION,P.NOMBRE AS NOMBREPRESTADOR,\n" +
                "S.ID AS IDSUCURSAL,S.CONSULTORIO_MEDICO,S.NOMBRE AS NOMBRESUCURSAL,S.DIRECCION,S.TELEFONO,\n" +
                "C.ID AS IDCIUDAD,C.CIUDAD FROM CMPRESTADORES P INNER JOIN (CMSUCURSALES S INNER JOIN CMCIUDADES C \n" +
                "ON S.IDCIUDAD = C.ID)ON P.ID = S.IDPRESTADOR WHERE P.IDENTIFICACION = ?\n" +
                "";
            String [] params = {identificacion};
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            JSONArray json = new JSONArray(consultar);
            
            return json.toString();
  
        } catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }
    }
     public String RadicacionIdentificacion(String identificacion)throws Exception{
        try {
            sql="SELECT R.ID AS IDRADICACION, TO_CHAR(R.FECHA_RADICACION, 'yyyy/mm/dd hh24:mi') AS FECHA_RADICACION,"
             + "R.OFICINA, R.PREFIJO_FACTURA, R.SUFIJO_FACTURA ,R.NUMERO_FACTURA, "
             + "TO_CHAR(R.FECHA_FACTURA,'yyyy/mm/dd hh24:mi')AS FECHA_FACTURA, R.VALOR_FACTURA, R.MOTIVO_ESTADO,"
             + " R.ESTADO_FACTURA, R.TIPO_RADICACION, R.IDPRESTADOR "+
                "FROM CMRADICACION R INNER JOIN CMPRESTADORES P\n" +
                "ON R.IDPRESTADOR = P.ID\n" +
                "WHERE P.IDENTIFICACION = ?";
            String [] params = {identificacion};
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            JSONArray json = new JSONArray(consultar);
            
            return json.toString();
  
        } catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }
    }
    public String PrestadorNombre(String cadena)throws Exception{
        try {
            
            sql="SELECT P.ID AS IDPRESTADOR,P.IPS_ADSCRITA,P.CODIGO_INTERNO,P.IDENTIFICACION,P.NOMBRE AS NOMBREPRESTADOR,\n" +
                "S.ID AS IDSUCURSAL,S.CONSULTORIO_MEDICO,S.NOMBRE AS NOMBRESUCURSAL,S.DIRECCION,S.TELEFONO,\n" +
                "C.ID AS IDCIUDAD,C.CIUDAD FROM CMPRESTADORES P INNER JOIN (CMSUCURSALES S INNER JOIN CMCIUDADES C \n" +
                "ON S.IDCIUDAD = C.ID)ON P.ID = S.IDPRESTADOR WHERE UPPER(P.NOMBRE) LIKE UPPER('%"+cadena+"%')";

            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,null);
            JSONArray json = new JSONArray(consultar);
            return json.toString();
        } catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }
    }
    public String RadicacionNombre(String cadena, String codigo_interno)throws Exception{
        try {
            
            sql="SELECT R.ID AS IDRADICACION, TO_CHAR(R.FECHA_RADICACION, 'yyyy/mm/dd hh24:mi') AS FECHA_RADICACION,\n" +
            "R.OFICINA, R.PREFIJO_FACTURA, R.SUFIJO_FACTURA ,R.NUMERO_FACTURA, \n" +
            "TO_CHAR(R.FECHA_FACTURA,'yyyy/mm/dd hh24:mi')AS FECHA_FACTURA, R.VALOR_FACTURA, R.MOTIVO_ESTADO,\n" +
            "R.ESTADO_FACTURA, R.TIPO_RADICACION, R.IDPRESTADOR \n" +
            "FROM CMRADICACION R INNER JOIN CMPRESTADORES P\n" +
            "ON R.IDPRESTADOR = P.ID\n" +
            " WHERE UPPER(P.NOMBRE) LIKE UPPER('%"+cadena+"%') AND P.CODIGO_INTERNO = ?";
            
            String [] params = {codigo_interno};
                    
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            JSONArray json = new JSONArray(consultar);
            //System.out.println(json.toString());
            return json.toString();
        } catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }
    }

   public boolean Insertar(Radicacion radicacion)throws Exception{
        try {
            sql="SELECT R.ID FROM CMRADICACION R INNER JOIN CMPRESTADORES P\n" +
                    "ON R.IDPRESTADOR = P.ID\n" +
                    "WHERE R.ID = ?";//validarse por fecha, lote, prestador
            String [] params = {Integer.toString(radicacion.getIdradicacion())};
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            
            if (consultar.size()==1) {
                System.out.println("UPDATE");
               sql="UPDATE CMRADICACION SET FECHA_RADICACION = TO_DATE(?,?), OFICINA = ?, PREFIJO_FACTURA = ?,"
                        + " SUFIJO_FACTURA = ? , NUMERO_FACTURA = ?, FECHA_FACTURA = TO_DATE(?,?),"
                        + " VALOR_FACTURA = ? ,MOTIVO_ESTADO = ? ,ESTADO_FACTURA = ?, TIPO_RADICACION = ?, "
                        + " IDPRESTADOR = ? WHERE ID = ?";
                 db.conectar();
                 db.callableStatement(sql);
                 String formato = "yyyy/mm/dd hh24:mi";
                 db.AsignarParametro(1, radicacion.getFecha_radicacion(), 1);
                 db.AsignarParametro(2, formato, 1);
                 db.AsignarParametro(3, radicacion.getOficina(), 1);
                 db.AsignarParametro(4, radicacion.getPrefijo_factura(), 1);
                 db.AsignarParametro(5, radicacion.getSufijo_factura(), 1);
                 db.AsignarParametro(6, radicacion.getNumero_factura(), 1);
                 db.AsignarParametro(7, radicacion.getFecha_factura(), 1);
                 db.AsignarParametro(8, formato, 1);
                 db.AsignarParametro(9, Integer.toString(radicacion.getValor_factura()), 2);
                 db.AsignarParametro(10, radicacion.getMotivo_estado(), 1);
                 db.AsignarParametro(11, radicacion.getEstado_factura(), 1);
                 db.AsignarParametro(12, radicacion.getTipo_radicacion(), 1);
                 db.AsignarParametro(13, Integer.toString(radicacion.getIdprestador()), 1);
                 db.AsignarParametro(14, Integer.toString(radicacion.getIdradicacion()), 2);

            }else{
                sql = "INSERT INTO CMRADICACION(FECHA_RADICACION,OFICINA,PREFIJO_FACTURA,SUFIJO_FACTURA,NUMERO_FACTURA,\n" +
                "FECHA_FACTURA,VALOR_FACTURA,MOTIVO_ESTADO,ESTADO_FACTURA,TIPO_RADICACION,IDPRESTADOR)"
                 + "VALUES(TO_DATE(?,?),?,?,?,?,TO_DATE(?,?),?,?,?,?,?)";
                
                 db.conectar();
                 db.callableStatement(sql);
                 String formato = "yyyy/mm/dd hh24:mi";
                 db.AsignarParametro(1, radicacion.getFecha_radicacion(), 1);
                 db.AsignarParametro(2, formato, 1);
                 db.AsignarParametro(3, radicacion.getOficina(), 1);
                 db.AsignarParametro(4, radicacion.getPrefijo_factura(), 1);
                 db.AsignarParametro(5, radicacion.getSufijo_factura(), 1);
                 db.AsignarParametro(6, radicacion.getNumero_factura(), 1);
                 db.AsignarParametro(7, radicacion.getFecha_factura(), 1);
                 db.AsignarParametro(8, formato, 1);
                 db.AsignarParametro(9, Integer.toString(radicacion.getValor_factura()), 2);
                 db.AsignarParametro(10, "PROCESO", 1);
                 db.AsignarParametro(11, "PROCESO", 1);
                 db.AsignarParametro(12, radicacion.getTipo_radicacion(), 1);
                 db.AsignarParametro(13, Integer.toString(radicacion.getIdprestador()), 1);

            }  
            return db.registrar();
            
        }catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }
    }
}
