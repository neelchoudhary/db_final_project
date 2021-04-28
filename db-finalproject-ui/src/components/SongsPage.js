import React from 'react'
import { getSongsAPI, getSongsByArtistIdAPI } from '../utils/api'
import { CreateButton, EditButton } from './BootstrapComponents'
import { Button, ListGroup } from 'react-bootstrap'


export default class SongsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            songs: [],
            artistId: window.location.pathname.split("/")[3],
            // isFiltered: window.location.pathname.split("/")[2] === undefined,
        }

        this.getSongs = this.getSongs.bind(this)
        this.getSongsByArtist = this.getSongsByArtist.bind(this)
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
                <a href='/songs/edit'><CreateButton>Create Song</CreateButton></a>
                <SongListItems songs={this.state.songs} />
            </React.Fragment>
        )
    }
}

function toTime(sec) {
    var min = Math.floor(sec / 60)
    var sec = sec % 60
    return min + ":" + sec
}

export function SongListItems({ songs, isInPlaylist, removeSong }) {
    return (
        <ListGroup className='listgroup'>
            {songs.map((song) => {
                return (
                    <ListGroup.Item>
                        <SongListItem song={song} />
                        {/* <button onClick={(event) => this.removeSong(event, song.id)}>Remove Song From Playlist</button> */}
                        {isInPlaylist && <Button variant="outline-danger" size="sm" onClick={(event) => removeSong(event, song.id)}>Remove Song From Playlist</Button>}

                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export function SongListItem({ song }) {
    const { id, content, explicit, language, name, length, artist } = song
    return (
        <div className='song-card'>
            <div className='row-no'>
                <h3 id='name-text'>{name} - <a href={`/artists/edit/${artist.id}`}>{artist.name}</a></h3>
                <h3 id='name-text'>{toTime(length)}</h3>
                <a href={`/songs/edit/${id}`}><EditButton>Edit</EditButton></a>
            </div>
        </div>
    )
}