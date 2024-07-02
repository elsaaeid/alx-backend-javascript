// Create a new WeakMap instance
const weakMap = new WeakMap();

// Export the weakMap instance
export { weakMap };

// Create the queryAPI function
export function queryAPI(endpoint) {
  // Check if the endpoint is already tracked in the weakMap
  if (weakMap.has(endpoint)) {
    // Get the current count of queries for the endpoint
    const count = weakMap.get(endpoint);

    // Check if the number of queries is greater than or equal to 5
    if (count >= 5) {
      // Throw an error with the message "Endpoint load is high"
      throw new Error('Endpoint load is high');
    }

    // Increment the count of queries for the endpoint
    weakMap.set(endpoint, count + 1);
  } else {
    // If the endpoint is not tracked in the weakMap, initialize the count to 1
    weakMap.set(endpoint, 1);
  }
}
