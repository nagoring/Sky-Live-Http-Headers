// Saves options to chrome.storage
function save_options() {
  var mode = document.getElementById('mode').value;
  chrome.storage.sync.set({
    mode: mode
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    mode: 'simple'
  }, function(items) {
    document.getElementById('mode').value = items.mode;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);