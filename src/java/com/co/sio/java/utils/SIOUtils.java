/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.utils;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author fmoctezuma
 */
public class SIOUtils {

    /**
     *
     * Metodo que permite convertir un <code> ResulSet</code> en una lista
     *
     * @param rs Resulset a convertir
     * @return Arraylist con datos del resulset
     * @throws java.sql.SQLException
     */
    public static ArrayList<HashMap<String, Object>> resultsetToArraylist(ResultSet rs) throws SQLException {
        ArrayList<HashMap<String, Object>> lista = new ArrayList<>();
        ResultSetMetaData md = rs.getMetaData();
        int columnas = md.getColumnCount();

        while (rs.next()) {
            HashMap<String, Object> row = new HashMap<>(columnas);
            for (int i = 1; i <= columnas; ++i) {
                row.put(md.getColumnName(i), rs.getObject(i));
            }
            lista.add(row);
        }
        return lista;
    }

}
