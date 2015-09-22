//$(document).on("ready",function(){
    $("#jqGrid").jqGrid({
        url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?callback=?&qwery=longorders',
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "jsonp",
        colModel: [
            { label: 'OrderID', name: 'OrderID', key: true,  index : 'id' },
            { label: 'Customer ID', name: 'CustomerID'},
            { label: 'Order Date', name: 'OrderDate' },
            { label: 'Freight', name: 'Freight'},
            { label:'Ship Name', name: 'ShipName' },
            //{ name : 'Opciones', index:'Opciones', sortable:false }
        ],
        viewrecords: true,
        height: 370,
        //autowidth: true,
        width: 1000,
        rowNum: 10,
        toolbarfilter: true,
        multiselect : true,
        pager: "#jqGridPager",
        caption: "Matriz de Recepción de Documentos"
        
        /*gridComplete: function(){    opciones para edicion en linea
            var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
            for(var i=0;i < ids.length;i++){
                var cl = ids[i];
                be = "<button class='btn btn-xs btn-default btn-quick' title='Edit Row' onclick=\"jQuery('#jqgrid').editRow('"+cl+"');\"><i class='fa fa-pencil'></i></button>"; 
                se = "<button class='btn btn-xs btn-default btn-quick' title='Save Row' onclick=\"jQuery('#jqgrid').saveRow('"+cl+"');\"><i class='fa fa-save'></i></button>";
                ca = "<button class='btn btn-xs btn-default btn-quick' title='Cancel' onclick=\"jQuery('#jqgrid').restoreRow('"+cl+"');\"><i class='fa fa-times'></i></button>";  
                jQuery("#jqGrid").jqGrid('setRowData',ids[i],{Opciones:be+se+ca});
            }	
        },*/
        //toolbar: [true,"top"]
    });
     $('#jqGrid').navGrid('#jqGridPager',
       {
           edit: true,
           add: true,
           del: true,
           search: true,
           refresh: true,
           view: true,
           position: "left",
           cloneToTop: false
       });
       
       /* inserccion de iconos de edicion*/
       jQuery("#jqGrid").jqGrid('navGrid','#pgtoolbar1',{edit:false,add:false,del:false});
        $(".ui-jqgrid-caption").append("<i class='fa fa-file-pdf-o iconsexport' title='Exportar PDF' id='exportpdf'></i>");  
        $(".ui-jqgrid-caption").append("<i class='fa fa-file-excel-o iconsexport' title='Exportar Excel' id='exportexcel'></i>");

        /* funcion para iconos de exportacion de documentos*/
        /*$("i",".ui-jqgrid-caption").click(function(){
                alert("Hi! I'm added button at this toolbar");
        });*/

         /* estilizacion de los botones de edicion*/       
        jQuery(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
        jQuery(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
        jQuery(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
        jQuery(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
        jQuery(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
        jQuery(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    //});