 $(function () {
        $('[data-toggle="tooltip"]').tooltip();   
 });
      
var jqgrid_data = [{
          id : "1",
          sucursal : "1",
          ciudad : "2014-10-01",
          direccion : "Comfandi",
          telefono : "890806490"
  }];
	jQuery("#jqGrid").jqGrid({
		data : jqgrid_data,
                styleUI : 'Bootstrap',
		datatype : "local",
		height : '30',
		colNames : ['id', 'Sucursal', 'Ciudad', 'Dirección', 'Teléfono'],
		colModel : [
                    { name : 'id', index : 'id',editable : false, hidden:true }, 
                    { name : 'sucursal', index : 'sucursal', editable : true, align : "left",width :100 }, 
                    { name : 'ciudad', index : 'ciudad', editable : true, align : "left",width :100 }, 
                    { name : 'direccion', index : 'direccion', editable : true, align : "left",width :100 },
                    { name : 'telefono', index : 'telefono', editable : true, align : "left",width :100 }      
                ],
		sortname : 'id',
		toolbarfilter: true,
		viewrecords : true,
		sortorder : "asc",
		editurl : "dummy.html",
		autowidth : true
	});
        
        
        var jqgrid_data = [{
          id : "1",
          numerofactura : "MS3500435",
          fechafactura : "2014-10-01 12:00",
          valorfactura : "135.000",
          valoriva : "0",
          tipoplan : "1",
          tipocuenta: "1",
          facturafisica : "",
          motivoestado : "",
          fecharadicacion: "",
          estadofactura: ""
          
  }];
// ----------------------------------------------------------------------------------------------------
	jQuery("#jqGrid2").jqGrid({
		data : jqgrid_data,
                styleUI : 'Bootstrap',
		datatype : "local",
		height : '400',
                //rownumbers: true,
		colNames : ['id', 'Número Factura', 'Valor Factura', 'Valor IVA', 'Tipo Plan', 'Tipo Cuenta','Factura Física', 'Motivo Estado','Fecha Radicación','Estado Factura'],
		colModel : [
                   { name : 'id', index : 'id',editable : false, hidden:true , width:50},
                    { name : 'numerofactura', index : 'numerofactura',editable : false, width:50},
                    { name : 'fechafactura', index : 'fechafactura', editable : true, sorttype:"date",unformat: pickDate, align : "left", width:50},
                    { name : 'valorfactura', index : 'valorfactura',editable : false, width:50},
                    { name : 'valoriva', index : 'valoriva',editable : false, width:50},
                    { name : 'tipoplan', index : 'tipoplan',editable : false, width:50},
                    { name : 'facturafisica', index : 'facturafisica',editable : false, width:50},
                    { name : 'motivoestado', index : 'motivoestado',editable : false, width:50},
                    { name : 'fecharadicacion', index : 'fecharadicacion', editable : true, sorttype:"date",unformat: pickDate, align : "left", width:50},
                    { name : 'estadofactura', index : 'estadofactura',editable : false, width:50},
                ],
		rowNum : 10,
		rowList : [10, 20, 30 ,50 ,100 ,1000 ,10000],
		pager : '#jqGridPager',
		sortname : 'id',
		toolbarfilter: true,
		viewrecords : true,
		sortorder : "asc",
                
		/*gridComplete: function(){
                    var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
                    for(var i=0;i < ids.length;i++){
                            var cl = ids[i];
                            be = "<button class='btn btn-xs btn-default btn-quick' title='Edit Row' onclick=\"jQuery('#jqGrid').editRow('"+cl+"');\"><i class='fa fa-pencil'></i></button>"; 
                            se = "<button class='btn btn-xs btn-default btn-quick' title='Save Row' onclick=\"jQuery('#jqGrid').saveRow('"+cl+"');\"><i class='fa fa-save'></i></button>";
                            ca = "<button class='btn btn-xs btn-default btn-quick' title='Cancel' onclick=\"jQuery('#jqGrid').restoreRow('"+cl+"');\"><i class='fa fa-times'></i></button>";  
                            jQuery("#jqGrid").jqGrid('setRowData',ids[i],{act:be+se+ca});
                    }	
		},*/
		editurl : "dummy.html",
		caption : "<b>Radicación de Documentos</b>",
		multiselect : true,
		autowidth : true
	});			
	// ----------------------------------------------------------------------------------------------------

	//enable datepicker
	function pickDate( cellvalue, options, cell ) {
                setTimeout(function(){        
                $(cell).find('input[type=text]').datetimepicker()({
                     
                    });
                });
                 
            /*setTimeout(function(){
                    jQuery(cell) .find('input[type=text]')
                    .datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
            }, 0);*/
	}
        
        $(".ui-jqgrid-caption").append("<button title='Exportar PDF' class='btn btn-danger iconsexport' id='exportpdf'><i class='fa fa-file-pdf-o '></i></button>");  
        $(".ui-jqgrid-caption").append("<button title='Exportar Excel' class='btn btn-success iconsexport' id='exportexcel'><i class='fa fa-file-excel-o '></i></button>");
        
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


	// On Resize
	jQuery(window).resize(function() {

		if(window.afterResize) {
			clearTimeout(window.afterResize);
		}

		window.afterResize = setTimeout(function() {

			/**
				After Resize Code
				.................
			**/

			jQuery("#jqGrid2").jqGrid('setGridWidth', jQuery(".ui-jqGrid").parent().width());

		}, 500);

	});

	// ----------------------------------------------------------------------------------------------------

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