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
            sql = "SELECT * FROM CUENTASMEDICAS.CMUSUARIOS WHERE usuario = ? and contrasena = ?";
            String[] params = {user,pass};
            
            ArrayList<HashMap<String, Object>> consultar = db.consultar(sql, params);

            if (consultar.size()==0) {
                usuarios.setMensajes("Usuario o Clave Invalida");
            }else{
                JSONArray arr = new JSONArray(consultar);
            }
            return usuarios;
            
        } catch (SQLException ex) {
           throw new Exception(ex.getMessage());
        }
         
    }    
}
