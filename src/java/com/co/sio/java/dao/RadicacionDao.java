/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
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
    ResultSet datosql;
    
    public RadicacionDao(){}
    
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
}
