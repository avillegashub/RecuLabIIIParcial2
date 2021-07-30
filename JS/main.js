"use strict";
var Main = /** @class */ (function () {
    function Main() {
        if (localStorage.length > 0)
            this.lista = JSON.parse(localStorage["personas"] || Array());
        else
            this.lista = Array();
    }
    Main.prototype.handleEvent = function (evt) {
        evt.preventDefault();
        switch (evt.target.id) {
            case "btnPromedio":
                this.Promedio();
                break;
            case "btnLimpiar":
                Main.Limpiar();
                break;
            case "btnEliminar":
                Main.Eliminar();
                break;
            case "btnAgregar":
                this.Agregar();
                break;
            case "selectSexo":
            case "selectFiltro":
            case "cbID":
            case "cbNOMBRE":
            case "cbAPELLIDO":
            case "cbEDAD":
            case "cbSEXO":
                this.Filter();
                break;
        }
    };
    Main.prototype.Promedio = function () {
        var lista = __FilterArray(JSON.parse(localStorage["personas"]));
        var suma = lista.reduce(function (total, objeto) {
            return total += objeto.edad;
        }, 0);
        var promedio = suma / lista.length;
        document.getElementById("txtPromedio").value = promedio.toFixed(2).toString();
    };
    Main.prototype.Filter = function () {
        Main.ClearTable();
        __BuildTable(JSON.parse(localStorage["personas"]), document.getElementById("d_table"));
    };
    Main.Load = function (index) {
        var lista = JSON.parse(localStorage["personas"] || null);
        document.getElementById("txtId").value = lista[index].id;
        document.getElementById("txtNombre").value = lista[index].nombre;
        document.getElementById("txtApellido").value = lista[index].apellido;
        document.getElementById("txtEdad").value = (lista[index].edad);
        if (lista[index].sexo == "M")
            document.getElementById("selectSexo").value = "M";
        else
            document.getElementById("selectSexo").value = "F";
    };
    Main.Limpiar = function () {
        localStorage.clear();
        this.ClearTable();
    };
    Main.Eliminar = function () {
        var lista = JSON.parse(localStorage["personas"] || null);
        for (var index = 0; index < lista.length; index++) {
            if (document.getElementById("txtId").value == lista[index].id) {
                localStorage.setItem("personas", JSON.stringify(lista.splice(index, 1)));
                break;
            }
        }
        this.ClearTable();
        console.log(lista.length);
        if (lista.lenght == 0) {
            localStorage["personas"].clear();
        }
        else {
            localStorage.setItem("personas", JSON.stringify(lista));
            __BuildTable(JSON.parse(localStorage["personas"]), document.getElementById("d_table"));
        }
        console.log(localStorage["personas"]);
    };
    Main.prototype.Agregar = function () {
        var objeto = this.GetInputs();
        this.lista.push(objeto);
        localStorage.setItem("personas", JSON.stringify(this.lista));
        alert("Alta Exitosa");
        Main.ClearTable();
        __BuildTable(JSON.parse(localStorage["personas"]), document.getElementById("d_table"));
        console.log(objeto);
    };
    Main.prototype.GetInputs = function () {
        var id = this.GetId() + 1;
        var txtNombre = document.getElementById("txtNombre");
        var txtApellido = document.getElementById("txtApellido");
        var txtEdad = document.getElementById("txtEdad").value;
        var sexo = document.getElementById("selectSexo");
        if (txtEdad == "") {
            txtEdad = "0";
        }
        return new Cliente(id, txtNombre.value, txtApellido.value, parseInt(txtEdad), sexo.value);
    };
    Main.prototype.GetId = function () {
        var array = JSON.parse(localStorage["personas"] || null);
        if (array == null || array.length == 0) {
            return 0;
        }
        else {
            var id = array.reduce(function (total, num) {
                return total = num;
            }, 0);
            return id.id;
        }
    };
    Main.ClearTable = function () {
        var table = document.getElementById("d_table");
        if (table.childNodes[0]) {
            table.removeChild(table.childNodes[0]);
        }
    };
    Main.prototype.Load = function () {
        __BuildTable(this.lista, document.getElementById("d_table"));
    };
    return Main;
}());
window.addEventListener("load", function () {
    var main = new Main();
    main.Load();
    document.getElementById("btnAgregar").addEventListener("click", main);
    document.getElementById("btnEliminar").addEventListener("click", main);
    document.getElementById("btnLimpiar").addEventListener("click", main);
    document.getElementById("btnPromedio").addEventListener("click", main);
    document.getElementById("selectSexo").addEventListener("change", main);
    document.getElementById("selectFiltro").addEventListener("change", main);
    document.getElementById("cbID").addEventListener("change", main);
    document.getElementById("cbNOMBRE").addEventListener("change", main);
    document.getElementById("cbAPELLIDO").addEventListener("change", main);
    document.getElementById("cbEDAD").addEventListener("change", main);
    document.getElementById("cbSEXO").addEventListener("change", main);
});
