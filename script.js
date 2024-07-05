// script.js
function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

const webhookUrl = getQueryParam('webhookUrl');
const user = getQueryParam('user');
const uuid = getQueryParam('uuid');

console.log('Webhook URL:', webhookUrl);
console.log('User:', user);
console.log('UUID:', uuid);

if (webhookUrl && user && uuid) {
    const payload = { user, uuid };
    console.log('body:', JSON.stringify(payload));

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('Response received:', response);
        return response.json().then(data => {
            console.log('Response JSON:', data);
            if (response.ok) {
                document.body.innerHTML += '<p>MFA activation is in progress. We will notify you once complete.</p>';
            } else {
                throw new Error('Non-200 status code received: ' + response.status);
            }
        });
    })
    .catch(error => {
        console.log('Error:', error);
        document.body.innerHTML += '<p>Error: ' + error.message + '</p>';
    });
} else {
    console.error('Invalid Request:', { webhookUrl, user, uuid });
    document.body.innerHTML += '<p>Error: Invalid Request.</p>';
}
