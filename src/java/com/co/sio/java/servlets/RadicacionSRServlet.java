/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.servlets;

import com.co.sio.java.dao.RadicacionSRDao;
import com.co.sio.java.model.RadicacionSR;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author bmunoz
 */
@WebServlet(name = "RadicacionServlet", urlPatterns = {"/RadicacionServlet"})
public class RadicacionSRServlet extends HttpServlet {

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
            out.println("<title>Servlet RadicacionServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet RadicacionServlet at " + request.getContextPath() + "</h1>");
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
            RadicacionSR radicacion = new RadicacionSR();
            RadicacionSRDao radicaciondao = new RadicacionSRDao();
            
            boolean isset = (request.getParameter("codigo_interno")==null);
            
            if (!isset) {
                String codigo_interno  = request.getParameter("codigo_interno");

                try {
                    System.out.println(codigo_interno);
                    String json = radicaciondao.PrestadorCodigo(codigo_interno);
                    String json2 = radicaciondao.RadicacionCodigo(codigo_interno);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.setHeader("Pragma", "no-cache");
                    response.setHeader("Cache-Control", "no-cache,must-revalidate");
                    response.setHeader("Pragma", "no-cache");
                    response.getWriter().print("["+json+","+json2+"]");
                    response.getWriter().close();
                
                } catch (Exception ex) {
                    Logger.getLogger(RadicacionSRServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
 
             }
            
            boolean isset2 = (request.getParameter("identificacion")==null);
            
            if (!isset2) {
                String identificacion  = request.getParameter("identificacion");

                try {
                    String json = radicaciondao.PrestadorIdentificacion(identificacion);
                    String json2 = radicaciondao.RadicacionIdentificacion(identificacion);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.setHeader("Pragma", "no-cache");
                    response.setHeader("Cache-Control", "no-cache,must-revalidate");
                    response.setHeader("Pragma", "no-cache");
                    response.getWriter().print("["+json+","+json2+"]");
                    response.getWriter().close();
                
                } catch (Exception ex) {
                    Logger.getLogger(RadicacionSRServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
             }
            boolean isset3 = (request.getParameter("cadena")==null);
             if (!isset3) {
                 String cadena  = request.getParameter("cadena");
                 try {
                    String json = radicaciondao.PrestadorNombre(cadena);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.setHeader("Pragma", "no-cache");
                    response.setHeader("Cache-Control", "no-cache,must-revalidate");
                    response.setHeader("Pragma", "no-cache");
                    response.getWriter().print(json);
                    response.getWriter().close();
                 }  catch (Exception ex) {
                    Logger.getLogger(RadicacionSRServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
             }
             boolean isset4 = (request.getParameter("cadena2")==null);
             if (!isset4) {
                 String cadena2  = request.getParameter("cadena2");
                 String codigo_interno  = request.getParameter("codigointerno");

                 try {
                    String json = radicaciondao.RadicacionNombre(cadena2,codigo_interno);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.setHeader("Pragma", "no-cache");
                    response.setHeader("Cache-Control", "no-cache,must-revalidate");
                    response.setHeader("Pragma", "no-cache");
                    response.getWriter().print("["+json+","+json+"]");
                     //System.out.println(json);
                    response.getWriter().close();
                 }  catch (Exception ex) {
                    Logger.getLogger(RadicacionSRServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
             }
             boolean edicion = (request.getParameter("id")==null);
               if (!edicion) {
                try {
                    String idgrilla = request.getParameter("id");
                    if(idgrilla==""){
                        radicacion.setIdradicacion(0);
                    }
                    else if(idgrilla.charAt(0)=='j') {
                        radicacion.setIdradicacion(Integer.parseInt(idgrilla.substring(3)));
                    }else{
                        radicacion.setIdradicacion(Integer.parseInt(idgrilla));
                    }
                    String valor_factura = request.getParameter("valorfactura");
                    valor_factura = valor_factura.replaceAll("\\.",""); 
                    valor_factura = valor_factura.replaceAll("\\,","");
                    radicacion.setFecha_radicacion(request.getParameter("fecharadicacion"));
                    radicacion.setOficina(request.getParameter("oficina"));
                    radicacion.setPrefijo_factura(request.getParameter("prefijofactura"));
                    radicacion.setSufijo_factura(request.getParameter("sufijofactura"));
                    radicacion.setNumero_factura(request.getParameter("numerofactura"));
                    radicacion.setFecha_factura(request.getParameter("fechafactura"));
                    radicacion.setValor_factura(Integer.parseInt(valor_factura));
                    radicacion.setMotivo_estado("PROCESO");
                    radicacion.setEstado_factura("PROCESO");
                    radicacion.setTipo_radicacion(request.getParameter("tiporadicacion"));
                    radicacion.setIdprestador(Integer.parseInt(request.getParameter("idprestador")));
                    
                    radicaciondao.Insertar(radicacion);
                } catch (Exception ex) {
                    Logger.getLogger(RadicacionSRServlet.class.getName()).log(Level.SEVERE, null, ex);
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
