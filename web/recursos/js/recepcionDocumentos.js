var lastSel;
var cerrar = {text: "Cancelar", click: function() {
        $(this).dialog("close");
    },
    icons: {
        primary: "ui-icon-close"
    }
};

$("#editmodjqGrid #tr_DETALLE .DataTD").attr('colspan',3);
var fecha_entrega = $("#fecha_entrega");

var myGrid = $("#jqGrid").jqGrid({
        url: '/CuentasMedicas/RecepcionServlet',
        editurl: '/CuentasMedicas/RecepcionServlet',
        loadonce: true,
        styleUI : 'Bootstrap',
        datatype : "json",
        height : '400',
        page:1,
        //multiselect:'true',
        autowidth : true,
        colModel: [
            { label: 'ID', name: 'ID',hidden : true, editable:false, key:true},                   
            { label: 'Fecha Recibido',
                name: 'FECHA_RECIBIDO',
                width: 150,
                editable: true,
                edittype:"text",
                editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow
                        });
                    }
                },editrules:{
                    required: true
                },
                formoptions:{rowpos: 1, colpos: 1} 

            },
             { label: 'Radicación',
                 name: 'RADICACION',
                  width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true,required:true},
                 formoptions:{rowpos: 1, colpos: 2} 
                 
             },
             { label: 'NIT',
                 name: 'NIT',
                 width: 150,
                 hidden:true,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true,required:true},
                 searchoptions: {searchhidden: true},
                 formoptions:{rowpos: 2, colpos: 1} 
                 
             },
             { label: 'Prestador',
                 name: 'PRESTADOR',
                 width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true,required:true},
                 formoptions:{rowpos: 2, colpos: 2} 
             },
             { label: 'Remitente',
                 name: 'REMITENTE',
                 width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true,required:true},
                 formoptions:{rowpos: 3, colpos: 2} 
             },
             { label: 'Fecha Entrega',
                name: 'FECHA_ENTREGA',
                width: 150,
                editable: true,
                edittype:"text",
                editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow
                        });
                    }
                }, editrules: {edithidden:true,required:true},
                formoptions:{rowpos: 3, colpos: 1} 
            },
            { label: 'Tipo Documento',
                 name: 'TIPO_DOCUMENTO',
                 width: 150,
                 editable: true,
                 hidden:false,
                 formatter: "select",
                 edittype: "select",
                 editoptions: {
                     value: {
                        1: "Glosas",
                        2: "Devoluciones",
                        3: "Guías de Correspondencia",
                        4: "Otros Documentos"}
                 },
                 editrules: {edithidden:true,required:true},
                 formoptions:{rowpos: 4, colpos: 1} 
             },
             { label: 'N# Guía',
                 name: 'NUMERO_GUIA',
                 width: 150,
                 hidden:true,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true},
                 searchoptions: {searchhidden: true},
                 formoptions:{rowpos: 4, colpos: 2} 
             },
            { label: 'CD',
                 name: 'CD',
                 width: 150,
                 hidden:true,
                 editable: true,
                 formatter: "checkbox",
                 edittype: "checkbox", editoptions: { value: "1:0", defaultValue: "0" },
                 formatoptions: {disabled : false},
                 editrules: {edithidden:true},
                 formoptions:{rowpos: 5, colpos: 1} 
             },
             
             { label: 'USB',
                 name: 'USB',
                 width: 150,
                 hidden:true,
                 editable: true,
                 formatter: "checkbox",
                 edittype: "checkbox", editoptions: { value: "1:0", defaultValue: "0" },
                 formatoptions: {disabled : false},
                 editrules: {edithidden:true},
                 formoptions:{rowpos: 5, colpos: 2} 
             },
            { label: 'Detalle',
                 name: 'DETALLE',
                 width: 150,
                 hidden:true,
                 editable: true,
                 edittype: "textarea",
                 editrules: {edithidden:true},
                 editoptions: {rows:"5"},
                 searchoptions: {searchhidden: true},
             },
             { label: 'Entregado a',
                 name: 'ENTREGADO_A',
                 width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true,required:true},
                 formoptions:{rowpos: 6, colpos: 1} 
             },
            { label: 'Entregado por',
                 name: 'ENTREGADO_POR',
                 width: 150,
                 editable: true,
                 edittype: "text",
                editoptions: {
                    dataInit: function (element) {
                        
                        $(element).attr("autocomplete","off").typeahead({ 
                            appendTo : "body",
                            source: function(query, proxy) {
                                var buscar = "buscar";
                               $.ajax({
                                   url: "/CuentasMedicas/RecepcionServlet",
                                   type:"POST",
                                   data: {term: query,oper : buscar,id:0},
                                   dataType: 'json',
                                    success: proxy
                               });
                            },autoSelect: true,
                            displayText: function (item) {
                                return item.PRESTADOR;
                            }
                        });
                    }
                }, editrules: {edithidden:true,required:true},formoptions:{rowpos: 6, colpos: 2} 
            },
            { label: 'USUARIO',
                 name: 'USUARIO',
                 width: 150,
                 editable: false,
                 hidden:true,
                 edittype: "text",
                 editrules: {edithidden:false,required:true}
             }
        ],
        viewrecords: true,
        rowNum: 10,
        ondblClickRow: editRow,
        //onSelectRow: editRow, 
        pager: "#jqGridPager",
        caption : "<b>Matriz Recepción de Documentos</b>"
        
    });

        $(".ui-jqgrid-caption").append("<button title='Exportar PDF' class='btn btn-danger iconsexport' id='exportpdf'><i class='fa fa-file-pdf-o '></i></button>");  
        $(".ui-jqgrid-caption").append("<button title='Exportar Excel' class='btn btn-success iconsexport' id='exportexcel'><i class='fa fa-file-excel-o '></i></button>");
        jQuery("#jqGrid").jqGrid('navGrid', "#jqGridPager", {
            edit : true,
            add : true,
            del : true,
            view: true,
            search: true,
            refresh: true,
            beforeRefresh: refrescarGrilla 
            //position: "left"  
	},
             
            {
            height: 'auto',
            width: 'auto',
            recreateForm: true,
            closeAfterEdit: true,
             afterSubmit: function(){
                myGrid.jqGrid('setGridParam', {
                datatype: "json"
                });
                myGrid.trigger("reloadGrid");
                return [true, ""];
            },
            errorTextFormat: function (data) {
                return 'Error oshe: ' + data.responseText;
            }
        },
                // options for the Add Dialog
                {
                    height: 'auto',
                    width: 'auto',
                    closeAfterAdd: true,
                            afterSubmit: function(){
                       myGrid.jqGrid('setGridParam', {
                       datatype: "json"
                       });
                       myGrid.trigger("reloadGrid");
                       return [true, ""];
                   },
                    recreateForm: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText;
                    }
                    
                },
                // options for the Delete Dailog
                {
                     width: 300,
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
		s = jQuery("#jqGrid").jqGrid('getGridParam', 'selarrrow');
		alert(s);
	});
	// Select/Unselect specific Row by id
	jQuery("a.select_unselect_row").bind("click", function() {
		jQuery("#jqGrid").jqGrid('setSelection', "13");
	});
	// Select/Unselect specific Row by id
	jQuery("a.delete_row").bind("click", function() {
		var su=jQuery("#jqGrid").jqGrid('delRowData',1);
		if(su) alert("Succes. Write custom code to delete row from server"); else alert("Already deleted or not in list");
	});
 
	/**
		@estilo a los botones
	**/
	jQuery(".ui-jqGrid").removeClass("ui-widget ui-widget-content");
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
        
        function editRow(id) {
                $('#edit_jqGrid').click();
            }
        
          $("#refresh_jqGrid").on("click",function(){
              refrescarGrilla();
          });
          $('#add_jqGrid').on('click',function(){
              $("#editmodjqGrid #tr_DETALLE .DataTD").attr('colspan',3);
              $('#sData').on('click',function(){
                  refrescarGrilla();
            });
          });
         $('#edit_jqGrid').on('click',function(){
             $("#editmodjqGrid #tr_DETALLE .DataTD").attr('colspan',3);
                $('#sData').on('click',function(){
                  refrescarGrilla();
            });
          });
            function refrescarGrilla() {
            myGrid.jqGrid('setGridParam', {
                datatype: "json"
            });
            myGrid.trigger("reloadGrid");
            return [true, ""];
        }
        
        $('.FormGrid').on('submit',function(){
            alert("done");
            return true;
        });
        
        $("#del_jqGrid").click(function(){ 
            var usuario = $("#nombreusuario").text();
            var params = {};
            params['usuario'] = usuario;
            toDelete = myGrid.jqGrid('getGridParam','selrow');
            myGrid.jqGrid(
                'delGridRow',
                toDelete,
                  { url: '/CuentasMedicas/RecepcionServlet',
                    // delData: params,
                    reloadAfterSubmit:true
                }
            );
        });
        
        $("#exportexcel").on("click",function(){
            exportGrid();
        });
        $("#exportpdf").on("click",function(){
            demoFromHTML();
        });
        var html;
function exportGrid(){
    var filename;
    mya = $("#jqGrid").getDataIDs();
    var data = $("#jqGrid").getRowData(mya[0]);
    var colNames = new Array();
    var ii = 0;
    for (var i in data) {
        colNames[ii++] = i;
    }
    html = "<table border='1'><thead><tr style='background-color:#599BCC;color:white;'>";
    for (var k = 0; k < colNames.length; k++) {
        if (colNames[k] !== 'ID' && colNames[k] !== 'USUARIO'){
           html = html + "<th>" + colNames[k] + "</th>";
        }
    }
    html = html + "</tr></thead>";
    for (i = 0; i < mya.length; i++) {
        html = html + "<tbody><tr>";
        data = $("#jqGrid").getRowData(mya[i]);
        for (var j = 0; j < colNames.length; j++) {
            data = $("#jqGrid").getRowData(mya[i]);
            if (colNames[j] !== 'ID' && colNames[j] !== 'USUARIO'){
                if( data.CD == 1){data.CD = "Si";}else{data.CD = "No";}
                if( data.USB == 1){data.USB = "Si";}else{data.USB = "No";}
                if(data.TIPO_DOCUMENTO == 1){data.TIPO_DOCUMENTO = "Glosas";}
                if(data.TIPO_DOCUMENTO == 2){data.TIPO_DOCUMENTO = "Devoluciones";}
                if(data.TIPO_DOCUMENTO == 3){data.TIPO_DOCUMENTO = "Guias de correspondencia";}
                if(data.TIPO_DOCUMENTO == 4){data.TIPO_DOCUMENTO = "Otros documentos";}
                html = html + "<td>" + data[colNames[j]] + "</td>";
            }
        }
        html = html + "</tr>";
    }
    html = html + "</tbody></table>";
    //html = html.replace(/'/g, '&apos;');
    var a = document.createElement('a');
    a.id = 'ExcelDL';
    a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    a.download = filename ? filename + ".xlsx" : 'Recepcion_de_Documentos.xlsx';
    document.body.appendChild(a);
    a.click();
    document.getElementById('ExcelDL').remove();
}
function demoFromHTML() {
    
    var filename;
    mya = $("#jqGrid").getDataIDs();
    var data = $("#jqGrid").getRowData(mya[0]);
    var colNames = new Array();
    var ii = 0;
    for (var i in data) {
        colNames[ii++] = i;
    }
    html = "<table id='tableexport'><thead><tr>"; 
    for (var k = 0; k < colNames.length; k++) {
        if (colNames[k] !== 'ID' && colNames[k] !== 'USUARIO'){
           html = html + "<th>" + colNames[k] + "</th>";
        }
    }
    html = html + "</tr></thead>";
    for (i = 0; i < mya.length; i++) {
        html = html + "<tbody><tr>";
        data = $("#jqGrid").getRowData(mya[i]);
        for (var j = 0; j < colNames.length; j++) {
            data = $("#jqGrid").getRowData(mya[i]);
            if (colNames[j] !== 'ID' && colNames[j] !== 'USUARIO'){
                if( data.CD == 1){data.CD = "Si";}else{data.CD = "No";}
                if( data.USB == 1){data.USB = "Si";}else{data.USB = "No";}
                if(data.TIPO_DOCUMENTO == 1){data.TIPO_DOCUMENTO = "Glosas";}
                if(data.TIPO_DOCUMENTO == 2){data.TIPO_DOCUMENTO = "Devoluciones";}
                if(data.TIPO_DOCUMENTO == 3){data.TIPO_DOCUMENTO = "Guias de correspondencia";}
                if(data.TIPO_DOCUMENTO == 4){data.TIPO_DOCUMENTO = "Otros documentos";}
                html = html + "<td>" + data[colNames[j]] + "</td>";
            }
        }
        html = html + "</tr>";
    }
    html = html + "</tbody></table>";
    $("#tabladatos").append(html);
    
//      var table = tableToJson($('#tableexport').get(0))
//        var doc = new jsPDF('p','pt', 'a4', true);
//        doc.cellInitialize();
//        $.each(table, function (i, row){
//            console.debug(row);
//            $.each(row, function (j, cell){
//                doc.setFontSize(7);
//                doc.cell(10, 10, 40, 40, cell, i);  // 2nd parameter=top margin,1st=left margin 3rd=row cell width 4th=Row height
//                 
//            });
//            });
//           
//                    doc.save('sample-file.pdf');
//                     $("#tabladatos").html("");
    
	var pdf = new jsPDF('p','pt', 'a4', true)
	, source = $("#tabladatos")[0]
	, specialElementHandlers = {
            '#bypassme': function(element, renderer){
                    return true;
            }
	};
	margins = {
       top: 80,
        bottom: 60,
        left: 40,
       width: 522
    };
    
    pdf.fromHTML(
    	source // HTML string or DOM elem ref.
    	, margins.left // x coord
    	, margins.top // y coord
    	, {
            'width': margins.width // max width of content on PDF
            , 'elementHandlers': specialElementHandlers
    	},
    	function (dispose) {
          pdf.save('Test.pdf');
        },
    	margins
    );
   // $("#tabladatos").css("display","none");
}

 function tableToJson(table) {
    var data = [];

    // first row needs to be headers
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }


    // go through cells
    for (var i=0; i<table.rows.length; i++) {

        var tableRow = table.rows[i];
        var rowData = {};

        for (var j=0; j<tableRow.cells.length; j++) {

            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

        }

        data.push(rowData);
    }       

    return data;
} 