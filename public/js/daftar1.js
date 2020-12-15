import * as api from "../js/api.js";
import * as data from "../js/db.js";
// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }
  document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  let btnSave = document.getElementById("save");
  let btnDel = document.getElementById("delete");
  if (isFromSaved) {
    btnSave.style.display = 'none';
    api.getSavedArticleById();
  } else {
    var item = api.getClubById();
    btnDel.style.display = 'none';
  }
  btnSave.onclick = function() {
    console.log("Tombol FAB di klik.");
    item.then(function(article) {
      data.saveForLater(article);
      });
    };
  btnDel.onclick = function() {
    api.getDeleteById();
    console.log("Tombol Del di klik.");
    M.toast({html: 'Removing'});
    // redirect("home");
    window.location.href = "index.html"
    };
  });