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
        <link rel="stylesheet" href="../../recursos/terceros/bootstrap/css/bootstrap.css" />
        <link rel="stylesheet" href="../../recursos/terceros/fontAwesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="../../recursos/terceros/validetta/validetta.css" />
         <link rel="stylesheet" href="../../recursos/css/general.css" />
         
         <script type="text/javascript" src="../../recursos/terceros/jquery/js/jquery.min.js"></script>
        <script type="text/javascript" src="../../recursos/terceros/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../../recursos/js/general.js"></script>
        <script type="text/javascript" src="../../recursos/terceros/validetta/validetta.js"></script>
        <script type="text/javascript" src="../../recursos/terceros/validetta/validetta-es.js"></script>
    </head>
    <body>
        <header>
            <div class="page-header">
                <img src="../../recursos/img/logo-header-1.png" id="logoheader" alt="Soluciones Integrales de Oficina" title="Soluciones Integrales de Oficina"/> 
                <span id="tituloheader">CUENTAS MÉDICAS</span>
            </div>
        </header><!-- --------------------------------------------- -->
        <section>
            <img class="img-responsive" src="../../recursos/img/logo-sio.png" id="logo" alt="Soluciones Integrales de Oficina" title="Soluciones Integrales de Oficina"/> 
            <h2 class="titulosviews">Configuración</h2>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
                    <div id="formlogin" class="col-md-4">
                        <form role="form" id="formconfiguracion">
                            <div class="form-group">
                              <label for="contrasenaanterior">Ingrese su contraseña anterior</label>
                              <div class="inner-addon left-addon">
                                    <i class="fa fa-lock"></i>
                                    <input type="text" class="form-control" name="contrasenaanterior" data-validetta="required"/>
                                </div>
                              <label for="contrasenanueva">Contraseña Nueva</label>
                              <div class="inner-addon left-addon">
                                    <i class="fa fa-lock"></i>
                                    <input type="text" class="form-control" name="contrasenanueva" data-validetta="required"/>
                                </div>
                              <label for="confirmar">Confirmar Contraseña Nueva</label>
                              <div class="inner-addon left-addon">
                                    <i class="fa fa-lock"></i>
                                    <input type="text" class="form-control" name="confirmar" data-validetta="required"/>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary col-lg-4 botonesfrm" id="btnrecontrasena">Enviar</button>
                        </form>
                     </div>
                     <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
                </div>
           </div>
       </section>
        <div class="corte col-lg-12 col-md-12"></div><!--Temporal mientras se define el layout-->
        <footer class="col-lg-12 col-md-12">
            <div id="footer">
                <p class="copyright">SIO S.A. | Cali: Cra 100 # 14 - 96 Barrio Ciudad Jardín PBX: (57 2) 485 5757 - (572) 485 5758 </p>
                <p class="copyright1">Colombia</p>
            </div>
        </footer><!-- --------------------------------------------- -->
        <script>
             $(document).on('ready',function(){
                $('#formconfiguracion').validetta({
                    realTime : true
                });
            });
         </script>
    </body>
</html>
