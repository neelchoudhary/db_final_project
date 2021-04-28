import React from 'react'
import { getUsersAPI } from '../utils/api'
import { CreateButton, EditButton } from './BootstrapComponents'
import { ListGroup } from 'react-bootstrap'

export default class UsersPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: []
        }

        this.getUsers = this.getUsers.bind(this)
    }

    async componentDidMount() {
        await this.getUsers()
    }

    async getUsers() {
        console.log("Fetching Users")
        await getUsersAPI()
            .then(async (users) => {
                console.log(users)
                this.setState({
                    users: users
                })
            })
            .catch((error) => {
                console.warn("Error fetching users: " + error)
                // this.setState({
                //     error: 'There was an error fetching the user info.'
                // })
            })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Users List</h1>
                <a href='/users/edit'><CreateButton>Create User</CreateButton></a>
                <ListGroup className='listgroup'>
                    {this.state.users.map((user) => {
                        return (
                            <ListGroup.Item><UserListItem user={user}/></ListGroup.Item>
                            // <li key={artist.id}>
                            //     <ArtistListItem
                            //         artist={artist}
                            //     />
                            // </li>
                        )
                    })}
                </ListGroup>
            </React.Fragment>
        )
    }
}

function UserListItem({ user }) {
    const { id, firstName, lastName, email} = user
    return (
        <div className='user-card'>
            <div className='row-no'>
                <h3 id='name-text'>{firstName} {lastName}</h3>
                <a href={`/users/edit/${id}`}><EditButton>Edit</EditButton></a>
            </div>
        </div>
    )
}