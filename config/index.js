var conf = require("./user");

module.exports = {
    getDbConnectionConfig: function () {
        var connection = "mongodb://"+conf.username+":"+conf.pass+"@ds033116.mlab.com:33116/pygoals";
        return connection;
    }
}
