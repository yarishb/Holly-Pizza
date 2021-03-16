export interface File {
    size: number,
    path: string,
    name: string | null,
    type: string | null,
    lastModifiedDate: Date | null,
    hash: string | 'sha1' | 'md5' | 'sha256' | null;
  }


export interface PizzaFields {
    file: any,
    name: string,
    description: string,
    price: number,
    category: string,
    categories: any,
    protein: number,
    fat: number,
    carbohydrates: number,
    weight: number,
    size: string,
}

export interface Fields extends PizzaFields {
    image: string
    timeStamp: string,
    orders: number,
}



export interface NewPizza {
    files: {
        file: File
    }
    fields: Fields
}

export interface PizzasRes {
    data: Fields[],
    status: number,
    statusText: string
}
