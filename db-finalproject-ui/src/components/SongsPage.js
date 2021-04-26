import React from 'react'
import { getSongsAPI, getSongsByArtistIdAPI } from '../utils/api'

export default class SongsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            songs: [],
            artistId: window.location.pathname.split("/")[3],
            // isFiltered: window.location.pathname.split("/")[2] === undefined,
        }

        this.getSongs = this.getSongs.bind(this)
    }

    async componentDidMount() {
        if (this.props.isFiltered) {
            await this.getSongsByArtist(this.state.artistId)
        } else {
            await this.getSongs()
        }
    }

    async getSongsByArtist(artistId) {
        console.log("Fetching Songs")
        await getSongsByArtistIdAPI(artistId)
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

    async getSongs() {
        console.log("Fetching Songs")
        await getSongsAPI()
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

    render() {
        return (
            <React.Fragment>
                {!this.props.isFiltered && <h1>Songs List</h1>}
                {this.props.isFiltered && <h1>Songs List for Artist Id: {this.state.artistId}</h1>}
                <a href='/songs/edit'><button>Create Song</button></a>
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
            </React.Fragment>
        )
    }
}

function toTime(sec) {
    var min = Math.floor(sec / 60)
    var sec = sec % 60
    return min + ":" + sec
}

export function SongListItem({ song }) {
    const { id, content, explicit, language, name, length, artist} = song
    return (
        <div className='song-card row'>
            <div className='row'>
                <h3 id='name-text'>{name} - {artist.name}</h3>
                <h3 id='name-text'>{toTime(length)}</h3>
                <a href={`/songs/edit/${id}`}><button>Edit</button></a>
            </div>
        </div>
    )
}