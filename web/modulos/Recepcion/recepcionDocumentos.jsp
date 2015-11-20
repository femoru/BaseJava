<%-- 
    Document   : recepcionDocumentos
    Created on : 22/09/2015, 09:51:26 AM
    Author     : bmunoz
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>

        <title>Recepción de Documentos</title>
        <meta charset="UTF-8" />
        <link rel="stylesheet" type="text/css" href="recursos/terceros/bootstrap_datepicker/css/bootstrap-datetimepicker.css" />
        <link rel="stylesheet" type="text/css" href="recursos/css/recepcionDocumentos.css" />
        <script type="text/javascript" src="recursos/terceros/base64/jquery.base64.js"></script>
        <script type="text/javascript" src="recursos/terceros/momentjs/momentjs.min.js"></script>
        <script type="text/javascript" src="recursos/terceros/bootstrap_datepicker/js/bootstrap-datetimepicker.min.js"></script>
        <script type="text/javascript" src="recursos/terceros/jspdf/jspdf.min_1.js"></script>
        <script type="text/javascript" src="recursos/terceros/jspdf/jspdf.plugin.autotable.js"></script>
        <script type="text/javascript" src="recursos/js/recepcionDocumentos.js"></script>
    </head>
    <div class="contenttablas">
        <table id="jqGrid" class="tablasdatos"></table>
        <div id="jqGridPager"></div>
    </div>
    <div id="tabladatos"></div>
</html>
