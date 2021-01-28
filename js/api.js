var base_url = "https://api.football-data.org/";
const token ="2df3c863f47348f5a6e96080a3bf2eb1";

// Blok kode yang akan di panggil jika fetch berhasil
// cek status:
function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    }
}


// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}


// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Errornya karena : " + error);
}


// Blok kode untuk melakukan request data json
function getTeam() {
    if ('caches' in window) {
        caches.match(base_url + "v2/teams").then(function(response) {
          if (response) {
            response.json().then(function (data) {
              var teamHTML = ""; 
              data.teams.forEach(function(article) {
                teamHTML += `
                            <div class="card">
                                <a href="./teamlist.html?id=${article.id}">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${article.crestUrl}"/>                                
                                </div>
                                </a>
                                <div class="card-content">
                                    <span class="card-title truncate">${article.name}</span>
                                </div>
                            </div>
                    `;
              });
              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("team-list").innerHTML = teamHTML;
            })
          }
        })
    }
    
    fetch(base_url + "v2/teams", { headers: {'X-Auth-Token': token}})
        .then(status)
        .then(json)
        .then(function(data){
        // Objek/array JavaScript dari response.json() masuk lewat data.

        // Menyusun komponen card artikel secara dinamis
        var teamHTML = "";   
        data.teams.forEach(function(article){
            teamHTML += `
                            <div class="card">
                                <a href="./teamlist.html?id=${article.id}">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${article.crestUrl}"/>                                
                                </div>
                                </a>
                                <div class="card-content">
                                    <span class="card-title truncate">${article.name}</span>
                                </div>
                            </div>
                                
                            `;
            })
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("team-list").innerHTML = teamHTML;
        })
    .catch(error);
}

function getTeamById() {
    // agar bisa mendapatkan objek artikel dari server dari dalam fungsi
    return new Promise(function(resolve, reject){
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window){
            caches.match(base_url + "v2/teams/" + idParam).then(function(response){
                if(response){
                    response.json().then(function(data){
                        var articleHTML = `
                            <div class="card">
                            
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${data.crestUrl}"/>                                
                            </div>
                            </a>
                            <div class="card-content">
                                <span class="card-title truncate">${data.name}</span>
                                <table class="centered-table">
                                    <tbody>
                                    <tr>
                                        <td>Short Name</td>
                                        <td>${data.shortName}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>${data.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>${data.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Website</td>
                                        <td>${data.website}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>${data.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Founded</td>
                                        <td>${data.founded}</td>
                                    </tr>
                                    <tr>
                                        <td>Club Colors</td>
                                        <td>${data.clubColors}</td>
                                    </tr>
                                    <tr>
                                        <td>Venue</td>
                                        <td>${data.venue}</td>
                                    </tr>        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `;
                        document.getElementById("team-content").innerHTML = articleHTML;
                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    });
                }
            });
        }
    
   
    fetch(base_url + "v2/teams/" + idParam, { headers: {'X-Auth-Token': token}})
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
                            <div class="card">
                            
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${data.crestUrl}"/>                                
                            </div>
                            </a>
                            <div class="card-content">
                                <span class="card-title truncate">${data.name}</span>
                                <table class="centered-table">
                                    <tbody>
                                    <tr>
                                        <td>Short Name</td>
                                        <td>${data.shortName}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>${data.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>${data.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Website</td>
                                        <td>${data.website}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>${data.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Founded</td>
                                        <td>${data.founded}</td>
                                    </tr>
                                    <tr>
                                        <td>Club Colors</td>
                                        <td>${data.clubColors}</td>
                                    </tr>
                                    <tr>
                                        <td>Venue</td>
                                        <td>${data.venue}</td>
                                    </tr>
                                    
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("team-content").innerHTML = articleHTML;
        resolve(data);
        });
    });
}


// menampilkan ke saved.html apa yg ada di db
function getSavedArticles() {
    getAll().then(function(articles) {
      console.log(articles);
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      articles.forEach(function(article) {
        articlesHTML += `
                        <div class="card">
                                            
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${article.crestUrl}"/>            
                            <a class="btn-floating waves-effect waves-light red"><i class="material-icons" id="delete" onclick = deleteDB(${article.id}) >delete</i></a>                    
                        </div>
                        </a>
                        <div class="card-content">
                            <span class="card-title truncate">${article.name}</span>
                            <table class="centered-table">
                                <tbody>
                                <tr>
                                    <td>Short Name</td>
                                    <td>${article.shortName}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>${article.address}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>${article.phone}</td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td>${article.website}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>${article.email}</td>
                                </tr>
                                <tr>
                                    <td>Founded</td>
                                    <td>${article.founded}</td>
                                </tr>
                                <tr>
                                    <td>Club Colors</td>
                                    <td>${article.clubColors}</td>
                                </tr>
                                <tr>
                                    <td>Venue</td>
                                    <td>${article.venue}</td>
                                </tr>
                                
                                
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                  `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("saved-team").innerHTML = articlesHTML;
    });
}


// function getDeletedItemById(id){
//     fetch(base_url + "v2/teams/" + id, { headers: {'X-Auth-Token': token}})
//       .then(status)
//       .then(json)
//       .then(function(data) {
//         // Objek JavaScript dari response.json() masuk lewat variabel data.
//         console.log(data);
//         return(data);
//     });
// }


function deleteDB (id) {
    console.log("tombol delete di klik" + id);
    deleteDBs(id);
    getSavedArticles();
}

function getMatch() {
    if ('caches' in window) {
        caches.match(base_url + "v2/matches").then(function(response) {
          if (response) {
            response.json().then(function (data) {
              var matchHTML = ""; 
              data.matches.forEach(function(article) {
                matchHTML += `
                <div class="card">
                <table class="centered-table">
                    <tbody>
                    <tr>
                        <td colspan= "2"><h5>${article.competition.name}</h5></td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td>${article.season.startDate}</td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td>${article.season.endDate}</td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>${article.competition.area.name}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>${article.utcDate}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>${article.status}</td>
                    </tr>
                    <tr>
                        <td>Home Team</td>
                        <td>${article.homeTeam.name}</td>
                    </tr>
                    <tr>
                        <td>Away Team</td>
                        <td>${article.awayTeam.name}</td>
                    </tr>
                    <tr>
                        <td>Score</td>
                        <td>${article.score.fullTime.homeTeam} - ${article.score.fullTime.awayTeam}</td>
                    </tr>
                    
                    </tbody>
                </table>
                </div>       
                    `;
              });
              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("match-list").innerHTML = matchHTML;
            })
          }
        })
    }
    

    fetch(base_url + "v2/matches", { headers: {'X-Auth-Token': token}})
        .then(status)
        .then(json)
        .then(function(data){
            console.log(data);
        // Objek/array JavaScript dari response.json() masuk lewat data.

        // Menyusun komponen card artikel secara dinamis
        var matchHTML = "";   
        data.matches.forEach(function(article){
            matchHTML += `
            <div class="card">
            <table class="centered-table">
                <tbody>
                <tr>
                    <td colspan= "2"><h5>${article.competition.name}</h5></td>
                </tr>
                <tr>
                    <td>Start Date</td>
                    <td>${article.season.startDate}</td>
                </tr>
                <tr>
                    <td>End Date</td>
                    <td>${article.season.endDate}</td>
                </tr>
                <tr>
                    <td>Area</td>
                    <td>${article.competition.area.name}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>${article.utcDate}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>${article.status}</td>
                </tr>
                <tr>
                    <td>Home Team</td>
                    <td>${article.homeTeam.name}</td>
                </tr>
                <tr>
                    <td>Away Team</td>
                    <td>${article.awayTeam.name}</td>
                </tr>
                <tr>
                    <td>Score</td>
                    <td>${article.score.fullTime.homeTeam} - ${article.score.fullTime.awayTeam}</td>
                </tr>
                
                </tbody>
            </table>
            </div>                    
                            `;
            })
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("match-list").innerHTML = matchHTML;
        })
    .catch(error);
}
