<%-- 
    Document   : PerfilUsuario
    Created on : 23/09/2015, 09:13:09 AM
    Author     : bmunoz
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="es"><!--Temporal mientras se define el layout-->
    <head>
        <title>SIO Cuentas Médicas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="recursos/terceros/validetta/validetta.css" />
        <link rel="stylesheet" href="recursos/terceros/bootstrap_datepicker/css/bootstrap-datetimepicker.css" />
        <link rel="stylesheet" href="recursos/terceros/sweetalert/sweetalert.css" />

         <script type="text/javascript" src="recursos/terceros/validetta/validetta.js"></script>
        <script type="text/javascript" src="recursos/terceros/validetta/validetta-es.js"></script>
        <script type="text/javascript" src="recursos/terceros/momentjs/momentjs.min.js"></script>
        <script type="text/javascript" src="recursos/terceros/bootstrap_datepicker/js/bootstrap-datetimepicker.js"></script>
        <script type="text/javascript" src="recursos/terceros/sweetalert/sweetalert.min.js"></script>
        <script type="text/javascript" src="recursos/js/perfilUsuario.js"></script>
        
    </head>
    <body>
        <div class="col-lg-2 col-md-2 hidden-sm hidden-xs"></div>
        <div class="col-md-6">
            <form  id="frmperfiluser" role="form" method="POST" action="/CuentasMedicas/PerfiilServlet">
                <div class="form-group">
                    <label for="usuario">Usuario</label>
                    <div class="inner-addon left-addon">
                        <i class="fa fa-user"></i>
                        <input type="text" class="form-control" name="usuario" data-validetta="required" value="<%= session.getAttribute("usuario")%>"/>
                    </div>

                    <label for="nombres">Nombres</label>
                    <div class="inner-addon left-addon">
                        <i class="fa fa-italic"></i>
                        <input type="text" class="form-control" name="nombres" data-validetta="required" value="<%= session.getAttribute("Nombres")%>"/>
                    </div>
                    <label for="apellidos">Apellidos</label>
                    <div class="inner-addon left-addon">
                        <i class="fa fa-font"></i>
                        <input type="text" class="form-control" name="apellidos" data-validetta="required" value="<%= session.getAttribute("Apellidos")%>"/>
                    </div>

                    <label for="correo">Correo</label>
                    <div class="inner-addon left-addon">
                        <i class="fa fa-envelope-o"></i>
                        <input type="text" class="form-control" name="correo" data-validetta="required,email" value="<%= session.getAttribute("Correo")%>"/>
                    </div>

                    <label for="fechanacimiento">Fecha Nacimiento</label>
                    <div class="inner-addon left-addon">
                        <i class="fa fa-calendar-check-o"></i>
                        <input type="text" class="form-control datetimepicker1" name="fechanacimiento" data-validetta="required" value="<%= session.getAttribute("FechaNacimiento")%>"/>
                    </div>

                   <!-- <label for="contrasena">Contraseña</label>
                    <div class="inner-addon left-addon">
                        <i class="fa fa-lock"></i>
                        <input type="password" class="form-control" name="contrasena" data-validetta="required" value=""/>
                    </div>

                    <label for="confirmar">Confirmar Contraseña</label>
                    <div class="inner-addon left-addon">
                        <i class="fa fa-keyboard-o"></i>
                        <input type="password" class="form-control" name="confirmar" data-validetta="required,equalTo[contrasena]" value=""/>
                    </div>-->
                    <br/><button type="button" class="btn btn-primary col-lg-4 col-md-4 botonesfrm" id="btnregistrar">Actualizar</button>
                </div>
            </form>
        </div>
        <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
    </body>
</html>


