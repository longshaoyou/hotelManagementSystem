let password = document.getElementsByClassName("password")[0];
let user = document.getElementsByClassName("user")[0];
password.addEventListener("keyup", event => {
    // document.getElementsByClassName("loginButton").click();
})
document.getElementsByClassName("loginButton")[0].addEventListener('click', async () => {
    if (!password.value || !user.value) return
    console.log(password.value, user.value);
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
        }
    }
    xmlhttp.open("POST", "/api/login", true);
    xmlhttp.send(encodeURIComponent("user=" + user.value + "&password" + password.value));
    setCookie("token", "user=" + user.value + "&password" + password.value);
    setCookie("user", user.value);
    document.location.href = "/manage/index.html";
});

function keyup_submit(e) {
    var evt = window.event || e;
    document.getElementsByClassName("input")[0].value = evt.keyCode;
}


function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}


function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}