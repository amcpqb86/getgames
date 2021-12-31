function getURL(url) {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText; 
}

function displayJSON(jsonObject){
    gameList = document.getElementById("gameList");
    for (var i = 0; i < jsonObject.response.games.length; i++) {
        var game = jsonObject.response.games[i];
        var gameElement = document.createElement("li");
        gameElement.innerHTML = game.name;
        gameList.appendChild(gameElement);
    }
}

function searchGame(search, jsonObject){
    find = false;
    console.log(jsonObject.response.games.length);
    for (var i = 0; i < jsonObject.response.games.length; i++) {
        var game = jsonObject.response.games[i];
        if (game.name.toLowerCase() == search.toLowerCase()) {
            console.log(game.name);
            find = true;
        }
    }
    result = document.getElementById("result");
    result.class = "alert";
    if (find) {
        result.classList.add("alert-success");
        result.innerHTML = "Game found";
    }
    else {
        result.classList.add("alert-danger");
        result.innerHTML = "Game not found";
    }
}

//get list of steam games from steam api and display them into list
function getSteamGames(steamID) {
    let url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DDDD6889C46843D84D6B7275E70A3F26&steamid=" + steamID +"&include_appinfo=1&format=json";
    var json_obj = JSON.parse(getURL(url));
    searchedGame = document.getElementById("search").value;
    searchGame(searchedGame, json_obj);
}

document.getElementById("searchButton").addEventListener("click", function () {
    var steamID = document.getElementById("steamID").value;
    getSteamGames(steamID);
});