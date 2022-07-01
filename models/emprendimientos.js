const Emprendimiento = require("./emprendimiento");

class Emprendimientos {

    constructor() {
        this.emprendimientos = [];
    }

    addEmprendimiento(emprendimiento = new Emprendimiento()) {
        this.emprendimientos.push(emprendimiento);
    }

    getEmprendimientos() {
        return this.emprendimientos;
    }

    deleteEmprendimientos(id  = '') {
        this.emprendimientos = this.emprendimientos.filter(emprendimiento => emprendimiento.id !== id);
        return this.emprendimientos;
    }

    // voteBand(id = '') {
    //     this.bands = this.bands.map(band => {
    //         if (band.id === id) {
    //             band.votes++;
    //             return band;
    //         }
    //         else{
    //             return band;
    //         }
    //     });
    // }
}

module.exports = Emprendimientos;