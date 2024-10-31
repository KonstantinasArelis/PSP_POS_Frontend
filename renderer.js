const testStringElement = document.getElementById('test-string');
console.log("LOG: hello from renderer");

// Request the data from the main process
window.onload = () => {
  console.log("LOG: Renderer is working");
  window.electronAPI.getTestString();  
};

window.electronAPI.onTestStringData((event, data) => {
  //testStringElement.textContent = data; 
  const orders = data;
  const orderListItems = orders.map(order => {
    return `<li>Order ID: ${order.id}, Total: ${order.total_amount}</li>`; 
  });
  testStringElement.innerHTML = `<ul>${orderListItems.join('')}</ul>`;
});

window.electronAPI.onTestStringError((event, error) => {
  console.error('Error:', error);
  testStringElement.textContent = 'Error fetching data';
});