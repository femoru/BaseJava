<%-- 
    Document   : Pruebas
    Created on : 5/10/2015, 03:39:50 PM
    Author     : bmunoz
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
    <head>
        <title>Pruebas</title>
        <link rel="stylesheet" type="text/css" href="recursos/terceros/bootstrap_datepicker/css/bootstrap-datetimepicker.css" />
       <!-- <link rel="stylesheet" type="text/css" href="recursos/terceros/jquery-ui/jquery-ui.css" />-->
        <link rel="stylesheet" type="text/css" href="recursos/css/radicacion.css" />
        
        <script type="text/javascript" src="recursos/terceros/bootstrap-typeahead/bootstrap3-typeahead.js"></script>
        <script type="text/javascript" src="recursos/terceros/momentjs/momentjs.min.js"></script>
        <script type="text/javascript" src="recursos/terceros/bootstrap_datepicker/js/bootstrap-datetimepicker.js"></script>
        <!--<script type="text/javascript" src="recursos/terceros/jquery-ui/jquery-ui.js"></script>-->
        <script type="text/javascript" src="recursos/terceros/jquery_form/jqueryform.js"></script>
        <script type="text/javascript" src="recursos/js/pruebas.js"></script>
    </head>
    <body>
        <div class="contenttablas">
            <table id="jqGrid"></table>
            <div id="jqGridPager"></div>
        </div>
        <div class="contenttablas">
            <h1>Carga de Archivos al Servidor con JSP</h1>
            <form action="PruebasServlet" id="jsonForm">
                <input type="file" id="fileinput" name="file[]" multiple/><br/>
                <button type="submit" class="btn btn-default" id="buttonsumbit">Upload</button>
            </form>
            <div id="output"></div>
            <div id="output2"></div>
        </div>
    </body>
</html>
