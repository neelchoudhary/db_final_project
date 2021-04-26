import React from 'react'
import { getPlaylistByIdAPI, updatePlaylistByIdAPI, deletePlaylistByIdAPI, createPlaylistAPI, getUsersAPI } from '../utils/api'
import { SongListItem } from './SongsPage'


export default class PlaylistsEditPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            playlistId: window.location.pathname.split("/")[3],
            playlist: {},
            playlistForm: {},
            isNew: window.location.pathname.split("/")[3] === undefined,
            users: [],
            songs: [],
        }

        this.getPlaylist = this.getPlaylist.bind(this)
        this.updatePlaylist = this.updatePlaylist.bind(this)
        this.deletePlaylist = this.deletePlaylist.bind(this)
        this.createPlaylist = this.createPlaylist.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.getSongsByPlaylist = this.getSongsByPlaylist.bind(this)
    }

    async componentDidMount() {
        await this.getPlaylist(this.state.playlistId)
        await this.getUsers()
        if (!this.state.isNew) {
            await this.getSongsByPlaylist(this.state.playlistId)
        }

    }

    handleChange = (event, field) => {
        var newPlaylistForm = this.state.playlistForm
        newPlaylistForm[field] = event.target.value
        this.setState({
            playlistForm: newPlaylistForm
        })
    }

    reset = (event) => {
        event.preventDefault()
        this.setState({
            playlistForm: Object.assign(this.state.playlist)
        })
    }

    update = async (event) => {
        event.preventDefault()
        var ele = document.getElementById("edit-form");
        var formStatus = ele.checkValidity();
        ele.reportValidity();
        if (formStatus) {
            console.log("UPDATE ENTRY")
            await this.updatePlaylist(this.state.playlistId, this.state.playlistForm.userId, this.state.playlistForm)
        }
    }

    delete = async (event) => {
        event.preventDefault()
        console.log("DELETE ENTRY")
        await this.deletePlaylist(this.state.playlistId)
    }

    create = async (event) => {
        event.preventDefault()
        var ele = document.getElementById("edit-form");
        var formStatus = ele.checkValidity();
        ele.reportValidity();
        if (formStatus) {
            console.log("CREATE ENTRY")
            if (this.state.playlistForm.explicit == undefined) {
                this.state.playlistForm.explicit = false
            }
            console.log(this.state.playlistForm)
            await this.createPlaylist(this.state.playlistForm, this.state.playlistForm.userId)
        }
    }

    copyObj = (obj) => {
        return {
            title: obj['title'],
            description: obj['description'],
            user: obj['user'],
            userId: obj['user']['id'],
        }
    }

    async getUsers() {
        console.log("Fetching Users")
        await getUsersAPI()
            .then(async (users) => {
                console.log(users)
                this.setState({
                    users: users
                })
            })
            .catch((error) => {
                console.warn("Error fetching users: " + error)
                // this.setState({
                //     error: 'There was an error fetching the user info.'
                // })
            })
    }

    async getSongsByPlaylist(playlistId) {
        console.log("Fetching Songs")
        await getSongsByPlaylistIdAPI(playlistId)
            .then(async (songs) => {
                console.log(songs)
                this.setState({
                    songs: songs
                })
            })
            .catch((error) => {
                console.warn("Error fetching songs: " + error)
                // this.setState({
                //     error: 'There was an error fetching the song info.'
                // })
            })
    }

    async getPlaylist(playlistId) {
        console.log("Fetching Playlist..")
        await getPlaylistByIdAPI(playlistId)
            .then(async (playlist) => {
                console.log(playlist)
                this.setState({
                    playlist: this.copyObj(playlist),
                    playlistForm: this.copyObj(playlist)
                })
            })
            .catch((error) => {
                console.warn("Error fetching playlist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the playlist info.'
                // })
            })
    }

    async updatePlaylist(playlistId, userId, playlist) {
        console.log("Updating Playlist..")
        console.log(playlist)
        await updatePlaylistByIdAPI(playlistId, userId, playlist)
            .then(async (playlist) => {
                console.log(playlist)
                window.location.href = 'http://localhost:3000/playlists'
            })
            .catch((error) => {
                console.warn("Error updating playlist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the playlist info.'
                // })
            })
    }

    async deletePlaylist(playlistId) {
        console.log("Deleting Playlist..")
        await deletePlaylistByIdAPI(playlistId)
            .then(async () => {
                console.log("DELETED SUCCESFFULY")
                window.location.href = 'http://localhost:3000/playlists'
            })
            .catch((error) => {
                console.warn("Error deleting playlist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the playlist info.'
                // })
            })
    }

    async createPlaylist(playlist, userId) {
        console.log("Creating Playlist..")
        await createPlaylistAPI(playlist, userId)
            .then(async (playlist) => {
                this.setState({
                    playlist: this.copyObj(playlist),
                    playlistForm: this.copyObj(playlist)
                })
                window.location.href = 'http://localhost:3000/playlists'
            })
            .catch((error) => {
                console.warn("Error creating playlist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the playlist info.'
                // })
            })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Playlist Edit Page</h1>
                <a href='/playlists'><button>Back</button></a>
                <div className='row1'>
                    <div>
                        <Header playlistId={this.state.playlistId} isNew={this.state.isNew} playlistForm={this.state.playlistForm} />
                        <PlaylistEditForm isNew={this.state.isNew} playlistForm={this.state.playlistForm} playlistId={this.state.playlistId} playlist={this.state.playlist}
                            handleChange={this.handleChange} handleCheckbox={this.handleCheckbox} resetEntry={this.reset} updateEntry={this.update}
                            deleteEntry={this.delete} createEntry={this.create} users={this.state.users} />
                    </div>
                    <div>
                        <h3>Songs</h3>
                        <ul>
                            {this.state.songs.map((song) => {
                                return (
                                    <li key={song.id}>
                                        <SongListItem
                                            song={song}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


class PlaylistEditForm extends React.Component {

    constructor(props) {
        super(props)
    }

    shouldNotUpdate = () => {
        return this.props.playlistForm.title === this.props.playlist.title
            && this.props.playlistForm.description === this.props.playlist.description
            && this.props.playlistForm.userId === this.props.playlist.userId
    }

    render() {
        const { isNew, playlistForm, handleChange, resetEntry, updateEntry, deleteEntry, createEntry, users } = this.props
        return (
            <form id='edit-form' className='col'>
                <label htmlFor="1">Title</label>
                <input required id="1" value={playlistForm.title} className="form-control" onChange={(event) => handleChange(event, "title")} />
                <label htmlFor="2">Description</label>
                <input required id="2" value={playlistForm.description} className="form-control" onChange={(event) => handleChange(event, "description")} />
                <label htmlFor="3">User</label>
                {<select required id="3" value={playlistForm.userId} onChange={(event) => handleChange(event, "userId")}>
                    <option value=""></option>
                    {users.map((user, index) => {
                        return (
                            <option key={index} value={user.id}>{user.id} - {user.firstName} {user.lastName}</option>
                        )
                    })}
                </select>}
                <br />
                {!isNew && <button className="btn btn-warning" disabled={this.shouldNotUpdate()} onClick={(event) => updateEntry(event)}>Update</button>}
                {!isNew && <button className="btn btn-danger" onClick={(event) => deleteEntry(event)}>Delete</button>}
                {!isNew && <button className="btn btn-primary" disabled={this.shouldNotUpdate()} onClick={(event) => resetEntry(event)}>Reset</button>}
                {isNew && <input value="Create New Playlist" type="submit" className="btn btn-success" onClick={(event) => createEntry(event)} />}
            </form>
        )
    }
}

function Header({ playlistId, isNew, playlistForm }) {
    return (
        <div className='playlist-card row'>
            {!isNew &&
                <div>
                    <h3 id='name-text'>Primary Key: {playlistId}</h3>
                    {playlistForm.user !== undefined && <a href={`/users/edit/${playlistForm.user.id}`}><h3>View {playlistForm.user.firstName}'s Profile</h3></a>}
                </div>
            }
            {isNew &&
                <div>
                    <h3 id='name-text'>Create New Playlist</h3>
                </div>
            }
        </div>
    )
}