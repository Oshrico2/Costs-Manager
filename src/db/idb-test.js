// idb.js

function openCostsDB(dbName, version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('myObjectStore')) {
        db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve({
        async addCost(data) {
          try {
            const result = await insert(data, db);
            return result;
          } catch (error) {
            throw new Error("Error adding cost: " + error.message);
          }
        },
        async getAll() {
          try {
            const result = await findAll(db);
            return result;
          } catch (error) {
            throw new Error("Error retrieving all costs: " + error.message);
          }
        },
        async getByCategory(category) {
          try {
            const result = await findByCategory(category, db);
            return result;
          } catch (error) {
            throw new Error("Error retrieving costs by category: " + error.message);
          }
        },
        async getByDate(month, year) {
          try {
            const result = await findByDate(month, year, db);
            return result;
          } catch (error) {
            throw new Error("Error retrieving costs by date: " + error.message);
          }
        }
      });
    };

    request.onerror = function (event) {
      reject(new Error("Database error: " + event.target.error));
    };
  });
}

async function insert(data, db) {
  return new Promise((resolve, reject) => {
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
      transaction.oncomplete = function () {
        resolve("Transaction completed");
      };
    } catch (error) {
      reject(new Error("Error inserting data: " + error));
    }
  });
}

async function findAll(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["myObjectStore"], "readonly");
    const objectStore = transaction.objectStore("myObjectStore");

    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function (event) {
      resolve(event.target.result);
    };

    getAllRequest.onerror = function (event) {
      reject(new Error("Error retrieving data: " + event.target.error));
    };
  });
}

async function findByCategory(category, db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["myObjectStore"], "readonly");
    const objectStore = transaction.objectStore("myObjectStore");

    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function (event) {
      const allData = event.target.result;
      const filteredData = allData.filter(item => item.category === category);
      resolve(filteredData);
    };

    getAllRequest.onerror = function (event) {
      reject(new Error("Error retrieving data: " + event.target.error));
    };
  });
}

async function findByDate(month, year, db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["myObjectStore"], "readonly");
    const objectStore = transaction.objectStore("myObjectStore");

    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function (event) {
      const allData = event.target.result;
      // Filter data based on month and year
      const filteredData = allData.filter(item => {
        const [itemYear, itemMonth] = item.date.split('-');
        return itemMonth === month && itemYear === year;
      });
      resolve(filteredData);
    };

    getAllRequest.onerror = function (event) {
      reject(new Error("Error retrieving data: " + event.target.error));
    };
  });
}

// Function to get current date in "YYYY-MM-DD" format
function getDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Expose openCostsDB function under the idb namespace
window.idb = {
  openCostsDB
};
