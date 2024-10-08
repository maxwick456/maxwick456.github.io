const data = fetch("https://maxgames.pages.dev/assets/json/gs.json")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    search(data);
})
.catch(function (err) {
    console.log("error: " + err);
});

function search(data) {
data.sort(function (a, b) {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
});
$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
    $('#search').keyup(function () {
        $('#gn').html('');
        $('#name').val('');
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");
        $.each(data, function (key, valu) {
            if (valu.name.search(expression) != -1) {
                if (valu.new == "true") {
                    $('#gn').append('<li><a href=./go.html?id=' +
                        valu.id +
                        ' class="box"><img src="https://seep.eu.org/https://cdn.glitch.global/a65741ca-e4a3-4b9c-9f87-1568672f0160/' +
                        valu.id +
                        '.' +
                        valu.name +
                        "</span></a></li>");
                } else {
                    $('#gn').append("<li><a href=./go.html?id=" +
                        valu.id +
                        ' class="box"><img src="https://seep.eu.org/https://cdn.glitch.global/a65741ca-e4a3-4b9c-9f87-1568672f0160/' +
                        valu.id +
                        '.' +
                        valu.img +
                        '"' +
                        '</div><span class="box-title">' +
                        valu.name +
                        "</span></a></li>");
                }
            }
        });
    });
});
var mainContainer = document.getElementById("gs");
for (var i = 0; i <= data.length; i++) {
    var div = document.createElement("li");
    if (data[i].new == "true") {
        div.innerHTML =
        "<a href=./go.html?id=" +
        data[i].id +
        ' class="box"><img src="https://seep.eu.org/https://cdn.glitch.global/a65741ca-e4a3-4b9c-9f87-1568672f0160/' +
        data[i].id +
        '.' +
        data[i].img +
        '"' +
        '<span class="box-title">' +
        data[i].name +
        "</span></a>";
    mainContainer.appendChild(div);
    } else {
        div.innerHTML =
            "<a href=./go.html?id=" +
            data[i].id +
            ' class="box"><img src="https://seep.eu.org/https://cdn.glitch.global/a65741ca-e4a3-4b9c-9f87-1568672f0160/' +
            data[i].id +
            '.' +
            data[i].img +
            '"' +
            '<span class="box-title">' +
            data[i].name +
            "</span></a>";
        mainContainer.appendChild(div);
    }
    count();
}
function count() {
    document.getElementById("libtot").innerHTML = "There are " + data.length + " games to choose from!(more to come!)";
}
}

function sug(val) {
document.getElementById("search").value = val;
}

const bobbo = fetch("https://maxgames.pages.dev/assets/json/twothree.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (bobbo) {
            hot(bobbo);
        })
        .catch(function (err) {
            console.log("error: " + err);
        });
    /**
     * This is the hot function
     * @description - this is the function that displays the hottest/best games on the website.
     * @param {*} bobbo - represents the data being passed through
     */
    function hot(bobbo) {
        let hotG = document.getElementById("hot");
        // originally it would be 15, but for this special update it will 30.
        for (let i = 0; i < 100; i++) {
            let div = document.createElement("li");
            div.innerHTML =
                "<a href=./go.html?id=" +
                bobbo[i].id +
                ' class="box"><img src="https://seep.eu.org/https://cdn.glitch.global/a65741ca-e4a3-4b9c-9f87-1568672f0160/' +
                bobbo[i].id +
                '.' +
                bobbo[i].img +
                '"' +
                bobbo[i].badge +
                '</div><span class="box-title">' +
                bobbo[i].name +
                "</span></a>";
            hotG.appendChild(div);
        }
    }

    const appdata = fetch("/json/apps.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      systems(appdata);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });

  function systems(appdata) {
    appdata.sort(function (a, b) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
    });
    $(document).ready(function () {
      $.ajaxSetup({
        cache: false
      });
        });
      }
    let mainContainer = document.getElementById("apps");
    for (let i = 0; i <= appdata.length; i++) {
      let div = document.createElement("li");
      div.innerHTML =
        "<a href=./go2.html?id=" +
        appdata[i].id +
        ' class="box"><img src="https://seep.eu.org/https://cdn.glitch.global/a65741ca-e4a3-4b9c-9f87-1568672f0160/' +
        appdata[i].img +
        '</div><span class="box-title">' +
        appdata[i].name +
        "</span></a>";
      mainContainer.appendChild(div);
      count();
    }