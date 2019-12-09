module.exports = {
    webpack: function(config,env) {
        return config;
    },

    devServer: function(configFunction){
        return function(proxy, allowedHost){
            const config = configFunction(proxy,allowedHost);

            const fs = require('fs');
            config.https = {
                key: fs.readFileSync("_wildcard_enbrixcloud_com_SHA256WITHRSA.key"),
                cert: fs.readFileSync("_wildcard_enbrixcloud_com.crt")
            };
            return config;
        };
    }
};