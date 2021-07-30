class Camioneta extends Vehiculo{

    cuatroXcuatro: boolean;
    
    constructor(id: number, marca:string, modelo:string, precio:number, fourxfour:string)
    {
        super(id, marca, modelo, precio, "Camioneta")
        if(fourxfour ==  "True")
        this.cuatroXcuatro = true;
        else
        this.cuatroXcuatro = false;
    }
    
    
    
    
    
    }