var jqdata = new Array();
var lastSel;
var selICol;
var selIRow;
  var filas;
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };
    /// creargrilla(jqdata);
function creargrilla(jqdata){
        $("#jqGrid2").jqGrid({
        datatype: "local",
        data:jqdata,
        styleUI : 'Bootstrap',
        editurl: '/CuentasMedicas/RadicacionCRServlet',
        modal: true,
        autoOpen: false,
        ignoreCase: true,
        colNames : ['id','Opciones','Número Factura', 'Fecha Factura', 'Valor Factura', 'Valor IVA', 'Tipo Plan', 'Tipo Cuenta','Factura Física', 'Motivo Estado','Fecha Radicación','Estado Factura'],
        colModel: [ 
             { name : 'id', index : 'id',editable : false, hidden:true},
             {name: "opciones",index : 'opciones',
                        formatter: "actions",
                        formatoptions: {
                            keys: true,
                            editOptions:{},
                            //addOptions: {},
                            delOptions: {}
                        }       
                    },
            { name : 'numerofactura', index : 'numerofactura',editable : true,width:125},
            { name : 'fechafactura', index : 'fechafactura', editable : true, sorttype:"date",editoptions: {
            dataInit: function (element) {
                var dateNow = new Date();
               $(element).datetimepicker({
                    locale: 'es',
                    format: 'DD/MM/YYYY',
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
            { name : 'motivoestado', index : 'motivoestado',editable : false,width:115},
            { name : 'fecharadicacion', index : 'fecharadicacion', editable : true, sorttype:"date",editoptions: {
                     readonly: "readonly" ,
            dataInit: function (element) {
                var dateNow = new Date();
               $(element).datetimepicker({
                    locale: 'es',
                    format: 'DD/MM/YYYY',
                    defaultDate:dateNow
                });
            }
        }, align : "left",width:140},
            { name : 'estadofactura', index : 'estadofactura',editable : false,width:130}
        ],
        loadonce : true,
        autowidth: true,
        height: 300,
        rowNum : 10,
        shrinkToFit: false,
        rowList : [10, 20, 30 ,50 ,100 ,500,1000],
        toolbarfilter: true,
        viewrecords : true,
        /*onSelectRow: function(id){
            
            if(id && id!==lastSel){ 
                var gridArr = $("#jqGrid2").getDataIDs();
                var selrow = $("#jqGrid2").getGridParam("selrow");
                var curr_index = 0;
               jQuery('#jqGrid2').restoreRow(lastSel); 
               lastSel=id; 
               //alert(id);
               $("#jEditButton_"+id).click();
               $("#jSaveButton_"+id).on("click",function(){
                   jQuery("#jqGrid2").saveRow(gridArr[curr_index]);
               });
            }
            jQuery('#jqGrid2').editRow(id, true); 
          },*/
        pager: "#jqGridPager"
    });
}


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
var data;


function showResponse(responseText, statusText, xhr, $form)  {
    for(var i = 0;i < responseText.length; i++){
        data = {
            numerofactura : responseText[i].numerofactura,
            fechafactura : responseText[i].fechafactura,
            valorfactura : responseText[i].valorfactura,
            valoriva : "0",
            estadofactura: "PROCESO"

        };
        jqdata.push(data);
    }creargrilla(jqdata);
}