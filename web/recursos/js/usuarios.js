
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
                    { label: 'Usuario',name: 'USUARIO', editable: true,edittype:"text",editrules:{required:true}},
                    {label: 'Nombres', name: 'NOMBRES',editable: true,edittype: "text",editrules:{required:true}},
                    {label: 'Apellidos',name: 'APELLIDOS',editable: true,edittype: "text",editrules:{required:true}},
                    {label: 'Contraseña',name: 'CONTRASENA',formatter:'password',edittype:'password',
                        editrules: {edithidden:true,required:true},editable: true,hidden:true},
                    {label: 'Correo',name: 'CORREO',editable: true,width:280,edittype: "text",
                        editrules:{required:true,email:true}},
                    {label: 'Fecha de Nacimiento', name: 'FECHANACIMIENTO',editable: true,edittype: "text",editoptions: {
                            dataInit: function (element) {
                                var dateNow = new Date();
                               $(element).datetimepicker({
                                    locale: 'es',
                                    format: 'YYYY/MM/DD HH:mm',
                                    defaultDate:dateNow
                                });
                            }
                        },
                        editrules:{required:true}
                     },
                     {label: 'Rol',name: 'ROL',editable: true, // formatter: "select",
                        edittype: "select",editoptions: {dataUrl: "/CuentasMedicas/recursos/GET/getRoles.jsp?grid=true"},
                         editrules:{
                            required:true
                        }
                     },
                     {label: 'Creado por',name: 'CREADOPOR',editable: false,edittype: "text"},
                     {label: 'Fecha de Creación',name: 'FECHACREACION',editable: false,edittype: "text"},
                     {label: 'Ultimo Acceso',name: 'ULTIMOACCESO',editable: false,edittype: "text"},
                     {label: 'Estado',name: 'ESTADO',editable: true,formatter: "select",width:100,edittype: "select",
                        editoptions: {
                            value: {
                               1: "Activo",
                               2: "Inactivo"
                           }
                        },editrules:{
                            required:true
                        }
                     }
                ],
                onSelectRow: editRow, 
                viewrecords: true,
                rowNum: 10,
                rowList : [10, 20, 30 ,50 ,100 ,500,1000],
                autowidth: true,
                pager: "#jqGridPager",
                caption : "<b>Administración de Usuarios</b>"

            });
            //$(".ui-jqgrid-caption").append("<button title='Exportar PDF' class='btn btn-danger iconsexport' id='exportpdf'><i class='fa fa-file-pdf-o '></i></button>");  
            //$(".ui-jqgrid-caption").append("<button title='Exportar Excel' class='btn btn-success iconsexport' id='exportexcel'><i class='fa fa-file-excel-o '></i></button>");
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
                width: 450,
                recreateForm: true,
                closeAfterEdit: true,
                afterSubmit: function(){
                    mygrid.jqGrid('setGridParam', {
                    datatype: "json"
                    });
                    mygrid.trigger("reloadGrid");
                    return [true, ""];
                },
                errorTextFormat: function (data) {
                    return 'Error oshe: ' + data.responseText;
                }
            
            },
            {
                height: 'auto',
                width: 450,
                closeAfterAdd: true,
                recreateForm: true,
                afterSubmit: function(){
                    mygrid.jqGrid('setGridParam', {
                    datatype: "json"
                    });
                    mygrid.trigger("reloadGrid");
                    return [true, ""];
                },
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
        function editRow() {
            $('#edit_jqGrid').click();
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