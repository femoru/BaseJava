/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.servlets;

import com.co.sio.java.dao.RecepcionDao;
import com.co.sio.java.model.Recepcion;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author bmunoz
 */
@WebServlet(name = "RecepcionServlet", urlPatterns = {"/RecepcionServlet"})
public class RecepcionServlet extends HttpServlet {

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
            out.println("<title>Servlet RecepcionServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet RecepcionServlet at " + request.getContextPath() + "</h1>");
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
        try{
            
            RecepcionDao recepcion =  new RecepcionDao();//INSTANCIA DEL MODELO
            String json = recepcion.ListaRecepcion(); //METODO PARA LISTAR DATOS
            
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache,must-revalidate");
            response.setHeader("Pragma", "no-cache");
            response.getWriter().print(json);
            response.getWriter().close();
        }
        catch(Exception e){
           
        }
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
        
        RecepcionDao recepciondao =  new RecepcionDao();//INSTANCIA DEL MODELO
        Recepcion recepcion=  new Recepcion();//INSTANCIA PARA INICIALIZAR Y OBTENER LAS VARIABLES A OBTENER O GUARDAR
        

        String operacion =  request.getParameter("oper");//VARIABLE QUE ENVIA JQGRID PARA OPERACIONES
   
        //boolean isSet = (request.getParameter("id") == null);
       String id = request.getParameter("id");
       
        if(id.charAt(0)== '_'){
            System.out.println("is empty");
        }else{
           recepcion.setId(Integer.parseInt(request.getParameter("id")));
        }
       if (operacion.charAt(0) != 'd'){
        recepcion.setFecha_recibido(request.getParameter("FECHA_RECIBIDO"));
        recepcion.setRadicacion(request.getParameter("RADICACION"));
        recepcion.setNit(request.getParameter("NIT"));
        recepcion.setPrestador(request.getParameter("PRESTADOR"));
        recepcion.setRemitente(request.getParameter("REMITENTE"));
        recepcion.setFecha_entrega(request.getParameter("FECHA_ENTREGA"));
        recepcion.setTipo_documento(Integer.parseInt(request.getParameter("TIPO_DOCUMENTO")));
        recepcion.setNumero_guia(request.getParameter("NUMERO_GUIA"));
        recepcion.setCd(request.getParameter("CD"));
        recepcion.setUsb(request.getParameter("USB"));
        recepcion.setDetalle(request.getParameter("DETALLE"));
        recepcion.setEntregado_a(request.getParameter("ENTREGADO_A"));
        recepcion.setEntregado_por(request.getParameter("ENTREGADO_POR"));
        //recepcion.setIdusuario(Integer.parseInt(request.getParameter("IDUSUARIO")));
       }else{
           HttpSession sesion = request.getSession();
           recepcion.setIdusuario(Integer.parseInt(sesion.getAttribute("usuario").toString()));
       }
      
        
        if (operacion.charAt(0) == 'a') { //CONTROLADOR PARA LAS OPERACIONES ENVIADAS POR EL USUARIO
            try {
                recepciondao.insertar(recepcion);
            } catch (Exception ex) {
                Logger.getLogger(RecepcionServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        if(operacion.charAt(0) == 'e'){
           try {
                recepciondao.actualizar(recepcion);
            } catch (Exception ex) {
                Logger.getLogger(RecepcionServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        if(operacion.charAt(0) == 'd'){
            try {
                recepciondao.borrar(recepcion);
            } catch (Exception ex) {
                Logger.getLogger(RecepcionServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
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
