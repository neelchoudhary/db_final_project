import React from 'react'
import { getArtistsAPI } from '../utils/api'

export default class ArtistsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            artists: []
        }

        this.getArtists = this.getArtists.bind(this)
    }

    async componentDidMount() {
        await this.getArtists()
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

    render() {
        return (
            <React.Fragment>
                <h1>Artists List</h1>
                <a href='/artists/edit'><button>Create Artist</button></a>
                <ul>
                    {this.state.artists.map((artist) => {
                        return (
                            <li key={artist.id}>
                                <ArtistListItem
                                    artist={artist}
                                />
                            </li>
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

function ArtistListItem({ artist }) {
    const { id, name } = artist
    return (
        <div className='artist-card row'>
            <div className='row'>
                <h3 id='name-text'>{name}</h3>
                <a href={`/artists/edit/${id}`}><button>Edit</button></a>
            </div>
        </div>
    )
}