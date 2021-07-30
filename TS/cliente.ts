class Cliente extends Persona{

    edad: number;
    sexo: string;
    
    constructor(id: number, nombre:string, apellido:string, edad:number, sexo:string)
    {
        super(id, nombre, apellido);
        this.edad = edad;
        this.sexo = sexo;
    }
    
    
    
    
    
    }