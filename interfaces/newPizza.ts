export interface File {
    size: number,
    path: string,
    name: string | null,
    type: string | null,
    lastModifiedDate: Date | null,
    hash: string | 'sha1' | 'md5' | 'sha256' | null;
  }

export interface Fields {
    image: string
    name: string,
    description: string,
    price: number,
    category: string,
    timeStamp: string,
    orders: number,
    protein: number,
    fat: number,
    carbohydrates: number,
    weight: number,
    size: string
}

export interface NewPizza {
    files: {
        image: File
    }
    fields: Fields
}

