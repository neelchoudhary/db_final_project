
import userService from "./user-service"
const {useParams, useHistory} = window.ReactRouterDOM;
const {useState, useEffect} = React;


const UserFormEditor = () => {
    const {id} = useParams()
    const [user, setUser] = useState({})
    useEffect(() => {
       if(id !== "new") {
           findUserById(id)
        }
    }, []);


    const createUser = (user) =>
            userService.createUser(user)
                .then(() => history.goBack())

    const history = useHistory()

    const findUserById = (id) =>
        userService.findUserById(id).then(user => setUser(user))

    const deleteUser = (id) =>
        userService.deleteUser(id)
            .then(() => history.goBack())

    const updateUser = (id, newUser) =>
        userService.updateUser(id, newUser)
            .then(() => history.goBack())


    return (
        <div>
            <h2>User Editor</h2>
            <label>Id</label>
            <input value={user.id} className="form-control"/>
            <label>First Name</label>
            <input value={user.firstName} onChange={(e) => setUser(user => ({...user, firstName: e.target.value}))} className="form-control"/>
            <label>Last Name</label>
            <input value={user.lastName} onChange={(e) => setUser(user => ({...user, lastName: e.target.value}))} className="form-control"/>
            <label>Username</label>
            <input value={user.username} onChange={(e) => setUser(user => ({...user, username: e.target.value}))} className="form-control"/>
            <label>Password (Wow, amazing security)</label>
            <input value={user.password} onChange={(e) => setUser(user => ({...user, password: e.target.value}))} className="form-control"/>
            <br/>
            <button className="btn btn-warning" onClick={() => {history.goBack()}}>Cancel</button>
            <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
            <button className="btn btn-primary" onClick={() => updateUser(user.id, user)}>Save</button>
            <button className="btn btn-success" onClick={() => createUser(user)}>Create</button>
        </div>
    )
}

export default UserFormEditor