module.exports = {
    generate: function (client) {

        function generateWords (nbLength) {

            var text = "";
            var possible = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";

            for (var i = 0; i < nbLength; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
                
            return text;
        }

        var data = []

        for(var i = 0 ; i < Math.floor(Math.random()*30) + 5 ; i++){

            var titre = generateWords(Math.floor(Math.random()*15)+2);
            var date = Math.floor(Math.random()*400)+500;
            var auteur = generateWords(Math.floor(Math.random()*20)+10);
            var resume = generateWords(Math.floor(Math.random()*100)+450);

            var json = {
                titre: titre,
                date: date,
                auteur: auteur,
                resume: resume
            }

            data.push(json);
        }

        var db = client.db("blog");
        var collection = db.collection('articles');
        collection.insert(data);
    }
};
