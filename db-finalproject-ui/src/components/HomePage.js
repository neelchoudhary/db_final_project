import React from 'react'

export default class HomePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    render() {
        return (
            <React.Fragment>
                <div className='col'>
                    <h1>Home Page</h1>
                    <a href='/artists'>Artists List</a>
                    <a href='/songs'>Songs List</a>
                    <a href='/users'>Users List</a>
                    <a href='/playlists'>Playlists List</a>
                </div>
                <br/>
                <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1">
                </iframe>

            </React.Fragment>
        )
    }
}