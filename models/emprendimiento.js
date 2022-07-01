class Emprendimiento {
    constructor(id = 'no-id', emprendedor = 'no-emprendedor', actividades = 'no-actividades', 
    emprendimiento = 'no-emprendimiento', descripcion = 'no-descripcion', localidad = 'no-localidad') {
        this.id = id;
        this.emprendedor = emprendedor;
        this.actividades = actividades;
        this.emprendimiento = emprendimiento;
        this.descripcion = descripcion;
        this.localidad = localidad;
    }
}

module.exports = Emprendimiento;