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
    } catch (err) {
        console.error('Something went wrong: ' + err);
        return false;
    }
}

function getVidId(variable) {
    var query = window.location.search.substring(1),
        vars = query.split('&');

    for (var x = 0; x < vars.length; x++) {
        var pair = vars[x].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
        return (false);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
    var name = cname + '=',
        ca = document.cookie.split(';');
    for (var x = 0; x < ca.length; x++) {
        var c = ca[x];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var lastVideoViewed = getCookie(cname);

    if (lastVideoViewed != "") {
        console.log('You last watched video ' + lastVideoViewed);
    } else {
        lastVideoViewed = getVidId('id');
        if (lastVideoViewed != "" && lastVideoViewed != null) {
            setCookie("lastVideo", lastVideoViewed, 30);
        }
    }
}

function changeHeading(param) {
    var updatedHeading = getVidId(param),
        heading = document.getElementById('replacement'),
        paragraph = document.getElementById('parareplace'),
        nextVid = getCookie("lastVideo");

    nextVid = parseInt(nextVid) + 1;

    if (updatedHeading) {
        heading.innerHTML = 'You will watch video ' + updatedHeading;
        paragraph.innerHTML = 'You will then watch video ' + nextVid;
    }
}