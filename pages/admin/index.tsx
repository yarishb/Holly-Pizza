import {useEffect, useState} from 'react';
import User from '../../utils/user';
import { UserRes } from '../../interfaces/userManager';
import {ErrorInterface} from '../../interfaces/error';
import {UserInterface} from '../../interfaces/userManager';
import { useRouter } from 'next/router';



const adminPage = () => {
    const [adminData, setAdminData] = useState<UserInterface>()
    const [error, setError] = useState<ErrorInterface>({
        open: false,
        text: ''
    })
    const router = useRouter()


    useEffect(() => {
        const userManager = new User()
        userManager.checkLogged().then((res: UserRes | undefined) => {
            if (res === undefined || !res.data.is_staff) {
                router.push(`admin/sign/${true}`)
            }
            else setAdminData(res.data)
        })
    }, [])


    return (
        <>
            {console.log(adminData)}
        </>
    )
}

export default adminPage