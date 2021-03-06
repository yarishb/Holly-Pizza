export interface File {
    size: number,
    path: string,
    name: string | null,
    type: string | null,
    lastModifiedDate: Date | null,
    hash: string | 'sha1' | 'md5' | 'sha256' | null;
  }


export interface PizzaFields {
    file?: any,
    image?: string,
    lastUpdate?: string
    name: string,
    description: string,
    price: number,
    category?: any,
    categories: any,
    protein: number,
    fat: number,
    orders: number,
    carbohydrates: number,
    weight: number,
    size: string,
    id?: number
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


export interface TimeStamp {
    timeStamp: string,
    imageTimeStamp: string
}