var listFilter = "",
    listElement = $("#pokeList"),
    inputElement = $("#pokeFilter"),
    pokeballElement = $("#pokeballBack");


inputElement.on("keyup", function(){
    listFilter = this.value;
    setList();
});

$(window).on("scroll", ()=>{
    var rotation = "translateY(-50%) rotateZ("+(window.scrollY / 6) + "deg)";
    pokeballElement.css("transform", rotation);
});

function setList(){
    pokeService.listAll((pokemonList)=>{
       var list = filterList(pokemonList);
       var template = listService.createList(list);
       listElement.html(template);
    });
}

function filterList(pokemonList){
    return pokemonList.filter((pokemon)=>{
        return pokemon.name.indexOf(listFilter.toLowerCase()) !== -1;
    })
}

setList();

$("#pokeList").on("mouseenter", "li", function(){
    $(this).find("img").jump();
});