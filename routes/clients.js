const express = require('express');
const Clients = require('../models/clients');
const router = express.Router();
const {getNotifsById} = require('../utils/cron');


//add clients
router.post('/api/clients',async function(req, res, next) {
    try {
        console.log(req.body);
        const date_echeance = new Date();
        date_echeance.setDate(date_echeance.getDate() + Number(req.body.delai_paiement));
        req.body.date_echeance = date_echeance;
        req.body.montant_ht = Number(req.body.montant_ht);
        req.body.versement_client = Number(req.body.versement_client);
        req.body.tauxTva = Number(req.body.tauxTva);
        req.body.delai_paiement = Number(req.body.delai_paiement);      
        req.body.date_facture = new Date();
        console.log(req.body);
        const clientInserted = await Clients.query().insert(req.body);
        getNotifsById(clientInserted.id);
        res.send("success");
    }
    catch(err){
        console.log(err);
    }
    
});
//update clients
router.put('/api/clients/:id',async function(req, res, next) {
    try {
        const id = req.params.id;
        const date_echeance = new Date();
        date_echeance.setDate(date_echeance.getDate() + req.body.delai_paiement);
        req.body.date_echeance = date_echeance;
        req.body.date_facture = new Date();
        console.log(req.body);
        await Clients.query().patch(req.body).where("id",id);
        res.send("success");
    }
    catch(err){
        console.log(err);
    }
    
});

//show all clients 
router.get('/api/clients', async function(req, res, next) {
    const clients = await Clients.query();
    console.log("clients",clients)
    res.send(clients);
});

// show client by id
router.get('/api/clients/:id', async function(req, res, next) {
    const id = req.params.id
    console.log("req api id",req.params.id);
    if(id > 0) {
        const client = await Clients.query().where("id",id);
        res.send(client);
    }
    else {
        console.log("error id not found");
    }
    
});

//delete client

router.delete('/api/clients/:id',async function(req, res , next) {
    console.log(req.params.id);
    const id = req.params.id;
    await Clients.query().delete().where("id",id);

})

module.exports = {
    router: router
}