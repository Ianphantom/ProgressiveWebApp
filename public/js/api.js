import * as data from "../js/db.js"
export const ligaID =  2021;
export const default_url = "https://api.football-data.org/v2/";
export const club = `${default_url}competitions/${ligaID}/teams`;
export const klasemen = `${default_url}competitions/${ligaID}/standings`;
export const apikey = "61f27cb37caa434684ad55d159e3483e";

export function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
}
export function json(response) {
    return response.json();
}
export function error(error) {
    console.log("Error : " + error);
}

export const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': apikey
        }
    })
        .then(status)
        .then(json)
        .catch(error)
};

export function getClub() {
    if ('caches' in window) {
        caches.match(club).then(function(response) {
            if (response) {
                response.json().then(function (data) {
                    showClub(data);
                })
            }
        })
    }

    fetchAPI(club)
    .then(data => {
        showClub(data);
    })
    .catch(error => {
        console.log(error)
    })
}

export function showClub(data){
    let squads = "";
    data.teams.forEach(function (team){
        squads += `
        <div class="col s12 m6">
            <div class="card ">
                <a href="./article.html?id=${team.id}">
                    <div class="card-image  grey lighten-4">
                        <img class="img-resize-program" src="${team.crestUrl}"  onerror="this.src='images/fclub.jpg'"/>
                    </div>
                </a>
                <div class="card-content ">
                    <span class="card-title light-blue lighten-2 white-text">${team.name}</span>
                </div>
                <div class="card-action">
                    <a href="./article.html?id=${team.id}" class="white-text waves-effect waves-blue btn indigo lighten-2">More</a>
                    <a href="${team.website}" target="_blank" class="white-text waves-effect waves-blue btn indigo lighten-2">Website</a>
                </div>
            </div>
        </div>
            `;
    });
    document.getElementById("articles").innerHTML = squads;
}

export function getClubById() {
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if ("caches" in window) {
        caches.match( `https://api.football-data.org/v2/teams/${idParam}`).then(function(response) {
          if (response) {
            response.json().then(function(data) {
                console.log(data);
                showClubById(data);
                resolve(data);
            });
          }
        });
    }
    fetchAPI(`https://api.football-data.org/v2/teams/${idParam}`)
      .then(function(data) {
        console.log(data);
        showClubById(data);
        resolve(data);
      });
    })
}
export function showClubById(data){
    let pemain =  "";
    data.squad.forEach(function (squad){
    pemain += `
        <tr>
            <td>${squad.name}</td>
            <td>${squad.role}</td>
            <td>${squad.position}</td>
            <td>${squad.nationality}</td>
            <td><b>${squad.shirtNumber}</b></td>
        </tr>
    
    `;
    })
    document.getElementById("body-content").innerHTML = `
        <div class="center light-blue lighten-5"  style="font-family: 'Dancing Script', cursive">
            <br>
            <h1>${data.name}</h1>
            <h4>${data.address}</h2>
            <h5>${data.website}</h2>
            <img class="img-resize-home1" src="${data.crestUrl}" onerror="this.src='images/fclub.jpg'"/>
            <br><br>
        </div>
        <br>
        <div class="container">
            <table class="responsive-table striped centered">
                <thead class="cyan darken-1">
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Position</th>
                        <th>Nationality</th>
                        <th>Shirt Number</th>
                    </tr>
                </thead>
                <tbody>
                    ${pemain}
                </tbody>
            </table>
        </div>
        <br>
    `;
}
export function getSavedArticles() {
    data.getAll().then(function(teams) {
      console.log(teams);
    
        let squads = "";

        teams.forEach(function (team){
            squads += `
            <div class="col s12 m6">
                <div class="card ">
                    <a href="./article.html?id=${team.id}&saved=true">
                        <div class="card-image  grey lighten-4">
                            <img class="img-resize-program" src="${team.crestUrl}" alt="Lambang_Tim"/>
                        </div>
                    </a>
                    <div class="card-content ">
                        <span class="card-title light-blue lighten-2 white-text">${team.name}</span>
                    </div>
                    <div class="card-action">
                        <a href="./article.html?id=${team.id}" class="white-text waves-effect waves-blue btn indigo lighten-2">More</a>
                        <a href="${team.website}" target="_blank" class="white-text waves-effect waves-blue btn indigo lighten-2">Website</a>
                    </div>
                </div>
            </div>
                `;
        });

        document.getElementById("teams").innerHTML = `${squads}`;
    });
}
export function getSavedArticleById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    data.getById(idParam).then(function(data) {
        showClubById(data);
    });
}

export function getRanking() {
    if ('caches' in window) {
        caches.match(klasemen).then(function(response) {
          if (response) {
            response.json().then(function (data) {
              showStandings(data);
            })
          }
        })
      }
    fetchAPI(klasemen)
        .then(data => {
           showStandings(data);
        })
        .catch(error => {
            console.log(error)
        })
}
export function showStandings(data){
    let ranking = "";
    data.standings[0].table.forEach(function (standing) {
        ranking += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" onerror="this.src='images/fclub.jpg'"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td><b>${standing.points}</b></td>
                </tr>
        `;
    });

     document.getElementById("klasemen").innerHTML = `
        <table class=" striped centered">
            <thead class="blue lighten-5">
                <tr>
                    <th></th>
                    <th>Club</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Point</th>
                </tr>
            </thead>
            <tbody class="blue lighten-5">
                ${ranking}
            </tbody>
        </table>
     `;
}
export function getDeleteById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    data.deleteById(idParam)
}
