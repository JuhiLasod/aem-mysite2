export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-api-wrapper';

  // Create inputs
  const inputName = document.createElement('input');
  inputName.placeholder = 'Name';

  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Email';

  const inputMessage = document.createElement('input');
  inputMessage.placeholder = 'Enter message...';

  const button = document.createElement('button');
  button.className = 'button primary';
  button.textContent = 'Call API';

  wrapper.append(inputName, inputEmail, inputMessage, button);

  // Replace block content with our new form
  block.textContent = '';
  block.append(wrapper);

  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const payload = {
      name: inputName.value,
      email: inputEmail.value,
      message: inputMessage.value,
    };

    try {
      const response = await fetch('http://localhost:8000/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('API called successfully!');
      } else {
        alert('API call failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}
