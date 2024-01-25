// DELETE Request dosen
const dosenNidn = '10001';
fetch(`http://localhost:3000/dosen/${dosenNidn}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(handleResponse)
    .then(data => console.log('DELETE Success:', data))
    .catch(handleError);

//handle response
function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Request failed with status: ${response.status}`);
    }
}

//handle error
function handleError(error) {
    console.error('Request failed:', error.message);
}