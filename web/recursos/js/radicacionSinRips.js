 $(function () {
        $('[data-toggle="tooltip"]').tooltip();   
 });
      var lastsel;
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
          fecharadicacion : "2014-10-01 12:00",
          oficina : "135.000",
          prefijofactura : "EM",
          sufijofactura : "123051",
          numerofactura: "EM123051",
          fechafactura: "2014-10-01 12:00",
          valorfactura : "135.000",
          motivoestado : "",
          estadofactura: "Proceso"
        },{
          id : "2",
          fecharadicacion : "2014-10-01 12:00",
          oficina : "135.000",
          prefijofactura : "EM",
          sufijofactura : "123051",
          numerofactura: "EM123051",
          fechafactura: "2014-10-01 12:00",
          valorfactura : "135.000",
          motivoestado : "",
          estadofactura: "Proceso"
      }];
// ----------------------------------------------------------------------------------------------------
	jQuery("#jqGrid2").jqGrid({
		data : jqgrid_data,
                styleUI : 'Bootstrap',
		datatype : "local",
		height : '400',
                //rownumbers: true,
		colNames : ['id', 'Fecha Radicación', 'Oficina', 'Prefijo Factura', 'Sufijo Factura', 'N# Factura', 'Fecha Factura','Valor Factura', 'Motivo Estado','Estado Factura'/*,'Opciones'*/],
		colModel : [
                    { name : 'id', index : 'id',editable : false, hidden:true},
                    { name : 'fecharadicacion', index : 'fecharadicacion',editable : true, sorttype:"date",editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow,
                            //debug: true
                        });
                    }
                }, align : "left",width:140},
                    { name : 'oficina', index : 'oficina',editable : true,width:110},
                    { name : 'prefijofactura', index : 'prefijofactura',editable : true,width:130,align : "center"},
                    { name : 'sufijofactura', index : 'sufijofactura',editable : true,width:120},
                    { name : 'numerofactura', index : 'numerofactura',editable : true,width:90},
                    { name : 'fechafactura', index : 'fechafactura',editable : true, sorttype:"date",editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow
                        });
                    }
                }, align : "left",width:140},
                    { name : 'valorfactura', index : 'valorfactura',editable : true,width:110},
                    { name : 'motivoestado', index : 'motivoestado', editable : false, align : "left",width:140},
                    { name : 'estadofactura', index : 'estadofactura',editable : false,width:130},
                    //{ name : 'opciones', index : 'opciones',width:110,  searchoptions: {searchhidden: false},search:false}
                ],
		rowNum : 10,
		rowList : [10, 20, 30 ,50 ,100 ,1000],
		pager : '#jqGridPager',
		sortname : 'id',
		toolbarfilter: true,
		viewrecords : true,
		sortorder : "asc",
                shrinkToFit: false,
                loadComplete: function (data) {
                    var grid = jQuery("#jqGrid2"),
                      pageSize = parseInt(grid.jqGrid("getGridParam", "rowNum")),
                      emptyRows = pageSize - data.rows.length;

                    if (emptyRows > 0) {
                      for (var i = 1; i <= emptyRows; i++)
                          // Send rowId as undefined to force jqGrid to generate random rowId
                          grid.jqGrid('addRowData', undefined, {});

                      // adjust the counts at lower right
                      grid.jqGrid("setGridParam", {
                        reccount: grid.jqGrid("getGridParam", "reccount") - emptyRows,
                        records: grid.jqGrid("getGridParam", "records") - emptyRows
                      });
                      grid[0].updatepager();
                    }
                  },
                ondblClickRow: function(id){
                    if(id && id!==lastsel){
                        jQuery('#jqGrid2').jqGrid('restoreRow',lastsel);
                        jQuery('#jqGrid2').jqGrid('editRow',id,true);
                        lastsel=id;
                        }
                },
                
		/*gridComplete: function(){
                    var ids = jQuery("#jqGrid2").jqGrid('getDataIDs');
                    for(var i=0;i < ids.length;i++){
                        var cl = ids[i];
                        //be = "<button class='btn btn-xs btn-default btn-quick' title='Editar' onclick=\"jQuery('#jqGrid2').editRow('"+cl+"');\"><i class='fa fa-pencil'></i></button>"; 
                        se = "<button class='btn btn-xs btn-default btn-quick' title='Guardar'><i class='fa fa-save'></i></button>";
                        ca = "<button class='btn btn-xs btn-default btn-quick' title='Cancelar' id='btnCancel'><i class='fa fa-times'></i></button>";  
                        jQuery("#jqGrid2").jqGrid('setRowData',ids[i],{opciones:se+ca});
                    }	
		},*/
		//editurl : "#",
		caption : "<b>Radicación de Documentos sin RIPS</b>",
		multiselect : false,
		autowidth : true
	});
        
        jQuery("#btnCancel").click(function () {
        var id = jQuery("#jqGrid2").jqGrid('getGridParam', 'selrow');
        jQuery("#btnSave, #btnCancel").attr('disabled', true);
        jQuery("#btnEdit").attr('disabled', false);
        jQuery("#jqGrid2").restoreRow(id);
        //alert(id + " cancelled");
    });

	// ----------------------------------------------------------------------------------------------------
        $(".ui-jqgrid-caption").append("<button title='Exportar PDF' class='btn btn-danger iconsexport' id='exportpdf'><i class='fa fa-file-pdf-o '></i></button>");  
        $(".ui-jqgrid-caption").append("<button title='Exportar Excel' class='btn btn-success iconsexport' id='exportexcel'><i class='fa fa-file-excel-o '></i></button>");    
	jQuery("#jqGrid2").jqGrid('navGrid', "#jqGridPager", {
            edit : true,
            add : true,
            del : true,
            view: false
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
                   // recreateForm: true,
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

