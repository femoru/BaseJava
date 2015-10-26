/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Roles;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONArray;

/**
 *
 * @author bmunoz
 */
public class RolesDao {
     DBControl db = new DBControl();
     String sql;
     ResultSet datoSql;
     
     public RolesDao(){
         Roles roles = new Roles();
     }
     public String ListaRoles()throws Exception{
         try {
             sql = "SELECT ID,ROL,ESTADO FROM CMROLES";
              ArrayList<HashMap<String, Object>> consultar = db.consultar(sql,null);
              JSONArray arr = new JSONArray(consultar);
              return arr.toString();
          } catch (SQLException ex) {
           throw new Exception(ex.getMessage());
        }
     }
    
}
