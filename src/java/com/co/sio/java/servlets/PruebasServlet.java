/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.servlets;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import static java.lang.System.out;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONArray;



/**
 *
 * @author bmunoz
 */
@WebServlet(name = "PruebasServlet", urlPatterns = {"/PruebasServlet"})
public class PruebasServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet PruebasServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet PruebasServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
           /*FileItemFactory es una interfaz para crear FileItem*/
      
        FileItemFactory file_factory = new DiskFileItemFactory();
            
        List<String> codigo_prestador = new ArrayList<>();
        List<String> fecha_remision = new ArrayList<>();            //DATOS ARCHIVO DE CONTROL
        List<String> codigo_archivo = new ArrayList<>();
        List<String> total_registros = new ArrayList<>();

        List<String> identificacion = new ArrayList<>();
        List<String> numero_ident = new ArrayList<>();
        List<String> codigo_entidad = new ArrayList<>();
        List<String> tipo_usuario = new ArrayList<>();
        List<String> primer_apellido = new ArrayList<>();
        List<String> segundo_apellido = new ArrayList<>();
        List<String> primer_nombre = new ArrayList<>();             //DATOS DE ARCHIVO DE USUARIOS
        List<String> segundo_nombre = new ArrayList<>();
        List<String> edad = new ArrayList<>();
        List<String> unidad_medida = new ArrayList<>();
        List<String> genero = new ArrayList<>();
        List<String> codigo_municipio = new ArrayList<>();
        List<String> zona_residencia = new ArrayList<>();

        List<String> numero_factura_at = new ArrayList<>();
        List<String> codigo_prestador_at = new ArrayList<>();
        List<String> identificacion_at = new ArrayList<>();
        List<String> numero_ident_at = new ArrayList<>();
        List<String> numero_ident_usu_sist = new ArrayList<>();
        List<String> numero_autorizacion = new ArrayList<>();
        List<String> tipo_servicio = new ArrayList<>();             //DATOS DE ARCHIVO DE TRANSACCION
        List<String> codigo_servicio = new ArrayList<>();
        List<String> cantidad_at = new ArrayList<>();
        List<String> valor_unitario_at = new ArrayList<>();
        List<String> valor_total_at = new ArrayList<>();

        List<String> numero_factura_ad = new ArrayList<>();
        List<String> codigo_prestador_ad = new ArrayList<>();
        List<String> codigo_concepto = new ArrayList<>();           //DATOS DE ARCHIVO DETALLE
        List<String> cantidad_ad = new ArrayList<>();
        List<String> valor_unitario_ad = new ArrayList<>();
        List<String> valor_total_ad = new ArrayList<>();

        List<String> data =  new ArrayList<>();                     //ARRAY PARA ENVIAR A LA VISTA COMO JSON
        
        /*ServletFileUpload esta clase convierte los input file a FileItem*/
        ServletFileUpload servlet_up = new ServletFileUpload(file_factory);
        /*sacando los FileItem del ServletFileUpload en una lista */
        List items = null;
        try {
            items = servlet_up.parseRequest(request);
        } catch (FileUploadException ex) {
            Logger.getLogger(PruebasServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
            boolean archivocontrol = false;
            boolean archivousuarios = false;
            boolean archivotransaccion = false;
            boolean archivodetalle = false;
            
        for(int i=0;i<items.size();i++){
            /*FileItem representa un archivo en memoria que puede ser pasado al disco duro*/
            FileItem item = (FileItem) items.get(i);
            String archivo = item.getName();
            
            for(int a= 0 ; a < archivo.length();a++){
                if(archivo.charAt(0)=='U' && archivo.charAt(1)=='S'){
                    archivousuarios = true;
                }
                if(archivo.charAt(0)=='C' && archivo.charAt(1)=='T'){
                    archivocontrol = true;
                }
                if(archivo.charAt(0)=='A' && archivo.charAt(1)=='T'){
                    archivotransaccion = true;
                }
                if(archivo.charAt(0)=='A' && archivo.charAt(1)=='D'){
                    archivodetalle = true;
                }
            }
          
            if (! item.isFormField()){
                    String[] ary = item.getString().split(",");
                    ary = item.getString().split("\n");
                    ary = item.getString().split("\r");
                
                if(archivocontrol){//RIPS DE CONTROL
                    for(int j = 0; j < ary.length; j ++) {
                        String lineas = ary[j];
                        String[] lines = lineas.split(",");
                        //fecha_control.add(lines[1]);
                    }
                    archivocontrol = false;
                }
                if(archivousuarios){//RIPS DE USUARIOS
                    for(int j = 0; j < ary.length; j ++) {
                        String lineas = ary[j];
                        String[] lines = lineas.split(",");
                    }
                    archivousuarios = false;
                }
                if(archivotransaccion){//RIPS DE TRANSACCION
                   for(int j = 0; j < ary.length; j ++) {
                        String lineas = ary[j];
                        String[] lines = lineas.split(",");
                    }
                    archivotransaccion = false;
                }
                if(archivodetalle){//RIPS DE DETALLE
                    for(int j = 0; j < ary.length; j ++) {
                        String lineas = ary[j];
                        String[] lines = lineas.split(",");
                    }
                    archivodetalle = false;
                }        
            }
        }
        //data.add(identificacion.toString());
        //data.add(numero_ident.toString());
        //data.add(fecha_control.toString());
        JSONArray json = new JSONArray(data);

        response.setCharacterEncoding("utf-8");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache,must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.getWriter().print(json);
        response.getWriter().close();
        
        
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
