"use strict";
var Controller //implements EventListenerObject
 = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.AddVehiculo = function () {
        var target = Controller.GetInputs();
        if (target != null) {
            var lista = JSON.parse(localStorage["vehiculos"] || null);
            lista.push(target);
            localStorage.setItem("vehiculos", JSON.stringify(lista));
            alert("Alta Exitosa");
            location.reload();
        }
        else {
            alert("Faltan Datos");
            return console.log("Error: Cargar Ciudadano");
        }
    };
    Controller.prototype.DeleteCiudadano = function () {
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        var txtDNI = document.getElementById("txtDni");
        for (var index = 0; index < array.length; index++) {
            if (array[index].dni == parseInt(txtDNI.value)) {
                array.splice(index, 1);
            }
        }
        localStorage.setItem("ciudadanos", JSON.stringify(array));
        alert("Modificación Exitosa");
        location.reload();
    };
    Controller.prototype.FilterByPais = function () {
        Controller.ClearTable();
        var pais = document.getElementById("select");
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        var aux = array.filter(function (x) { return x.pais == pais.value; });
        Controller.buildTable(aux);
    };
    Controller.prototype.GetAvgAge = function () {
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        var aux = array.filter(function (x) { return x.sexo == Controller.getRadioValue(); });
        Controller.buildTable(aux);
        var edades = aux.map(function (x) { return x.edad; });
        var suma = edades.reduce(function (total, num) {
            return total += num;
        }, 0);
        var promedio = suma / aux.length;
        alert("Promedio de Edad: " + promedio);
    };
    Controller.prototype.FilterBySexAndAge = function () {
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        var txtEdad = document.getElementById("txtEdad");
        var aux = array.filter(function (x) { return x.sexo == Controller.getRadioValue(); }).filter(function (x) { return x.edad == parseInt(txtEdad.value); });
        var lista = aux.map(function (x) { return { "nombre": x.nombre, "apellido": x.apellido, "dni": x.dni }; });
        Controller.buildTable(lista);
    };
    Controller.GetInputs = function () {
        var txtMarca = document.getElementById("txtMarca");
        var txtModelo = document.getElementById("txtModelo");
        var txtPrecio = document.getElementById("txtPrecio");
        var tipo = document.getElementById("select");
        var id = 1;
        if (tipo.value == "Camioneta") {
            // return  new Camioneta(id, txtMarca.value, txtModelo.value, parseInt(txtPrecio.value));
        }
        else {
            return new Auto(id, txtMarca.value, txtModelo.value, parseInt(txtPrecio.value), 4);
        }
    };
    Controller.FillInputs = function () {
        var payload = Controller.GetCiudadano();
        var txtNombre = document.getElementById("txtNombre");
        var txtApellido = document.getElementById("txtApellido");
        var txtEdad = document.getElementById("txtEdad");
        txtNombre.value = payload.nombre;
        txtApellido.value = payload.apellido;
        txtEdad.value = payload.edad;
        Controller.SetPais(payload.pais);
        Controller.SetSexo(payload.sexo);
    };
    Controller.SetPais = function (pais) {
        var paisSelect = document.getElementById("select");
        paisSelect.value = pais;
    };
    Controller.SetSexo = function (sexo) {
        if (sexo == "male") {
            var male = document.getElementById("male");
            male.checked = true;
        }
        else {
            var female = document.getElementById("female");
            female.checked = true;
        }
    };
    Controller.GetCiudadano = function () {
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        var txtDNI = document.getElementById("txtDni");
        for (var index = 0; index < array.length; index++) {
            if (array[index].dni == parseInt(txtDNI.value)) {
                return array[index];
            }
        }
    };
    Controller.getRadioValue = function () {
        var male = document.getElementById("male");
        if (male.checked == true) {
            return "male";
        }
        return "female";
    };
    Controller.Rebuild = function () {
        Controller.buildHeader();
    };
    Controller.buildHeader = function () {
        var cbId = document.getElementById("cbId");
        var cbMarca = document.getElementById("cbMarca");
        var cbModelo = document.getElementById("cbModelo");
        var cbPrecio = document.getElementById("cbPrecio");
        var aux;
        if (cbId.checked) {
            aux = "<th id=H1>ID</th>";
        }
        if (cbMarca.checked) {
            if (aux != null) {
                aux += "<th id=H2>Marca</th>";
            }
            else {
                aux = "<th id=H2 >Marca</th>";
            }
        }
        if (cbModelo.checked) {
            if (aux != null) {
                aux += "<th id=H3 >Modelo</th>";
            }
            else {
                aux = "<th id=H3 >Modelo</th>";
            }
        }
        if (cbPrecio.checked) {
            if (aux != null) {
                aux += "<th id=H4 >Precio</th>";
            }
            else {
                aux = "<th id=H4 >Precio</th>";
            }
        }
        var table = document.getElementById('table');
        table.innerHTML += aux;
        var vehiculos = JSON.parse(localStorage["vehiculos"] || null);
        Controller.buildTable(vehiculos);
    };
    Controller.buildTable = function (data) {
        var table = document.getElementById('tbody');
        for (var i = 0; i < data.length; i++) {
            var row = "<tr id='" + i + "' >";
            row += "<td>" + data[i].nombre + "</td>  ";
            row += "<td>" + data[i].apellido + "</td>";
            row += "<td>" + data[i].edad + "</td>  ";
            row += "<td>" + data[i].dni + "</td>  ";
            row += "<td>" + data[i].sexo + "</td>  ";
            row += "<td>" + data[i].pais + "</td>  ";
            row += "<td> <input type='button' id='E" + i + "' class = 'btnEliminar'  value='Eliminar' onclick='Controller.EliminarRow(" + i + ");'> </td>  ";
            row += "</tr>";
            table.innerHTML += row;
        }
    };
    Controller.ClearTable = function () {
        var table = document.getElementById('tbody');
        if (table.rows.length > 0) {
            for (var index = 0; index < table.rows.length; index++) {
                table.removeChild(document.getElementById((table.rows.length - 1).toString()));
            }
        }
        if (table.rows.length > 0) {
            Controller.ClearTable();
        }
    };
    Controller.ClearHeader = function () {
        var table = document.getElementById('table');
        table.removeChild(document.getElementById("H1"));
    };
    Controller.prototype.CBChange = function () {
        Controller.ClearTable();
        Controller.ClearHeader();
        Controller.Rebuild();
    };
    Controller.prototype.Lista = function () {
        var array = Array();
        array.push(new Auto(1, "Marca1", "Modelo1", 1.1, 2));
        array.push(new Auto(2, "Marca2", "Modelo2", 1.2, 4));
        array.push(new Camioneta(3, "Marca3", "Modelo3", 1.3, true));
        array.push(new Camioneta(4, "Marca4", "Modelo4", 1.3, false));
        console.log(array);
        __BuildTable(array, document.getElementById("d_table"));
    };
    Controller.Lista2 = function () {
        var array = Array();
        array.push(new Auto(1, "OTRAAAAAAA", "Modelo1", 1.1, 2));
        array.push(new Auto(2, "Marca2", "Modelo2", 1.2, 4));
        array.push(new Camioneta(3, "Marca3", "Modelo3", 1.3, true));
        array.push(new Camioneta(4, "Marca4", "Modelo4", 1.3, false));
        console.log(array);
        __BuildTable(array, document.getElementById("d_table"));
    };
    Controller.prototype.Load = function () {
        console.log("ENTRA");
        this.Lista();
        // Controller.buildHeader();
    };
    Controller.prototype.Action = function () {
        var asd = document.getElementById("d_table");
        asd.removeChild(asd.childNodes[0]);
        var asd = document.getElementById("popup");
        asd.style.visibility = "visible";
        Controller.Lista2();
    };
    return Controller;
}());
window.addEventListener("load", function () {
    var asd = document.getElementById("popup");
    asd.style.visibility = "hidden";
    var controller = new Controller();
    controller.Load();
    var btn1 = document.getElementById("btnAlta");
    btn1.addEventListener("click", controller.Action);
    /*
    let btn1 = <HTMLElement> document.getElementById("btnAlta");
    let btn2 = <HTMLElement> document.getElementById("btnPromedio");
    let btn3 = <HTMLElement> document.getElementById("btnAgregar");
    let btn4 = <HTMLElement> document.getElementById("btnCerrar");


    let cbId = <HTMLElement> document.getElementById("cbId");
    let cbMarca = <HTMLElement> document.getElementById("cbMarca");
    let cbModelo = <HTMLElement> document.getElementById("cbModelo");
    let cbPrecio = <HTMLElement> document.getElementById("cbPrecio");

     cbId.addEventListener("change", controller.CBChange);
     cbMarca.addEventListener("change", controller.CBChange);
     cbModelo.addEventListener("change", controller.CBChange);
     cbPrecio.addEventListener("change", controller.CBChange);


     
     btn1.addEventListener("click", controller.CBChange);
    btn2.addEventListener("click", controller.CBChange);
    btn3.addEventListener("click", controller.AddVehiculo);
    btn4.addEventListener("click", controller.CBChange);
*/
});
