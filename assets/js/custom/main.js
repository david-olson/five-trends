window.onload = function () {
    main();
}

window.onresize = function () {
    setTileHeights();
}

window.onpopstate = function() {
    location.reload();
}

function main() {
    setTileHeights();
    playClickHandler();
    setTimeout(function() {
        $('.preloader').fadeOut(500);
    },500)
}

function setTileHeights() {
    try {
        var tiles = document.getElementsByClassName('tile'),
            i,
            n,
            tileHeight = 0,
            scoreboard = document.getElementById('scoreboard'),
            tilePerfectHeight = (scoreboard.clientHeight / 2) - 5,
            largeTile = 0;

        if (tiles[0] == null || tiles[0] == undefined || tiles[0] == "") {
            throw "Tiles could not be selected";
        }

        if (window.innerWidth > 1200) {
            for (i = 0; i < tiles.length; i++) {
                //            tileHeight = tiles[i].clientHeight;
                //            if (tileHeight > largeTile) {
                //                largeTile = tileHeight;
                //                for (n = 0; n < tiles.length; n++) {
                //                    tiles[n].style.minHeight = largeTile + 'px';
                //                }
                //            }
                tiles[i].style.height = tilePerfectHeight + 'px';
            }
            return 'success';
        }


    } catch (err) {
        console.error('Something went wrong: ' + err);
        return false;
    }
}

function getQuery(variable) {
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

function getVideoId(number) {
    console.log(number);
    var videoId,
        videoIds = {
            0: {
                'id': 'M1LRVICWPUk',
                'sequence': 0,
                'title': 'Intro',
                'nextTitle': 'Video 1'
            },
            1: {
                'id': 'M1LRVICWPUk',
                'sequence': 1,
                'title': 'Video 1',
                'nextTitle': 'Video 2'
            },
            2: {
                'id': '6nT911jkWEo',
                'sequence': 2,
                'title': 'Video 2',
                'nextTitle': 'Video 3'
            },
            3: {
                'id': 'abQRt6p8T7g',
                'sequence': 3,
                'title': 'Video 3',
                'nextTitle': 'Video 4'
            },
            4: {
                'id': 'HamYmjllE6A',
                'sequence': 4,
                'title': 'Video 4',
                'nextTitle': 'Video 5'
            },
            5: {
                'id': 'VHdsoNewFdU',
                'sequence': 5,
                'title': 'Video 5',
                'nextTitle': 'Video 6'
            }
        }

    switch (number) {
    case '0':
        videoId = videoIds[0];
        break;
    case '1':
        videoId = videoIds[1];
        break;
    case '2':
        videoId = videoIds[2];
        break;
    case '3':
        videoId = videoIds[3];
        break;
    case '4':
        videoId = videoIds[4];
        break;
    case '5':
        videoId = videoIds[5];
        break;
    default:
        videoId = videoIds[0];
        break;
    }
    return videoId;
}

function updateVideoTitle(string) {
    var videoTitle = document.getElementById('videoTitle'),
        nextVideoTitle = document.getElementById('nextTitle'),
        lastVideoWatched = getCookie('lvw17123');

    console.log(lastVideoWatched);

    if (lastVideoWatched == '') {
        setCookie('lvw17123', string.sequence, 300);
        nextVideoTitle.innerHTML = string.nextTitle;
    } else {
        nextVideoTitle.innerHTML = 'Video ' + (parseInt(lastVideoWatched) + 1);
        if (lastVideoWatched < string.sequence) {
            setCookie('lvw17123', string.sequence, 300);    
        }
        
    }
    videoTitle.innerHTML = string.title;
}

function playClickHandler() {
    var playButtons = document.getElementsByClassName('play_button');

    for (var x = 0; x < playButtons.length; x++) {
        playButtons[x].addEventListener('click', function (e) {
            e.preventDefault();
            var attr = this.href,
                videoId = attr.substr(-1),
                videoSelector;
            console.log('attr: ' + attr);
            videoId = getVideoId(videoId);
            player.loadVideoById(videoId.id);
            updateVideoTitle(videoId);
            $('.tile_active').removeClass('tile_active');
            videoSelector = 'tile' + videoId.sequence;
            $('#' + videoSelector).addClass('tile_active');
            history.pushState(null, null,attr);
        });
    }
}