$(document).ready(function(){
    $("#btn-user-update-profile").on("click", function(event){
        event.preventDefault();

        let username = $("#input-username").val();
        let phone_number = $("#input-phone-number").val();
        let address = $("#input-address").val();

        $.ajax({
            type: "POST",
            url: "/user-update-profile",
            data: {username, phone_number, address},
            success: function(message) {
                alertify.success(message);
            },
            error: function(msg) {
                alertify.error(msg.responseText);
            }
        })
    })
})