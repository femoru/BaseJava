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
        <script type="text/javascript" src="recursos/js/pruebas.js"></script>
    </head>
    <body>
            <style>
                .thumb {
                    height: 75px;
                    border: 1px solid #000;
                    margin: 10px 5px 0 0;
                }
                 #byte_content {
                    margin: 5px 0;
                    max-height: 100px;
                    overflow-y: auto;
                    overflow-x: hidden;
                }
                #byte_range {
                      margin-top: 5px; 
                }
                 #progress_bar {
                    margin: 10px 0;
                    padding: 3px;
                    border: 1px solid #000;
                    font-size: 14px;
                    clear: both;
                    opacity: 0;
                    -moz-transition: opacity 1s linear;
                    -o-transition: opacity 1s linear;
                    -webkit-transition: opacity 1s linear;
                  }
                #progress_bar.loading {
                    opacity: 1.0;
                  }
                #progress_bar .percent {
                    background-color: #99ccff;
                    height: auto;
                    width: 0;
                  }
                #drop_zone{
                  border: 1px dotted black;
                  text-align: center !important;
                  border-radius: 5px;
                  height: 70px;
                  line-height: 70px !important;
                  font-weight: bolder;
                }
            </style>
        <div class="contenttablas">
            <table id="jqGrid"></table>
            <div id="jqGridPager"></div>
        </div>
        <div class="contenttablas">
            <h1>Carga de Archivos al Servidor con JSP</h1>
            <form action="PruebasServlet" enctype="MULTIPART/FORM-DATA" method="POST">
                <input type="file" name="file" multiple/><br/>
                <button type="submit" class="btn btn-default">Upload</button>
            </form>
        </div>
        <div class="contenttablas">
            <h1>Carga de y Lectura de Archivos con FILEREADER API HTML5</h1>
            <h3>Características del archivo</h3>
            <input type="file" id="files" name="files[]" multiple />
            <output id="list"></output>
            
            <h3>Drag and Drop</h3>
            <div id="drop_zone">Drop files here</div>
            <output id="list2"></output>
            
            <h3>Lectura de Archivos(imagenes)</h3>
            <input type="file" id="files2" name="files[]" multiple />
            <output id="list3"></output>
            
            <h3>Lectura de Contenido del Archivo</h3>
            <input type="file" id="files3" name="files[]" multiple /> Read bytes: 
            <span class="readBytesButtons">
              <button data-startbyte="0" data-endbyte="4">1-5</button>
              <button data-startbyte="5" data-endbyte="14">6-15</button>
              <button data-startbyte="6" data-endbyte="7">7-8</button>
              <button>entire file</button>
            </span>
            <div id="byte_range" contenteditable="true"></div>
            <div id="byte_content" contenteditable="true"></div>
            
            <h3>Progreso de la Carga</h3>
            <input type="file" id="files4" name="file" />
            <button onclick="abortRead();">Cancelar carga</button>
            <div id="progress_bar"><div class="percent">0%</div></div>
        </div>
    </body>
</html>
