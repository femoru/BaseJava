<%-- 
    Document   : getRoles
    Created on : 26/10/2015, 03:31:04 PM
    Author     : bmunoz
--%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="com.co.sio.java.dao.RolesDao"%>
<%
    response.setContentType("text/html;charset=UTF-8");
    RolesDao rolesdao = new RolesDao();
    JSONArray arr = new JSONArray(rolesdao.ListaRoles());
    response.getWriter().printf("<select>");
        for (int i = 0; i < arr.length(); ++i) {
            JSONObject rec = arr.getJSONObject(i);
            int id = rec.getInt("ID");
            String rol = rec.getString("ROL");
            response.getWriter().printf("<option value=\"" +id+ "\">" + rol + "</option>");
        }
    response.getWriter().printf("</select>");
    

%>