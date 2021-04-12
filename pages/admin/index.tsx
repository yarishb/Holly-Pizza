import {useEffect, useState} from 'react';
import User from '../../utils/user';
import { UserRes } from '../../interfaces/userManager';
import {ErrorInterface} from '../../interfaces/error';
import {UserInterface} from '../../interfaces/userManager';
import { useRouter } from 'next/router';
import styles from '../../styles/adminPage.module.scss';
import Head from 'next/head';
import AdminPizza from '../../components/admin/AdminPizza/AdminPizza';
import AdminUsers from '../../components/admin/AdminUsers/AdminUsers';
import AdminOrders from '../../components/admin/AdminOrders/AdminOrders';

interface manageWindow {
    pizza: boolean,
    users: boolean,
    orders: boolean
}

const adminPage = () => {
    const [adminData, setAdminData] = useState<UserInterface>()
    const [error, setError] = useState<ErrorInterface>({
        open: false,
        text: '',
        status: 0
    })
    const [manageWindow, setManageWindow] = useState<manageWindow>({
        pizza: true,
        users: false,
        orders: false
    })
    const router = useRouter()


    useEffect(() => {
        const userManager = new User()
        userManager.checkLogged().then((res: UserInterface | undefined) => {
            if (res === undefined || !res[0].is_staff) {
                router.push(`admin/sign/${true}`)
            }
            else setAdminData(res)
        })
    }, [])

    if (adminData) {
        return (
            <>
                <Head>
                    <title>Holly Pizza | Admin</title>
                </Head>
                <div className={styles.items}>
                    <div className={styles.adminMenu}>
                        <div onClick={() =>
                            setManageWindow({
                                pizza: true,
                                users: false,
                                orders: false
                            })}
                             className={`${styles.adminMenu__pizza} ${styles.backgroundImage}`}>
                        </div>

                        <div onClick={() =>
                            setManageWindow({
                                pizza: false,
                                users: true,
                                orders: false
                            })}
                             className={`${styles.adminMenu__users} ${styles.backgroundImage} ${styles.adminMenu__menuImage}`}>
                        </div>

                        <div onClick={() =>
                            setManageWindow({
                                pizza: false,
                                users: false,
                                orders: true})}
                             className={`${styles.adminMenu__orders} ${styles.backgroundImage} ${styles.adminMenu__menuImage}`}>
                        </div>

                    </div>
                    <div className={styles.children}>
                        {
                            manageWindow.pizza &&
                            <AdminPizza />
                        }
                        {
                            manageWindow.users &&
                            <AdminUsers />
                        }
                        {
                            manageWindow.orders &&
                            <AdminOrders />
                        }
                    </div>
                </div>
            </>
        )
    }


    return (
        <></>
    )
}

export default adminPage