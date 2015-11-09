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
   public boolean Insertar(Radicacion radicacion)throws Exception{
        try {
            sql="SELECT ID FROM CMRADICACION WHERE ID = ?";
            String [] params = {Integer.toString(radicacion.getIdradicacion())};
            ArrayList<HashMap<String,Object>> consultar = db.consultar(sql,params);
            
            if (consultar.size()>1){
                System.out.println("uno");
            }else{
                System.out.println("cero");
            }
           /*sql2="INSERT INTO CMRADICACION(FECHA_RADICACION,OFICINA,PREFIJO_FACTURA,SUFIJO_FACTURA,NUMERO_FACTURA,\n" +
                "FECHA_FACTURA,VALOR_FACTURA,MOTIVO_ESTADO,ESTADO_FACTURA,TIPO_RADICACION,IDPRESTADOR)"
                 + "VALUES(TO_DATE(?,?),?,?,?,?,TO_DATE(?,?),?,?,?,?,?)";
            db.conectar();
            db.callableStatement(sql);
            
            //db.AsignarParametro(1, radicacion.getFecha_factura(), 1);
            String formato = "yyyy/mm/dd hh24:mi";*/
            
            return true;
            
        }catch (Exception e) {
            System.out.println(e); 
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }
    }
}
