import React from 'react'
import { getArtistByIdAPI, updateArtistByIdAPI, deleteArtistByIdAPI, createArtistAPI, getSongsByArtistIdAPI } from '../utils/api'
import { SongListItem } from './SongsPage'


export default class ArtistsEditPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            artistId: window.location.pathname.split("/")[3],
            artist: {},
            artistForm: {},
            isNew: window.location.pathname.split("/")[3] === undefined,
            songs: [],
        }

        this.getArtist = this.getArtist.bind(this)
        this.updateArtist = this.updateArtist.bind(this)
        this.deleteArtist = this.deleteArtist.bind(this)
        this.createArtist = this.createArtist.bind(this)
        this.getSongsByArtist = this.getSongsByArtist.bind(this)
    }

    async componentDidMount() {
        if (!this.state.isNew) {
            await this.getArtist(this.state.artistId)
            await this.getSongsByArtist(this.state.artistId)
        }
    }

    handleChange = (event, field) => {
        var newArtistForm = this.state.artistForm
        newArtistForm[field] = event.target.value
        this.setState({
            artistForm: newArtistForm
        })
    }

    reset = (event) => {
        event.preventDefault()
        this.setState({
            artistForm: Object.create(this.state.artist)
        })
    }

    update = async (event) => {
        event.preventDefault()
        var ele = document.getElementById("edit-form");
        var formStatus = ele.checkValidity();
        ele.reportValidity();
        if (formStatus) {
            console.log("UPDATE ENTRY")
            await this.updateArtist(this.state.artistId, this.state.artistForm)
        }
    }

    delete = async (event) => {
        event.preventDefault()
        console.log("DELETE ENTRY")
        await this.deleteArtist(this.state.artistId)
    }

    create = async (event) => {
        event.preventDefault()
        var ele = document.getElementById("edit-form");
        var formStatus = ele.checkValidity();
        ele.reportValidity();
        if (formStatus) {
            console.log("CREATE ENTRY")
            await this.createArtist(this.state.artistForm)
        }
    }

    async getArtist(artistId) {
        console.log("Fetching Artist..")
        await getArtistByIdAPI(artistId)
            .then(async (artist) => {
                console.log(artist)
                this.setState({
                    artist: Object.create(artist),
                    artistForm: Object.create(artist)
                })
            })
            .catch((error) => {
                console.warn("Error fetching artist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the artist info.'
                // })
            })
    }

    async updateArtist(artistId, artist) {
        console.log("Updating Artist..")
        await updateArtistByIdAPI(artistId, artist)
            .then(async (artist) => {
                console.log(artist)
                this.setState({
                    artist: Object.create(artist),
                    artistForm: Object.create(artist)
                })
                window.location.href = 'http://localhost:3000/artists'
            })
            .catch((error) => {
                console.warn("Error updating artist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the artist info.'
                // })
            })
    }

    async deleteArtist(artistId) {
        console.log("Deleting Artist..")
        await deleteArtistByIdAPI(artistId)
            .then(async () => {
                console.log("DELETED SUCCESFFULY")
                window.location.href = 'http://localhost:3000/artists'
            })
            .catch((error) => {
                console.warn("Error deleting artist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the artist info.'
                // })
            })
    }

    async createArtist(artist) {
        console.log("Creating Artist..")
        await createArtistAPI(artist)
            .then(async (artist) => {
                this.setState({
                    artist: Object.create(artist),
                    artistForm: Object.create(artist)
                })
                window.location.href = 'http://localhost:3000/artists'
            })
            .catch((error) => {
                console.warn("Error creating artist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the artist info.'
                // })
            })
    }

    async getSongsByArtist(artistId) {
        console.log("Fetching Songs By Artist")
        await getSongsByArtistIdAPI(artistId)
            .then(async (songs) => {
                console.log(songs)
                this.setState({
                    songs: songs
                })
            })
            .catch((error) => {
                console.warn("Error fetching songs by artist: " + error)
                // this.setState({
                //     error: 'There was an error fetching the song info.'
                // })
            })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Artist Edit Page</h1>
                <a href='/artists'><button>Back to Artists List</button></a>
                <div className='row1'>
                    <div>
                        <Header artistId={this.state.artistId} isNew={this.state.isNew} />
                        <ArtistEditForm isNew={this.state.isNew} artistForm={this.state.artistForm} artistId={this.state.artistId} artist={this.state.artist}
                            handleChange={this.handleChange} resetEntry={this.reset} updateEntry={this.update} deleteEntry={this.delete} createEntry={this.create} />
                    </div>
                    <div>
                        <h3>Songs for Artist</h3>
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

class ArtistEditForm extends React.Component {

    constructor(props) {
        super(props)
    }

    shouldNotUpdate = () => {
        return this.props.artist["name"] === this.props.artistForm["name"]
    }

    render() {
        const { isNew, artistForm, handleChange, resetEntry, updateEntry, deleteEntry, createEntry } = this.props
        return (
            <form id='edit-form' class='col'>
                <label htmlFor="1" >Name</label>
                <input required id="1" value={artistForm.name} className="form-control" onChange={(event) => handleChange(event, "name")} />
                <br />

                {!isNew && <button className="btn btn-warning" disabled={this.shouldNotUpdate()} onClick={(event) => updateEntry(event)}>Update</button>}
                {!isNew && <button className="btn btn-danger" onClick={(event) => deleteEntry(event)}>Delete</button>}
                {!isNew && <button className="btn btn-primary" disabled={this.shouldNotUpdate()} onClick={(event) => resetEntry(event)}>Reset</button>}
                {isNew && <button className="btn btn-success" onClick={(event) => createEntry(event)}>Create New Artist</button>}
            </form>
        )
    }
}

function Header({ artistId, isNew }) {
    return (
        <div className='artist-card row'>
            {!isNew &&
                <div className='row'>
                    <h3 id='name-text'>Primary Key: {artistId}</h3>
                </div>
            }
            {isNew &&
                <div className='row'>
                    <h3 id='name-text'>Create New Artist</h3>
                </div>
            }
        </div>
    )
}