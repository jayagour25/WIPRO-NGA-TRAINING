// Callback version
function fetchDataCallback(cb) {
  setTimeout(() => cb("Data loaded (callback)"), 1000);
}

// Promise version
function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded (promise)"), 1000);
  });
}

// Async/Await version
async function fetchDataAsync() {
  const msg = await fetchDataPromise();
  return msg + " (async)";
}

// Run all
fetchDataCallback(console.log);
fetchDataPromise().then(console.log);
fetchDataAsync().then(console.log);
