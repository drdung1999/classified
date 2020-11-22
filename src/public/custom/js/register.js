$(document).ready(function(){
    $('#btn-create-account').on('click', function(e) {
        e.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();
        let re_password = $('#re-password').val();

        if(email.trim().length < 10) {
            alertify.error("Email nhập vào không chính xác");
            return false;
        }

        if(password.trim().length == 0) {
            alertify.error("Bạn cần nhập vào mật khẩu")
            return false
        }

        if(password.trim() != re_password.trim()){
            alertify.error("Nhập lại mật khẩu không chính xác")
            return false
        }

        $.ajax({
            type: "POST",
            url: "/register",
            data: {email, password},
            success: function(){
                alertify.confirm("Tạo tài khoản thành công. Chuyển đến trang đăng nhập:",
                    function(){
                        window.location.replace("/")
                    },
                    function(){
                        alertify.success("Đã hủy chuyển trang.");
                    });
            },
            error: function( msg ) {
                alertify.error(msg)
            }
        })
    })
})