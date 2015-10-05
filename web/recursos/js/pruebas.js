var data = [{
          id : "1",
          Integer : "2000000",
          Number : "562.2",
          Email : "Comfandi@hotmail.com",
          Url : "http://www.google.com"
  }];
  
  $("#jqGrid").jqGrid({
                url: 'data.json',
                //editurl: 'post.json',
                datatype: "local",
                data:data,
                colModel: [
                    {
                        name: 'Integer',
                        editable: true,
                        width: 75
                    },
                    {
                        name: 'Number',
                        width: 100,
                        editable: true
                    },
                    {
                        name: 'Email',
                        width: 100,
                        editable: true
                    },
                    {
                        name: 'Url',
                        width: 80,
                        editable: true
                    }
                ],
				loadonce : true,
                height: 200,
                rowNum: 10,
                onSelectRow: editRow,
                pager: "#jqGridPager"
            });

            var lastSelection;

            function editRow(id) {
                if (id && id !== lastSelection) {
                    var grid = $("#jqGrid");
                    grid.restoreRow(lastSelection);

                    var editParameters = {
                        keys: true,
                        successfunc: editSuccessful,
                        errorfunc: editFailed,
			restoreAfterError : false
                    };
                    grid.jqGrid('editRow',id, editParameters);
                    lastSelection = id;
                }
            }

            function editSuccessful( data, stat) {
                    var response = data.responseJSON;
                    if (response.hasOwnProperty("error")) {
                            if(response.error.length) {
                                    return [false,response.error ];
                            }
                    }
                    return [true,"",""];
            }

            function editFailed(rowID, response) {
                $.jgrid.info_dialog(
                                $.jgrid.regional["en"].errors.errcap,
                '<div class="ui-state-error">RowID:sdf</div>', 
                $.jgrid.regional["en"].edit.bClose,
                {buttonalign:'right', styleUI : 'Bootstrap'}
                );
                //alert(response.responseJSON.error);
            }