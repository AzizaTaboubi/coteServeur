import express from 'express';

const app = express () ;
const hostname = '127.0.0.1' ;
const port = process.env.PORT || 9090 ;


class Game {
    constructor(name, year){
        this.name=name;
        this.year=year;
    }
}

app.get('/entity' , (req, res) => {
    const game = new Game("dmc5", 2019);
    res.status(200).json(game);
})

/**
 * demander a l'@ url de base '/'
 * à l'aide de la methode get de http
 */
 app.get('/' , (req, res) => {
    res.status(200).json({ message:'Hello World!'});
})
/**
 * lorsqu'une demande arrive a game
 * a l'aide de la methode get de http
 */
 
app.get('/game/:name', (req, res) => {
    res.status(200).json({message:`The name of this game is ${req.params.name}`});
})
/**
 * lorsqu'une demande arrive a secret 
 * a l'aide de la methode get de http
 */
app.get("/secret", (req, res) =>{
    res.status(401).json({message: "Unauthorized."});
})

/**
 * 
 */
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})



//Exercice
import fs from 'fs';

app.get('/game', (req, res)=> {
    fs.readFile('./SteamGames.json', (err, data)=>{
        if(err) throw err;
        let games =JSON.parse(data);
        res.status(200).json(games);
    });
    console.log('game found.');
})

app.get('/game/select/:year', (req, res) => {
    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        var games = JSON.parse(data);
        var filteredgames = JSON.parse(data).filter(function (entry) {
            return entry.Year >= req.params.year;
        });
        res.status(200).json(filteredgames)
    });
})



app.get('/game/:name', (req, res) => {
    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        var games = JSON.parse(data);
        var filteredgames = JSON.parse(data).filter(function (entry) {
            if (entry.Game === req.params.name) {
                return entry.GameLink
            }
        });
        res.status(200).json(filteredgames[0]['GameLink'])
    });
})
