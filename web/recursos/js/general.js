﻿$(document).on("ready",function(){
    $("#linkrecdocs, #linkradconrips , #linkradsinrips, #linkperfil, #linkusua, #linkconfiguracion").on("click",function(){
        $('.seccionjumbo').remove();
        $('.contenidotemporal').remove(); 
        $('.seccioninfo').remove();
        $('.navbar-brand').html("");
    });
    $("#linkrecdocs").on("click",function(){
        $('.navbar-brand').html("RECEPCIÓN DE DOCUMENTOS");
        $( ".nuevapagina" ).load( "modulos/Recepcion/recepcionDocumentos.jsp" );
    });
    $("#linkradconrips").on("click",function(){
         $('.navbar-brand').html("RADICACIÓN DE DOCUMENTOS CON RIPS");
        $( ".nuevapagina" ).load( "modulos/Radicacion/radicacionConRips.jsp" );
    });
    $("#linkradsinrips").on("click",function(){
        $('.navbar-brand').html("RADICACIÓN DE DOCUMENTOS SIN RIPS");
        $( ".nuevapagina" ).load( "modulos/Radicacion/radicacionSinRips.jsp" );
    });
    $("#linkusua").on("click",function(){
        $('.navbar-brand').html("REGISTRO DE USUARIOS");
        $( ".nuevapagina" ).load( "modulos/administracion/Usuarios.jsp" );
    });
    $("#linkperfil").on("click",function(){
        $('.navbar-brand').html("EDICIÓN DE PERFIL");
        $( ".nuevapagina" ).load( "modulos/administracion/perfilUsuario.jsp" );
    });
     $("#linkconfiguracion").on("click",function(){
        $('.navbar-brand').html("CONFIGURACIÓN");
        $( ".nuevapagina" ).load( "modulos/administracion/configuracionUsuario.jsp" );
    });
     $("#pruebas").on("click",function(){
        $('.seccionjumbo').remove();
        $('.contenidotemporal').remove();
        $('.seccioninfo').remove();
        $('.navbar-brand').html("");
        $('.navbar-brand').html("PRUEBAS");
        $( ".nuevapagina" ).load( "modulos/administracion/Pruebas.jsp" );
    });
    $(".linkhome").on("click",function(){
        location.reload();
    });
    
    $( "#compresormenu" ).click(function() {
       $( "#logo2" ).toggle();//remuevo el logo 
       $('.titulosmenus').toggle();//remuevo los titulos del menu
       
      if($('#contentmenu').hasClass('col-lg-3')|| $('#contentmenu').hasClass('col-md-3')) {
        $('#contentmenu').removeClass('col-lg-3').removeClass('col-md-3');//compresion del menu
        $('#contentmenu').addClass('col-lg-1').addClass('col-md-1');
        $('#contentsectionp').removeClass('col-lg-9').removeClass('col-md-9');//expansion de la seccion
        $('#contentsectionp').addClass('col-lg-11').addClass('col-md-11');
        
        $('#leftMenu .fa').css("font-size","30px");//modifico los iconos del menu
        $('#leftMenu .fa').css("margin-left","10px");
        
       // $('#contentmenu #collapseThree ul').css('margin','0px');
        $('#contentmenu #collapseThree ul').css('padding-left','0px');//modifico el padding para los submenus
        $('#contentmenu #collapseAdmin ul').css('padding-left','0px');
      }else{
        $('#contentmenu').removeClass('col-lg-1').removeClass('col-md-1');
        $('#contentmenu').addClass('col-lg-3').addClass('col-md-3');
        $('#contentsectionp').removeClass('col-lg-11').removeClass('col-md-11');
        $('#contentsectionp').addClass('col-lg-9').addClass('col-md-9');
        
        $('#leftMenu .fa').css("font-size","inherit");
        $('#leftMenu .fa').css("margin-left","0px");
         $('#contentmenu #collapseThree ul').css('padding-left','40px');
          $('#contentmenu #collapseAdmin ul').css('padding-left','40px');
      }
      //$(window).bind('resize', function() {//se ajusta la grilla al nuevo tamaño de la pantalla+
  
        $("#jqGrid").jqGrid('setGridWidth',$("#contentsectionp").width(),true);
         $("#jqGrid2").jqGrid('setGridWidth',$("#contentsectionp").width(),true);       
    });   
});
