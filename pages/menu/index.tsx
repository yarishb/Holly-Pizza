import User from '../../utils/user'
import {useEffect} from "react";


const MenuPage = () => {
    useEffect(() => {
        const userManager = new User()
        const user = userManager.checkLogged().then((user) => {
            console.log(user);
        })
    }, [])

    return (
        <>
            Menu
        </>
    )
}



// MenuPage.getInitialProps = async () => {

// }
export default MenuPage