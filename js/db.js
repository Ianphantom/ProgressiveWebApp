import "../js/idb.js";
export const dbPromised = idb.open("club", 1, function(upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("player", {
      keyPath: "id"
    });
    //articlesObjectStore.createIndex("name", "name", { unique: false });
});	
export function saveForLater(tim) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("player", "readwrite");
        const store = tx.objectStore("player");
        console.log(tim);
        store.put(tim);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
        M.toast({html: 'Saving The Club', completeCallback: function(){alert('Club has been saved and you can open it from the favorite menu')}})
  })
}
export function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("player", "readonly");
          const store = tx.objectStore("player");
          return store.getAll();
        })
        .then(function(tim) {
          resolve(tim);
        });
    });
}
export function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("player", "readonly");
          const store = tx.objectStore("player");
          console.log(id);
          return store.get(parseInt(id));
        })
        .then(function(tim) {
          resolve(tim);
        });
    });
}
export function deleteById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("player", 'readwrite');
        const store = tx.objectStore("player");
        console.log(id);
        return store.delete(parseInt(id));
      })
      .then(function(tim) {
        resolve(tim);
      })
      .catch(function () {
        M.toast({
            html: "FAILED"
        });  
      });;
  });
}