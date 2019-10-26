
function setServer(url) {
    window.serverhost = url+"/";
}

function postWithCallback(path, data, callback) {
    $.ajax({
      url:window.serverhost+path,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: callback,
      error: (jqxhr, textStatus, errorThrown)=>{
        console.log(errorThrown)
      }
    });
}

function post(path, data) {
    return new Promise(resolve => {
        postWithCallback(path, data, (result) => {
            resolve(result);
        });
    });
}

function clearCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function checkLogin(form) {
    if(form.userid.value == "ian" && form.pswrd.value == "bad") {
        window.open('/Users/sweetenedicedtea/Desktop/munchApp/munch/adminwebpage/homework/adminLogin.html', '_self')/*opens the target page while Id & password matches*/
    }
    else {
        alert("Error Password or Username")
    }
}
