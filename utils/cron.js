const schedule = require('node-schedule');
const Clients = require('../models/clients');
const Notifications = require('../models/notifications');




const getNotifs = async function () {
    const allClients = await Clients.query();
    for(let i = 0 ; i < allClients.length; i++) {
        const dateNotif = new Date();
        dateNotif.setSeconds(dateNotif.getSeconds() + (i+1)*300);
        const clientNotif = allClients[i];
        /*schedule.scheduleJob(dateNotif, () => {
            console.log("date date", allClients[i]);
            if(allClients[i].action != "paid"){
                Notifications.query().insert({
                    infos : 'le client doit payé',
                    client_id : allClients[i].id,
                    consultation : false,
                });
            }
        })*/

    }   
}

const getNotifsById = async function (id) {
    const client = await Clients.query().where("id",id).first();
    console.log("client",client);
    const dateNotif = new Date();
    dateNotif.setSeconds(dateNotif.getSeconds() + 100);
    schedule.scheduleJob(dateNotif,async () => {
        clientMomentNotif = await Clients.query().where("id",id).first();
        if(clientMomentNotif.action != "paid"){
            const txtNotif = 'le client ' + clientMomentNotif.nom + ' avec la facture ' + clientMomentNotif.numero_facture +' doit payer aujourd\'hui';
            const notif = await Notifications.query().insert({
                infos : txtNotif,
                client_id : client.id,
                consultation : false,
            });
            console.log("hamid hamid");
        }
    })
}

module.exports = {getNotifs,getNotifsById}

