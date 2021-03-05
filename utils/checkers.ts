import {newPizza} from "../interfaces/createPizza";

interface createPizzaReturn {
    status: boolean,
    message: string
}

class Checker {


     public createPizzaChecker(newPizza: newPizza): createPizzaReturn  {
        const { image, name, description, price, category } = newPizza

        if (!image) return {status: false, message: "Enter image field."}
        if (!name) return {status: false,message: "Enter name field."}
        if (!description) return {status: false, message: "Enter description field."}
        if (!price) return {status: false, message: "Enter price field"}
        if (!category) return {status: false, message: "Enter category field"}


        return {status: true, message: "All the fields are entered"}
    }
}


export default Checker