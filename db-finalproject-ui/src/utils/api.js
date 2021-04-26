const server_name = "http://23461d240749.ngrok.io/api"

// Retrieve all artists from the server
export const getArtistsAPI = () =>
    fetch(`${server_name}/artists`)
        .then(response => response.json())

// Retrieve artist by id from the server
export const getArtistByIdAPI = (artistId) =>
    fetch(`${server_name}/artists/${artistId}`)
        .then(response => response.json())

// Update artist by id from the server
export const updateArtistByIdAPI = (artistId, artist) =>
    fetch(`${server_name}/artists/${artistId}`, {
        method: 'PUT',
        body: JSON.stringify(artist),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())

// Delete artist by id from the server
export const deleteArtistByIdAPI = (artistId) =>
    fetch(`${server_name}/artists/${artistId}`, {
        method: 'DELETE',
    })

// Create artist
export const createArtistAPI = (artist) =>
    fetch(`${server_name}/artists`, {
        method: 'POST',
        body: JSON.stringify(artist),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())


// Retrieve all users from the server
export const getUsersAPI = () =>
    fetch(`${server_name}/users`)
        .then(response => response.json())

// Retrieve user by id from the server
export const getUserByIdAPI = (userId) =>
    fetch(`${server_name}/users/${userId}`)
        .then(response => response.json())

// Update user by id from the server
export const updateUserByIdAPI = (userId, user) =>
    fetch(`${server_name}/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())

// Delete user by id from the server
export const deleteUserByIdAPI = (userId) =>
    fetch(`${server_name}/users/${userId}`, {
        method: 'DELETE',
    })

// Create user
export const createUserAPI = (user) =>
    fetch(`${server_name}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())


// Retrieve all songs from the server
export const getSongsAPI = () =>
    fetch(`${server_name}/songs`)
        .then(response => response.json())

// Retrieve song by artist id from the server
export const getSongsByArtistIdAPI = (artistId) =>
    fetch(`${server_name}/songs/artist/${artistId}`)
        .then(response => response.json())

// Retrieve song by id from the server
export const getSongByIdAPI = (songId) =>
    fetch(`${server_name}/songs/${songId}`)
        .then(response => response.json())

// Update song by id from the server
export const updateSongByIdAPI = (songId, song) =>
    fetch(`${server_name}/songs/${songId}`, {
        method: 'PUT',
        body: JSON.stringify(song),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())

// Delete song by id from the server
export const deleteSongByIdAPI = (songId) =>
    fetch(`${server_name}/songs/${songId}`, {
        method: 'DELETE',
    })

// Create song
export const createSongAPI = (song, artistId) =>
    fetch(`${server_name}/songs/${artistId}`, {
        method: 'POST',
        body: JSON.stringify(song),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())


// Retrieve all playlists from the server
export const getPlaylistsAPI = () =>
    fetch(`${server_name}/playlists`)
        .then(response => response.json())

// Retrieve playlist by user id from the server
export const getPlaylistsByUserIdAPI = (userId) =>
    fetch(`${server_name}/playlists/user/${userId}`)
        .then(response => response.json())

// Retrieve playlist by id from the server
export const getPlaylistByIdAPI = (playlistId) =>
    fetch(`${server_name}/playlists/${playlistId}`)
        .then(response => response.json())

// Update playlist by id from the server
export const updatePlaylistByIdAPI = (playlistId, userId, playlist) =>
    fetch(`${server_name}/playlists/${playlistId}/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(playlist),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())

// Delete playlist by id from the server
export const deletePlaylistByIdAPI = (playlistId) =>
    fetch(`${server_name}/playlists/${playlistId}`, {
        method: 'DELETE',
    })

// Create playlist
export const createPlaylistAPI = (playlist, artistId) =>
    fetch(`${server_name}/playlists/${artistId}`, {
        method: 'POST',
        body: JSON.stringify(playlist),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())