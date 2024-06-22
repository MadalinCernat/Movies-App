// utils/network.js

// Function to check if the network connection is available
export async function checkConnection() {
    try {
      const response = await fetch('https://localhost:7129/api/Ping');
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  // Function to sync data with the server
  export async function syncData(data) {
    try {
      const response = await fetch('https://localhost:7129/api/SyncData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  // Function to sync with the server
  export async function syncWithServer() {
    try {
      const isConnected = await checkConnection();
      if (isConnected) {
        // Implement logic to sync data with the server
        // For example, you can fetch stored offline data from local storage and then call syncData function
        const offlineData = JSON.parse(localStorage.getItem('offlineData'));
        if (offlineData) {
          await syncData(offlineData);
          // After successful sync, you can clear the offline data from local storage
          localStorage.removeItem('offlineData');
        }
      }
    } catch (error) {
      throw new Error('Error syncing with server:', error);
    }
  }
  