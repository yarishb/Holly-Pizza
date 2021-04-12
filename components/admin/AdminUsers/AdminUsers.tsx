import {useEffect, useState} from "react";
import Axios from "axios";
import {UserInterface} from "../../../interfaces/user";
import styles from './adminUsers.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {DBRequestManager} from '../../../utils/pizza'
import AdminSearch from "../AdminSearcher/AdminSearch";
import {ErrorInterface} from "../../../interfaces/error";
import Error from '../../Error/Error'
import {UserValues} from "./userValues/UserValues";
 

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface SelectedUser {
    open: boolean
    user?: UserInterface
}

interface FindUser {
    userName: string,
    userId: string
}

export default function AdminUsers() {
    const [users, setUsers] = useState<UserInterface[]>()
    const [selectedUser, setSelectedUser] = useState<SelectedUser>({
        open: false,
    })
    const [changeUserFields, setChangeUserFields] = useState<boolean>(false)
    const [findUser, setFindUser] = useState<FindUser>({
        userName: '',
        userId: ''
    })
    const [error, setError] = useState<ErrorInterface>({
        open: false,
        text: '',
        status: 0
    })
    const [newFields, setNewFields] = useState<UserInterface>()


    const setErrorHandler = (msg: string, status: number) => {
        setError({
            open: true,
            text: msg,
            status: status
        })
    }

    const classes = useStyles();
    const dbReqHelper = new DBRequestManager()


    const findUserInputHandler = (e) => {
        e.preventDefault()
        const value: string = e.target.value

        setFindUser({
            ...findUser,
            [e.target.name]: value
        })
    }

    const submit = async(e) => {
        e.preventDefault()

        if  (findUser.userName !== '' || findUser.userId !== '') {
            try {
                const body = {"id": findUser.userId, "name": findUser.userName}
                
                const data = await Axios.post(`${process.env.API_URL}/users/`, body)
                setUsers([...data.data])
            } catch(err) {
                setErrorHandler(err.response.data.msg, err.response.data.status)
            }
        }
    }

    useEffect(() => {
        Axios.get(`${process.env.API_URL}/users/getUsers`).then(res => {
            setUsers(res.data)
        })
    }, [])


    const deleteUser = (id: number, link: string) => {        
        dbReqHelper.deleteItemRequest(id, link).then((users: UserInterface[]) => {
            setUsers(users)
        })
    }

    const changeSelectedUser = (e, user: UserInterface) => {
        setSelectedUser({open: e.target.checked, user: user})
        setChangeUserFields(false)
        setNewFields(user)
    }


    if (users) {
        return (
            <>
                <Error status={error.status} text={error.text} open={error.open}/>
                <AdminSearch
                    firstInputData={{
                        placeholder: "Знайти користувача за назвою", 
                        name: "userName", 
                        value: findUser.userName, 
                        searchInputHandler: findUserInputHandler
                    }} 

                    secondInputData={{
                        placeholder: "Знайти піцу за id",
                        name: "userId",
                        value: findUser.userId,
                        searchInputHandler: findUserInputHandler
                    }}

                    submit={submit}
                />
                <div className={styles.adminUsers}>
                <Button  
                    variant="contained" 
                    style={{backgroundColor: "#16c79a", color: "#fff", width: "12rem", marginBottom: "-3rem"}}>
                    Новий користувач
                </Button>
                    <TableContainer component={Paper} className={styles.rows}>
                    {
                        selectedUser.open &&
                            <div className={styles.manageUsers}>
                                <div className={styles.manageUsers__userName}>
                                    Змінити {selectedUser.user.name}
                                </div>
                                { !changeUserFields 
                                    ?
                                        <div className={styles.manageUsers__buttons}>
                                            <div 
                                                className={styles.manageUsers__buttons__changeUser}
                                                onClick={() => setChangeUserFields(true)}        
                                            ></div>
                                            <div 
                                                className={styles.manageUsers__buttons__deleteUser}
                                                onClick={() => deleteUser(selectedUser.user.id, "users/deleteUser")}    
                                            ></div>
                                        </div>

                                    :
                                    <div className={styles.manageUsers__manageButtons}>
                                        <div 
                                            onClick={() => setChangeUserFields(false)}
                                            className={styles.manageUsers__manageButtons__close}
                                        >x</div>
                                        <div className={styles.manageUsers__manageButtons__submit}>
                                            <Button  variant="contained" color="secondary">
                                                submit
                                            </Button>
                                        </div>
                                    </div>
                                }   
                            </div>
                    }
                            <Table className={classes.table} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">name</TableCell>
                                        <TableCell align="right">phone</TableCell>
                                        <TableCell align="right">email</TableCell>
                                        <TableCell align="right">orders</TableCell>
                                        <TableCell align="right">is_staff</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user: UserInterface) => (
                                        <>
                                            <TableRow key={user.id}>
                                                <TableCell component="th" scope="row">
                                                    <Checkbox
                                                        onChange={e => changeSelectedUser(e, user)}
                                                        checked={user === selectedUser.user && selectedUser.open}
                                                        inputProps={{ "aria-label": "uncontrolled-checkbox" }} />
                                                </TableCell>
                                                {changeUserFields &&
                                                    selectedUser.user.id === user.id ?
                                                        <>
                                                            <TableCell align="right"><input /></TableCell>
                                                            <TableCell align="right"><input /></TableCell>
                                                            <TableCell align="right"><input /></TableCell>
                                                            <TableCell align="right"><input /></TableCell>
                                                            <TableCell align="right"><input /></TableCell>
                                                            <TableCell align="right"><input /></TableCell>
                                                        </>
                                                    :
                                                    <UserValues user={user}/>
                                                }
                                            </TableRow>
                                        </>
                                            
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                </div>
            </>
        )
    }

    return <>Loading...</>
}
