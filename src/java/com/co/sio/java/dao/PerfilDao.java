/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Perfil;
import com.co.sio.java.utils.SeguridadUtils;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;

/**
 *
 * @author bmunoz
 */
public class PerfilDao {
     DBControl db = new DBControl();
     String sql;
     ResultSet datoSql;
    
    public PerfilDao(){}
    
     public Perfil ListarPerfil(String usuario) throws Exception {
         Perfil perfil = new Perfil();
        HttpSession sesion = null;
          usuario = sesion.getAttribute("USUARIO").toString();
          System.out.println(usuario);
         try {
            sql = "SELECT IDUSUARIO,USUARIO,NOMBRES,APELLIDOS,CORREO,FECHANACIMIENTO,ESTADO,IDROL"
                    + " FROM CUENTASMEDICAS.CMUSUARIOS WHERE USUARIO = ?";
                String[] params = {usuario};
                ArrayList<HashMap<String, Object>> consultar = db.consultar(sql, params);
            
                String idusuario = String.valueOf(consultar.get(0).get("IDUSUARIO"));
                String codusuario = String.valueOf(consultar.get(0).get("USUARIO"));
                String nombres = String.valueOf(consultar.get(0).get("NOMBRES"));
                String apellidos = String.valueOf(consultar.get(0).get("APELLIDOS"));
                String correo = String.valueOf(consultar.get(0).get("CORREO"));
                String fechanacimiento = String.valueOf(consultar.get(0).get("FECHANACIMIENTO"));
                String estado = String.valueOf(consultar.get(0).get("ESTADO"));
                String idrol = String.valueOf(consultar.get(0).get("IDROL"));
              
                perfil.setIdusuario(Integer.parseInt(idusuario));
                perfil.setUsuario(codusuario);
                perfil.setNombres(nombres);
                perfil.setApellidos(apellidos);
                perfil.setCorreo(correo);
                perfil.setFechanacimiento(fechanacimiento);
                perfil.setEstado(Integer.parseInt(estado));
                perfil.setIdrol(Integer.parseInt(idrol));
            
            JSONArray arr = new JSONArray(consultar);
     
            return perfil;
         } catch (SQLException ex) {
            System.out.println(ex);
           throw new Exception(ex.getMessage());
        }
     }
}
