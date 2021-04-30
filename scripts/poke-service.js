

var pokeService = {
    url: "https://dev.treinaweb.com.br/pokeapi/",
    list:[],
    listAll: function(callback){
        if(this.list.length){
            callback(this.list);
        }else{
            $.ajax(this.url + "pokedex/1").then(response=>{
                var pokemonList = response.pokemon;

                pokemonList = pokemonList.map((pokemon)=>{
                    var number = this.getNumberFromURL(pokemon.resource_uri);
                    pokemon.number = number;
                    return pokemon;
                })
                .filter((pokemon)=>{
                    return (pokemon.number < 1000);
                }).sort((pokeA, pokeB)=>{
                    return (pokeA.number > pokeB.number ? 1 : -1);
                })
                .map((pokemon)=>{
                    pokemon.number = ("000" + pokemon.number).slice(-3);
                    return pokemon; 
                })
                this.list = pokemonList;
                callback(pokemonList);
            })
        }
    },
    getNumberFromURL: (url)=>{
        return parseInt(url.replace(/.*\/(\d+)\/$/, "$1"));
    }
}