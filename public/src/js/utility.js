var dbPromise = idb.open('posts-store', 1, function(db){
    if(!db.objectStoreNames.contains('posts')){
        db.createObjectStore('posts',{keyPath: 'id'} );

    }
});

// function readData(st){
// 	return dbPromise.then(function(db){
// 		  var tx = db.transaction(st, 'readonly');
// 		var store = tx.objectStore(st);
// 		return store.getAll();
// 	});
// 	//console.log("hi");
// }

 var readData = function(st){
	return dbPromise.then(function(db){
		  var tx = db.transaction(st, 'readonly');
		var store = tx.objectStore(st);
		return store.getAll();
	});
	//console.log("hi");
}


function writeData(st, data){
	return dbPromise.then(function(db){
                            var tx =  db.transaction(st, 'readwrite');
                            var store = tx.objectStore(st);
                            store.put(data);
                            return tx.complete ;
  });
}

function clearAllData(st){
	return dbPromise.then(function(db){
		var tx = db.transaction(st, 'readwrite');
		var store = tx.objectStore(st);
		store.clear();
		return tx.complete;
	});
}

function deleteItemFromData(st, id){
	return dbPromise.then(function(db){
		var tx = db.transaction(st, 'readwrite');
		var store = tx.objectStore(st);
		store.delete(id);
		return tx.complete;
	}).then(function(){
		console.log("item deleted");
	});
}