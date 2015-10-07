var data = [{
          id : "1",
          Integer : "10000",
          Number : "562.2",
          Email : "Comfandi@hotmail.com",
          Url : "http://www.google.com"
  }];
  
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };

    var gridArr = $("#jqGrid2").getDataIDs();
            var selrow = $("#jqGrid2").getGridParam("selrow");
            var curr_index = 0;
            for (var i = 0; i < gridArr.length; i++) {
                if (gridArr[i] == selrow) {
                    curr_index = i;
                }
            };

                    $("#jqGrid").jqGrid({
               // url: 'data.json',
                //editurl: 'clientArray',
                datatype: "local",
                data:data,
                styleUI : 'Bootstrap',
                modal: true,
                autoOpen: false,
                ignoreCase: true,
                colModel: [
                    {
                        name: 'Integer',
                        key: true,
                        editable: true,
                        editrules:{
                            //custom rules
                            custom_func: personalizada,
                            custom: true,
                            //required: true
                        },
                        
                        width: 75
                    },
                    {
                        name: 'Number',
                        width: 100,
                        editable: true,
                        editrules: {
                           custom_func: validatePositive,
                            custom: true
                        }
                    },
                    {
                        name: 'Email',
                        width: 100,
                        editable: true,
                        editrules: {
                            email: true,
                            required: true
                        }
                    },
                    {
                        name: 'Url',
                        width: 80,
                        editable: true,
                        editrules: {
                            url: true,
                            required: true
                        }
                    }
                ],
				loadonce : true,
                onSelectRow: editRow,
                autowidth: true,
                height: 200,
                rowNum : 10,
                rowList : [10, 20, 30 ,50 ,100 ,500,1000],
                toolbarfilter: true,
                viewrecords : true,
                pager: "#jqGridPager",
                loadComplete: function (data) {
                var grid = jQuery("#jqGrid"),//creador de filas vacias
                
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
              }
        });

        var lastSelection;

        function onEnter(e){

            var key = e.charCode || e.keyCode;
             if (key == 9 || key ==13){
                var sel_id = $("#jqGrid").getGridParam('selrow');
               // alert(sel_id);
                var index = $("#jqGrid").jqGrid('getInd',sel_id); 
                var cm = $("#jqGrid").jqGrid("getGridParam", "colNames");
               
                //alert(cm[index-1]);
                $.jgrid.info_dialog(
                $.jgrid.regional["es"].errors.errcap,
                '<div class="ui-state-error">Faltan datos por ingresar</div>', 
                $.jgrid.regional["es"].edit.bClose,
                {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234}
                );
             }
        }
        function editRow(id) {
            if (id && id !== lastSelection) {
                var grid = $("#jqGrid");
                grid.jqGrid('restoreRow',lastSelection);

                var editParameters = {
                    keys: true,
                    successfunc: editSuccessful,
                    errorfunc: editFailed
                };

                grid.jqGrid('editRow',id, editParameters);
                lastSelection = id;
            }
        }

        function editSuccessful() {
            //console.log("success");
        }

        function editFailed() {
            //console.log("fail");
            $.jgrid.info_dialog(
            $.jgrid.regional["es"].errors.errcap,
            '<div class="ui-state-error">es un campo númerico</div>', 
            $.jgrid.regional["es"].edit.bClose,
            {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234}
                 );
        }

        function validatePositive(value, column) {
            if ( isNaN(value) && value < 0)
                return [false, "Please enter a positive value or correct value"];
            else
                return [true, ""];
        }                
    function personalizada (value, colName, valueLength) {
        if (value.length === valueLength) {
            return [true, ""];
        }
        else {
            instancia(colName);
            return [false, ''];//debe retornar un arreglo pero devuelve un alert vacio
        }
    }
    function instancia(colName){
         $.jgrid.info_dialog(
            $.jgrid.regional["es"].errors.errcap,
            '<div class="ui-state-error">'+colName+'</div>', 
            $.jgrid.regional["es"].edit.bClose,
            {buttonalign:'right', styleUI : 'Bootstrap', zIndex: 1234}
        );
    }