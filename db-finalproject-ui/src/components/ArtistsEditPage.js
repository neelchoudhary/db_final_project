import React from 'react'
import { getArtistByIdAPI } from '../utils/api'


export default class ArtistsEditPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            artist: []
        }

        this.getArtist = this.getArtist.bind(this)
    }

    async componentDidMount() {
        await this.getArtist()
    }

    async getArtist() {
        console.log("Fetching Artist")
        await getArtistByIdAPI("1")
            .then(async (artist) => {
                console.log(artist)
                this.setState({
                    artist: artist
                })
            })
            .catch((error) => {
                console.warn("Error fetching artist info: " + error)
                // this.setState({
                //     error: 'There was an error fetching the artist info.'
                // })
            })
    }


    render() {
        return (
            <React.Fragment>
                <h1>Artist Edit Page</h1>
                <ArtistItem artist={this.state.artist} />
                <ArtistEditForm />
            </React.Fragment>
        )
    }
}

class ArtistEditForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            artistId: 1,
            artist: []
        }

        this.getArtist = this.getArtist.bind(this)
    }

    async getArtist(artistId) {
        console.log("Fetching Artist")
        await getArtistByIdAPI(artistId)
            .then(async (artist) => {
                console.log(artist)
                this.setState({
                    artist: artist
                })
            })
            .catch((error) => {
                console.warn("Error fetching artist info: " + error)
                // this.setState({
                //     error: 'There was an error fetching the artist info.'
                // })
            })
    }

    render() {
        const {artist, artistId} = this.state
        return (
            <div>
                <h2>Artist Editor</h2>
                <label>Id</label>
                <input value={artistId} onChange={(e) => this.setState({artistId: e.target.value})} className="form-control" />
                <label>Name</label>
                <input value={artist.name} className="form-control" />
                <br />
                <button className="btn btn-success" onClick={() => this.getArtist(artistId)}>Search</button>
                {/* <button className="btn btn-warning" onClick={() => { history.goBack() }}>Cancel</button> */}
                {/* <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button> */}
                {/* <button className="btn btn-primary" onClick={() => updateUser(user.id, user)}>Save</button> */}
                {/* <button className="btn btn-success" onClick={() => createUser(user)}>Create</button> */}
            </div>
        )
    }
}

function ArtistItem({ artist }) {
    const { id, name } = artist
    return (
        <div className='artist-card row'>
            <div className='row'>
                <h3 id='name-text'>{name}</h3>
            </div>
        </div>
    )
}