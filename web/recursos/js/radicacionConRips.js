var jqdata = [{
        id : "1",
        numerofactura:"654564",
        fechafactura:"2015/01/01",
        valorfactura:"1600000",
        valoriva:"16",
        tipoplan:"0",
        tipocuenta:"1",
        facturafisica:"1",
        motivoestado:"proceso",
        fecharadicacion:"2016/01/01",
        estadofactura:"proceso"
  }];
  
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };
                $("#jqGrid2").jqGrid({
                datatype: "local",
                data:jqdata,
                styleUI : 'Bootstrap',
                modal: true,
                autoOpen: false,
                ignoreCase: true,
                colNames : ['id', 'Número Factura', 'Fecha Factura', 'Valor Factura', 'Valor IVA', 'Tipo Plan', 'Tipo Cuenta','Factura Física', 'Motivo Estado','Fecha Radicación','Estado Factura'],
                colModel: [ 
                    { name : 'id', index : 'id',editable : false, hidden:false},
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
		loadonce : true,
                autowidth: true,
                height: 200,
                rowNum : 10,
                rowList : [10, 20, 30 ,50 ,100 ,500,1000],
                toolbarfilter: true,
                viewrecords : true,
                pager: "#jqGridPager"
        });

 //console.log(jqgrid_data);
$("#fileinput").css("display","none");
$("#cargarrips").on("click",function(){
    $("#fileinput").click();
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

function showResponse(responseText, statusText, xhr, $form)  {
    //response text has the data
    //alert(responseText);
    
    for (var i=0;i < responseText.length;i++){
        jqgrid_data = {
            numerofactura:responseText[0],
            fechafactura:responseText[1],
            valorfactura:responseText[2]
        };
       //alert(jqgrid_data.numero_factura);
    }
    creargrilla(jqgrid_data);
    }
    