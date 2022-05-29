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
    const dateNotifecheance = new Date();
    dateNotifecheance.setSeconds(dateNotifecheance.getSeconds() + 400);
    schedule.scheduleJob(dateNotifecheance,async () => {
        const clientMomentNotif = await Clients.query().where("id",id).first();
        if(clientMomentNotif.status != false){
            const txtNotif = 'le client ' + clientMomentNotif.nom + ' avec la facture ' + clientMomentNotif.numero_facture +' doit payer aujourd\'hui';
            const notif = await Notifications.query().insert({
                infos : txtNotif,
                client_id : client.id,
                consultation : false,
            });
            console.log("hamid hamid");
        }
    })
    const dateChangeEcheanceToFirst = dateNotifecheance;
    dateChangeEcheanceToFirst.setSeconds(dateChangeEcheanceToFirst.getSeconds() + 100);
    //dateChangeEcheanceToFirst.setMinutes(0);
    //dateChangeEcheanceToFirst.setSeconds(0);
    schedule.scheduleJob(dateChangeEcheanceToFirst,async () => {
        const clientMomentNotif = await Clients.query().where("id",id).first();
        if(clientMomentNotif.status != false){
            await Clients.query().patch({
                action : "first_relance",
            }).where("id",id);
        }
    })
    const dateNotifFirstRelance = dateChangeEcheanceToFirst;
    dateNotifFirstRelance.setSeconds(dateNotifFirstRelance.getSeconds() + 200);
    schedule.scheduleJob(dateNotifFirstRelance,async () => {
        const clientMomentNotif = await Clients.query().where("id",id).first();
        if(clientMomentNotif.status != false){
            const txtNotif = 'le client ' + clientMomentNotif.nom + ' avec la facture ' + clientMomentNotif.numero_facture +' doit payer aujourd\'hui sa 1er relance';
            const notif = await Notifications.query().insert({
                infos : txtNotif,
                client_id : client.id,
                consultation : false,
            });
            console.log("1er relance");
        }
    })
    const dateChangeFirstToSecond = dateNotifFirstRelance;
    dateChangeFirstToSecond.setSeconds(dateChangeFirstToSecond.getSeconds() + 100);
    schedule.scheduleJob(dateChangeFirstToSecond,async () => {
        const clientMomentNotif = await Clients.query().where("id",id).first();
        if(clientMomentNotif.status != false){
            await Clients.query().patch({
                action : "second_relance",
            }).where("id",id);
        }
    })
    const dateNotifSecondeRelance = dateChangeFirstToSecond;
    dateNotifSecondeRelance.setSeconds(dateNotifSecondeRelance.getSeconds() + 100);
    schedule.scheduleJob(dateNotifSecondeRelance,async () => {
        const clientMomentNotif = await Clients.query().where("id",id).first();
        if(clientMomentNotif.status != false){
            const txtNotif = 'le client ' + clientMomentNotif.nom + ' avec la facture ' + clientMomentNotif.numero_facture +' doit payer aujourd\'hui sa 2 eme relance';
            const notif = await Notifications.query().insert({
                infos : txtNotif,
                client_id : client.id,
                consultation : false,
            });
        }
    })

    const dateChangeSecondToClosed = dateNotifSecondeRelance;
    dateChangeSecondToClosed.setSeconds(dateChangeSecondToClosed.getSeconds() + 100);
    schedule.scheduleJob(dateChangeSecondToClosed,async () => {
        const clientMomentNotif = await Clients.query().where("id",id).first();
        if(clientMomentNotif.status != false){
            await Clients.query().patch({
                action : "en_demeure",
            }).where("id",id);
        }
    })
}

module.exports = {getNotifs,getNotifsById}

