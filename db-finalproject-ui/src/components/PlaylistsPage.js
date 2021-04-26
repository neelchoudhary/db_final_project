import React from 'react'
import { getPlaylistsAPI, getPlaylistsByUserIdAPI } from '../utils/api'

export default class PlaylistsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            playlists: [],
            userId: window.location.pathname.split("/")[3],
        }

        this.getPlaylists = this.getPlaylists.bind(this)
    }

    async componentDidMount() {
        if (this.props.isFiltered) {
            await this.getPlaylistsByUserId(this.state.userId)
        } else {
            await this.getPlaylists()
        }
    }

    async getPlaylistsByUserId(userId) {
        console.log("Fetching Playlists")
        await getPlaylistsByUserIdAPI(userId)
            .then(async (playlists) => {
                console.log(playlists)
                this.setState({
                    playlists: playlists
                })
            })
            .catch((error) => {
                console.warn("Error fetching playlists: " + error)
                // this.setState({
                //     error: 'There was an error fetching the playlist info.'
                // })
            })
    }

    async getPlaylists() {
        console.log("Fetching Playlists")
        await getPlaylistsAPI()
            .then(async (playlists) => {
                console.log(playlists)
                this.setState({
                    playlists: playlists
                })
            })
            .catch((error) => {
                console.warn("Error fetching playlists: " + error)
                // this.setState({
                //     error: 'There was an error fetching the playlist info.'
                // })
            })
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.isFiltered && <h1>Playlists List</h1>}
                {this.props.isFiltered && <h1>Playlists List for User Id: {this.state.userId}</h1>}
                <a href='/playlists/edit'><button>Create Playlist</button></a>
                <ul>
                    {this.state.playlists.map((playlist) => {
                        return (
                            <li key={playlist.id}>
                                <PlaylistListItem
                                    playlist={playlist}
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

export function PlaylistListItem({ playlist }) {
    const { id, user, title, description} = playlist
    return (
        <div className='playlist-card row'>
            <div className='row'>
                <h3 id='name-text'>{title} - created by {user.firstName}</h3>
                <p>{description}</p>
                <a href={`/playlists/edit/${id}`}><button>Edit</button></a>
            </div>
        </div>
    )
}