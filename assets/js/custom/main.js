window.onload = function () {
    main();
}

window.onresize = function () {
    setTileHeights();
}

function main() {
    setTileHeights();
}

function setTileHeights() {
    try {
        var tiles = document.getElementsByClassName('tile'), 
            i,
            n,
            tileHeight = 0,
            largeTile = 0;
        
        if (tiles[0] == null || tiles[0] == undefined || tiles[0] == "") {
            throw "Tiles could not be selected";  
        }

        for (i = 0; i < tiles.length; i++) {
            tileHeight = tiles[i].clientHeight;
            if (tileHeight > largeTile) {
                largeTile = tileHeight;
                for (n = 0; n < tiles.length; n++) {
                    tiles[n].style.minHeight = largeTile + 'px';
                }
            }
        }
        return 'success';
    }
    catch (err) {
        console.error('Something went wrong: ' +  err);
        return false;
    }
}