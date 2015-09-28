var jqgrid_data = [{
        OrderID:"10248",
        OrderDat:"1996-07-04",
        CustomerID:"WILMK",
        ShipName:"Vins et alcools Chevalier",
        Freight:"32.3800"
}];

$("#jqGrid").jqGrid({
        //url: 'data.json',
       // editurl: 'clientArray',
        data : jqgrid_data,
        styleUI : 'Bootstrap',
        datatype : "local",
        height : '600',
        page:1,
        autowidth : true,
        colModel: [
            { label: 'Order ID', name: 'OrderID', key: true, width: 75 },                   
            {
                label: 'Order Date',
                name: 'OrderDate',
                width: 150,
                editable: true,
                edittype:"text",
                editoptions: {
                    // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                    // use it to place a third party control to customize the toolbar
                    dataInit: function (element) {
                       $(element).datetimepicker({
                                //autoclose: true,
                                locale: 'es',
                                format: 'YYYY/MM/DD HH:mm'
                               // orientation : 'auto bottom'
                        });
                    }
                }
            },
             {
                                         label: 'Customer ID',
                 name: 'CustomerID',
                 width: 150,
                 editable: true,
                 edittype: "select",
                 editoptions: {
                     value: "ALFKI:ALFKI;ANATR:ANATR;ANTON:ANTON;AROUT:AROUT;BERGS:BERGS;BLAUS:BLAUS;BLONP:BLONP;BOLID:BOLID;BONAP:BONAP;BOTTM:BOTTM;BSBEV:BSBEV;CACTU:CACTU;CENTC:CENTC;CHOPS:CHOPS;COMMI:COMMI;CONSH:CONSH;DRACD:DRACD;DUMON:DUMON;EASTC:EASTC;ERNSH:ERNSH;FAMIA:FAMIA;FISSA:FISSA;FOLIG:FOLIG;FOLKO:FOLKO;FRANK:FRANK;FRANR:FRANR;FRANS:FRANS;FURIB:FURIB;GALED:GALED;GODOS:GODOS;GOURL:GOURL;GREAL:GREAL;GROSR:GROSR;HANAR:HANAR;HILAA:HILAA;HUNGC:HUNGC;HUNGO:HUNGO;ISLAT:ISLAT;KOENE:KOENE;LACOR:LACOR;LAMAI:LAMAI;LAUGB:LAUGB;LAZYK:LAZYK;LEHMS:LEHMS;LETSS:LETSS;LILAS:LILAS;LINOD:LINOD;LONEP:LONEP;MAGAA:MAGAA;MAISD:MAISD;MEREP:MEREP;MORGK:MORGK;NORTS:NORTS;OCEAN:OCEAN;OLDWO:OLDWO;OTTIK:OTTIK;PARIS:PARIS;PERIC:PERIC;PICCO:PICCO;PRINI:PRINI;QUEDE:QUEDE;QUEEN:QUEEN;QUICK:QUICK;RANCH:RANCH;RATTC:RATTC;REGGC:REGGC;RICAR:RICAR;RICSU:RICSU;ROMEY:ROMEY;SANTG:SANTG;SAVEA:SAVEA;SEVES:SEVES;SIMOB:SIMOB;SPECD:SPECD;SPLIR:SPLIR;SUPRD:SUPRD;THEBI:THEBI;THECR:THECR;TOMSP:TOMSP;TORTU:TORTU;TRADH:TRADH;TRAIH:TRAIH;VAFFE:VAFFE;VICTE:VICTE;VINET:VINET;WANDK:WANDK;WARTH:WARTH;WELLI:WELLI;WHITC:WHITC;WILMK:WILMK;WOLZA:WOLZA"
                 }
             },
            {
                                        label: 'Freigh',
                name: 'Freight',
                width: 150,
                                        sorttype:"number",
                editable: true,
                edittype: "custom",
                editoptions: {
                    custom_value: getFreightElementValue,
                    custom_element: createFreightEditElement
                }
            },
            {
                                        label: 'Ship Name',
                name: 'ShipName',
                width: 150,
                editable: true,
                edittype: "text",
                editoptions: {
                    // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                    // use it to place a third party control to customize the toolbar
                    dataInit: function (element) {
                        $(element).attr("autocomplete","off").typeahead({ 
                                appendTo : "body",
                                     source: function(query, proxy) {
                                             $.ajax({
                                                     url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/autocompletepbs.php?callback=?&acelem=ShipName',
                                                     dataType: "jsonp",
                                                     data: {term: query},
                                                     success : proxy
                                             });
                                     }
                        });
                    }
                }
            }
        ],
                        loadonce : true,
        onSelectRow: editRow, // the javascript function to call on row click. will ues to to put the row in edit mode
        viewrecords: true,
        height: '400',
        rowNum: 20,
        pager: "#jqGridPager",
        caption : "<b>Matriz Recepción de Documentos</b>"
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
       
        jQuery("#jqGrid").jqGrid('navGrid', "#jqGridPager", {
            edit : true,
            add : true,
            del : true,
            view: true
            //position: "left"
                
	});
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
        
	jQuery("#jqGrid").jqGrid('navGrid', "#jqGridPager", {
            edit : true,
            add : true,
            del : true,
            view: true
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