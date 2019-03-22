// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

    // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
    var request = require('request')

    // Envoie de la requête http
    // https://www.breizhcamp.org/json/talks_others.json
    request('https://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        talks = talks.concat(body);

        request('https://www.breizhcamp.org/json/talks_others.json', { json: true }, function(err, res, body) {
            if (err) { return console.log('Erreur', err); }

            // une fois les données récupérées, alimenter la variable talks
            talks = talks.concat(body);
    
            // invoquer la callback avec le nombre de sessions récupérées
            callback(talks.length);
        });

        
    });
 
    
};

exports.listerSessions = function(fnCallback){
   
    if(talks){
        fnCallback(talks);
    }else{
        exports.init(function(nbSession){
            fnCallback(talks);
        });

    }

};