var lastSel;
var cerrar = {text: "Cancelar", click: function() {
        $(this).dialog("close");
    },
    icons: {
        primary: "ui-icon-close"
    }
};
var fecha_entrega = $("#fecha_entrega");

var myGrid = $("#jqGrid").jqGrid({
        url: '/CuentasMedicas/RecepcionServlet',
        editurl: '/CuentasMedicas/RecepcionServlet',
        loadonce: true,
        styleUI : 'Bootstrap',
        datatype : "json",
        height : '400',
        page:1,
        multiselect:'true',
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
                }
            },
             { label: 'Radicación',
                 name: 'RADICACION',
                  width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true}
             },
             { label: 'NIT',
                 name: 'NIT',
                 width: 150,
                 hidden:true,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true},
                 searchoptions: {searchhidden: true}
             },
             { label: 'Prestador',
                 name: 'PRESTADOR',
                 width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true}
             },
             { label: 'Remitente',
                 name: 'REMITENTE',
                 width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true}
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
                }
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
                 editrules: {edithidden:true}
             },
             { label: 'N# Guía',
                 name: 'NUMERO_GUIA',
                 width: 150,
                 hidden:true,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true},
                 searchoptions: {searchhidden: true}
             },
            { label: 'CD',
                 name: 'CD',
                 width: 150,
                 hidden:true,
                 editable: true,
                 formatter: "checkbox",
                 edittype: "checkbox", editoptions: { value: "1:0", defaultValue: "0" },
                 formatoptions: {disabled : false},
                 editrules: {edithidden:true}
             },
             
             { label: 'USB',
                 name: 'USB',
                 width: 150,
                 hidden:true,
                 editable: true,
                 formatter: "checkbox",
                 edittype: "checkbox", editoptions: { value: "1:0", defaultValue: "0" },
                 formatoptions: {disabled : false},
                 editrules: {edithidden:true}
             },
            { label: 'Detalle',
                 name: 'DETALLE',
                 width: 150,
                 hidden:true,
                 editable: true,
                 edittype: "textarea",
                 editrules: {edithidden:true},
                 editoptions: {rows:"2",cols:"43"},
                 searchoptions: {searchhidden: true}
             },
             { label: 'Entregado a',
                 name: 'ENTREGADO_A',
                 width: 150,
                 editable: true,
                 edittype: "text",
                 editrules: {edithidden:true}
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
                               $.ajax({
                                   url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/autocompletepbs.php?callback=?&acelem=ShipName',
                                   dataType: "jsonp",
                                   data: {term: query},
                                   success : proxy
                               });
                            }
                        });
                    }
                }
            },
            { label: 'USUARIO',
                 name: 'USUARIO',
                 width: 150,
                 editable: false,
                 hidden:true,
                 edittype: "text",
                 editrules: {edithidden:false}
             }
        ],
        
        viewrecords: true,
        rowNum: 10,
        pager: "#jqGridPager",
        caption : "<b>Matriz Recepción de Documentos</b>",
        
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
        
          $("#refresh_jqGrid").on("click",function(){
              refrescarGrilla();
          });
          $('#add_jqGrid').on('click',function(){
              $('#sData').on('click',function(){
                  refrescarGrilla();
            });
          });
         $('#edit_jqGrid').on('click',function(){
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