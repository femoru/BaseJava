$( "#btnregistrar" ).click(function() {
    var valideta = $('.validetta-bubble').length;
    if(valideta>0){
        return;
    }else{
        swal({   
       title: "Realizado!",   
       text: "Datos actualizados corectamente!",   
       type: "success",  
       confirmButtonText: "ok" }, 
    function(){   
      $( "#frmperfiluser" ).submit();
    });
    }
});
    $('#frmperfiluser').validetta({
     realTime : true
    });
    $('.datetimepicker1').datetimepicker({
     format: 'YYYY-MM-DD'
    });