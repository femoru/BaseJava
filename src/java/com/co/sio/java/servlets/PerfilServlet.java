/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.servlets;

import com.co.sio.java.dao.PerfilDao;
import com.co.sio.java.model.Perfil;
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
@WebServlet(name = "PerfiilServlet", urlPatterns = {"/PerfiilServlet"})
public class PerfilServlet extends HttpServlet {

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
            out.println("<title>Servlet PerfiilServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>hello</h1>");
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
        
        PerfilDao perfildao = new PerfilDao();
        Perfil perfil = new Perfil();
        HttpSession sesion = request.getSession();
        Integer userid = Integer.parseInt(sesion.getAttribute("idusuario").toString());
        
        perfil.setUsuario(request.getParameter("usuario"));
        perfil.setNombres(request.getParameter("nombres"));
        perfil.setApellidos(request.getParameter("apellidos"));
        perfil.setCorreo(request.getParameter("correo"));
        perfil.setFechanacimiento(request.getParameter("fechanacimiento"));
        perfil.setIdusuario(userid);
        Integer idrol = Integer.parseInt(sesion.getAttribute("Idrol").toString());
        
        try {
          
            perfildao.Actualizar(perfil);
                sesion.setAttribute("idusuario", perfil.getIdusuario());
                sesion.setAttribute("usuario", perfil.getUsuario());
                sesion.setAttribute("Nombres", perfil.getNombres());
                sesion.setAttribute("Apellidos", perfil.getApellidos());
                sesion.setAttribute("Correo", perfil.getCorreo());
                sesion.setAttribute("FechaNacimiento", perfil.getFechanacimiento());
                sesion.setAttribute("Idrol", idrol);
                
                  System.out.println(sesion.getAttribute("Idrol"));
                response.sendRedirect("home.jsp");
                
                
        } catch (Exception ex) {
            Logger.getLogger(PerfilServlet.class.getName()).log(Level.SEVERE, null, ex);
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
