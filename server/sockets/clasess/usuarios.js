class Usuarios {

    constructor() {

        this.clients = [];
    }

    addClient(id, name, sala) {
        let persona = { id, name, sala };
        let numero = this.clients.push(persona);

        return this.clients;
    }

    getClient(id) {
        let persona = this.clients.filter(client => client.id === id)[0];
        return persona;
    }

    getAllClient() {
        return this.clients;
    }

    getClientOnSala(sala) {
        let personasSala = this.clients.filter(client => {
            return client.sala == sala
        });
        return personasSala;


    }


    delClient(id) {
        let delCli = this.getClient(id);
        if (delCli) {
            let client = this.clients.filter(client => client.id != id);
            this.clients = client;
        }
        return delCli;


    }



}

module.exports = {
    Usuarios
}