/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.dao;

import com.co.sio.java.db.DBControl;
import com.co.sio.java.model.Usuarios;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONArray;

/**
 *
 * @author bmunoz
 */
public class UsuariosDao {
     DBControl db = new DBControl();
     String sql;
     ResultSet datoSql;
     
     public UsuariosDao() { 
        Usuarios usuarios =  new Usuarios();
    }
     
     public String ListaUsuarios()throws Exception{
        try {
             sql = "SELECT U.IDUSUARIO,U.USUARIO,U.CONTRASENA,U.NOMBRES,U.APELLIDOS,U.CORREO,U.FECHANACIMIENTO,\n" +
                "(SELECT NOMBRES FROM CMUSUARIOS WHERE IDUSUARIO = U.IDUSUARIOCREA)AS CREADOPOR,\n" +
                "U.FECHACREACION,U.ULTIMOACCESO,U.ESTADO,R.ROL\n" +
                "FROM CMUSUARIOS U INNER JOIN CMROLES R\n" +
                "ON U.IDROL = R.ID";
            ArrayList<HashMap<String, Object>> consultar = db.consultar(sql,null);
            JSONArray arr = new JSONArray(consultar);

            return arr.toString();
              
        } catch (SQLException ex) {
            System.out.println(ex);
           throw new Exception(ex.getMessage());
        }

    }
    public boolean Insertar(Usuarios usuarios) throws Exception{
        try {
            sql = "INSERT INTO CMUSUARIOS (USUARIO, NOMBRES, APELLIDOS, CONTRASENA, CORREO, FECHANACIMIENTO,\n" +
                " IDUSUARIOCREA, FECHACREACION, ESTADO, IDROL) \n" +
                " VALUES (?, ?, ?, ?, ?,\n" +
                "TO_DATE(?,?), ?, SYSDATE,\n" +
                " ?, ?)";
            
            db.conectar();
            db.callableStatement(sql);
            String formato = "YYYY/MM/DD HH24:MI";
            
            db.AsignarParametro(1, usuarios.getUsuario(), 1);
            db.AsignarParametro(2, usuarios.getNombres(), 1);
            db.AsignarParametro(3, usuarios.getApellidos(), 1);
            db.AsignarParametro(4, usuarios.getContrasena(), 1);
            db.AsignarParametro(5, usuarios.getCorreo(), 1);
            db.AsignarParametro(6, usuarios.getFechanacimiento(), 1);
            db.AsignarParametro(7, formato, 1);
            db.AsignarParametro(8, Integer.toString(usuarios.getIdusuario()), 2);
            db.AsignarParametro(9, Integer.toString(usuarios.getEstado()), 2);
            db.AsignarParametro(10, Integer.toString(usuarios.getIdrol()), 2);
            
            return db.registrar();
       } catch (SQLException ex) {
            System.out.println(ex);
            throw new Exception(ex.getMessage());
        }finally{
            db.desconectar();
        }
    }
    public boolean Actualizar (Usuarios usuarios) throws Exception{
        try {
            sql="UPDATE CMUSUARIOS SET USUARIO = ?, NOMBRES = ?, APELLIDOS = ?, CONTRASENA = ?, "
                    + "CORREO = ?, FECHANACIMIENTO = TO_DATE(?,?),"
                    + "IDROL = ?, ESTADO = ? WHERE IDUSUARIO = ?";
            db.conectar();
            db.callableStatement(sql);
            String formato = "YYYY/MM/DD HH24:MI";
            
            db.AsignarParametro(1, usuarios.getUsuario(), 1);
            db.AsignarParametro(2, usuarios.getNombres(), 1);
            db.AsignarParametro(3, usuarios.getApellidos(), 1);
            db.AsignarParametro(4, usuarios.getContrasena(), 1);
            db.AsignarParametro(5, usuarios.getCorreo(), 1);
            db.AsignarParametro(6, usuarios.getFechanacimiento(), 1);
            db.AsignarParametro(7, formato, 1);
            db.AsignarParametro(8, Integer.toString(usuarios.getIdrol()), 2);
            db.AsignarParametro(9, Integer.toString(usuarios.getEstado()), 2);
            db.AsignarParametro(10, Integer.toString(usuarios.getIdusuario()), 2);
            
            return db.registrar();
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }
    }
    public boolean Borrar(Usuarios usuarios) throws Exception{
        try {
            sql="UPDATE CMUSUARIOS SET ESTADO = 2 WHERE IDUSUARIO = ?";
            db.conectar();
            db.callableStatement(sql);
            db.AsignarParametro(1, Integer.toString(usuarios.getIdusuario()), 2);
            return db.registrar();
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }finally{
            db.desconectar();
        }
    }

}
