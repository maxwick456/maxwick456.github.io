/**
 * gs.js
 * @description - This is used to generate the games that are relating to the system that the user chooses.
 * This is different compared to sys.js because sys.js is for the games that are specific to the system it supports
 * This generates every single game and is used on all.html.
 */

const data = fetch("/assets/json/gs.json")
    .then(function (response) {
  
        return response.json();
}
)
    .then(function (data) {
  
        search(data);
}
)
    .catch(function (err) {
  
        console.log("error: " + err);
}
);

function search(data) {
  
    data.sort(function (a, b) {
    
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
  }
  );
    document.querySelector(document).ready(function () {
    
        $.ajaxSetup({
      
            cache: false
    }
    );
        document.querySelector('#search').keyup(function () {
      
            document.querySelector('#top').innerHTML = '';
            document.querySelector('#gs').innerHTML = '';
            document.querySelector('#name').value = '';
            var searchField = document.querySelector('#search').value = document.getElementById("search");
            var expression = new RegExp(searchField, "i");
            $.forEach(data, function (key, valu) {
        
                if (valu.name.search(expression) != -1) {
          
                    if (valu.new == "true") {
            
                        document.querySelector('#s').insertAdjacentHTML("beforeend",'<li><a href=/go.html?id=' +
                            valu.id +
                            ' class="box"><img src="https://maxwick456.github.io/img/' +
                            valu.id +
                            '.' +
                            valu.img +
                            '" data-loaded="true"><div class="badge">' +
                            valu.badge +
                            '</div><div class="new-badge">NEW!' +
                            '</div><span class="box-title">' +
                            valu.name +
                            "</span></a></li>");
          }
           else {
            
                        document.querySelector('#s').insertAdjacentHTML("beforeend","<li><a href=/go.html?id=" +
                            valu.id +
                            ' class="box"><img src="https://maxwick456.github.io/img/' +
                            valu.id +
                            '.' +
                            valu.img +
                            '" data-loaded="true"><div class="badge">' +
                            valu.badge +
                            '</div><span class="box-title">' +
                            valu.name +
                            "</span></a></li>");
          }
        }
      }
      );
    }
    );
  }
  );
    var mainContainer = document.getElementById("gs");
    for (var i = 0; i <= data.length; i++) {
    
        var div = document.createElement("li");
        if (data[i].new == "true") {
      
            div.innerHTML =
                "<a href=/go.html?id=" +
                data[i].id +
                ' class="box"><img src="https://maxwick456.github.io/img/' +
                data[i].id +
                '.' +
                data[i].img +
                '" data-loaded="true"><div class="badge">' +
                data[i].badge +
                '</div><div class="new-badge">NEW!' +
                '</div><span class="box-title">' +
                data[i].name +
                "</span></a>";
            mainContainer.appendChild(div);
    }
     else {
      
            div.innerHTML =
                "<a href=/go.html?id=" +
                data[i].id +
                ' class="box"><img src="https://maxwick456.github.io/img/' +
                data[i].id +
                '.' +
                data[i].img +
                '" data-loaded="true"><div class="badge">' +
                data[i].badge +
                '</div><span class="box-title">' +
                data[i].name +
                "</span></a>";
            mainContainer.appendChild(div);
    }
    
        count();
  }
  
    function count() {
    
        document.getElementById("libtot").innerHTML = "There are " + data.length + " games to choose from!";
  }
}


function sug(val) {
  
    document.getElementById("search").value = val;
}