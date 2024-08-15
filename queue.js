const queue = [];

// add the emails to the queue
function addToQueue(emailData) {
  queue.push(emailData);
  processQueue();
}

// Implementation of processQueue
function processQueue() {
  // if no items in queue then simply return
  if (queue.length === 0) {
    return;
  }

  const emailToProcess = queue.shift();

  sendEmail(emailToProcess, () => {
    if (err) {
      console.log("Email Failed, retrying....");
      // push back again to queue
      queue.push(emailToProcess);
    }
  });
}

// actual sendEmail function implementation
function sendEmail(emailData, callback) {
  // For now we will simulate sending email using setTimeOut
  setTimeout(() => {
    console.log("Sending email....", emailData.to);
    callback(null);
  }, 1000);
}

module.exports = { addToQueue };
