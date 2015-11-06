 $(function () {
    $('[data-toggle="tooltip"]').tooltip();   
 });
 /*-------------------------------------------------------------------------------------------------------------------*/
 var jqgrid_data = [{}];
  $('#nombreprestador').typeahead({
        source: function(query, proxy) {
           $.ajax({
               url: "/CuentasMedicas/RadicacionServlet",
               type:"POST",
               data: {cadena: query},
               dataType: 'json',
               success: proxy
           });
        },updater:function (item) {
            $('#identificacion').val(item.IDENTIFICACION);
            $('#codigo_interno').val(item.CODIGO_INTERNO);
             jqgrid_data = [{
                sucursal : item.NOMBRESUCURSAL,
                ciudad : item.CIUDAD,
                direccion : item.DIRECCION,
                telefono : item.TELEFONO
              }];
              llenargrid();
             return item;
            },autoSelect: true,
            limit: 10,
            displayText: function (item) {
            return item.NOMBREPRESTADOR;
        }
    });
    
/*-------------------------------------------------------------------------------------------------------------------*/
 $('#codigo_interno').on("keyup",function(){
       jQuery("#jqGrid").css("display","none");
       $('#identificacion').val("");
       $('#nombreprestador').val("");
      var codigo_interno = $(this).val();
      $.ajax({
            type:"POST",
            url:"/CuentasMedicas/RadicacionServlet",
            data:"codigo_interno="+codigo_interno
      }).done(function(data) {
            for (var i = 0; i<data.length;i++){
                jQuery("#jqGrid").css("display","block");
                $('#identificacion').val(data[i].IDENTIFICACION);
                $('#nombreprestador').val(data[i].NOMBREPRESTADOR);
                jqgrid_data = [{
                   sucursal : data[i].NOMBRESUCURSAL,
                   ciudad : data[i].CIUDAD,
                   direccion : data[i].DIRECCION,
                   telefono : data[i].TELEFONO
                }];
                llenargrid();
           } 
      });
 });
 /*-------------------------------------------------------------------------------------------------------------------*/
  $('#identificacion').on("keyup",function(){
       jQuery("#jqGrid").css("display","none");
       $('#codigo_interno').val("");
       $('#nombreprestador').val("");
      var identificacion = $(this).val();
      $.ajax({
            type:"POST",
            url:"/CuentasMedicas/RadicacionServlet",
            data:"identificacion="+identificacion
      }).done(function(data) {
            for (var i = 0; i<data.length;i++){
                jQuery("#jqGrid").css("display","block");
                $('#codigo_interno').val(data[i].CODIGO_INTERNO);
                $('#nombreprestador').val(data[i].NOMBREPRESTADOR);
                jqgrid_data = [{
                   sucursal : data[i].NOMBRESUCURSAL,
                   ciudad : data[i].CIUDAD,
                   direccion : data[i].DIRECCION,
                   telefono : data[i].TELEFONO
                }];
                llenargrid();
           } 
      });
 });
  /*-------------------------------------------------------------------------------------------------------------------*/
  function llenargrid(){
        jQuery("#jqGrid").jqGrid({
                 data : jqgrid_data,
                 styleUI : 'Bootstrap',
                 datatype : "local",
                 height : '30',
                 colNames : ['Sucursal', 'Ciudad', 'Dirección', 'Teléfono'],
                 colModel : [
                     { name : 'sucursal', index : 'sucursal', editable : false, align : "left",width :100 }, 
                     { name : 'ciudad', index : 'ciudad', editable : false, align : "left",width :100 }, 
                     { name : 'direccion', index : 'direccion', editable : false, align : "left",width :100 },
                     { name : 'telefono', index : 'telefono', editable : false, align : "left",width :100 }      
                 ],
                 toolbarfilter: false,
                 viewrecords : true,
                 autowidth : true
             });         
                 jQuery("#jqGrid").jqGrid('setGridParam', {
                     data : jqgrid_data,
                     datatype: "local"
                 });
                 jQuery("#jqGrid").trigger("reloadGrid");
    }
      var lastSel;
      var selICol; 
      var selIRow;
      var jqgrid_data2= [{}];
// ----------------------------------------------------------------------------------------------------
var gridArr = $("#jqGrid2").getDataIDs();
              var selrow = $("#jqGrid2").getGridParam("selrow");
             var curr_index = 0;
            for (var i = 0; i < gridArr.length; i++) {
                if (gridArr[i] == selrow) {
                    curr_index = i;
                }
            };
    jQuery("#jqGrid2").jqGrid({
            data : jqgrid_data2,
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
                    custom: true,
                    custom_func: campoVacio
                }
           , align : "left",width:140},
        
                { name : 'oficina', index : 'oficina',editable : true,width:110, editrules:{
                   /*custom: true,
                    custom_func: campoVacio*/
                  required:true
                }},
                { name : 'prefijofactura', index : 'prefijofactura',editable : true,width:130,align : "center",editrules:{
                    custom: true,
                    custom_func: campoVacio
                }},
                { name : 'sufijofactura', index : 'sufijofactura',editable : true,width:120, editrules:{
                    custom: true,
                    custom_func: campoNumerico
                }},
                { name : 'numerofactura', index : 'numerofactura',editable : true,width:90,editrules:{
                     custom: true,
                    custom_func: campoVacio
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
                { name : 'valorfactura', index : 'valorfactura',editable : true,width:110 ,editrules:{
                    //required: true,
                    //number:true
                },editoptions: {
                    dataEvents: [
                         { 
                        type: 'keydown', 
                        fn: function(e) { 
                            var key = e.charCode || e.keyCode;
                            if (key == 9 || key ==13){
                                var gridArr = $("#jqGrid2").getDataIDs();
                                var selrow = $("#jqGrid2").getGridParam("selrow");
                                var curr_index = 0;
                                for (var i = 0; i < gridArr.length; i++) {
                                    if (gridArr[i] == selrow) {
                                        curr_index = i;
                                    }
                                }
                                if ((curr_index + 1) < gridArr.length){
                                    $("#jqGrid2").setSelection(gridArr[curr_index + 1], true);
                                  }
                                  var valorfactura = $('input[name="valorfactura"]').val();
                                  var idvalorfactura = gridArr[curr_index]+"_valorfactura";
                                  if (valorfactura==''){
                                
                                    $.jgrid.info_dialog(
                                        $.jgrid.regional["es"].errors.errcap,
                                        '<div class="ui-state-error"><b>Valor Factura:</b> faltan datos por ingresar</div>', 
                                        $.jgrid.regional["es"].edit.bClose,
                                        {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234,top: 800, left: 400}
                                    );
                                    $('#'+valorfactura).focus();
                                        $("#jqGrid2").setSelection(gridArr[curr_index], true);
                                  }
                                    else if (isNaN(valorfactura)){
                                        $.jgrid.info_dialog(
                                         $.jgrid.regional["es"].errors.errcap,
                                         '<div class="ui-state-error"><b>Valor Factura:</b> es un campo númerico</div>', 
                                         $.jgrid.regional["es"].edit.bClose,
                                         {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234,top: 800, left: 400}      
                                        );
                                        $('#'+idvalorfactura).focus();
                                        $("#jqGrid2").setSelection(gridArr[curr_index], true);
                                         
                                    /*var inputgrid = gridArr[curr_index]+"_fechafactura";
                                    alert("Ingrese un valor válido");
                                    $('#'+inputgrid).focus();
                                    $("#jqGrid2").setSelection(gridArr[curr_index], true);*/
                                     
                                  }else{
                                      //alert("is here");
                                    jQuery("#jqGrid2").saveRow(gridArr[curr_index]);
                                    jQuery("#jqGrid2").editRow(gridArr[curr_index + 1], true);
                                  }
                            }
                        }
                    } 
                    ]
                 }},
                { name : 'motivoestado', index : 'motivoestado', editable : false, align : "left",width:140},
                { name : 'estadofactura', index : 'estadofactura',editable : false,width:130}
                //{ name : 'opciones', index : 'opciones',width:110,  searchoptions: {searchhidden: false},search:false}
            ],
            rowNum : 100,
            rowList : [10, 20, 30 ,50 ,100 ,500,1000],
            pager : '#jqGridPager',
            sortname : 'id',
            toolbarfilter: true,
            viewrecords : true,
            sortorder : "asc",
            shrinkToFit: false,
            
            loadComplete: function (data) {
                var grid = jQuery("#jqGrid2"),//creador de filas vacias
                
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
               // alert(xhr.responseText);
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
                return 'Error: ' + data.responseText;
            }
        },
        // options for the Add Dialog
        {
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

function campoVacio(val, nm, valref) {
    if (val != '') {
        return [true];
    } else {
       return [false,$.jgrid.info_dialog(
               $.jgrid.regional["es"].errors.errcap,
                '<div class="ui-state-error"><b>'+nm+':</b> faltan datos por ingresar</div>', 
                $.jgrid.regional["es"].edit.bClose,
                {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234,top: 800, left: 400}
            )];
    }
}
function campoNumerico(val, nm, valref) {
    if (isNaN(val)) {
       return  [$.jgrid.info_dialog(
            $.jgrid.regional["es"].errors.errcap,
            '<div class="ui-state-error"><b>'+nm+':</b> es un campo númerico</div>', 
            $.jgrid.regional["es"].edit.bClose,
            {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234,top: 800, left: 400}
        )];
    } else {
       return[true];
    }
}


//        function validatePositive(value, column) {
//            if ( isNaN(value) && value < 0)
//                return [false, "Please enter a positive value"];
//            else
//                return [true, ""];
//        }
//        
//    function validateFecha(value,column) {
//        if (value == ""){
//        return [false, "Ingrese una fecha"];
//    }
//     else
//    {return [true, ""];}
//}
//
//function campoVacio(val, nm, valref) {
//    if (val != '') {
//        return [true];
//    } else {
//        window.alert = function() {
//     $.jgrid.info_dialog(
//          $.jgrid.regional["es"].errors.errcap,
//          '<div class="ui-state-error"><b>'+nm+':</b> faltan datos por ingresar</div>', 
//           $.jgrid.regional["es"].edit.bClose,
//          {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234,top: 800, left: 400}
//    );
//    return campoVacio.apply(this, arguments);
//  };
//       return [false,'Error'];
//    }
//}
//function campoNumerico(val, nm, valref) {
//    if (isNaN(val)) {
//       return  [$.jgrid.info_dialog(
//            $.jgrid.regional["es"].errors.errcap,
//            '<div class="ui-state-error"><b>'+nm+':</b> es un campo númerico</div>', 
//            $.jgrid.regional["es"].edit.bClose,
//            {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234,top: 800, left: 400}
//        )];
//    } else {
//       return[true];
//    }
//}