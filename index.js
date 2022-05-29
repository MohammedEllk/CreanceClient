const express = require('express');

const  {getNotifs} =  require('./utils/cron');

const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//const Contact = require('./Controllers/Contacts')
//const Contact  = require('./models/Contact');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
/**app.use('/api/contact', (req, res, next) => {
    Contact.query()
    .then(contacts => {
      res.json(contacts)
    })
  });
*/
app.use('/api/clients', require('./routes/clients').router);
app.get('/api/clients',require('./routes/clients').router);
app.get('/api/notifications',require('./routes/notifications').router);
app.get('/api/clients/:id', require('./routes/clients').router);
app.use('/api/clients/stats/getStatistique', require('./routes/clients').router);
app.get('/api/clients/stats/getStatistique', require('./routes/clients').router);
app.post('/api/clients', require('./routes/clients').router);
app.post('/api/clients/validerClient', require('./routes/clients').router);
app.put('/api/clients/:id', require('./routes/clients').router);
app.delete('/api/clients/:id', require('./routes/clients').router);

getNotifs();

module.exports = app;