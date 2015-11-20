 $(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
var jqgrid_data = new Array();
var lastSel;
var selICol;
var selIRow;
var cabecera;
var filas;
var cabecera;
var filas;
var data = [{}];
var item = 0;   
var indGrilla = 0;

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
        creargrilla(jqgrid_data);
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
        creargrilla(jqgrid_data);
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
        creargrilla(jqgrid_data);
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

$(function () {
        $('[data-toggle="tooltip"]').tooltip();   
 });
 creargrilla(jqgrid_data);
 function creargrilla(){
// ----------------------------------------------------------------------------------------------------
	jQuery("#jqGrid2").jqGrid({
		data : jqgrid_data,
                styleUI : 'Bootstrap',
		datatype : "local",
		height : '400',
                //rownumbers: true,
		colNames : ['id', 'Número Factura', 'Fecha Factura', 'Valor Factura', 'Valor IVA', 'Tipo Plan', 'Tipo Cuenta','Factura Física', 'Motivo Estado','Fecha Radicación','Estado Factura'],
		colModel : [
                    { name : 'id', index : 'id',editable : false, hidden:true},
                    { name : 'numerofactura', index : 'numerofactura',editable : true,width:125},
                    { name : 'fechafactura', index : 'fechafactura', editable : true, sorttype:"date",editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow
                        });
                    }
                }, align : "left",width:130},
                    { name : 'valorfactura', index : 'valorfactura',editable : true,width:110},
                    { name : 'valoriva', index : 'valoriva',editable : true,width:100},
                    { name : 'tipoplan', index : 'tipoplan',editable : true,width:120, formatter: "select",
                        edittype: "select",
                        editoptions: {
                            value: {
                               0: "POS",
                               1: "FAMILIAR",
                               2: "EXCELENCIA",
                               3: "QUIMBAYA",
                               4: "BIENESTAR",
                               5: "SUBSIDIADO"
                            }
                        }
                    },
                    { name : 'tipocuenta', index : 'tipoplan',editable : true,width:130, formatter: "select",
                        edittype: "select",
                        editoptions: {
                            value: {
                               0: "MEDICAMENTOS DE USO AMBULATORIO",
                               1: "URGENCIAS",
                               2: "HOSPITALIZACION-  SERVICIOS DE INTERNACION Y/O CIRUGIA HOSPITALARIA",
                               3: "CAPITACION",
                               4: "NO POS AUTORIZADOS POR C.T.C. O TUTELA (MEDICAMENTOS - PROCEDIMIENTOS)",
                               5: "FACTURA GLOBAL",
                               6: "CIRUGIAS AMBULATORIAS",
                               7: "SERVICIOS AMBULATORIOS"
                            }
                        }
                    },
                    { name : 'facturafisica', index : 'facturafisica',editable : true,width:110,align:"center",
                 formatter: "checkbox",
                 edittype: "checkbox", editoptions: { value: "1:0", defaultValue: "0" },},
                    { name : 'motivoestado', index : 'motivoestado',editable : true,width:115},
                    { name : 'fecharadicacion', index : 'fecharadicacion', editable : true, sorttype:"date",editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow
                        });
                    }
                }, align : "left",width:140},
                    { name : 'estadofactura', index : 'estadofactura',editable : true,width:130}
                ],
		rowNum : 10,
		rowList : [10, 20, 30 ,50 ,100 ,1000 ,10000],
		pager : '#jqGridPager',
		sortname : 'id',
		toolbarfilter: true,
		viewrecords : true,
		sortorder : "asc",
                shrinkToFit: false,
                ondblClickRow: function(id){
                    if(id && id!==lastsel){
                        jQuery('#jqGrid2').jqGrid('restoreRow',lastsel);
                        jQuery('#jqGrid2').jqGrid('editRow',id,true);
                        lastsel=id;
                        }
                },

		editurl : "#",
		caption : "<b>Radicación de Documentos con RIPS</b>",
		multiselect : false,
		autowidth : true
	});			
        //$(".ui-jqgrid-caption").append("<button title='Exportar PDF' class='btn btn-danger iconsexport' id='exportpdf'><i class='fa fa-file-pdf-o '></i></button>");  
        //$(".ui-jqgrid-caption").append("<button title='Exportar Excel' class='btn btn-success iconsexport' id='exportexcel'><i class='fa fa-file-excel-o '></i></button>");
	jQuery("#jqGrid2").jqGrid('navGrid', "#jqGridPager", {
            edit : true,
            add : true,
            del : true,
            view: true
            //position: "left"
                
	},{
            height: 'auto',
            width: 620,
            recreateForm: true,
            closeAfterEdit: true,
            errorTextFormat: function (data) {
                return 'Error oshe: ' + data.responseText;
            }
        },
                // options for the Add Dialog
                {
                    height: 'auto',
                    width: 620,
                    closeAfterAdd: true,
                    recreateForm: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText;
                    }
                },
                // options for the Delete Dailog
                {
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText;
                    }
                });

	//jQuery("#jqGrid").jqGrid('inlineNav', "#jqGridPager");
	/* Add tooltips */
	jQuery('.navtable .ui-pg-button').tooltip({
		container : 'body'
	});
	// Get Selected ID's
	jQuery("a.get_selected_ids").bind("click", function() {
		s = jQuery("#jqGrid2").jqGrid('getGridParam', 'selarrrow');
		alert(s);
	});
	// Select/Unselect specific Row by id
	jQuery("a.select_unselect_row").bind("click", function() {
		jQuery("#jqGrid").jqGrid('setSelection', "13");
	});
	// Select/Unselect specific Row by id
	jQuery("a.delete_row").bind("click", function() {
		var su=jQuery("#jqGrid2").jqGrid('delRowData',1);
		if(su) alert("Succes. Write custom code to delete row from server"); else alert("Already deleted or not in list");
	});

	/**
		@STYLING
	**/
	jQuery(".ui-jqGrid2").removeClass("ui-widget ui-widget-content");
	jQuery(".ui-jqGrid-view").children().removeClass("ui-widget-header ui-state-default");
	jQuery(".ui-jqGrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
	jQuery(".ui-jqGrid-pager").removeClass("ui-state-default");
	jQuery(".ui-jqGrid").removeClass("ui-widget-content");

	jQuery(".ui-jqGrid-htable").addClass("table table-bordered table-hover");
	jQuery(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
	jQuery(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
	jQuery(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
	jQuery(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
	jQuery(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
	jQuery(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
	jQuery(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
	jQuery(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

	jQuery( ".ui-icon.ui-icon-seek-prev" ).wrap( "" );
	jQuery(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

	jQuery( ".ui-icon.ui-icon-seek-first" ).wrap( "" );
	jQuery(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");		  	

	jQuery( ".ui-icon.ui-icon-seek-next" ).wrap( "" );
	jQuery(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

	jQuery( ".ui-icon.ui-icon-seek-end" ).wrap( "" );
	jQuery(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
}