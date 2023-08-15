/* 
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
function login() {
    $.ajax({
        url: "/login/account",
        method: "POST",
        data: {
            name: $('#name').val(),
            password: $('#password').val()
        }
    }).then(data => {
        setCookie('token',data.token, 1)
    }).catch(error => {
        console.log(error);
    });
  }; */