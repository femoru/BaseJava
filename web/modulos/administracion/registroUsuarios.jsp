<%-- 
    Document   : registroUsuarios
    Created on : 21/09/2015, 08:59:41 AM
    Author     : bmunoz
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es"><!--Temporal mientras se define el layout-->
    <head>
        <title>Registro de Usuarios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="recursos/terceros/validetta/validetta.css" />

        <script type="text/javascript" src="recursos/terceros/validetta/validetta.js"></script>
        <script type="text/javascript" src="recursos/terceros/validetta/validetta-es.js"></script>
        <script type="text/javascript" src="recursos/js/registroUsuarios.js"></script>
    </head>
    <body>
        <%
            if (null == session.getAttribute("usuario")) {
                response.sendRedirect("index.jsp");
            }
        %>
        <section>
            <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
             <div class="col-md-4">
                 <!--<h2 class="titulosviews">Registro de Usuarios</h2>-->
                 <form method="" action="" id="frmregistrousers" role="form">
                     <div class="form-group">
                         <label for="idusuario">Identificación</label>
                         <div class="inner-addon left-addon">
                             <i class="fa fa-credit-card"></i>
                             <input type="text" class="form-control" name="idusuario" data-validetta="required,number" />
                         </div>

                         <label for="usuario">Usuario</label>
                         <div class="inner-addon left-addon">
                             <i class="fa fa-user"></i>
                             <input type="text" class="form-control" name="usuario" data-validetta="required"/>
                         </div>

                         <label for="correo">Correo</label>
                         <div class="inner-addon left-addon">
                             <i class="fa fa-envelope-o"></i>
                             <input type="text" class="form-control" name="correo" data-validetta="required,email"/>
                         </div>

                         <label for="contrasena">Contraseña</label>
                         <div class="inner-addon left-addon">
                             <i class="fa fa-lock"></i>
                             <input type="password" class="form-control" name="contrasena" data-validetta="required"/>
                         </div>
                         <label for="confirmar">Confirmar Contraseña</label>
                         <div class="inner-addon left-addon">
                             <i class="fa fa-keyboard-o"></i>
                             <input type="password" class="form-control" name="confirmar" data-validetta="required,equalTo[contrasena]" />
                         </div>
                         <div class="form-group">
                             <label for="sel1">Seleccione el Rol:</label>
                             <select class="form-control" id="selectroles" data-validetta="required">
                             </select>
                        </div>
                         <br/><button type="submit" class="btn btn-primary col-lg-4 col-md-4 col-sm-12 col-xs-12 botonesfrm" id="btnregistrar">Registrar</button>
                     </div>
                 </form>
             </div>
             <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
        </section>
    </body>
</html>