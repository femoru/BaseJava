<%-- 
    Document   : configuracionUsuario
    Created on : 21/09/2015, 10:09:41 AM
    Author     : bmunoz
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es"><!--Temporal mientras se define el layout-->
    <head>
        <title>SIO Cuentas Médicas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="recursos/terceros/validetta/validetta.css" />
         <link rel="stylesheet" href="recursos/css/general.css" />
         <link rel="stylesheet" href="recursos/terceros/sweetalert/sweetalert.css" />
         
        <script type="text/javascript" src="recursos/terceros/validetta/validetta.js"></script>
        <script type="text/javascript" src="recursos/terceros/validetta/validetta-es.js"></script>
        <script type="text/javascript" src="recursos/terceros/sweetalert/sweetalert.min.js"></script>
        <script type="text/javascript" src="recursos/js/configuracionUsuario.js"></script>
        
    </head>
    <body>
  
        <section>
            <div class="col-lg-2 col-md-2 hidden-sm hidden-xs"></div>
            <div id="formlogin" class="col-md-6">
                <form role="form" id="formconfiguracion" method="POST" action="#">
                    <div class="form-group">
                      <label for="contrasenaanterior">Ingrese su contraseña anterior</label>
                      <div class="inner-addon left-addon">
                            <i class="fa fa-lock"></i>
                            <input type="password" class="form-control" id="contrasenaanterior" value="" name="contrasenaanterior" data-validetta="required"/><br/>
                            <p id="spanverificando"></p>
                      </div>
                      <div id="contentconfig">
                        
                        </div>
                      </div>
                    <input type="hidden" value="newpass" name="oper" />
                   
                </form>
             </div>
             <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
       </section>
       <div class="corte col-lg-12 col-md-12"></div><div class="corte col-lg-12 col-md-12"></div>
    </body>
</html>
