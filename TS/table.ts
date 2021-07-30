
function __BuildTable(array: any, obj: any) {
  
    console.log(array);
    
    var table = document.createElement("table");
    var newArray = __FilterArray(array);
    if (newArray != null && array.length > 0) {
        table.appendChild(__Thead(Object.keys(newArray[0])));
        table.appendChild(__Tbody(newArray));
        obj.appendChild(table);
    }
}

function __Thead(arg0: string[]): any {
    var thead = document.createElement("thead");
    for (let index = 0; index < 5; index++) {
        if(__CheckHeader(arg0[index]))
        {
            var th = document.createElement("th");        
            th.appendChild(document.createTextNode(arg0[index].toUpperCase()));
            thead.appendChild(th);
        }
    }
 
    return thead;
}

function __FilterArray(array:Array<Cliente>)
{   
    var filtro = (<HTMLInputElement>document.getElementById("selectFiltro")).value;
    if(filtro == "M")
    {
        return array.filter(object => object.sexo == "M");
    }
    else if (filtro == "F")
    {
        return array.filter(object => object.sexo == "F");
    }
    else
    {
        return array;
    }

}


function __Tbody(arg0: any): any {

    var tbody = document.createElement("tbody");
    for (let index = 0; index < arg0.length; index++) {

        var keys = Object.keys(arg0[index]);
        var tr = document.createElement("tr");
        tr.onclick = () =>{
            Main.Load(index);
        }
        
        for (let j = 0; j < 5; j++) {
            if(__CheckHeader(keys[j]))
        tr.appendChild(__Td(arg0[index][keys[j]]));            
        }
      
        tbody.appendChild(tr);
    }
    return tbody;
}

function __Td(arg0: any): any {
   var td = document.createElement("td");
   td.appendChild(document.createTextNode(arg0));
   return td;
}

function __CheckHeader(arg0: string) {
    
    return(<HTMLInputElement>document.getElementById("cb"+arg0.toUpperCase())).checked;
    
}

