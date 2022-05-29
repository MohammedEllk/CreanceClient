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
        req.body.action = "en_cours";
        req.body.status = false;        
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

//Valider Client 
router.post("/api/clients/validerClient",async function(req , res , next) {
    console.log("req id",req.body.id);
    const id = req.body.id;
    await Clients.query().patch({
        status : true
    }).where("id",id);

})


//delete client

router.delete('/api/clients/:id',async function(req, res , next) {
    console.log(req.params.id);
    const id = req.params.id;
    await Clients.query().delete().where("id",id);

})

// get total client payé et no payé 
// show client by id
router.get('/api/clients/stats/getStatistique', async function(req, res, next) {
    const totalClient = await Clients.query().count("id",{as: 'length'}).first();
    const clientPaid = await Clients.query().where("status",true).count("id",{as: 'length'}).first();
    const clientNotPaid = await Clients.query().where("status",false).count("id",{as: 'length'}).first();
    const clientPaidEcheance = await Clients.query().where("status",true)
                                            .where('action','en_cours')
                                            .count("id",{as: 'length'}).first();
    const clientPaidFirstRelance = await Clients.query().where("status",true)
                                            .where('action','first_relance')
                                            .count("id",{as: 'length'}).first();
    const clientPaidSecondRelance = await Clients.query().where("status",true)
                                            .where('action','second_relance')
                                            .count("id",{as: 'length'}).first();
    const clientMisEnDemeure = await Clients.query().where('action','en_demeure')
    .count("id",{as: 'length'}).first();

    const obj = {
        totalClient,
        clientPaid,
        clientNotPaid,
        clientPaidEcheance,
        clientPaidFirstRelance,
        clientPaidSecondRelance,
        clientMisEnDemeure
    }

    console.log("obj obj",obj);
    res.send(obj);

    
});

module.exports = {
    router: router
}