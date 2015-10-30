<%-- 
    Document   : index
    Created on : 16/10/2015, 10:12:27 AM
    Author     : bmunoz
--%>
<!DOCTYPE html>
<html lang="es"><!--Temporal mientras se define el layout-->
    <head>
        <title>SIO Cuentas M�dicas</title>
        <link rel="shortcut icon" href="recursos/img/favicon.ico" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="recursos/terceros/bootstrap/css/bootstrap.css" />
        <link rel="stylesheet" href="recursos/terceros/fontAwesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="recursos/terceros/validetta/validetta.css" />
        <link rel="stylesheet" href="recursos/css/general.css" />
         
        <script type="text/javascript" src="recursos/terceros/jquery/js/jquery.min.js"></script>
        <script type="text/javascript" src="recursos/terceros/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="recursos/js/general.js"></script>
        <script type="text/javascript" src="recursos/terceros/validetta/validetta.js"></script>
        <script type="text/javascript" src="recursos/terceros/validetta/validetta-es.js"></script>
    </head>
    <body>
        <% session.invalidate(); %>
        <header>
            <div class="page-header">
                <img src="recursos/img/logo-header-1.png" id="logoheader" alt="Soluciones Integrales de Oficina" title="Soluciones Integrales de Oficina"/> 
                <span id="tituloheader">CUENTAS M�DICAS</span>
            </div>
        </header><!-- --------------------------------------------- -->
        <section>
            <img class="img-responsive" src="recursos/img/logo-sio.png" id="logo" alt=""/>
            <br/><div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
                    <div id="formlogin" class="col-md-4">
                        <form role="form" id="formvendetta" action="LoginServlet" method="POST" name="loginForm"> 
                             <div class="alert alert-danger mensajeserror" role="alert" style="display:<%= request.getAttribute("block") %>;">
                              <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                              <span class="sr-only">Error:</span>
                              <%= request.getAttribute("error") %>
                            </div>
                            <div class="form-group">
                              <label for="usuario">Usuario</label>
                              <div class="inner-addon left-addon">
                                    <i class="fa fa-user"></i>
                                    <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Usuario" data-validetta="required" value=""/>
                                </div>
                            </div>
                            
                            <div class="form-group">
                              <label for="password">Contrase�a</label>
                              <div class="inner-addon left-addon">
                                    <i class="fa fa-lock"></i>
                                    <input type="password" class="form-control" id="password" name="contrasena" placeholder="Contrase�a" data-validetta="required" value="">
                               </div>
                            </div>
                            
                            <div class="checkbox">
                                <label>
                                  <input type="checkbox">Recordarme
                                </label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary col-lg-4 col-md-4 col-sm-12 col-xs-12 botonesfrm">Ingresar</button>
                            <div id="forgetpassword"><a href="modulos/administracion/recuperarContrasena.jsp">Olvidaste tu contrase�a?</a></div>
                           <!-- <div id="linkregistarse"><a href="#">Registrarse</a></div>-->
                        </form>
                           
                    </div>
                    <div class="col-lg-4 col-md-4 hidden-sm hidden-xs"></div>
                </div>
           </div>
        </section>
        <div class="corte col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
        <div class="corte col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
        <footer class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div id="footer">
                <p class="copyright">SIO S.A. | Cali: Cra 100 # 14 - 96 Barrio Ciudad Jard�n PBX: (57 2) 485 5757 - (572) 485 5758 </p>
                <p class="copyright1">Colombia</p>
            </div>
        </footer>
         <script>
             $(document).on('ready',function(){
                $('#formvendetta').validetta({
                    realTime : true
                });
                $("#usuario").on("focus",function(){
                    $(".mensajeserror").css("display","none");
                });
                $("#password").on("focus",function(){
                    $(".mensajeserror").css("display","none");
                });
            });
         </script>
    </body>
</html>
