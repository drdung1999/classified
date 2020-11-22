$(document).ready(function() {
    $('#btn-login').on('click', function(e) {
        e.preventDefault();

        let email = $('#input-email').val();
        let password = $('#input-password').val();

        $.ajax({
            type: 'POST',
            url: "/login",
            data: {email, password},
            success: function(){
                window.location.replace("/")
            },
            error: function( msg ) {
                alertify.error(msg.responseText);
            }
        })
    })
})