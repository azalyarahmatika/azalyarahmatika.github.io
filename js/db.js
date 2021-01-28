var dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
      keyPath: "id",
      autoIncrement:false
    });
    articlesObjectStore.createIndex("post_title", "post_title", { unique: true });
  });
  
function saveForLater(article) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readwrite");
        var store = tx.objectStore("articles");
        console.log(article);
        store.put(article);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
    });
}

// untuk menarik apa yang ada di db utk di halaman saved
function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("articles", "readonly");
          var store = tx.objectStore("articles");
          return store.getAll();
        })
        .then(function(articles) {
          resolve(articles);
        });
    });
  }

function deleteDBs (article){
  dbPromised.then(function(db) {
    var tx = db.transaction('articles', 'readwrite');
    var store = tx.objectStore('articles');
    store.delete(article);
    return tx.complete;
  }).then(function() {
    console.log('Item deleted');
  });
}