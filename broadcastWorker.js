// This worker will broadcast messages to all connected ports.
const allPorts = new Set();

const handleMessage = function (e) {
  const currentPort = e.currentTarget;
  allPorts.forEach(function (portRef) {
    const port = portRef.deref();
    if (!port) {
      allPorts.delete(portRef);
      return;
    }
    if (port !== currentPort) {
      port.postMessage(e.data);
    }
  });
};

onconnect = function (event) {
  allPorts.add(new WeakRef(event.ports[0]));
  event.ports[0].onmessage = handleMessage;
};
