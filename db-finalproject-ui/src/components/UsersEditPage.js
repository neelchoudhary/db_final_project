import React from 'react'
import { getUserByIdAPI, updateUserByIdAPI, deleteUserByIdAPI, createUserAPI, getPlaylistsByUserIdAPI } from '../utils/api'
import { PlaylistListItem } from './PlaylistsPage'


export default class UsersEditPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userId: window.location.pathname.split("/")[3],
            user: {},
            userForm: {},
            isNew: window.location.pathname.split("/")[3] === undefined,
            playlists: [],
        }

        this.getUser = this.getUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.createUser = this.createUser.bind(this)
        this.getPlaylistsByUserId = this.getPlaylistsByUserId.bind(this)
    }

    async componentDidMount() {
        if (!this.state.isNew) {
            await this.getUser(this.state.userId)
            await this.getPlaylistsByUserId(this.state.userId)
        }
    }

    handleChange = (event, field) => {
        var newUserForm = this.state.userForm
        newUserForm[field] = event.target.value
        this.setState({
            userForm: newUserForm
        })
    }

    reset = (event) => {
        event.preventDefault()
        this.setState({
            userForm: Object.assign(this.state.user)
        })
    }

    update = async (event) => {
        event.preventDefault()
        var ele = document.getElementById("edit-form");
        var formStatus = ele.checkValidity();
        ele.reportValidity();
        if (formStatus) {
            console.log("UPDATE ENTRY")
            await this.updateUser(this.state.userId, this.state.userForm)
        }
    }

    delete = async (event) => {
        event.preventDefault()
        console.log("DELETE ENTRY")
        await this.deleteUser(this.state.userId)
    }

    create = async (event) => {
        event.preventDefault()
        var ele = document.getElementById("edit-form");
        var formStatus = ele.checkValidity();
        ele.reportValidity();
        if (formStatus) {
            console.log("CREATE ENTRY")
            await this.createUser(this.state.userForm)
        }
    }

    copyObj = (obj) => {
        return {
            firstName: obj['firstName'],
            lastName: obj['lastName'],
            email: obj['email'],
        }
    }

    async getUser(userId) {
        console.log("Fetching User..")
        await getUserByIdAPI(userId)
            .then(async (user) => {
                console.log(user)
                this.setState({
                    user: this.copyObj(user),
                    userForm: this.copyObj(user)
                })
            })
            .catch((error) => {
                console.warn("Error fetching user: " + error)
                // this.setState({
                //     error: 'There was an error fetching the user info.'
                // })
            })
    }

    async updateUser(userId, user) {
        console.log("Updating User..")
        await updateUserByIdAPI(userId, user)
            .then(async (user) => {
                console.log(user)
                this.setState({
                    user: this.copyObj(user),
                    userForm: this.copyObj(user)
                })
                window.location.href = 'http://localhost:3000/users'
            })
            .catch((error) => {
                console.warn("Error updating user: " + error)
                // this.setState({
                //     error: 'There was an error fetching the user info.'
                // })
            })
    }

    async deleteUser(userId) {
        console.log("Deleting User..")
        await deleteUserByIdAPI(userId)
            .then(async () => {
                console.log("DELETED SUCCESFFULY")
                window.location.href = 'http://localhost:3000/users'
            })
            .catch((error) => {
                console.warn("Error deleting user: " + error)
                // this.setState({
                //     error: 'There was an error fetching the user info.'
                // })
            })
    }

    async createUser(user) {
        console.log("Creating User..")
        await createUserAPI(user)
            .then(async (user) => {
                this.setState({
                    user: this.copyObj(user),
                    userForm: this.copyObj(user)
                })
                window.location.href = 'http://localhost:3000/users'
            })
            .catch((error) => {
                console.warn("Error creating user: " + error)
                // this.setState({
                //     error: 'There was an error fetching the user info.'
                // })
            })
    }

    async getPlaylistsByUserId(userId) {
        console.log("Fetching Playlists By User")
        await getPlaylistsByUserIdAPI(userId)
            .then(async (playlists) => {
                console.log(playlists)
                this.setState({
                    playlists: playlists
                })
            })
            .catch((error) => {
                console.warn("Error fetching playlists by user id: " + error)
                // this.setState({
                //     error: 'There was an error fetching the playlist info.'
                // })
            })
    }

    render() {
        return (
            <React.Fragment>
                <h1>User Edit Page</h1>
                <a href='/users'><button>Back</button></a>
                <div className='row1'>
                    <div>
                        <Header userId={this.state.userId} isNew={this.state.isNew} />
                        <UserEditForm isNew={this.state.isNew} userForm={this.state.userForm} userId={this.state.userId} user={this.state.user}
                            handleChange={this.handleChange} resetEntry={this.reset} updateEntry={this.update} deleteEntry={this.delete} createEntry={this.create} />
                    </div>
                    <div>
                        <h3>Playlists for User</h3>
                        <ul >
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
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

class UserEditForm extends React.Component {

    constructor(props) {
        super(props)
    }

    shouldNotUpdate = () => {
        return this.props.user["firstName"] === this.props.userForm["firstName"] &&
            this.props.user["lastName"] === this.props.userForm["lastName"] &&
            this.props.user["email"] === this.props.userForm["email"]
    }

    render() {
        const { isNew, userForm, handleChange, resetEntry, updateEntry, deleteEntry, createEntry } = this.props
        return (
            <form id='edit-form' class='col'>
                <label htmlFor="1">First Name</label>
                <input required id="1" value={userForm.firstName} className="form-control" onChange={(event) => handleChange(event, "firstName")} />
                <label htmlFor="2">Last Name</label>
                <input required id="2" value={userForm.lastName} className="form-control" onChange={(event) => handleChange(event, "lastName")} />
                <label htmlFor="3">Email</label>
                <input required id="3" value={userForm.email} className="form-control" onChange={(event) => handleChange(event, "email")} />

                <br />
                {!isNew && <button className="btn btn-warning" disabled={this.shouldNotUpdate()} onClick={(event) => updateEntry(event)}>Update</button>}
                {!isNew && <button className="btn btn-danger" onClick={(event) => deleteEntry(event)}>Delete</button>}
                {!isNew && <button className="btn btn-primary" disabled={this.shouldNotUpdate()} onClick={(event) => resetEntry(event)}>Reset</button>}
                {isNew && <button className="btn btn-success" onClick={(event) => createEntry(event)}>Create New User</button>}
            </form>
        )
    }
}

function Header({ userId, isNew }) {
    return (
        <div className='user-card row'>
            {!isNew &&
                <div className='row'>
                    <h3 id='name-text'>Primary Key: {userId}</h3>
                </div>
            }
            {isNew &&
                <div className='row'>
                    <h3 id='name-text'>Create New User</h3>
                </div>
            }
        </div>
    )
}