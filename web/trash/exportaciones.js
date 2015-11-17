         $("#exportexcel").on("click",function(){
            exportGrid();
        });
 function exportGrid(){
            var filename;
            /*var grid = $('#jqGrid');
            var rowIDList = grid.getDataIDs();
            var row = grid.getRowData(rowIDList[0]); 
            var colNames = [];
            var i = 0;
            for(var cName in row) {
                colNames[i++] = cName; // Capture Column Names
            }
            var html = "";
            for(var j=0;j<rowIDList.length;j++) {
                row = grid.getRowData(rowIDList[j]); // Get Each Row
                for(var i = 0 ; i<colNames.length ; i++ ) {
                    html += row[colNames[i]] + ';'; // Create a CSV delimited with ;
                }
                html += '\n';
            }
            html += '\n';

            var a         = document.createElement('a');
            a.id          = 'ExcelDL';
            a.href        = 'data:application/vnd.ms-excel,' + html;
            a.download    = filename ? filename + ".xls" : 'DataList.xls';
            document.body.appendChild(a);
            a.click(); // Downloads the excel document
            document.getElementById('ExcelDL').remove();*/
            
          mya = $("#jqGrid").getDataIDs(); // Get All IDs
          var data = $("#jqGrid").getRowData(mya[0]); // Get First row to get the
          // labels
          var colNames = new Array();
          var ii = 0;
          for ( var i in data) {
              colNames[ii++] = i;
          } // capture col names
          var html = "<html><head>"
                  + "</head>"
                  + "<body>";
                  + "<table>";
          for ( var k = 0; k < colNames.length; k++) {
              html = html + "<th>" + colNames[k] + "</th>";
          }
          html = html + "</tr>"; // Output header with end of line
          for (i = 0; i < mya.length; i++) {
              html = html + "<tr>";
              data = $("#jqGrid").getRowData(mya[i]); // get each row
              for ( var j = 0; j < colNames.length; j++) {
                html = html + "<td>" + data[colNames[j]] + "</td>"; // output each Row as
                          // tab delimited
              }
              html = html + "</tr>"; // output each row with end of line
          }
          html = html + "</table></body></html>"; // end of line at the end
          //alert(html);
          html = html.replace(/'/g, '&apos;');
          var a         = document.createElement('a');
            a.id          = 'ExcelDL';
            a.href        = 'data:application/vnd.ms-excel,' + html;
            a.download    = filename ? filename + ".xlsx" : 'Recepcion_de_Documentos.xlsx';
            document.body.appendChild(a);
            a.click(); // Downloads the excel document
            document.getElementById('ExcelDL').remove();
            /*var form = "<form name='pdfexportform' action='/CuentasMedicas/ExportacionServlet' method='POST'>";
            form = form + "<input type='hidden' name='pdfBuffer' value='" + html + "'>";
            form = form + "</form><script>document.pdfexportform.submit();</script>";
            OpenWindow = window.open('', '');
            OpenWindow.document.write(form);
            OpenWindow.document.close();*/
          }