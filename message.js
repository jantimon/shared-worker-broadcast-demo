let workerPort;

const getWorkerPort = () => {
  if (!workerPort && window.SharedWorker) {
    workerPort = new SharedWorker("broadcastWorker.js").port;
    workerPort.start();
  }
  return workerPort;
};

const sendToOtherTabs = (message) => {
  const workerPort = getWorkerPort();
  if (workerPort) {
    workerPort.postMessage(message);
  }
};

const listenForMessages = (callback) => {
  const workerPort = getWorkerPort();
  if (workerPort) {
    workerPort.addEventListener("message", callback);
    return () => workerPort.removeEventListener("message", callback);
  }
  return () => {};
};

listenForMessages((event) => {
  document.getElementById("result").textContent = event.data
});

document.getElementById("message").oninput = function ({ target }) {
  sendToOtherTabs(target.value);
};
