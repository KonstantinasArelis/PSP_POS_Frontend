const testStringElement = document.getElementById('test-string');
console.log("LOG: hello from renderer");

// Request the data from the main process
window.onload = () => {
  window.electronAPI.getTestString();  
};

window.electronAPI.onTestStringData((event, data) => {
  testStringElement.textContent = data; 
});

window.electronAPI.onTestStringError((event, error) => {
  console.error('Error:', error);
  testStringElement.textContent = 'Error fetching data';
});