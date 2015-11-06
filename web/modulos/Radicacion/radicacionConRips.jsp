<%-- 
    Document   : radicacionConRips
    Created on : 25/09/2015, 08:30:58 AM
    Author     : bmunoz
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
    <head>
        <title>Radicación de Documentos</title>
        <link rel="stylesheet" type="text/css" href="recursos/terceros/bootstrap_datepicker/css/bootstrap-datetimepicker.css" />
        <link rel="stylesheet" type="text/css" href="recursos/css/radicacion.css" />
        
        <script type="text/javascript" src="recursos/terceros/bootstrap-typeahead/bootstrap3-typeahead.js"></script>
        <script type="text/javascript" src="recursos/terceros/momentjs/momentjs.min.js"></script>
        <script type="text/javascript" src="recursos/terceros/bootstrap_datepicker/js/bootstrap-datetimepicker.js"></script>
        <script type="text/javascript" src="recursos/js/radicacionConRips.js"></script>
    </head>
    <body>
        <form id="frminfoprestador" role="form">
            <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Información del Prestador</legend>
                    <div class="control-group">
                        <div class="row contentinforow1">
                            <div class="col-lg-4 col-md-4 ">
                                <input type="checkbox" name="ipsadscrita"  class="infocheckbox"/>
                                <label for="ipsadscrita">IPS Adscrita</label>
                            </div>
                            <div class="col-lg-4 col-md-4 ">
                                <input type="checkbox" name="consultorio" class="infocheckbox"/>
                                <label for="consultorio">Consultorio Médico</label>
                             </div>
                            <div class="col-lg-4 col-md-4 ">
                                <div class="contentcodinterno">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 ">
                                            <label for="codinterno">Código Interno</label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 ">
                                            <input type="text" class="inputsradconrips form-control" name="codinterno" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row contentinforow2">
                            <div class="col-lg-6 col-md-6 ">
                                <label for="tipoidentificacion">Identificación</label>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 ">
                                        <select class="form-control" name="tipoidentificacion">
                                            <option value="1">NIT</option>
                                            <option value="2">Cédula</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                         </select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 ">
                                        <input type="text" class="inputsradconrips form-control" name="numidentificacion" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 ">
                                <label for="nombreprestador">Nombre</label>
                                <input type="text" class=" inputsradconrips form-control" id="inputrnombre" name="nombreprestador" />
                            </div>
                        </div>
                    </div>
                    <p id="datos"></p>
                    <div class="contenttablas">
                        <table id="jqGrid" class="tablasdatos"></table>
                    </div>
                </fieldset>
        </form>
         
        <form id="frminfolote" role="form">
            <fieldset class="scheduler-border">
                <legend class="scheduler-border">Información del Lote</legend>
                <div class="control-group">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 ">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 ">
                                    <label for="numerolote">Número de Lote</label>
                                </div>
                                <div class="col-lg-6 col-md-6 ">
                                    <input type="text" class=" inputsradconrips form-control" id="inputrnombre" name="numerolote" />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 ">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 ">
                                     <label for="estadolote">Estado del Lote</label>
                                 </div>
                                 <div class="col-lg-6 col-md-6 ">
                                     <input type="text" class=" inputsradconrips form-control" id="inputrnombre" name="estadolote" />
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        
        <form role="form">
            <fieldset class="scheduler-border">
                <legend class="scheduler-border">Ingreso de la Factura</legend>
                <div class="control-group">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 ">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 ">
                                    <label for="cantidadprefijo">Cantidad de Prefijo</label>
                                </div>
                                <div class="col-lg-6 col-md-6 ">
                                     <input type="text" class=" inputsradconrips form-control" id="inputrnombre" name="cantidadprefijo" />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 ">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 ">
                                    <label for="plan">Plan</label>
                                </div>
                                <div class="col-lg-6 col-md-6 ">
                                    <select class="form-control" name="plan">
                                            <option value="1">POS</option>
                                            <option value="2">FAMILIAR</option>
                                            <option value="3">EXCELENCIA</option>
                                            <option value="4">QUIMBAYA</option>
                                            <option value="5">BIENESTAR</option>
                                            <option value="6">SUBSIDIADO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 ">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 ">
                                     <label for="tipocuenta">Tipo de Cuenta</label>
                                </div>
                                <div class="col-lg-6 col-md-6 ">
                                    <select class="form-control" name="tipocuenta">
                                            <option value="1">MEDICAMENTOS DE USO AMBULATORIO</option>
                                            <option value="2">URGENCIAS</option>
                                            <option value="3">HOSPITALIZACION-  SERVICIOS DE INTERNACION Y/O CIRUGIA HOSPITALARIA</option>
                                            <option value="4">CAPITACION</option>
                                            <option value="5">NO POS AUTORIZADOS POR C.T.C. O TUTELA (MEDICAMENTOS - PROCEDIMIENTOS)</option>
                                            <option value="6">FACTURA GLOBAL</option>
                                            <option value="7">CIRUGIAS AMBULATORIAS</option>
                                            <option value="8">SERVICIOS AMBULATORIOS</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contenttablas">
                    <table id="jqGrid2" class="tablasdatos"></table>
                    <div id="jqGridPager"></div>
                </div>
                <div class="iconosedicion">
                    <i class="fa fa-list-alt"  data-toggle="tooltip" data-placement="top" title="Generar Reporte"></i>
                    <i class="fa fa-qrcode"  data-toggle="tooltip" data-placement="top" title="Imprimir Stickers"></i>
                    <i class="fa fa-upload" data-toggle="tooltip" data-placement="top" title="Cargar RIPS"></i>
                    <i class="fa fa-briefcase" data-toggle="tooltip" data-placement="top" title="Guardar Parcial"></i>
                    <i class="fa fa-floppy-o" data-toggle="tooltip" data-placement="top" title="Guardar Todo"></i>
                    <i class="fa fa-undo" data-toggle="tooltip" data-placement="top" title="Deshacer"></i>
                    <i class="fa fa-arrow-left" data-toggle="tooltip" data-placement="top" title="Página Anterior"></i>
		</div>
            </fieldset>
        </form>
    </body>
</html>