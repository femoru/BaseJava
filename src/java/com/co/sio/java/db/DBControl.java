/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.db;

import com.co.sio.java.utils.SIOUtils;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
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

    static {
        try {
            InitialContext ctx = new InitialContext();
            ds = (DataSource) ctx.lookup("jdbc/SaludPool");
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
        OracleDataSource ods = DBControl.ds.unwrap(OracleDataSource.class);
        this.conn = ods.getConnection();
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
        this.conn.close();
        this.query.close();
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

        for (int i = 0; i < params.length; i++) {
            String param = params[i];
            this.query.setString(i + 1, param);
        }

        this.rs = this.query.executeQuery();
        this.rsmd = rs.getMetaData();

        ArrayList<HashMap<String, Object>> lista = SIOUtils.resultsetToArraylist(rs);
        desconectar();

        return lista;
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
