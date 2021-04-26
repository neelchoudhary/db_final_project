import React from 'react'
import { getSongByIdAPI, updateSongByIdAPI, deleteSongByIdAPI, createSongAPI, getArtistsAPI } from '../utils/api'


export default class SongsEditPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            songId: window.location.pathname.split("/")[3],
            song: {},
            songForm: {},
            isNew: window.location.pathname.split("/")[3] === undefined,
            artists: [],
        }

        this.getSong = this.getSong.bind(this)
        this.updateSong = this.updateSong.bind(this)
        this.deleteSong = this.deleteSong.bind(this)
        this.createSong = this.createSong.bind(this)
        this.getArtists = this.getArtists.bind(this)
    }

    async componentDidMount() {
        if (!this.state.isNew) {
            await this.getSong(this.state.songId)
        } else {
            await this.getArtists()
        }
    }

    handleChange = (event, field) => {
        var newSongForm = this.state.songForm
        newSongForm[field] = event.target.value
        this.setState({
            songForm: newSongForm
        })
    }

    handleCheckbox = (event, field) => {
        var newSongForm = this.state.songForm
        newSongForm[field] = event.target.checked
        this.setState({
            songForm: newSongForm
        })
    }

    reset = (event) => {
        event.preventDefault()
        this.setState({
            songForm: Object.assign(this.state.song)
        })
    }

    update = async (event) => {
        event.preventDefault()
        console.log("UPDATE ENTRY")
        await this.updateSong(this.state.songId, this.state.songForm)
    }

    delete = async (event) => {
        event.preventDefault()
        console.log("DELETE ENTRY")
        await this.deleteSong(this.state.songId)
    }

    create = async (event) => {
        event.preventDefault()
        var ele = document.getElementById("edit-form");
        var formStatus = ele.checkValidity();
        ele.reportValidity();
        if (formStatus) {
            console.log("CREATE ENTRY")
            if (this.state.songForm.explicit == undefined) {
                this.state.songForm.explicit = false
            }
            console.log(this.state.songForm)
            await this.createSong(this.state.songForm, this.state.songForm.artistId)
        }
    }

    copyObj = (obj) => {
        return {
            name: obj['name'],
            explicit: obj['explicit'],
            length: obj['length'],
            content: obj['content'],
            language: obj['language'],
            artist: obj['artist'],
        }
    }

    async getArtists() {
        console.log("Fetching Artists")
        await getArtistsAPI()
            .then(async (artists) => {
                console.log(artists)
                this.setState({
                    artists: artists
                })
            })
            .catch((error) => {
                console.warn("Error fetching artists: " + error)
                // this.setState({
                //     error: 'There was an error fetching the artist info.'
                // })
            })
    }

    async getSong(songId) {
        console.log("Fetching Song..")
        await getSongByIdAPI(songId)
            .then(async (song) => {
                console.log(song)
                this.setState({
                    song: this.copyObj(song),
                    songForm: this.copyObj(song)
                })
            })
            .catch((error) => {
                console.warn("Error fetching song: " + error)
                // this.setState({
                //     error: 'There was an error fetching the song info.'
                // })
            })
    }

    async updateSong(songId, song) {
        console.log("Updating Song..")
        await updateSongByIdAPI(songId, song)
            .then(async (song) => {
                console.log(song)
                this.setState({
                    song: this.copyObj(song),
                    songForm: this.copyObj(song)
                })
                window.location.href = 'http://localhost:3000/songs'
            })
            .catch((error) => {
                console.warn("Error updating song: " + error)
                // this.setState({
                //     error: 'There was an error fetching the song info.'
                // })
            })
    }

    async deleteSong(songId) {
        console.log("Deleting Song..")
        await deleteSongByIdAPI(songId)
            .then(async () => {
                console.log("DELETED SUCCESFFULY")
                window.location.href = 'http://localhost:3000/songs'
            })
            .catch((error) => {
                console.warn("Error deleting song: " + error)
                // this.setState({
                //     error: 'There was an error fetching the song info.'
                // })
            })
    }

    async createSong(song, artistId) {
        console.log("Creating Song..")
        await createSongAPI(song, artistId)
            .then(async (song) => {
                this.setState({
                    song: this.copyObj(song),
                    songForm: this.copyObj(song)
                })
                window.location.href = 'http://localhost:3000/songs'
            })
            .catch((error) => {
                console.warn("Error creating song: " + error)
                // this.setState({
                //     error: 'There was an error fetching the song info.'
                // })
            })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Song Edit Page</h1>
                <a href='/songs'><button>Back to Songs List</button></a>
                <div>
                    <Header songId={this.state.songId} isNew={this.state.isNew} />
                    <SongEditForm isNew={this.state.isNew} songForm={this.state.songForm} songId={this.state.songId} song={this.state.song}
                        handleChange={this.handleChange} handleCheckbox={this.handleCheckbox} resetEntry={this.reset} updateEntry={this.update}
                        deleteEntry={this.delete} createEntry={this.create} artists={this.state.artists} />
                </div>
            </React.Fragment>
        )
    }
}

class SongEditForm extends React.Component {

    constructor(props) {
        super(props)
    }

    shouldNotUpdate = () => {
        console.log(this.props.songForm)
        console.log(this.props.songForm.artist)
        return false
    }

    render() {
        const { isNew, songForm, handleChange, handleCheckbox, resetEntry, updateEntry, deleteEntry, createEntry, artists } = this.props
        return (
            <form id='edit-form' class='col'>
                <label htmlFor="1">Name</label>
                <input required readOnly={!isNew} id="1" value={songForm.name} className="form-control" onChange={(event) => handleChange(event, "name")} />
                <label htmlFor="2">Length (in Seconds)</label>
                <input required readOnly={!isNew} id="2" value={songForm.length} className="form-control" type="number" onChange={(event) => handleChange(event, "length")} />
                <label htmlFor="3">Language</label>

                <select required disabled={!isNew} id="3" value={songForm.language} onChange={(event) => handleChange(event, "language")}>
                    <option value=""></option>
                    <option value="ENGLISH">ENGLISH</option>
                    <option value="FRENCH">FRENCH</option>
                    <option value="HINDI">HINDI</option>
                    <option value="KOREAN">KOREAN</option>
                    <option value="MANDARIN">MANDARIN</option>
                    <option value="SPANISH">SPANISH</option>
                    <option value="OTHER">OTHER</option>
                </select>
                <label htmlFor="4">Explicit</label>
                <input readOnly={!isNew} id="4" type='checkbox' checked={songForm.explicit} onClick={(event) => handleCheckbox(event, "explicit")} />
                <label htmlFor="5">Artist</label>
                {!isNew && songForm.artist !== undefined &&
                    <a href={`/artists/edit/${songForm.artist.id}`}><p id="5" className="form-control">{songForm.artist.name}</p></a>}

                {isNew && <select required disabled={!isNew} id="3" value={songForm.artistId} onChange={(event) => handleChange(event, "artistId")}>
                    <option value=""></option>
                    {artists.map((artist, index) => {
                        return (
                            <option key={index} value={artist.id}>{artist.name}</option>
                        )
                    })}
                </select>}

                {!isNew && <label htmlFor="6">Content</label>}
                {!isNew && <a href={songForm.content} target="_blank"><button>Play Song</button></a>}
                {isNew && <label htmlFor="6">Song URL</label>}
                {isNew && <input required readOnly={!isNew} id="6" value={songForm.content} className="form-control" onChange={(event) => handleChange(event, "content")} />}


                {/* <iframe width="420" height="315"
                    src={songForm.content}>
                </iframe> */}
                <br />
                {false && !isNew && <button className="btn btn-warning" disabled={this.shouldNotUpdate()} onClick={(event) => updateEntry(event)}>Update</button>}
                {!isNew && <button className="btn btn-danger" onClick={(event) => deleteEntry(event)}>Delete</button>}
                {false && !isNew && <button className="btn btn-primary" disabled={this.shouldNotUpdate()} onClick={(event) => resetEntry(event)}>Reset</button>}
                {isNew && <input value="Create New Song" type="submit" className="btn btn-success" onClick={(event) => createEntry(event)} />}
            </form>
        )
    }
}

function Header({ songId, isNew }) {
    return (
        <div className='song-card row'>
            {!isNew &&
                <div className='row'>
                    <h3 id='name-text'>Primary Key: {songId}</h3>
                </div>
            }
            {isNew &&
                <div className='row'>
                    <h3 id='name-text'>Create New Song</h3>
                </div>
            }
        </div>
    )
}