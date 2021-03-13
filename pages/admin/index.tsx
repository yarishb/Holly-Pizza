import {useEffect, useState} from 'react';
import User from '../../utils/user';
import { UserRes } from '../../interfaces/userManager';
import {ErrorInterface} from '../../interfaces/error';
import {UserInterface} from '../../interfaces/userManager';
import { useRouter } from 'next/router';

const adminPage = () => {
    const [adminData, setAdminData] = useState<UserInterface>()
    const [error, seterror] = useState<ErrorInterface>({
        open: false,
        text: ''
    })
    const router = useRouter()


    useEffect(() => {
         try {
            const userManager = new User()
            userManager.checkLogged().then((res: UserRes) => {
                if (!res.data.is_staff) {
                    router.push('admin/sign')
                }
                setAdminData(res.data)
            })
         } catch (err) {
             console.log(err);
         }
    }, [])

    return (
        <>
            {console.log(adminData)}
        </>
    )
}

export default adminPage