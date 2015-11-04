/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Menu;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author bmunoz
 */
public class MenuDao {
     DBControl db = new DBControl();
     String sql;
     ResultSet datoSql;
    
     public MenuDao(){ }
     
     public String Crearmenu(String usuario)throws Exception{
         try {

             sql="SELECT M.ID,M.MENU,M.IDENTIFICADOR,M.ICONO FROM CMMENU M INNER JOIN(\n" +
                "CMROLESXMENU X INNER JOIN(\n" +
                "CMROLES R INNER JOIN CMUSUARIOS U\n" +
                "ON R.ID = U.IDROL)\n" +
                "ON X.IDROL = R.ID)\n" +
                "ON M.ID = X.IDMENU\n" +
                "WHERE U.USUARIO = ?";
            
             String[] params = {usuario};
             ArrayList<HashMap<String, Object>> consultar = db.consultar(sql, params);
             
             JSONArray arr = new JSONArray(consultar);

                return arr.toString();
         }catch (SQLException ex) {
            System.out.println(ex);
           throw new Exception(ex.getMessage());
        }
       
     }
     public String Crearmenuhijos(String menu, String rol)throws Exception{
         try {

             /*sql="SELECT H.HIJO FROM CMMENUHIJOS H INNER JOIN(\n" +
                "CMMENU M INNER JOIN(\n" +
                "CMROLESXMENU X INNER JOIN (\n" +
                "CMROLES R INNER JOIN CMUSUARIOS U\n" +
                "ON R.ID = U.IDROL)\n" +
                "ON X.IDROL = R.ID)\n" +
                "ON M.ID = X.IDMENU)\n" +
                "ON H.IDMENU = M.ID\n" +
                "WHERE U.USUARIO = ?\n" +
                "";*/
              /*sql = "SELECT H.ID,H.HIJO,H.IDENTIFICADOR FROM CMMENUHIJOS H INNER JOIN CMMENU M \n" +
                    "ON H.IDMENU = M.ID\n" +
                    "WHERE M.ID = ?";*/
             sql="SELECT H.ID,H.HIJO,H.IDENTIFICADOR FROM CMMENU M INNER JOIN (\n" +
                "CMMENUHIJOS H INNER JOIN(\n" +
                "CMROLESXMENUHIJOS X INNER JOIN(\n" +
                "CMROLES R INNER JOIN CMUSUARIOS U\n" +
                "ON R.ID = U.IDROL)\n" +
                "ON X.IDROL = R.ID)\n" +
                "ON H.ID = X.IDMENUHIJOS)\n" +
                "ON M.ID = H.IDMENU\n" +
                "WHERE R.ID = ?\n" +
                "AND M.ID = ?";
             String[] params = {rol,menu};
             ArrayList<HashMap<String, Object>> consultar = db.consultar(sql, params);
             
             JSONArray arr = new JSONArray(consultar);

                return arr.toString();
         }catch (SQLException ex) {
            System.out.println(ex);
           throw new Exception(ex.getMessage());
        }
       
     }
}
