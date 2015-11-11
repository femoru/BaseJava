 $(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
var jqgrid_data = [{}];
var lastSel;
var selICol;
var selIRow;
creargrilla();

$('#nombreprestador').typeahead({
    
    source: function (query, proxy) {
        cleardata();
        creargrilla(jqgrid_data);
        $('#identificacion').val("");
        $('#inputsucursal').val("");
        $('#inputciudad').val("");
        $('#inputdireccion').val("");
        $('#inputtelefono').val("");
        $('#idprestador').val("");
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
            data: {cadena2: $('#nombreprestador').val(),codigointerno : item.CODIGO_INTERNO },
            dataType: 'json'
        }).done(function (data) {
          for (var i = 0; i < data.length; i++) {
             
            jqgrid_data = [{
               id: data[i].IDRADICACION,
                fecharadicacion: data[i].FECHA_RADICACION,
                oficina: data[i].OFICINA,
                prefijofactura: data[i].PREFIJO_FACTURA,
                sufijofactura: data[i].SUFIJO_FACTURA,
                numerofactura: data[i].NUMERO_FACTURA,
                fechafactura: data[i].FECHA_FACTURA,
                valorfactura: data[i].VALOR_FACTURA,
                motivoestado: data[i].MOTIVO_ESTADO,
                estadofactura: data[i].ESTADO_FACTURA,
                tiporadicacion: data[i].TIPO_RADICACION
            }];
            creargrilla(jqgrid_data);
           }
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
    creargrilla(jqgrid_data);
    $('#identificacion').val("");
    $('#nombreprestador').val("");
    $('#inputsucursal').val("");
    $('#inputciudad').val("");
    $('#inputdireccion').val("");
    $('#inputtelefono').val("");
    $('#idprestador').val("");
    var codigo_interno = $(this).val();
    $.ajax({
        type: "POST",
        url: "/CuentasMedicas/RadicacionServlet",
        data: "codigo_interno=" + codigo_interno
    }).done(function (data) {

        for (var i = 0; i < data.length; i++) {
            cleardata();
            if (data[i][i] != undefined) {
                $('#identificacion').val(data[i][i].IDENTIFICACION);
                $('#nombreprestador').val(data[i][i].NOMBREPRESTADOR);
                $('#inputsucursal').val(data[i][i].NOMBRESUCURSAL);
                $('#inputciudad').val(data[i][i].CIUDAD);
                $('#inputdireccion').val(data[i][i].DIRECCION);
                $('#inputtelefono').val(data[i][i].TELEFONO);
                $('#idprestador').val(data[i][i].IDPRESTADOR);
                if (data[1][i] != undefined) {
                    jqgrid_data = [{
                            id: data[1][i].IDRADICACION,
                            fecharadicacion: data[1][i].FECHA_RADICACION,
                            oficina: data[1][i].OFICINA,
                            prefijofactura: data[1][i].PREFIJO_FACTURA,
                            sufijofactura: data[1][i].SUFIJO_FACTURA,
                            numerofactura: data[1][i].NUMERO_FACTURA,
                            fechafactura: data[1][i].FECHA_FACTURA,
                            valorfactura: data[1][i].VALOR_FACTURA,
                            motivoestado: data[1][i].MOTIVO_ESTADO,
                            estadofactura: data[1][i].ESTADO_FACTURA,
                            tiporadicacion: data[1][i].TIPO_RADICACION
                        }];
                }
                creargrilla(jqgrid_data);
            }
        }
    });
});
/*-------------------------------------------------------------------------------------------------------------------*/
$('#identificacion').on("keyup", function () {
    cleardata();
    creargrilla(jqgrid_data);
    $('#codigo_interno').val("");
    $('#nombreprestador').val("");
    $('#inputsucursal').val("");
    $('#inputciudad').val("");
    $('#inputdireccion').val("");
    $('#inputtelefono').val("");
    $('#idprestador').val("");
    var identificacion = $(this).val();
    $.ajax({
        type: "POST",
        url: "/CuentasMedicas/RadicacionServlet",
        data: "identificacion=" + identificacion
    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][i] != undefined) {
                $('#codigo_interno').val(data[i][i].CODIGO_INTERNO);
                $('#nombreprestador').val(data[i][i].NOMBREPRESTADOR);
                $('#inputsucursal').val(data[i][i].NOMBRESUCURSAL);
                $('#inputciudad').val(data[i][i].CIUDAD);
                $('#inputdireccion').val(data[i][i].DIRECCION);
                $('#inputtelefono').val(data[i][i].TELEFONO);
            if (data[1][i] != undefined) {
                    jqgrid_data = [{
                            id: data[1][i].IDRADICACION,
                            fecharadicacion: data[1][i].FECHA_RADICACION,
                            oficina: data[1][i].OFICINA,
                            prefijofactura: data[1][i].PREFIJO_FACTURA,
                            sufijofactura: data[1][i].SUFIJO_FACTURA,
                            numerofactura: data[1][i].NUMERO_FACTURA,
                            fechafactura: data[1][i].FECHA_FACTURA,
                            valorfactura: data[1][i].VALOR_FACTURA,
                            motivoestado: data[1][i].MOTIVO_ESTADO,
                            estadofactura: data[1][i].ESTADO_FACTURA,
                            tiporadicacion: data[1][i].TIPO_RADICACION,
                        }];
                }
             creargrilla(jqgrid_data);
            }
        }
    });
});
/*-------------------------------------------------------------------------------------------------------------------*/

function cleardata(){
      jqgrid_data = [{
        id: "", fecharadicacion: "", oficina: "", prefijofactura: "", sufijofactura: "",
        numerofactura: "", fechafactura: "", valorfactura: "", motivoestado: "",
        estadofactura: "", tiporadicacion: "", idprestador: ""
    }];
}
var gridArr = $("#jqGrid2").getDataIDs();
var selrow = $("#jqGrid2").getGridParam("selrow");
var curr_index = 0;
for (var i = 0; i < gridArr.length; i++) {
    if (gridArr[i] == selrow) {
        curr_index = i;
    }
};
function creargrilla(jqgrid_data) {
    jQuery("#jqGrid2").jqGrid({
        data: jqgrid_data,
        styleUI: 'Bootstrap',
        datatype: "local",
        height: '400',
        editurl: '/CuentasMedicas/RadicacionServlet',
        colNames: ['id', 'Fecha Radicación', 'Oficina', 'Prefijo Factura', 'Sufijo Factura', 'N# Factura', 'Fecha Factura',
            'Valor Factura', 'Motivo Estado', 'Estado Factura', 'Tipo Radicación', 'idprestador'/*,'Opciones'*/],
        colModel: [
            {name: 'id', index: 'id', editable: false, hidden: true},
            {name: 'fecharadicacion', index: 'fecharadicacion', editable: true, sorttype: "date", editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                        $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate: dateNow
                        });
                    }
                },
                editrules: {required: true}, align: "left", width: 140},
            {name: 'oficina', index: 'oficina', editable: true, width: 110, editrules: {required: true},
                editoptions: {
                    dataEvents: [{
                        type: 'keydown',
                        fn: function (e) {
                            var nombre = "Oficina";
                            var campo = $('input[name="oficina"]');
                            var key = e.charCode || e.keyCode;
                            if (key == 9 || key == 13) {
                                validacioncampos(nombre, campo);
                            }
                        }
                    }]
                }
            },
            {name: 'prefijofactura', index: 'prefijofactura', editable: true, width: 130, align: "center", editrules: {required: true},
                editoptions: {
                    dataEvents: [{
                        type: 'keydown',
                        fn: function (e) {
                            var key = e.charCode || e.keyCode;
                            if (key == 9 || key == 13) {
                                var nombre = "Prefijo Factura";
                                var campo = $('input[name="prefijofactura"]');
                                validacioncampos(nombre, campo);
                            }
                        }
                    }]
                }
            },
            {name: 'sufijofactura', index: 'sufijofactura', editable: true, width: 120, editrules: {required: true},
                editoptions: {
                    dataEvents: [{
                        type: 'keydown',
                        fn: function (e) {
                            var key = e.charCode || e.keyCode;
                            if (key == 9 || key == 13) {
                                var nombre = "Sufijo Factura";
                                var campo = $('input[name="sufijofactura"]');
                                validacioncampos(nombre, campo);
                                validacionnumericos(nombre, campo);
                            }
                        }
                    }]
                }
            },
            {name: 'numerofactura', index: 'numerofactura', editable: true, width: 90, editrules: {required: true},
                editoptions: {
                    dataEvents: [{
                        type: 'keydown',
                        fn: function (e) {
                            var key = e.charCode || e.keyCode;
                            if (key == 9 || key == 13) {
                                var nombre = "Número Factura";
                                var campo = $('input[name="numerofactura"]');
                                validacioncampos(nombre, campo);
                            }
                        }
                    }]
                }
            },
            {name: 'fechafactura', index: 'fechafactura', editable: true, sorttype: "date", editoptions: {
                    dataInit: function (element) {
                        var dateNow = new Date();
                        $(element).datetimepicker({
                            locale: 'es',
                            format: 'YYYY/MM/DD HH:mm',
                            defaultDate: dateNow
                        });
                    }, dataEvents: [{
                            type: 'keydown',
                            fn: function (e) {
                                var key = e.charCode || e.keyCode;
                                if (key == 9 || key == 13) {
                                    var nombre = "Fecha Factura";
                                    var campo = $('input[name="fechafactura"]');
                                    validacioncampos(nombre, campo);
                                }
                            }
                        }]
                }, editrules: {required: true}, align: "left", width: 140},
            {name: 'valorfactura', index: 'valorfactura', editable: true, width: 110, classes: 'valorfacturaclass',
                editrules: {required: true
                }, editoptions: {
                    dataEvents: [{
                            type: 'keydown',
                            fn: function (e) {
                                var key = e.charCode || e.keyCode;
                                var valorfactura = $('input[name="valorfactura"]');

                                if (key == 9 || key == 13) {
                                    var gridArr = $("#jqGrid2").getDataIDs();
                                    var selrow = $("#jqGrid2").getGridParam("selrow");
                                    var curr_index = 0;
                                    var result = /(^\d+([,.]\d+)?$)/.test(valorfactura.val()) || /((^\d{1,3}(,\d{3})+(\.\d+)?)$)/.test(valorfactura.val()) || /((^\d{1,3}(\.\d{3})+(,\d+)?)$)/.test(valorfactura.val());
                                    for (var i = 0; i < gridArr.length; i++) {
                                        if (gridArr[i] == selrow) {
                                            curr_index = i;
                                        }
                                    }
                                    if (valorfactura.val() == "") {
                                        alert("Valor Factura: Campo Obligatorio");
                                        valorfactura.focus();
                                    }
                                    else if (result === false) {
                                        alert("Valor Factura: Campo de tipo númerico!");
                                        $("#jqGrid2").setSelection(gridArr[curr_index], true);
                                        jQuery("#jqGrid2").editRow(gridArr[curr_index], true);
                                        valorfactura.focus();
                                    }
                                    else {
                                        jQuery("#jqGrid2").saveRow(gridArr[curr_index]);
                                        $("#jqGrid2").setSelection(gridArr[curr_index + 1], true);
                                        jQuery("#jqGrid2").editRow(gridArr[curr_index + 1], true);
                                    }
                                }
                            }
                        }]
                }
            },
            {name: 'motivoestado', index: 'motivoestado', editable: false, align: "left", width: 140},
            {name: 'estadofactura', index: 'estadofactura', editable: false, width: 130},
            {name: 'tiporadicacion', index: 'tiporadicacion', editable: true, align: "left", width: 140, hidden: true, classes: 'inputtiporadicacion'},
            {name: 'idprestador', index: 'idprestador', editable: true, width: 130, hidden: true, classes: 'inputidprestador'}
        ],
        rowNum: 20,
        rowList: [10, 20, 30, 50, 100, 500, 1000],
        pager: '#jqGridPager',
        sortname: 'id',
        toolbarfilter: true,
        viewrecords: true,
        sortorder: "asc",
        shrinkToFit: false,
        loadComplete: function (data) {
            var grid = jQuery("#jqGrid2"), //creador de filas vacias
                    pageSize = parseInt(grid.jqGrid("getGridParam", "rowNum")),
                    emptyRows = pageSize - data.rows.length;
            if (emptyRows > 0) {
                for (var i = 1; i <= emptyRows; i++)
                    grid.jqGrid('addRowData', undefined, {});
                grid.jqGrid("setGridParam", {
                    reccount: grid.jqGrid("getGridParam", "reccount") - emptyRows,
                    records: grid.jqGrid("getGridParam", "records") - emptyRows
                });
                grid[0].updatepager();
            }
        },
        //ondblClickRow: editRow,
        caption: "<b>Radicación de Documentos sin RIPS</b>",
        multiselect: false,
        autowidth: true,
        ondblClickRow: function (id) {
            if (id && id !== lastSel) {
                jQuery("#jqGrid2").restoreRow(lastSel);
                lastSel = id;
            }
            jQuery("#jqGrid2").editRow(id, true,
                    function () {
                        $('.inputidprestador input[name="idprestador"]').val($("#idprestador").val());
                        $('.inputtiporadicacion input[name="tiporadicacion"]').val("2");
                    }, null, null, {arg1: ''}
            );
        },
        loadError: function (xhr, status, err) {
            try {
                jQuery.jgrid.info_dialog(jQuery.jgrid.errors.errcap,
                        '<div class="ui-state-error">' + xhr.responseText + err + '</div>',
                        jQuery.jgrid.edit.bClose,
                        {
                            buttonalign: 'right'
                        });
            } catch (e) {
                alert(xhr.responseText);
            }
        }
    });

    $('#jqGrid2').jqGrid('navGrid', '#jqGridPager',
            {edit: false, add: false, del: false, search: false, refresh: true, view: false, position: "left", cloneToTop: false},
    {
        editCaption: "The Edit Dialog",
        recreateForm: true,
        closeAfterEdit: true,
        errorTextFormat: function (data) {
            return 'Error: ' + data.responseText;
        }
    },
    {
        closeAfterAdd: true,
        recreateForm: true,
        errorTextFormat: function (data) {
            return 'Error: ' + data.responseText;
        }
    },
    {
        errorTextFormat: function (data) {
            return 'Error: ' + data.responseText;
        }
    });
    jQuery("#jqGrid2").jqGrid('setGridParam', {
        data: jqgrid_data,
        datatype: "local"
    });
    jQuery("#jqGrid2").trigger("reloadGrid");
}
function validacioncampos(nombre, valor) {
    if (valor.val() == "") {
        alert(nombre + ": Campo obligatorio!");
        $("#jqGrid2").setSelection(gridArr[curr_index], true);
        jQuery("#jqGrid2").editRow(gridArr[curr_index], true);
        valor.focus();
    } else {
        valor.focus();
    }
}
function validacionnumericos(nombre, numero) {

    var result = /(^\d+([,.]\d+)?$)/.test(numero.val()) || /((^\d{1,3}(,\d{3})+(\.\d+)?)$)/.test(numero.val()) || /((^\d{1,3}(\.\d{3})+(,\d+)?)$)/.test(numero.val());
    if (result === false) {
        alert(nombre + ": Campo de tipo númerico!");
        $("#jqGrid2").setSelection(gridArr[curr_index], true);
        jQuery("#jqGrid2").editRow(gridArr[curr_index], true);
        numero.focus();
    }
    else {
        numero.focus();
    }
}