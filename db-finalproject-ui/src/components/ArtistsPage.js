import React from 'react'
import { getArtistsAPI } from '../utils/api'
import { Button, ListGroup } from 'react-bootstrap'
import { CreateButton, EditButton } from './BootstrapComponents'

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
                <a href='/artists/edit'><CreateButton>Create Artist</CreateButton></a>
                <ArtistListItems artists={this.state.artists} />
                {/* <ListGroup className='listgroup'>
                    {this.state.artists.map((artist) => {
                        return (
                            <ListGroup.Item><ArtistListItem artist={artist} /></ListGroup.Item>
                            // <li key={artist.id}>
                            //     <ArtistListItem
                            //         artist={artist}
                            //     />
                            // </li>
                        )
                    })}
                </ListGroup> */}
            </React.Fragment>
        )
    }
}

export function ArtistListItems({ artists }) {
    return (<ListGroup className='listgroup'>
        {artists.map((artist) => {
            return (
                <ListGroup.Item><ArtistListItem artist={artist} /></ListGroup.Item>
            )
        })}
    </ListGroup>)
}

function ArtistListItem({ artist }) {
    const { id, name } = artist
    return (
        <div className='artist-card'>
            <div className='row-no'>
                <h3 id='name-text'>{name}</h3>
                <a href={`/artists/edit/${id}`}><EditButton>Edit</EditButton></a>
            </div>
        </div>
    )
}