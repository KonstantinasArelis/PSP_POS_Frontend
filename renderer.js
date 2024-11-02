const testStringElement = document.getElementById('test-string');
console.log("LOG: hello from renderer");

// Request the data from the main process
window.onload = () => {
  console.log("LOG: Renderer is working");
};