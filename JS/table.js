"use strict";
function __BuildTable(array, obj) {
    console.log(array);
    var table = document.createElement("table");
    var newArray = __FilterArray(array);
    if (newArray != null && array.length > 0) {
        table.appendChild(__Thead(Object.keys(newArray[0])));
        table.appendChild(__Tbody(newArray));
        obj.appendChild(table);
    }
}
function __Thead(arg0) {
    var thead = document.createElement("thead");
    for (var index = 0; index < 5; index++) {
        if (__CheckHeader(arg0[index])) {
            var th = document.createElement("th");
            th.appendChild(document.createTextNode(arg0[index].toUpperCase()));
            thead.appendChild(th);
        }
    }
    return thead;
}
function __FilterArray(array) {
    var filtro = document.getElementById("selectFiltro").value;
    if (filtro == "M") {
        return array.filter(function (object) { return object.sexo == "M"; });
    }
    else if (filtro == "F") {
        return array.filter(function (object) { return object.sexo == "F"; });
    }
    else {
        return array;
    }
}
function __Tbody(arg0) {
    var tbody = document.createElement("tbody");
    var _loop_1 = function (index) {
        keys = Object.keys(arg0[index]);
        tr = document.createElement("tr");
        tr.onclick = function () {
            Main.Load(index);
        };
        for (var j = 0; j < 5; j++) {
            if (__CheckHeader(keys[j]))
                tr.appendChild(__Td(arg0[index][keys[j]]));
        }
        tbody.appendChild(tr);
    };
    var keys, tr;
    for (var index = 0; index < arg0.length; index++) {
        _loop_1(index);
    }
    return tbody;
}
function __Td(arg0) {
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(arg0));
    return td;
}
function __CheckHeader(arg0) {
    return document.getElementById("cb" + arg0.toUpperCase()).checked;
}
