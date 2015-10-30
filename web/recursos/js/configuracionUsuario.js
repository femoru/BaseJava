$('#formconfiguracion').validetta({
    realTime : true
});

var oper = $("#oper").val(); 
$("#contrasenaanterior").on("keyup",function(){
    $("#spanverificando").html('');
    $("#spanverificando").append('<img id="imgloader" src="recursos/img/spinner1.gif" />');
    var contrasena = $(this).val();
     $.ajax({
     type: "POST",
     url: "/CuentasMedicas/Usuarios",
     data:'oper=pass&contrasena='+contrasena
   }).done(function(data) {
        if (data.length == 1){
            $("#contentconfig").html('');
            $("#spanverificando").html('');
           $("#contentconfig").append('<label id = "labelcontrasenueva" for="contrasenanueva">Contraseña Nueva</label><div class="inner-addon left-addon"><i class="fa fa-lock"></i><input type="password" class="form-control" name="contrasenanueva" id="contrasenanueva" data-validetta="required" /></div><label for="confirmar">Confirmar Contraseña Nueva</label><div class="inner-addon left-addon"><i class="fa fa-lock"></i><input type="password" class="form-control" name="confirmar" id="confirmar" data-validetta="required,equalTo[contrasenanueva]" /></div><br/> <button type="submit" class="btn btn-primary col-lg-4 botonesfrm" id="btnrecontrasena" name="btncambio" value="1">Enviar</button>');
            $('#btnrecontrasena').on("click",function(){
                $('#formconfiguracion').on("submit",function(e){
                    e.preventDefault();
                    });
                    //var valideta = $('.validetta-bubble').length;
                        var confirmar = $('#confirmar').val();
                        var contrasenanueva = $('#contrasenanueva').val();
                        var same;
                        if (confirmar == contrasenanueva){
                            same = true;
                        }else{
                            same = false;
                        }

                        if(confirmar != "" && same == true){
                            $.ajax({
                            type: "POST",
                            url: "/CuentasMedicas/Usuarios", 
                            data:'oper=newpass&confirmar='+confirmar
                             }).done(function(data) {
                                if (data.length == 1){
                                     swal({   
                                        title: "Realizado!",   
                                        text: "Contraseña actualizada correctamente!",   
                                        type: "success",  
                                        confirmButtonText: "ok" }, 
                                    function(){   
                                      location.reload("home.jsp");
                                    });
                                }
                           });
                       }
                        
            });
        
        }else{
            $("#contentconfig").html('');
        }
    });
});

