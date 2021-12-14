let content = document.getElementsByClassName("content")[0],
    userLogo = document.getElementsByClassName("userLogo")[0],
    tbody = document.getElementsByTagName("tbody")[0],
    funList = document.getElementsByClassName("funList")[0],
    right = document.getElementsByTagName("right"),
    main = document.getElementsByClassName("main")[0],
    table = document.getElementsByTagName("table");

//加载数据

let roomHead = [`房间号`, "房间类型", "价格", "状态"],
    roomData = [],
    nullRoom = [],
    fullRoom = [],
    total = roomData.length,
    funButton = ["房间信息查询", "住户信息管理", "内部人员管理"],
    HouseHoldHead = ["房间号", "住户名", "性别", "身份证号", "手机号", "入住时间", "退房时间", "房间状态"],
    HouseHoldData = [],
    staffHead = ['姓名', '性别', '身份证号', '电话', '工资', '密码', '权限'],
    staffData = [];
for (let i = 1; i <= 30; i++) {
    roomData.push({
        roomId: "10" + i,
        roomType: i % 2 == 0 ? "单人房" : "双人房",
        price: i % 2 == 0 ? "199" : "299",
        state: Math.random() >= 0.5 ? '未入住' : "已入住",
    });

    HouseHoldData.push({
        roomId: "10" + i,
        name: i % 2 === 0 ? "张三" : "李四",
        sex: i % 2 === 0 ? "男" : "女",
        nub: i % 2 === 0 ? 35082220113235123 : 35082220123235132,
        phone: Math.random() >= 0.5 ? 13850647853 : 13850647353,
        startDate: formatDate(new Date()),
        endDate: i % 2 === 0 ? formatDate(new Date(), 3) : formatDate(new Date(), 1),
        state: Math.random() >= 0.5 ? '未入住' : "已入住",
    });
    staffData.push({
        name: i % 2 === 0 ? "张三" : "李四",
        sex: i % 2 === 0 ? "男" : "女",
        nub: i % 2 === 0 ? 35082220113235123 : 35082220123235132,
        phone: Math.random() >= 0.5 ? 13850647853 : 13850647353,
        wage: i % 2 === 0 ? 10000 : null,
        password: i % 2 === 0 ? '123456' : null,
        level: i % 2 === 0 ? 3 : 2,
    });
}
roomData.forEach((i) => {
    if (i.state.includes("未入住")) {
        fullRoom.push(i);
    } else {
        nullRoom.push(i);
    }
});

//各种函数

//渲染功能按钮
function renderFunButton() {
    funList = document.getElementsByClassName("funList")[0];
    funList.innerHTML = funButton
        .map((i) => {
            return '<a href="#">' + i + "</a>";
        })
        .join("");
}

function formatDate(now, n = 0) {
    var year = now.getFullYear();
    var month = (Array(2).join(0) + (now.getMonth() + 1)).slice(-2);
    var date = (Array(2).join(0) + (now.getDate() + n)).slice(-2);
    var hour = (Array(2).join(0) + now.getHours()).slice(-2);
    var minute = (Array(2).join(0) + now.getMinutes()).slice(-2);
    var second = (Array(2).join(0) + now.getSeconds()).slice(-2);
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
//弹出边框
function sortTable(i) {
    console.log("sortTable", i);
    switch (i) {
        case 0:
            roomData[0].roomId - roomData[1].roomId < 0
                ? roomData.sort(function (a, b) {
                    return b.roomId - a.roomId;
                })
                : roomData.sort(function (a, b) {
                    return a.roomId - b.roomId;
                });
            renderRoomTable();
            break;
        case 1:
            let roomType = roomData[0].roomType;
            roomData.sort(function (a, b) {
                if (a.roomType !== roomType) {
                    return -1;
                }
                if (a.roomType === roomType) {
                    return 1;
                }
                return 0;
            });
            renderRoomTable();
            break;
        case 2:
            roomData[0].price - roomData[roomData.length - 1].price < 0
                ? roomData.sort(function (a, b) {
                    return b.price - a.price;
                })
                : roomData.sort(function (a, b) {
                    return a.price - b.price;
                });
            renderRoomTable();
            break;
        case 3:
            let state = roomData[0].state;
            roomData.sort(function (a, b) {
                if (a.state !== state) {
                    return -1;
                }
                if (a.state === state) {
                    return 1;
                }
                return 0;
            });
            renderRoomTable();
            break;
    }
    return;
}
//退房
function openTips(roomId) {
    for (let i = 0; i < HouseHoldData.length; i++) {
        if (HouseHoldData[i].roomId == roomId) {
            HouseHoldData[i].state = '未入住';
            roomData[i].state = '未入住';
        }
    }
    renderHouseHold();
}

//弹出住户信息登记框
function moveInto(roomId) {
    //     background-color: rgba(0, 0, 0, 0.3);
    // z-index: 0;
    document.getElementsByClassName(
        "infoRegister"
    )[0].innerHTML = `<div class="infoRegisterBg"><div class="infoRegisterTitle">住户信息登记</div><div class="infoInput"><span class="tipWord">姓名</span><input type="text" id="userName" /></div><div class="infoInput"><span class="tipWord">身份证</span><input type="text" id="userId" /></div><div class="infoInput"><span class="tipWord">电话</span><input type="text" id="userName" /></div><div class="infoInput"><span class="sex"> 性别 </span><div class="sexRadio"> 男 <input class="radio" type="radio" name="sex" id="man" /> 女 <input class="radio" type="radio" name="sex" id="woman" /></div></div><div class="infoInput"><div><span id="roomIdWord">房间号</span><select id="roomId" name="roomId" class="shortselect"> <option value=${roomId}>${roomId}</option>
    ${nullRoom
            .map((i) => {
                if (i.roomId === nullRoom) {
                    return;
                } else {
                    return `<option value="${i.roomId}">${i.roomId}</option>`;
                }
            })
            .join("")}</select> </div> </div><div class="infoInput"><span class="tipWord">入住天数</span><input type="text" id="stayDays" /></div><div class="btn-grad">登记</div> </div>`;

    document.getElementsByClassName("black")[0].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    document.getElementsByClassName("black")[0].style.zIndex = 0;
    document.getElementsByClassName("infoRegister")[0].style.zIndex = 1;
    addinputStyle();
}
//回车保存
function swi() {
    if (event.keyCode == 13) {
        event.path[0].blur();
    }
}
function clearContent() {
    // content = document.getElementsByClassName("content")[0];
    content.innerHTML = `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2245" width="200" height="200"><path d="M144.205 202.496a136.678 136.678 0 1 0 273.357 0 136.678 136.678 0 1 0-273.357 0zM41.728 492.902a119.578 119.578 0 1 0 239.155 0 119.578 119.578 0 1 0-239.155 0zM144.23 749.158a102.502 102.502 0 1 0 205.005 0 102.502 102.502 0 1 0-205.005 0zM435.2 861.926a89.6 89.6 0 1 0 179.2 0 89.6 89.6 0 1 0-179.2 0z m289.843-95.666a85.427 85.427 0 1 0 170.855 0 85.427 85.427 0 1 0-170.855 0z m136.704-290.433a68.326 68.326 0 1 0 136.653 0 68.326 68.326 0 1 0-136.653 0zM759.22 219.571a51.251 51.251 0 1 0 102.502 0 51.251 51.251 0 1 0-102.503 0zM512 85.376a34.176 34.176 0 1 0 68.352 0 34.176 34.176 0 1 0-68.352 0z" p-id="2246"></path></svg>加载中`;
    if (right.length === 1) {
        main.removeChild(right[0]);
    }
    if (table.length === 1) {
        content.innerHTML = "";
    }
}
//渲染内部员工表
// staffDate.push({
//     
//     name: i % 2 === 0 ? "张三" : "李四",
//     sex: i % 2 === 0 ? "男" : "女",
//     nub: i % 2 === 0 ? 35082220113235123 : 35082220123235132,
//     phone: Math.random() >= 0.5 ? 13850647853 : 13850647353,
//     wage: i % 2 === 0 ? 10000 : null,
//     password: i % 2 === 0 ? '123456' : null,
//     level: i % 2 === 0 ? 3 : 2,
// });
function setWight(params) {
    let tr = document.getElementsByTagName("tr")[0];
    console.log((tr.offsetWidth / tr.getElementsByTagName("th").length) + "")
    for (let i = 0; i < document.getElementsByTagName("th").length; i++) {
        document.getElementsByTagName("th")[i].style.width = (tr.offsetWidth / tr.getElementsByTagName("th").length) + "px";
    }
    for (let i = 0; i < document.getElementsByTagName("tr").length; i++) {
        document.getElementsByTagName("td")[i].style.width = (tr.offsetWidth / tr.getElementsByTagName("th").length) + "px";
    }
}
function renderStaff() {
    clearContent();
    html = `<table class="bordered HouseHold"><thead><tr>${staffHead.map((i, j) => {
        //渲染头
        return '<th><div href="javascript:void(0);" ><div>' + i + " </div></div></th>";
    }).join("")}</tr></thead><tbody>${staffData.map((i) => {
        //渲染数据
        return `<tr><td contenteditable="true"  onkeydown="swi()">${i.name}</td><td contenteditable="true" onkeydown="swi()">${i.sex}</td><td contenteditable="true" onkeydown="swi()">${i.nub}</td><td contenteditable="true" onkeydown="swi()">${i.phone}</td><td contenteditable="true" onkeydown="swi()">${i.wage == null ? "" : i.wage}</td><td contenteditable="true" onkeydown="swi()">${i.password == null ? "" : i.password}</td><td contenteditable="true" onkeydown="swi()">${i.level}</td></tr>`;
    }).join("")}</tbody></table>`;

    content.innerHTML = html;
    setWight();
}
//渲染住户信息管理表
function renderHouseHold() {
    clearContent();
    html = `<table class="bordered HouseHold"><thead><tr>${HouseHoldHead.map((i, j) => {
        //渲染头
        return '<th><div href="javascript:void(0);"  style=" display: flex; justify-content: center;align-items: center;" ><div>' + i + " </div></div></th>";
    }).join("")}</tr></thead><tbody>${HouseHoldData.map((i) => {
        //渲染数据
        if (i.state.includes("未入住")) {
            return `<tr><td>${i.roomId}</td><td></td><td></td><td></td><td></td><td></td><td></td><td><a href="javascript:void(0);""  class="roomRegButton"style=" display: flex; justify-content: center;align-items: center; transform: translateX(11px);" >未入住</a></td></tr>`;
        }
        return `<tr><td>${i.roomId}</td><td contenteditable="true" onkeydown="swi()">${i.name}</td><td contenteditable="true" onkeydown="swi()">${i.sex}</td><td contenteditable="true" onkeydown="swi()">${i.nub}</td><td contenteditable="true" onkeydown="swi()">${i.phone}</td><td contenteditable="true" onkeydown="swi()">${i.startDate}</td><td contenteditable="true" onkeydown="swi()">${i.endDate}</td><td><a href="javascript:void(0);" onclick="openTips(${i.roomId})" class="roomRegButton"style=" display: flex; justify-content: center;align-items: center; transform: translateX(11px);" onkeydown="swi()" >${i.state}</a></td></tr>`;
    }).join("")}</tbody></table>`;

    content.innerHTML = html;
    //渲染right 右侧信息栏
    main.innerHTML += `<div class="right"><div class="rightLayout"><div class="rightContent"><div class="roomContent">空房:<span>${nullRoom.length}间</span> </div> <div class="roomContent">已住房间:<span>${fullRoom.length}间</span></div><div class="roomContent">总房间数:<span>${roomData.length}间</span></div><div class="roomContent"><svg class="top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2403"><path d="M838.116 732.779 877.7 693.195 511.979 327.549 146.3 693.195 185.883 732.779 512.003 406.652Z" p-id="2404"></path> </svg></div> </div> </div> </div>`;
    right = document.getElementsByClassName("right");
    let tranX = 200,
        tranRight = setInterval(() => {
            if (right.length === 0 || !right[0].style) {
                clearInterval(tranRight);
                return;
            }

            right[0].style.transform = "translateX(" + tranX + "px)";
            tranX--;
            if (tranX < 0) {
                clearInterval(tranRight);
            }
        }, 1);
    document.getElementsByClassName("roomContent")[3].addEventListener("click", (e) => {
        tbody = document.getElementsByTagName("tbody")[0];
        let i = tbody.scrollTop;
        let changeScrollTop = setInterval(() => {
            tbody.scrollTop = i;
            i -= 10;
            if (i <= 0) {
                clearInterval(changeScrollTop);
            }
        }, 100 / (tbody.scrollTop * 10));
    });
    setWight();
}

function renderRoomTable() {
    content = document.getElementsByClassName("content")[0];
    if (right.length === 1) {
        main.removeChild(right[0]);
    }
    if (table.length === 1) {
        content.innerHTML = "";
    }
    html = `<table class="bordered"><thead><tr>${roomHead
        .map((i, j) => {
            //渲染头
            return '<th><a href="javascript:void(0);" onclick="sortTable(' + j + ');" style=" display: flex; justify-content: center;align-items: center;" ><div>' + i + ' </div><img class="sortSvg" src="./sort.svg" style="width: 3vh;"></a></th>';
        })
        .join("")}</tr></thead><tbody>${roomData
            .map((i) => {
                //渲染数据
                return `<tr><td>${i.roomId}</td><td>${i.roomType}</td><td>${i.price}</td><td class="${i.state == "已入住" ? "red" : "blue"}"><a ` + (i.state == "已入住" ? `` : 'href="javascript:void(0);" onclick="moveInto(' + i.roomId + ')" ') + ` class="roomRegButton"style=" display: flex; justify-content: center;align-items: center; transform: translateX(11px);" >${i.state}</a></td></tr>`;
            })
            .join("")}</tbody></table>`;
    content.innerHTML = html;
    //渲染right 右侧信息栏
    main.innerHTML += `<div class="right"><div class="rightLayout"><div class="rightContent"><div class="roomContent">空房:<span>${nullRoom.length}间</span> </div> <div class="roomContent">已住房间:<span>${fullRoom.length}间</span></div><div class="roomContent">总房间数:<span>${roomData.length}间</span></div><div class="roomContent"><svg class="top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2403"><path d="M838.116 732.779 877.7 693.195 511.979 327.549 146.3 693.195 185.883 732.779 512.003 406.652Z" p-id="2404"></path> </svg></div> </div> </div> </div>`;
    right = document.getElementsByClassName("right");
    let tranX = 200,
        tranRight = setInterval(() => {
            if (right.length === 0 || !right[0].style) {
                clearInterval(tranRight);
                return;
            }

            right[0].style.transform = "translateX(" + tranX + "px)";
            tranX--;
            if (tranX < 0) {
                clearInterval(tranRight);
            }
        }, 1);
    document.getElementsByClassName("roomContent")[3].addEventListener("click", (e) => {
        tbody = document.getElementsByTagName("tbody")[0];
        let i = tbody.scrollTop;
        let changeScrollTop = setInterval(() => {
            tbody.scrollTop = i;
            i -= 10;
            if (i <= 0) {
                clearInterval(changeScrollTop);
            }
        }, 100 / (tbody.scrollTop * 10));
    });
    setWight();
}

function renderMain(event) {
    event = window.event || event;
    switch (true) {
        case event.path[0].innerText === "房间信息查询":
            renderRoomTable();

            break;
        case event.path[0].innerText === "住户信息管理":
            renderHouseHold();
            break;
        case event.path[0].innerText === "内部人员管理":
            renderStaff();
            break;
        default:
            console.log("not find");
    }

}

//监听
document.getElementsByClassName("funList")[0].addEventListener("click", (event) => {
    if (content.dataset.id !== 2 && right.length !== 0) {
        main.removeChild(right[0]);
    }
    content = document.getElementsByClassName("content")[0];
    clearContent();
    renderMain(event);
});
userLogo.addEventListener("click", (e) => { });

document.getElementsByClassName("infoRegister")[0].addEventListener("click", (event) => {
    if (event.path[0] === document.getElementsByClassName("infoRegister")[0] || event.path[0] === document.getElementsByClassName("btn-grad")[0]) {
        document.getElementsByClassName("black")[0].style.backgroundColor = "";
        document.getElementsByClassName("black")[0].style.zIndex = "";
        document.getElementsByClassName("infoRegister")[0].style.zIndex = "";
    }
});
function addinputStyle() {
    let input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
        input[i].onclick = function () {
            input[i].style.height = "30px";
        };
        input[i].onmouseout = function () {
            if (input[i].value === "") {
                input[i].style.height = "";
            }
        };
        input[i].onblur = function () {
            if (input[i].value === "") {
                input[i].style.height = "";
            }
        };
    }
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}
window.onload = function () {
    renderRoomTable();
    renderFunButton();
};
