const btnCplt = document.getElementById("btnComplete");
const btnGnre = document.getElementById("btnGenre");
const btnSrch = document.getElementById("btnSearch");
const btnSchd = document.getElementById("btnSchedule");

btnCplt.addEventListener("click", function() {
    getAniCom();
});

btnGnre.addEventListener("click", function() {
    getAniGen();
});

btnSchd.addEventListener("click", function() {
    getAniSch();
});

btnSrch.addEventListener("click", function() {
    const inpSrch = document.getElementById("inpSearch").value;
    const urlApi = `https://otakudesu-api.herokuapp.com/api/search/${inpSrch}`;
    
    // OnLoad
    fetch(urlApi)
        .then(function(res) {
            if(res.status != 200) {
                console.log('Oops..' + res.status);
                return;
            }
            res.json()
                .then(function(data) {
                    console.log(data.search_results) // menampilkan array berisi list anime 
                    data.search_results.forEach(anime => {
                        console.log(anime);
                        showAniSrc(anime);
                    });
                });
        })
        .catch(function(err) {
            console.log(err);
        })
});


function showAniSrc(x) {
    let row = document.getElementById("aniSrc");
    let div = document.createElement("div");
    let data = "";
    
    div.classList.add("col-sm-3");
    
    data += 
        `
            <br>
            <div class="card" style=" width: 18rem; height:42rem;">
                <img src='${x.thumb}' class="card-img-top" style="weight: auto; height: 400px;"/>
                <div class="card-body" style=" background-color: #EDEEF7;">
                    <p class="text-center" style=" font-weight: bold;">${x.title}</p>
                    <p>Score: ${x.score}</p>
                    <p>Status: ${x.status}</p>
                </div>
                <div class="card-footer text-center" style=" background-color: #EDEEF7;">
                    <a href="${x.link}" class="btn btn-primary">Tonton</a>
                </div>
            </div>
            <p></p>
        `;
    div.innerHTML = data;
    row.appendChild(div);

}

function getAniCom(){
    const urlApi = "https://otakudesu-api.herokuapp.com/api/complete"; 
    // OnLoad
    fetch(urlApi)
        .then(function(res) {
            if(res.status != 200) {
                console.log('Oops..' + res.status);
                return;
            }
            res.json()
                .then(function(data) {
                    data.animeList.forEach(anime => {
                        showAniCom(anime);
                    });
                });
        })
        .catch(function(err) {
            console.log(err);
        })
}

function showAniCom(x) {
    let row = document.getElementById("aniCom");
    let div = document.createElement("div");
    let data = ""; 

    div.classList.add("col-sm-3");

    data += 
        `
            <br>
            <div class="card" style=" width: 18rem; height:42rem;">
                <img src='${x.thumb}' class="card-img-top" style="weight: auto; height: auto;"/>
                <div class="card-body" style=" background-color: #EDEEF7;">
                    <p class="text-center" style=" font-weight: bold;">${x.title}</p>
                    <p>${x.episode}</p>
                    <p>Score: ${x.score}</p>
                    <p>Tanggal Upload: ${x.uploaded_on}</p>
                </div>
                <div class="card-footer text-center" style=" background-color: #EDEEF7;">
                    <a href="${x.link}" class="btn btn-primary">Tonton</a>
                </div>
            </div>
            <p></p>
        `;
    div.innerHTML = data;
    row.appendChild(div);
}

function getAniGen(){
    const urlApi = "https://otakudesu-api.herokuapp.com/api/genres"; 
    // OnLoad
    fetch(urlApi)
        .then(function(res) {
            if(res.status != 200) {
                console.log('Oops..' + res.status);
                return;
            }
            res.json()
                .then(function(data) {
                    // console.log(data.genreList) // menampilkan array berisi list anime 
                    data.genreList.forEach(anime => {
                        showAniGen(anime);
                    });
                });
        })
        .catch(function(err) {
            console.log(err);
        })
}

function showAniGen(x) {
    let row = document.getElementById("aniGen");
    let div = document.createElement("div");
    let data = "";

    div.classList.add("col-sm-2");
    
    data += 
        `
            <br>
            <div class="card" style=" width: 10rem; height:20rem;">
                <img src='${x.image_link}' class="card-img-top" style="weight: auto; height: 200px;"/>
                <div class="card-body text-center" style=" background-color: #EDEEF7;">
                    <p style=" font-weight: bold;">${x.genre_name}</p>
                    <a href="${x.link}" class="btn btn-primary">Tonton</a>
                </div>
            </div>
            <p></p>
        `;
    div.innerHTML = data;
    row.appendChild(div);
}

function getAniSch(){
    const urlApi = "https://otakudesu-api.herokuapp.com/api/schedule"; 
    // OnLoad
    fetch(urlApi)
        .then(function(res) {
            if(res.status != 200) {
                console.log('Oops..' + res.status);
                return;
            }
            res.json()
                .then(function(data) {
                    data.scheduleList.forEach(anime => {
                        getDetailAniSch(anime);
                    });
                });
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getDetailAniSch(x) {
    let animes = x.animeList;

    animes.forEach(y => {
        showAniSch(x, y);
    })
}

function showAniSch(x, y) {
    let row = document.getElementById("aniSch");
    let div = document.createElement("div");
    let data = ""; 
    
    switch (x.day) {
        case "Senin":
            colorBg = "#000";
            colorTx = "#fff";
            break;
        case "Selasa":
            colorBg = "#FFC93C";
            colorTx = "#000";
            break;
        case "Rabu":
            colorBg = "#B4FF9F";
            colorTx = "#000";
            break;
        case "Kamis":
            colorBg = "#A2EAE2";
            colorTx = "#000";
            break;
        case "Jumat":
            colorBg = "#F6F54D";
            colorTx = "#000";
            break;
        case "Sabtu":
            colorBg = "#ECB365";
            colorTx = "#000";
            break;
        case "Minggu":
            colorBg = "#EEEEEE";
            colorTx = "#000";
            break;
        default:
            colorBg = "#FF449F";
            colorTx = "#fff";
            break;
    }
    
    div.classList.add("col-sm-3");
    data += 
        `
            <ul class="list-group" style=" width: 20rem;">
                <li class="list-group-item d-flex justify-content-between align-items-center" style=" background-color: ${colorBg}; color: ${colorTx}">
                    ${x.day}
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${y.anime_name}
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="card-footer" style=" background-color: #EDEEF7;">
                        <a href="${y.link}" class="btn btn-primary">Tonton</a>
                    </div>
                </li>
            </ul>
            <p></p>
        `;
    div.innerHTML = data;
    row.appendChild(div);
}