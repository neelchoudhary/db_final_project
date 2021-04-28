import React from 'react'
import { getPlaylistsAPI, getPlaylistsByUserIdAPI } from '../utils/api'
import { CreateButton, EditButton } from './BootstrapComponents'
import { ListGroup } from 'react-bootstrap'

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
                <a href='/playlists/edit'><CreateButton>Create Playlist</CreateButton></a>
                <PlaylistListItems playlists={this.state.playlists} />
            </React.Fragment>
        )
    }
}

export function PlaylistListItems({ playlists }) {
    return (
        <ListGroup className='listgroup'>
            {playlists.map((playlist) => {
                return (
                    <ListGroup.Item><PlaylistListItem playlist={playlist} /></ListGroup.Item>
                    // <li key={artist.id}>
                    //     <ArtistListItem
                    //         artist={artist}
                    //     />
                    // </li>
                )
            })}
        </ListGroup>
    )
}

export function PlaylistListItem({ playlist }) {
    const { id, user, title, description } = playlist
    return (
        <div className='playlist-card'>
            <div className='row-no'>
                <h3 id='name-text'>{title} - created by {user.firstName}</h3>
                <p>{description}</p>
                <a href={`/playlists/edit/${id}`}><EditButton>Edit</EditButton></a>
            </div>
        </div>
    )
}