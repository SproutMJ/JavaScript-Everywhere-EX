const mongoose = require('mongoose');

module.exports={
    connect: DB_HOST=>{
        /* Mongo 6부터 default이므로 필요 없음
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);*/
        mongoose.connect(DB_HOST)
        mongoose.connection.on('error', err=>{
            console.error(err);
            console.log('Mongo DB Connection Error');
            process.exit();
        })
    },

    close: ()=>{
        mongoose.connection.close();
    }
}