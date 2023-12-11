const pgClient = require('../pgClient');

class AppBaseController{
    constructor(){
        this.pgClient = pgClient
    }
}

module.exports = AppBaseController