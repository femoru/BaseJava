/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.co.sio.java.servlets;

import com.co.sio.java.dao.LoginDao;
import com.co.sio.java.dao.MenuDao;;
import com.co.sio.java.model.Usuarios;
import java.io.IOException;
import static java.lang.System.out;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author bmunoz
 */
@WebServlet(name = "LoginServlet", urlPatterns = {"/LoginServlet"})
public class LoginServlet extends HttpServlet {

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
       // processRequest(request, response);
        try {
            Usuarios usuarios =  new Usuarios();
           // MenuDao menudao = new MenuDao();
           // Menu menu = new Menu();
            usuarios.setUsuario(request.getParameter("usuario"));
            usuarios.setContrasena(request.getParameter("contrasena"));
            LoginDao login = new LoginDao();
            
            usuarios = login.validarLogin(usuarios.getUsuario(), usuarios.getContrasena());
            
            if (usuarios.getMensajes()!= null) {
                request.setAttribute("block","block");
                request.setAttribute("error",usuarios.getMensajes());
                request.getRequestDispatcher("index.jsp").forward(request, response);
            }else{
                HttpSession sesion = request.getSession();
                sesion.setMaxInactiveInterval(18000); //-1 la sesion nunca expira
                usuarios.setUsuario(request.getParameter("usuario"));
                sesion.setAttribute("idusuario", usuarios.getIdusuario());
                sesion.setAttribute("usuario", usuarios.getUsuario());
                sesion.setAttribute("Nombres", usuarios.getNombres());
                sesion.setAttribute("Apellidos", usuarios.getApellidos());
                sesion.setAttribute("Correo", usuarios.getCorreo());
                sesion.setAttribute("FechaNacimiento", usuarios.getFechanacimiento());
                sesion.setAttribute("Idrol", usuarios.getIdrol());
                /*Object  data = "hello world";
                 request.setAttribute("data", data);*
                
                MenuDao menudao =new MenuDao();
                String usuario = sesion.getAttribute("usuario").toString();
                JSONArray json = new JSONArray(menudao.Crearmenu(usuario));
                String Idrol =  sesion.getAttribute("Idrol").toString();
                
               Object data = "";
                request.setAttribute("data", data);
                 
                 request.getRequestDispatcher("home.jsp").forward(request, response);*/

                response.sendRedirect("home.jsp");
            } 
        } catch (Exception e) {
            System.out.println(e);
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
    }

}
