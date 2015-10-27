/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mygrid = $("#jqGrid");
  mygrid.jqGrid({
                url: '/CuentasMedicas/Usuarios',
                editurl: '/CuentasMedicas/Usuarios',
                loadonce: true,
                styleUI : 'Bootstrap',
                datatype : "json",
                height : '400',
                page:1,
                colModel: [
                    { label: 'IDUSUARIO', name: 'IDUSUARIO', key: true,hidden:true,editable: false},                   
                    {
                        label: 'Usuario',
                        name: 'USUARIO',
                        editable: true,
                        edittype:"text"
                    },
                     {
                        label: 'Nombres',
                         name: 'NOMBRES',
                         editable: true,
                         edittype: "text"
                     },
                    {
                        label: 'Apellidos',
                        name: 'APELLIDOS',
                        editable: true,
                        edittype: "text"
                    },
                    {
                        label: 'Contraseña',
                        name: 'CONTRASENA',
                        formatter:'password',
                        edittype:'password',
                        editrules: {edithidden:true},
                        editable: true,
                        hidden:false
                        
                    },
                    {
			label: 'Correo',
                        name: 'CORREO',
                        editable: true,
                        edittype: "text"
                    },
                    {
                        label: 'Fecha de Nacimiento',
                         name: 'FECHANACIMIENTO',
                         editable: true,
                         edittype: "text",
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
                     {
                        label: 'Rol',
                         name: 'ROL',
                         editable: true,
                        edittype: "select",
                           editoptions: {
                             dataUrl: "/CuentasMedicas/recursos/GET/getRoles.jsp?grid=true"
                         }
                     },
                     {
                        label: 'Creado por',
                         name: 'CREADOPOR',
                         editable: false,
                         edittype: "text"
                     },
                     {
                        label: 'Fecha de Creación',
                         name: 'FECHACREACION',
                         editable: false,
                         edittype: "text"
                     },
                     {
                        label: 'Ultimo Acceso',
                         name: 'ULTIMOACCESO',
                         editable: false,
                         edittype: "text"
                     },
                     {
                        label: 'Estado',
                         name: 'ESTADO',
                         editable: true,
                        formatter: "select",
                        edittype: "select",
                        editoptions: {
                            value: {
                               1: "Activo",
                               2: "Inactivo"
                           }
                        }
                     }
                ],
                onSelectRow: editRow, // the javascript function to call on row click. will ues to to put the row in edit mode
                viewrecords: true,
                rowNum: 10,
                rowList : [10, 20, 30 ,50 ,100 ,500,1000],
                autowidth: true,
                pager: "#jqGridPager",
                caption : "<b>Administración de Usuarios</b>",
               
            });
             $(".ui-jqgrid-caption").append("<button title='Exportar PDF' class='btn btn-danger iconsexport' id='exportpdf'><i class='fa fa-file-pdf-o '></i></button>");  
              $(".ui-jqgrid-caption").append("<button title='Exportar Excel' class='btn btn-success iconsexport' id='exportexcel'><i class='fa fa-file-excel-o '></i></button>");
                jQuery("#jqGrid").jqGrid('navGrid', "#jqGridPager", {
            edit : true,
            add : true,
            del : false,
            view: false,
            search: true,
            refresh: true,
            beforeRefresh: refrescarGrilla 
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
                {
                    height: 'auto',
                    width: 620,
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
            var lastSelection;

            function editRow(id) {
                if (id && id !== lastSelection) {
                    var grid = $("#jqGrid");
                    grid.jqGrid('restoreRow',lastSelection);
                    grid.jqGrid('editRow',id, {keys:true, focusField: 4});
                    lastSelection = id;
                }
            }

            function createFreightEditElement(value, editOptions) {
                var div =$("<div style='margin-top:5px'></div>");
                var label = $("<label class='radio-inline'></label>");
                var radio = $("<input>", { type: "radio", value: "0", name: "freight", id: "zero", checked: (value != 25 && value != 50 && value != 100) });
				label.append(radio).append("0");
                var label1 = $("<label class='radio-inline'></label>");
                var radio1 = $("<input>", { type: "radio", value: "25", name: "freight", id: "twentyfive", checked: value == 25 });
				label1.append(radio1).append("25");
                var label2 = $("<label class='radio-inline'></label>");
                var radio2 = $("<input>", { type: "radio", value: "50", name: "freight", id: "fifty", checked: value == 50 });
				label2.append(radio2).append("50");
                //var label3 = $("<label class='radio-inline'></label>");
                //var radio3 = $("<input>", { type: "radio", value: "100", name: "freight", id: "hundred", checked: value == 100 });
				//label3.append(radio3).append("100");
                div.append(label).append(label1).append(label2);//.append(label3);

                return div;
            }

            // The javascript executed specified by JQGridColumn.EditTypeCustomGetValue when EditType = EditType.Custom
            // One parameter passed - the custom element created in JQGridColumn.EditTypeCustomCreateElement
            function getFreightElementValue(elem, oper, value) {
                if (oper === "set") {
                    var radioButton = $(elem).find("input:radio[value='" + value + "']");
                    if (radioButton.length > 0) {
                        radioButton.prop("checked", true);
                    }
                }

                if (oper === "get") {
                    return $(elem).find("input:radio:checked").val();
                }
            }
            
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
        
        function refrescarGrilla() {
            mygrid.jqGrid('setGridParam', {
                datatype: "json"
            });
            mygrid.trigger("reloadGrid");
            return [true, ""];
        }





