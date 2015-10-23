/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.db;

import com.co.sio.java.utils.SIOUtils;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import oracle.jdbc.pool.OracleDataSource;

/**
 * Clase controladora de la base de datos
 * @author fmoctezuma
 */
public class DBControl {

    private static DataSource ds;

    private Connection conn;
    private PreparedStatement query;
    private ResultSet rs;
    private ResultSetMetaData rsmd;
    private CallableStatement st;
    private boolean oldStateOfAutoCommit = false;
    private final int oldStateOfTransactionIsolation = Connection.TRANSACTION_READ_COMMITTED;

    static {
        try {
            InitialContext ctx = new InitialContext();
            ds = (DataSource)ctx.lookup("java:comp/env/jdbc/myoracle");
           
            
        } catch (NamingException ex) {
            Logger.getLogger(DBControl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Obtiene una conexion del pool de conexiones para ser trabajada
     *
     * @throws SQLException
     */
    public void conectar() throws SQLException {
        
        //DataSource ods = DBControl.ds.unwrap(DataSource.class);
        this.conn = ds.getConnection();
        
        
    }

    /**
     * Realiza la consulta proporcionada en el query alimentada por el setQuery(String consulta)
     *
     * @return true si se logro realizar la consulta
     * @throws SQLException en caso de que no se pueda realizar la consulta
     */
    public boolean consultar() throws SQLException {

        try {
            this.rs = this.query.executeQuery();
            this.rsmd = rs.getMetaData();
            return true;
        } catch (SQLException ex) {
            throw ex;
        }
    }

    /**
     * Termina con la conexion activa y cierra el flujo de datos (<code>ResulSet</code>)
     *
     * @throws SQLException
     */
    public void desconectar() throws SQLException {

        if(this.query != null){
            this.query.close();
        }
         this.conn.close();  
    }

    /**
     * Permite realizar una consulta a la base de datos
     *
     * @param consulta query que se desea consultar
     * @param params parametros ordenados que lleva la consulta
     * @return <code>ArrayList</code> de <code>HashMap</code> con clave <code>String</code> y valor
     * <code>Object</code> Lista con
     * @throws SQLException si ocurre algun error de sql
     */
    public ArrayList<HashMap<String, Object>> consultar(String consulta, String[] params) throws SQLException {
        conectar();
       
        this.query = this.conn.prepareStatement(consulta);
        if(params != null){
            for (int i = 0; i < params.length; i++) {
                String param = params[i];
                this.query.setString(i + 1, param);
            }
        }

        this.rs = this.query.executeQuery();
        this.rsmd = rs.getMetaData();

        ArrayList<HashMap<String, Object>> lista = SIOUtils.resultsetToArraylist(rs);
        desconectar();

        return lista;
    }
    
    public void callableStatement(String Sql) throws SQLException {
        try {
            //System.out.println(Sql);
            this.st = this.conn.prepareCall(Sql);
        } catch (SQLException e) {
            throw e;
        }
        
    }
    
     public void AsignarParametro(int parametro, String valor, int tipo) throws SQLException, ParseException {

        DateFormat sdf;
        java.util.Date date;

        switch (tipo) {
            case 1:
                this.st.setString(parametro, valor);
                break;
            case 2:
                this.st.setInt(parametro, Integer.parseInt(valor));
                break;
            case 3:
                sdf = new SimpleDateFormat("yyyy-MM-dd");
               // sdf = new SimpleDateFormat("yyyy/mm/dd hh24:mi");
                date = sdf.parse(valor);
                this.st.setDate(parametro, Date.valueOf(sdf.format(date)));
                break;
            case 4:
                sdf = new SimpleDateFormat("dd/MM/yyyy");
                //sdf = new SimpleDateFormat("yyyy/mm/dd hh24:mi");
                date = sdf.parse(valor);
                this.st.setDate(parametro, Date.valueOf(sdf.format(date)));
                break;
            case 5:
                this.st.setDouble(parametro, Double.parseDouble(valor));
                break;
        }
    }
    
       public boolean registrar() {

        boolean correcto = false;
            
        try {
            st.execute();
            correcto = true;

        } catch (SQLException e) {

            System.out.println(e);
           
        }
        return correcto;
    }
       
       public void exitoTransaccion() {

        try {
            this.conn.commit();
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public void end() {
        try {
            this.conn.setAutoCommit(this.oldStateOfAutoCommit);
            this.conn.setTransactionIsolation(this.oldStateOfTransactionIsolation);
            this.conn.close();
        } catch (SQLException e) {
            System.out.println(e);
        }
    }
    
       public void fallaTransaccion() {

        try {
            this.conn.rollback();
        } catch (SQLException e) {
            System.out.println(e);
        }
    }


    // <editor-fold defaultstate="collapsed" desc="getters y setters propios ">
    /**
     * Retorna el resultSet asociado a la consulta
     *
     * @return ResultSet con los datos de la consulta
     */
    public ResultSet getRs() {
        return rs;
    }

    /**
     * Obtiene los metadatos del resulset asociado a la consulta
     *
     * @return ResultSetMetaData con datos de la consulta
     */
    public ResultSetMetaData getRsmd() {
        return rsmd;
    }

    /**
     * Obtiene la consulta lista para editar los parametros
     *
     * @return PreparedStatement para editar los atibutos o parametros de la consulta
     * @see PreparedStatement
     */
    public PreparedStatement getQuery() {
        return query;
    }

    /**
     * Edita la consulta que se va a realizar
     * @param query Consulta que va a realizar
     * @throws SQLException
     */
    public void setQuery(String query) throws SQLException {
        this.query = this.conn.prepareStatement(query);
    }
    // </editor-fold>
    
}
