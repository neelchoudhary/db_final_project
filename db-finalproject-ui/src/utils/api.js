const server_name = "http://localhost:8080/api"

// Retrieve all artists from the server
export const getArtistsAPI = () =>
    fetch(`${server_name}/artists`)
        .then(response => response.json())

// Retrieve artist by id from the server
export const getArtistByIdAPI = (artistId) =>
    fetch(`${server_name}/artists/${artistId}`)
        .then(response => response.json())
