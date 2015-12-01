 $(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
var jqdata = new Array();
var lastSel;
var selICol;
var selIRow;
var filas;
var cabecera;
var filas;
var data = [{}];
var item = 0;   
var indGrilla = 0;
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };
    
    $('#nombreprestador').typeahead({
    source: function (query, proxy) {
        recargardatos();
         limpiarcampos();
        $('#identificacion').val("");
        $('#codigo_interno').val("");
        $.ajax({
            url: "/CuentasMedicas/RadicacionServlet",
            type: "POST",
            data: {cadena: query},
            dataType: 'json',
            success: proxy
        });
    },
    updater: function (item) {
            $('#identificacion').val(item.IDENTIFICACION);
            $('#codigo_interno').val(item.CODIGO_INTERNO);
            $('#inputsucursal').val(item.NOMBRESUCURSAL);
            $('#inputciudad').val(item.CIUDAD);
            $('#inputdireccion').val(item.DIRECCION);
            $('#inputtelefono').val(item.TELEFONO);
            $('#idprestador').val(item.IDPRESTADOR);
         $.ajax({
            url: "/CuentasMedicas/RadicacionServlet",
            type: "POST",
            data: {cadena2: $('#nombreprestador').val(),codigointerno : item.CODIGO_INTERNO},
            dataType: 'json'
        }).done(function (data) {
             for(item in data){
            if(item ==="0"){
                cabecera = data[item][0];
                if(cabecera !== undefined){
                }
            }else{
                for(indGrilla in data[item]){
                    llenargrilla(data,indGrilla,item);
                    jqgrid_data.push(filas);
                }
            }
        }
        //creargrilla(jqgrid_data);
        });   
        return item;
    }, 
    autoSelect: true,
    limit: 10,
    displayText: function (item) {
         return item.NOMBREPRESTADOR;
    }
});

/*-------------------------------------------------------------------------------------------------------------------*/

$('#codigo_interno').on("keyup", function () {
    recargardatos();
    $('#identficacion').val("");
    $('#nombreprestador').val("");
    limpiarcampos();
    var codigo_interno = $(this).val();
    $.ajax({
        type: "POST",
        url: "/CuentasMedicas/RadicacionServlet",
        data: {codigo_interno : + codigo_interno}
    }).done(function (data) {
        for(item in data){
            if(item ==="0"){
                cabecera = data[item][0];
                if(cabecera !== undefined){
                    $('#identificacion').val(cabecera.IDENTIFICACION);  
                    llenarcampos();
                }
            }else{
                for(indGrilla in data[item]){
                    llenargrilla(data,indGrilla,item);
                    jqgrid_data.push(filas);
                }
            }
        }
        //creargrilla(jqgrid_data);
    });
});

/*-------------------------------------------------------------------------------------------------------------------*/
$('#identificacion').on("keyup", function () {
    recargardatos();
    $('#codigo_interno').val("");
    $('#nombreprestador').val("");
    limpiarcampos();
    var identificacion = $(this).val();
    $.ajax({
        type: "POST",
        url: "/CuentasMedicas/RadicacionServlet",
        data: "identificacion=" + identificacion
    }).done(function (data) {
        for(item in data){
            if(item ==="0"){
                cabecera = data[item][0];
                if(cabecera !== undefined){
                    $('#codigo_interno').val(cabecera.CODIGO_INTERNO);  
                    llenarcampos();
                }
            }else{
                for(indGrilla in data[item]){
                    llenargrilla(data,indGrilla,item);
                    jqgrid_data.push(filas);
                }
            }
        }
        ///creargrilla(jqgrid_data);
    });
});

/*-------------------------------------------------------------------------------------------------------------------*/

var gridArr = $("#jqGrid2").getDataIDs();
var selrow = $("#jqGrid2").getGridParam("selrow");
var curr_index = 0;
for (var i = 0; i < gridArr.length; i++) {
    if (gridArr[i] == selrow) {
        curr_index = i;
    }
};
function recargardatos(){
    jqgrid_data = new Array();
    jQuery("#jqGrid2").clearGridData(true).trigger("reloadGrid");
}

function limpiarcampos(){
    $('#inputsucursal').val("");
    $('#inputciudad').val("");
    $('#inputdireccion').val("");
    $('#inputtelefono').val("");
    $('#idprestador').val("");
}
function llenarcampos(){
    $('#nombreprestador').val(cabecera.NOMBREPRESTADOR);
    $('#inputsucursal').val(cabecera.NOMBRESUCURSAL);
    $('#inputciudad').val(cabecera.CIUDAD);
    $('#inputdireccion').val(cabecera.DIRECCION);
    $('#inputtelefono').val(cabecera.TELEFONO);
    $('#idprestador').val(cabecera.IDPRESTADOR);
}
function llenargrilla(data,indGrilla,item){
    filas = {
        id: data[item][indGrilla].IDRADICACION,
        fecharadicacion: data[item][indGrilla].FECHA_RADICACION,
        oficina: data[item][indGrilla].OFICINA,
        prefijofactura: data[item][indGrilla].PREFIJO_FACTURA,
        sufijofactura: data[item][indGrilla].SUFIJO_FACTURA,
        numerofactura: data[item][indGrilla].NUMERO_FACTURA,
        fechafactura: data[item][indGrilla].FECHA_FACTURA,
        valorfactura: data[item][indGrilla].VALOR_FACTURA,
        motivoestado: data[item][indGrilla].MOTIVO_ESTADO,
        estadofactura: data[item][indGrilla].ESTADO_FACTURA,
        tiporadicacion: data[item][indGrilla].TIPO_RADICACION
    };
}
    /// creargrilla(jqdata);
function creargrilla(jqdata){
        $("#jqGrid2").jqGrid({
        datatype: "local",
        data:jqdata,
        styleUI : 'Bootstrap',
        editurl: '/CuentasMedicas/RadicacionCRServlet',
        modal: true,
        autoOpen: false,
        ignoreCase: true,
        colNames : ['id','Opciones','Número Factura', 'Fecha Factura', 'Valor Factura', 'Valor IVA', 'Tipo Plan', 'Tipo Cuenta','Factura Física', 'Motivo Estado','Fecha Radicación','Estado Factura', 'Prestador','idprestador'],
        colModel: [ 
             { name : 'id', index : 'id',editable : false, hidden:true},
             {name: "opciones",index : 'opciones',
                        formatter: "actions",
                        formatoptions: {
                            keys: true,
                            editOptions:{},
                            //addOptions: {},
                            delOptions: {}
                        }       
                    },
            { name : 'numerofactura', index : 'numerofactura',editable : true, editrules: {required: true}},
            { name : 'fechafactura', index : 'fechafactura', editable : true,editrules: {required: true}, sorttype:"date",editoptions: {
            dataInit: function (element) {
                var dateNow = new Date();
               $(element).datetimepicker({
                    locale: 'es',
                    format: 'DD/MM/YYYY',
                    defaultDate:dateNow
                });
            }
        }, align : "left",width:130},
            { name : 'valorfactura', index : 'valorfactura',editable : true,width:110, editrules:{custom:true,custom_func:validacionnumericos}},
            { name : 'valoriva', index : 'valoriva',editable : true,width:100},
            { name : 'tipoplan', index : 'tipoplan',editable : true,width:120, formatter: "select",
                edittype: "select",
                editoptions: {
                    value: {
                       1: "POS",
                       2: "FAMILIAR",
                       3: "EXCELENCIA",
                       4: "QUIMBAYA",
                       5: "BIENESTAR",
                       6: "SUBSIDIADO"
                    }
                }
            },
            { name : 'tipocuenta', index : 'tipoplan',editable : true,width:130, formatter: "select",
                edittype: "select",
                editoptions: {
                    value: {
                       1: "MEDICAMENTOS DE USO AMBULATORIO",
                       2: "URGENCIAS",
                       3: "HOSPITALIZACION-  SERVICIOS DE INTERNACION Y/O CIRUGIA HOSPITALARIA",
                       4: "CAPITACION",
                       5: "NO POS AUTORIZADOS POR C.T.C. O TUTELA (MEDICAMENTOS - PROCEDIMIENTOS)",
                       6: "FACTURA GLOBAL",
                       7: "CIRUGIAS AMBULATORIAS",
                       8: "SERVICIOS AMBULATORIOS"
                    }
                }
            },
            { name : 'facturafisica', index : 'facturafisica',editable : true,width:110,align:"center",
         formatter: "checkbox",
         edittype: "checkbox", editoptions: { value: "1:0", defaultValue: "0" }},
            { name : 'motivoestado', index : 'motivoestado',editable : false,width:115},
            { name : 'fecharadicacion', index : 'fecharadicacion', editable : true, sorttype:"date",editoptions: {
                     readonly: "readonly" ,
            dataInit: function (element) {
                var dateNow = new Date();
               $(element).datetimepicker({
                    locale: 'es',
                    format: 'DD/MM/YYYY',
                    defaultDate:dateNow
                });
            }
        }, align : "left",width:140},
            { name : 'estadofactura', index : 'estadofactura',editable : true,width:130},
            {name: 'codigointerno', index: 'codigointerno', editable: true, width: 130, hidden: false},
            {name: 'idprestador', index: 'idprestador', editable: true, width: 130, hidden: true, classes: 'inputidprestador'}
        ],
        loadonce : true,
        autowidth: true,
        height: 300,
        rowNum : 10,
        shrinkToFit: false,
        rowList : [10, 20, 30 ,50 ,100 ,500,1000],
        toolbarfilter: true,
        viewrecords : true,
        /*onSelectRow: function(id){
            
            if(id && id!==lastSel){ 
                var gridArr = $("#jqGrid2").getDataIDs();
                var selrow = $("#jqGrid2").getGridParam("selrow");
                var curr_index = 0;
               jQuery('#jqGrid2').restoreRow(lastSel); 
               lastSel=id; 
               //alert(id);
               $("#jEditButton_"+id).click();
               $("#jSaveButton_"+id).on("click",function(){
                   jQuery("#jqGrid2").saveRow(gridArr[curr_index]);
               });
            }
            jQuery('#jqGrid2').editRow(id, true); 
          },*/
        pager: "#jqGridPager"
    });
}


 //console.log(jqgrid_data);
$("#fileinput").css("display","none");
$("#cargarrips").on("click",function(){
      alert = function(msg){
            $.jgrid.info_dialog(
                $.jgrid.regional["es"].errors.errcap,
                '<div class="ui-state-error"> '+ msg +'</div>',
                $.jgrid.regional["es"].edit.bClose,
                {buttonalign: 'right', styleUI: 'Bootstrap', zIndex: 1234, top: 200, left: 500}
            );
        };
        var codint = $('#codigo_interno').val();
        var ident = $('#identificacion').val();
        var nompre = $('#nombreprestador').val();
    if(codint == "" || ident == "" || nompre ==""){
            alert("Faltan los datos del prestador");
     }else{
        $("#fileinput").click();
    }
});
$("#fileinput").on("change",function(){
        //alert("sendata");
        $('#jsonForm').submit();
    });
    var options = { 
        target: '#output2',
        beforeSubmit: showRequest,
        success: showResponse,
        type: "post",
        dataType:"json"
    };  
    $('#jsonForm').ajaxForm(options); 

function showRequest(formData, jqForm, options) { 
    var queryString = $.param(formData); 
    //alert('About to submit: \n\n' + queryString);
    return true; 
} 
var data;


function showResponse(responseText, statusText, xhr, $form)  {
    var idprestador = $("#idprestador").val();
    for(var i = 0;i < responseText.length; i++){
        data = {
            numerofactura : responseText[i].numerofactura,
            fechafactura : responseText[i].fechafactura,
            valorfactura : responseText[i].valorfactura,
            valoriva : "0",
            estadofactura: "PROCESO",
            codigointerno:responseText[i].codigointerno,
            idprestador : idprestador

        };
        jqdata.push(data);
    }creargrilla(jqdata);
}
function validacioncampos(nombre, valor) {
    if (valor.val() === "") {
        alert(nombre + ": Campo obligatorio!");
        alert = function(msg){
            $.jgrid.info_dialog(
                $.jgrid.regional["es"].errors.errcap,
                '<div class="ui-state-error"> '+ msg +'</div>',
                $.jgrid.regional["es"].edit.bClose,
                {buttonalign: 'right', styleUI: 'Bootstrap', zIndex: 1234, top: 800, left: 400}
            );
        };
       /* $("#jqGrid2").setSelection(gridArr[curr_index], true);
        jQuery("#jqGrid2").editRow(gridArr[curr_index], true);
        valor.focus();*/
        return[false];
    } else {
        valor.focus();   
    }
}
function validacionnumericos(value,colName) {
    alert = function(msg){
            $.jgrid.info_dialog(
                $.jgrid.regional["es"].errors.errcap,
                '<div class="ui-state-error"> '+ msg +'</div>',
                $.jgrid.regional["es"].edit.bClose,
                {buttonalign: 'right', styleUI: 'Bootstrap', zIndex: 1234, top: 800, left: 400}
            );
        };
        return [false,'campo no puede estar vacio'+value+""+colName];
   /* var result = /(^\d+([,.]\d+)?$)/.test(numero.val()) || /((^\d{1,3}(,\d{3})+(\.\d+)?)$)/.test(numero.val()) || /((^\d{1,3}(\.\d{3})+(,\d+)?)$)/.test(numero.val());
    if (result === false) {
        alert(nombre + ": Campo de tipo númerico!");
        $("#jqGrid2").setSelection(gridArr[curr_index], true);
        jQuery("#jqGrid2").editRow(gridArr[curr_index], true);
        numero.focus();
        return[false];
    }
    else {
        numero.focus();
    }*/
}
function validarvalor(value, colname) {
     var result = /(^\d+([,.]\d+)?$)/.test(value) || /((^\d{1,3}(,\d{3})+(\.\d+)?)$)/.test(value) || /((^\d{1,3}(\.\d{3})+(,\d+)?)$)/.test(value);
    if (value===""){
       return [false,colname+": Campo obligatorio!"];
   }
    else if(result === false){
        return [false,colname+": Campo de tipo númerico!"];
   }
    else
       return [true,""];
}