const getDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1;
  const day =
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const insert = async (data) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("CostsDB", 1);

    request.onsuccess = async function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["myObjectStore"], "readwrite");
      const objectStore = transaction.objectStore("myObjectStore");

      try {
        // Add all fields from the data object to the database
        const addRequest = objectStore.add({
          name: data.name,
          price: data.price,
          category: data.category,
          description: data.description,
          date: getDate(),
        });
        addRequest.onsuccess = function (event) {
          resolve("Data inserted successfully");
        };
        addRequest.onerror = function (event) {
          reject(new Error("Error inserting data: " + event.target.error));
        };

        // Ensure all data is saved by listening to the transaction's completion
        transaction.oncomplete = function() {
          resolve("Transaction completed");
        };
      } catch (error) {
        reject(new Error("Error inserting data: " + error));
      }
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore("myObjectStore", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("Products", "name", { unique: false });
    };

    request.onerror = function (event) {
      reject(new Error("Database error: " + event.target.error));
    };
  });
};


const findAll = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("CostsDB", 1);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('myObjectStore')) {
        db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["myObjectStore"], "readonly");
      const objectStore = transaction.objectStore("myObjectStore");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function(event) {
        resolve(event.target.result);
      };

      getAllRequest.onerror = function(event) {
        reject(new Error("Error retrieving data: " + event.target.error));
      };
    };

    request.onerror = function (event) {
      reject(new Error("Database error: " + event.target.error));
    };
  });
};

const findByCategory = async (category) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("CostsDB", 1);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('myObjectStore')) {
        db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["myObjectStore"], "readonly");
      const objectStore = transaction.objectStore("myObjectStore");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function(event) {
        const allData = event.target.result;
        const filteredData = allData.filter(item => item.category === category);
        resolve(filteredData);
      };

      getAllRequest.onerror = function(event) {
        reject(new Error("Error retrieving data: " + event.target.error));
      };
    };

    request.onerror = function (event) {
      reject(new Error("Database error: " + event.target.error));
    };
  });
};

export { insert, findAll,findByCategory };
