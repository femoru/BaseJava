/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Perfil;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 *
 * @author bmunoz
 */
public class PerfilDao {
     DBControl db = new DBControl();
     String sql;
     String sql2;
     ResultSet datoSql;
    
    public PerfilDao(){}
    
     /*public Perfil ListarPerfil(String usuario) throws Exception {
         Perfil perfil = new Perfil();
        HttpSession sesion = null;
          usuario = sesion.getAttribute("USUARIO").toString();
          System.out.println(usuario);
         try {
            sql = "SELECT IDUSUARIO,USUARIO,NOMBRES,APELLIDOS,CORREO,TO_CHAR(FECHANACIMIENTO,'YYYY-MM-DD')"
                    + " AS FECHANACIMIENTO,ESTADO,IDROL"
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
                System.out.println(fechanacimiento);
              
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
     }*/
    
    public boolean Actualizar(Perfil perfil)throws Exception{
        try {
            sql="UPDATE CMUSUARIOS SET USUARIO = ?, NOMBRES = ?, APELLIDOS = ?, "
                    + "CORREO = ?, FECHANACIMIENTO = TO_DATE(?,?) WHERE IDUSUARIO = ?";
            db.conectar();
            db.callableStatement(sql);
            String formato = "YYYY/MM/DD";
            
            db.AsignarParametro(1, perfil.getUsuario(), 1);
            db.AsignarParametro(2, perfil.getNombres(), 1);
            db.AsignarParametro(3, perfil.getApellidos(), 1);
            db.AsignarParametro(4, perfil.getCorreo(), 1);
            db.AsignarParametro(5, perfil.getFechanacimiento(), 1);
            db.AsignarParametro(6, formato, 1);
            db.AsignarParametro(7, Integer.toString(perfil.getIdusuario()), 2);
            
            
            return db.registrar();
        } catch (SQLException e) {
            System.out.println(e);
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }
    }
    
}
