/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).on("ready",function(){
    $('.carousel').carousel();
    
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
   $.jgrid.defaults.width = 780;
    
});


