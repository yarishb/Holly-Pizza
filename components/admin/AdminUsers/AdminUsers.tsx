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
import Select from 'react-select';
import {staff_options} from "../../../utils/variables";
 

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
    const [openOptions, setOpenOptions] = useState<boolean>(false)


    const setErrorHandler = (msg: string, status: number) => {
        setError({
            open: true,
            text: msg,
            status: status
        })
    }

    const classes = useStyles();
    const dbReqHelper = new DBRequestManager()

    const changeData = (e, isNumeric=false, func) => {
        e.preventDefault()
        const targetValue = isNumeric ? +e.target.value : e.target.value
        func(e, targetValue)
    }

    const newFieldsInput = (e, targetValue) => {
        setNewFields({
            ...newFields,
            [e.target.name]: targetValue
        })
    }

    const findUserInputHandler = (e) => {
        e.preventDefault()

        setFindUser({
            ...findUser,
            [e.target.name]: e.target.value
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
        getAllUsersAndStoreInState()
    }, [])


    const getAllUsersAndStoreInState = () => {
        Axios.get(`${process.env.API_URL}/users/getUsers`).then(res => {
            setUsers(res.data)
        })
    }

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

    const changeIsStaff = el => {
        setOpenOptions(!openOptions)

        setNewFields({
            ...newFields,
            is_staff: el.value
        })
    }

    const submitChanges = async(e) => {
        try {
            e.preventDefault()
            const body = {
                fields: {
                    id: newFields.id,
                    name: newFields.name,
                    phone: newFields.phone,
                    email: newFields.email,
                    is_staff: newFields.is_staff
                },
                id: selectedUser.user.id
            }            
            
            const isSuccessfullyUpdated: boolean = await Axios.put(
                `${process.env.API_URL}/users/updateUser`, body)


            if (isSuccessfullyUpdated) {
                getAllUsersAndStoreInState()
                setChangeUserFields(false)
                setSelectedUser({open: false})
            }
        } catch (err) {
            setErrorHandler(err.response.data.msg, err.response.data.status)
        }
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
                    <TableContainer  component={Paper} className={styles.rows}>
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
                                            <Button onClick={(e) => submitChanges(e)} variant="contained" color="secondary">
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
                                                    selectedUser && selectedUser.user.id === user.id ?
                                                        <>
                                                            <TableCell align="right">
                                                                <input
                                                                    placeholder={newFields.id + ''}
                                                                    name={'id'}
                                                                    onChange={(e) => changeData(e, true, newFieldsInput)}
                                                                    value={newFields.id}
                                                                    className={styles.input}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <input
                                                                    className={styles.inputField}
                                                                    name={'name'}
                                                                    value={newFields.name}
                                                                    onChange={(e) => changeData(e, false, newFieldsInput)}
                                                                    placeholder={newFields.name}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <input
                                                                    className={styles.inputField}
                                                                    name={'phone'}
                                                                    value={newFields.phone}
                                                                    onChange={(e) => changeData(e, false, newFieldsInput)}
                                                                    placeholder={newFields.phone}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <input
                                                                    className={styles.inputField}
                                                                    name={'email'}
                                                                    value={newFields.email}
                                                                    onChange={(e) => changeData(e, false, newFieldsInput)}
                                                                    placeholder={newFields.email}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Select
                                                                    className={styles.options}
                                                                    value={newFields.is_staff}
                                                                    onChange={changeIsStaff}
                                                                    options={staff_options}
                                                                    placeholder={new String(newFields.is_staff)}
                                                                />
                                                            </TableCell>
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
