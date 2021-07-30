
class Main implements EventListenerObject {

    public lista: Array<Cliente>;


    constructor() {
        if (localStorage.length > 0)
            this.lista = JSON.parse(localStorage["personas"] || Array<Cliente>());
        else
            this.lista = Array<Cliente>();
    }

    handleEvent(evt: Event): void {
        evt.preventDefault();
        switch ((<Element>evt.target).id) {


            case "btnPromedio":
                this.Promedio()
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



    }

    private Promedio() {
        var lista = __FilterArray(JSON.parse(localStorage["personas"]));
        var suma = lista.reduce(function (total: any, objeto: any) {
            return total += objeto.edad;
        }, 0);

        var promedio: number = suma / lista.length;
        (<HTMLInputElement>document.getElementById("txtPromedio")).value = promedio.toFixed(2).toString();


    }

    private Filter() {
        Main.ClearTable();
        __BuildTable(<Array<Cliente>>JSON.parse(localStorage["personas"]), document.getElementById("d_table"));
    }


    public static Load(index: number) {
        var lista = JSON.parse(localStorage["personas"] || null);
        (<HTMLInputElement>document.getElementById("txtId")).value = lista[index].id;
        (<HTMLInputElement>document.getElementById("txtNombre")).value = lista[index].nombre;
        (<HTMLInputElement>document.getElementById("txtApellido")).value = lista[index].apellido;
        (<HTMLInputElement>document.getElementById("txtEdad")).value = (lista[index].edad);
        if (lista[index].sexo == "M")
            (<HTMLInputElement>document.getElementById("selectSexo")).value = "M";
        else
            (<HTMLInputElement>document.getElementById("selectSexo")).value = "F";
    }


    public static Limpiar() {
        localStorage.clear();
        this.ClearTable();
    }
    public static Eliminar() {

        var lista = JSON.parse(localStorage["personas"] || null);
        for (let index = 0; index < lista.length; index++) {
            if ((<HTMLInputElement>document.getElementById("txtId")).value == lista[index].id) {
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


    }



    private Agregar() {
        let objeto = this.GetInputs();
        this.lista.push(objeto);
        localStorage.setItem("personas", JSON.stringify(this.lista));
        alert("Alta Exitosa");

        Main.ClearTable();
        __BuildTable(JSON.parse(localStorage["personas"]), document.getElementById("d_table"));


        console.log(objeto);
    }


    private GetInputs() {

        let id = this.GetId() + 1;
        let txtNombre = <HTMLInputElement>document.getElementById("txtNombre");
        let txtApellido = <HTMLInputElement>document.getElementById("txtApellido");
        let txtEdad = (<HTMLInputElement>document.getElementById("txtEdad")).value;
        let sexo = <HTMLInputElement>document.getElementById("selectSexo");
        if (txtEdad == "") {
            txtEdad = "0";
        }
        return new Cliente(id, txtNombre.value, txtApellido.value, parseInt(txtEdad), sexo.value);



    }

    private GetId() {
        var array: Array<Cliente> = JSON.parse(localStorage["personas"] || null);
        if (array == null || array.length == 0) {
            return 0;
        }
        else {
            var id = array.reduce(function (total: any, num: any) {
                return total = num;
            }, 0);
            return id.id;
        }
    }


    private static ClearTable() {

        var table = <HTMLElement>document.getElementById("d_table");
        if (table.childNodes[0]) {
            table.removeChild(table.childNodes[0]);
        }
    }



    public Load() {
        __BuildTable(this.lista, document.getElementById("d_table"));
    }

}


window.addEventListener("load", () => {


    let main: Main = new Main();
    main.Load();



    (<HTMLElement>document.getElementById("btnAgregar")).addEventListener("click", main);
    (<HTMLElement>document.getElementById("btnEliminar")).addEventListener("click", main);
    (<HTMLElement>document.getElementById("btnLimpiar")).addEventListener("click", main);
    (<HTMLElement>document.getElementById("btnPromedio")).addEventListener("click", main);


    (<HTMLElement>document.getElementById("selectSexo")).addEventListener("change", main);
    (<HTMLElement>document.getElementById("selectFiltro")).addEventListener("change", main);

    (<HTMLElement>document.getElementById("cbID")).addEventListener("change", main);
    (<HTMLElement>document.getElementById("cbNOMBRE")).addEventListener("change", main);
    (<HTMLElement>document.getElementById("cbAPELLIDO")).addEventListener("change", main);
    (<HTMLElement>document.getElementById("cbEDAD")).addEventListener("change", main);
    (<HTMLElement>document.getElementById("cbSEXO")).addEventListener("change", main);



});
