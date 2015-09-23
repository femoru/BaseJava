  
var jqgrid_data = [{
		id : "1",
		date : "2014-10-01",
		name : "Test 1",
		note : "0",
		amount : "150.00",
		tax : "15.00",
		total : "210.00"
	}, {
		id : "2",
		date : "2014-10-02",
		name : "Test 2",
		note : "1",
		amount : "220.00",
		tax : "22.00",
		total : "320.00"
	}, {
		id : "3",
		date : "2014-09-01",
		name : "Test 3",
		note : "2",
		amount : "40.00",
		tax : "4.00",
		total : "430.00"
	}, {
		id : "4",
		date : "2014-10-04",
		name : "Test 4",
		note : "3",
		amount : "510.00",
		tax : "51.00",
		total : "210.00"
	}, {
		id : "5",
		date : "2014-10-05",
		name : "Test 5",
		note : "1",
		amount : "210.00",
		tax : "21.00",
		total : "320.00"
	}, {
		id : "6",
		date : "2014-09-06",
		name : "Test 6",
		note : "1",
		amount : "70.00",
		tax : "7.00",
		total : "430.00"
	}, {
		id : "7",
		date : "2014-10-04",
		name : "Test 7",
		note : "2",
		amount : "80.00",
		tax : "10.00",
		total : "210.00"
	}, {
		id : "8",
		date : "2014-10-03",
		name : "Test 8",
		note : "3",
		amount : "300.00",
		tax : "10.00",
		total : "320.00"
	}, {
		id : "9",
		date : "2014-09-01",
		name : "Test 9",
		note : "1",
		amount : "90.00",
		tax : "10.00",
		total : "430.00"
	}, {
		id : "10",
		date : "2014-10-01",
		name : "Test 10",
		note : "1",
		amount : "200.00",
		tax : "20.00",
		total : "210.00"
	}, {
		id : "11",
		date : "2014-10-02",
		name : "Test 11",
		note : "2",
		amount : "77.00",
		tax : "9.00",
		total : "320.00"
	}, {
		id : "12",
		date : "2014-09-01",
		name : "Test 12",
		note : "1",
		amount : "56.00",
		tax : "8.00",
		total : "430.00"
	}, {
		id : "13",
		date : "2014-10-04",
		name : "Test 13",
		note : "1",
		amount : "554.00",
		tax : "10.00",
		total : "210.00"
	}, {
		id : "14",
		date : "2014-10-05",
		name : "Test 14",
		note : "3",
		amount : "265.00",
		tax : "2.00",
		total : "320.00"
	}, {
		id : "15",
		date : "2014-09-06",
		name : "Test 15",
		note : "1",
		amount : "765.00",
		tax : "3.00",
		total : "430.00"
	}, {
		id : "16",
		date : "2014-10-04",
		name : "Test 16",
		note : "1",
		amount : "89.00",
		tax : "1.00",
		total : "210.00"
	}, {
		id : "17",
		date : "2014-10-03",
		name : "Test 17",
		note : "3",
		amount : "99.00",
		tax : "2.00",
		total : "320.00"
	}, {
		id : "18",
		date : "2014-09-01",
		name : "Test 18",
		note : "1",
		amount : "49.00",
		tax : "3.00",
		total : "430.00"
	}];

	// ----------------------------------------------------------------------------------------------------
	jQuery("#jqGrid").jqGrid({
		data : jqgrid_data,
                styleUI : 'Bootstrap',
		datatype : "local",
		height : '370',
		colNames : ['ID', 'Fecha Recibido', 'Radicación', 'NIT', 'Prestador', 'Remitente', 'Tipo de Doc','Opciones'],
		colModel : [
                    { name : 'id', index : 'id',editable : false, hidden:true }, 
                    { name : 'date', index : 'sdate', editable : true, sorttype:"date",unformat: pickDate}, 
                    { name : 'name', index : 'name', editable : true }, 
                    { name : 'amount', index : 'amount', align : "right", editable : true }, 
                    { name : 'tax', index : 'tax', align : "right", editable : true }, 
                    { name : 'total', index : 'total', align : "right", editable : true }, 
                    { name : 'note', index : 'note', sortable : false, editable : true, formatter: "select" ,edittype: "select", stype: "select",searchoptions: {
                    defaultValue: 0,
                                    value: {
                                         0: "Glosas",
                                         1: "Devoluciones",
                                         2: "Guías de Correspondencia",
                                         3: "Otros Documentos"
                                     }
                                 },
                                 editoptions: {
                                     value: {
                                         0: "Glosas",
                                         1: "Devoluciones",
                                         2: "Guías de Correspondencia",
                                         3: "Otros Documentos"

                                     }
                                 }
                             },
                        { name : 'act', index:'act', sortable:false }
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
		caption : "Matriz de Recepción de Documentos",
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
        
        $(".ui-jqgrid-caption").append("<i class='fa fa-file-pdf-o iconsexport' title='Exportar PDF' id='exportpdf'></i>");  
        $(".ui-jqgrid-caption").append("<i class='fa fa-file-excel-o iconsexport' title='Exportar Excel' id='exportexcel'></i>");
        
	jQuery("#jqGrid").jqGrid('navGrid', "#jqGridPager", {
		edit : true,
		add : true,
		del : true,
                view: true
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

			jQuery("#jqGrid").jqGrid('setGridWidth', jQuery(".ui-jqGrid").parent().width());

		}, 500);

	});

	// ----------------------------------------------------------------------------------------------------

	/**
		@STYLING
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