 $(function () {
        $('[data-toggle="tooltip"]').tooltip();   
 });
      var lastSel;
var jqgrid_data = [{
          id : "1",
          sucursal : "Profamilia Palmira",
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
		//editurl : "#",
		autowidth : true
	});
        
        
    var jqgrid_data = [{
      id : "1",
      fecharadicacion : "2014-10-01 12:00",
      oficina : "VERSALLES",
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
      oficina : "VERSALLES",
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
            editurl: '#',
            colNames : ['id', 'Fecha Radicación', 'Oficina', 'Prefijo Factura', 'Sufijo Factura', 'N# Factura', 'Fecha Factura','Valor Factura', 'Motivo Estado','Estado Factura'/*,'Opciones'*/],
            colModel : [
                { name : 'id', index : 'id',editable : false, hidden:true},
                { name : 'fecharadicacion', index : 'fecharadicacion',editable : true, sorttype:"date",editoptions: {
                dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow
                            //debug: true
                        });
                    }
                },
                editrules:{
                    //required: true,
                    custom:true,
                    custom_func:validateFecha
                }
           , align : "left",width:140},

                { name : 'oficina', index : 'oficina',editable : true,width:110, editrules:{
                    required: true
                }},
                { name : 'prefijofactura', index : 'prefijofactura',editable : true,width:130,align : "center",editrules:{
                    required: true
                }},
                { name : 'sufijofactura', index : 'sufijofactura',editable : true,width:120,editrules:{
                    required: true
                }},
                { name : 'numerofactura', index : 'numerofactura',editable : true,width:90,editrules:{
                    required: true
                }},
                { name : 'fechafactura', index : 'fechafactura',editable : true, sorttype:"date",editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                       $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate:dateNow
                        });
                    }
                 }, editrules:{
                    required: true
                },align : "left",width:140},
                { name : 'valorfactura', index : 'valorfactura',editable : true,width:110,editrules:{
                    required: true,
                    number:true
                }},
                { name : 'motivoestado', index : 'motivoestado', editable : false, align : "left",width:140},
                { name : 'estadofactura', index : 'estadofactura',editable : false,width:130}
                //{ name : 'opciones', index : 'opciones',width:110,  searchoptions: {searchhidden: false},search:false}
            ],
            rowNum : 10,
            rowList : [10, 20, 30 ,50 ,100 ,500,1000],
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
            //ondblClickRow: editRow,
            caption : "<b>Radicación de Documentos sin RIPS</b>",
            multiselect : false,
            autowidth : true,
        ondblClickRow: function(id) {

            if (id && id !== lastSel) {
                jQuery("#jqGrid2").restoreRow(lastSel);
                lastSel = id;
            }
            jQuery("#jqGrid2").editRow(id, true);
        },
        loadError: function(xhr, status, err)
        {
            try
            {
                jQuery.jgrid.info_dialog(jQuery.jgrid.errors.errcap,
                        '<div class="ui-state-error">' + xhr.responseText + err + '</div>',
                        jQuery.jgrid.edit.bClose,
                        {
                            buttonalign: 'right'
                        });
            }
            catch (e)
            {
                alert(xhr.responseText);
            }
        }
        
    });
     $('#jqGrid2').jqGrid('navGrid','#jqGridPager',
        // the buttons to appear on the toolbar of the grid
        { edit: true, add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
        // options for the Edit Dialog
        {
            editCaption: "The Edit Dialog",
            recreateForm: true,
            closeAfterEdit: true,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        },
        // options for the Add Dialog
        {
            closeAfterAdd: true,
            recreateForm: true,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        },
        // options for the Delete Dailog
        {
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        });

        function validatePositive(value, column) {
            if ( isNaN(value) && value < 0)
                return [false, "Please enter a positive value"];
            else
                return [true, ""];
        }
        
    function validateFecha(value,column) {
        if (value == ""){
        return [false, "Ingrese una fecha"];
    }
     else
    {return [true, ""];}
} 
