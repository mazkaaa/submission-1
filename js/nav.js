document.addEventListener("DOMContentLoaded", function(){

    // buat nge direct ke blog post 
    
    var el = document.getElementById("posts");
    el.addEventListener("click", function(event) {
        console.log("test");
    });


    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();


    function loadNav(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
 
        // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
    }
});