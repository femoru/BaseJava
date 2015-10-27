/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;
/**
 *
 * @author bmunoz
 */
import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Usuarios;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONArray;


   public class LoginDao {
     DBControl db = new DBControl();
     String sql;
     ResultSet datoSql;

    public LoginDao() {
       
    
    }
    
    public Usuarios validarLogin(String user, String pass) throws Exception {
        
        try {
            Usuarios usuarios  =  new Usuarios();
            sql = "SELECT IDUSUARIO,USUARIO,NOMBRES,APELLIDOS,CORREO,FECHANACIMIENTO,ESTADO"
                    + " FROM CUENTASMEDICAS.CMUSUARIOS WHERE USUARIO = ? and CONTRASENA = ? and ESTADO = 1";
            String[] params = {user,pass};

            ArrayList<HashMap<String, Object>> consultar = db.consultar(sql, params);

            if (consultar.size()==0) {
                usuarios.setMensajes("Usuario o Clave Invalida");
            }else{
                String idusuario = String.valueOf(consultar.get(0).get("IDUSUARIO"));
                String nombres = String.valueOf(consultar.get(0).get("NOMBRES"));
                String apellidos = String.valueOf(consultar.get(0).get("APELLIDOS"));

                usuarios.setIdusuario(Integer.parseInt(idusuario));
                
                usuarios.setNombres(nombres);
                usuarios.setApellidos(apellidos);
                JSONArray arr = new JSONArray(consultar);
            }
            return usuarios;
            
        } catch (SQLException ex) {
            System.out.println(ex);
           throw new Exception(ex.getMessage());
        }
         
    }    
}
