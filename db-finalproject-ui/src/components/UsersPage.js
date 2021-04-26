import React from 'react'
import { getUsersAPI } from '../utils/api'

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
                <a href='/users/edit'><button>Create User</button></a>
                <ul>
                    {this.state.users.map((user) => {
                        return (
                            <li key={user.id}>
                                <UserListItem
                                    user={user}
                                />
                            </li>
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

function UserListItem({ user }) {
    const { id, firstName, lastName, email} = user
    return (
        <div className='user-card row'>
            <div className='row'>
                <h3 id='name-text'>{firstName} {lastName}</h3>
                <a href={`/users/edit/${id}`}><button>Edit</button></a>
            </div>
        </div>
    )
}