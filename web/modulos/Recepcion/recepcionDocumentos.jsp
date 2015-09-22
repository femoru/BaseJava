<%-- 
    Document   : recepcionDocumentos
    Created on : 22/09/2015, 09:51:26 AM
    Author     : bmunoz
--%>
<!DOCTYPE html>
<html>
    <div class="table-responsive contenttablas">
    <table id="jqGrid" class="tablasdatos"></table>
    <div id="jqGridPager"></div>
</div>
    <script type="text/javascript"> 
        $(document).ready(function () {
			
            $("#jqGrid").jqGrid({
                url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?callback=?&qwery=longorders',
                mtype: "GET",
				styleUI : 'Bootstrap',
                datatype: "jsonp",
                colModel: [
                    { label: 'OrderID', name: 'OrderID', key: true },
                    { label: 'Customer ID', name: 'CustomerID'},
                    { label: 'Order Date', name: 'OrderDate' },
                    { label: 'Freight', name: 'Freight'},
                    { label:'Ship Name', name: 'ShipName' }
                ],
				viewrecords: true,
                height: 350,
                rowNum: 20,
                pager: "#jqGridPager"
            });
        });
 
   </script>
</html>
