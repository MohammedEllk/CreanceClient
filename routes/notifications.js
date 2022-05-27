const express = require('express');
const Notifications = require('../models/notifications');
const router = express.Router();



//show all Notifications 
router.get('/api/notifications', async function(req, res, next) {
    const notifications = await Notifications.query().orderBy("created_at");
    console.log("notifications",notifications)
    res.send(notifications);
});

module.exports = {
    router: router
}