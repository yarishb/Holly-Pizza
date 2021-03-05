import {NewPizza} from "../interfaces/newPizza";

interface createPizzaReturn {
    status: boolean,
    message: string
}

class Checker {
     public createPizzaChecker(newPizza: NewPizza): createPizzaReturn  {
        const { image, name, description, price, category } = newPizza

        if (!image) return {status: false, message: "Enter image field."}
        if (!name) return {status: false,message: "Enter name field."}
        if (!description) return {status: false, message: "Enter description field."}
        if (!price) return {status: false, message: "Enter price field"}
        if (!category) return {status: false, message: "Enter category field"}


        return {status: true, message: "All the fields are entered"}
    }

    public passwordChecker(password: string, passwordCheck: string): string {
        let msg = ''
        const letterRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
        const numericRegex = new RegExp("(?=.*[0-9])");


        if (password.length < 7) msg = "Your password must be at least 7 characters.";

        if (letterRegex.test(password) == false) msg = "Your password must contain uppercase and lowercase letters.";

        if (numericRegex.test(password) === false) msg = "Your password must contain  numbers.";

        if (password !== passwordCheck) msg = "Your passwords do not match.";

        return msg
    }

}


export default Checker