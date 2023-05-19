const dns = require('dns');
const net = require('net');

function checkEmailExists(email, callback) {
  const domain = email.split('@')[1];

  dns.resolve(domain, 'MX', (err, addresses) => {
    if (err || addresses.length === 0) {
     return callback(false);
    } else {
      const sortedAddresses = addresses.sort((a, b) => a.priority - b.priority);

      const socket = net.createConnection(25, sortedAddresses[0].exchange);

      socket.setTimeout(3000);
      socket.on('connect', () => {
        socket.end();
        callback(true);
      });

      socket.on('timeout', () => {
        // If connection times out, try the next MX record
        socket.destroy();
        if (sortedAddresses.length > 1) {
          checkMX(sortedAddresses.slice(1), email, callback);
        } else {
          callback(false);
        }
      });

      socket.on('error', () => {
        // If an error occurs, try the next MX record
        if (sortedAddresses.length > 1) {
          checkMX(sortedAddresses.slice(1), email, callback);
        } else {
        return  callback(false);
        }
      });
    }
  });
}

// Example usage
checkEmailExists('example@gmail.com', (exists) => {
  console.log(exists);
});
