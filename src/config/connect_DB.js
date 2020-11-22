const mongoose = require('mongoose');

function connect_DB(){
    mongoose.connect(`${process.env.DB_CONNECTION || 'mongodb'}://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'classified'}`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

    // try connect mongodb
    const db = mongoose.connection;

    // log result
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('Connect mongDB success');
    });
}

module.exports = connect_DB