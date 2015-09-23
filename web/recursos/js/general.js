$(document).on("ready",function(){
    
    $("#linkrecdocs").on("click",function(){
        $('.seccionjumbo').remove();
        $('.contenidotemporal').remove();
        $('.seccioninfo').remove();
        $('.navbar-brand').html("");
        $('.navbar-brand').html("RECEPCIÓN DE DOCUMENTOS");
        $( ".nuevapagina" ).load( "modulos/Recepcion/recepcionDocumentos.jsp" );
    });
    $(".linkhome").on("click",function(){
        location.reload();
    });
    
    $( "#compresormenu" ).click(function() {
        
        
        /*$( ".titulosmenus" ).toggle( "slow" );
        $( "#logo2" ).toggle( "slow" );
        $( "#collapseThree" ).toggle( "slow" );
        $( "#collapseThree" ).toggle( "slow",function(){ 
                 //funcion para comprimir menu
         });*/
    });

   //$.jgrid.defaults.width = 780;    
});
