export interface AppUser {
    name : string,
    email : string,
    Admin : boolean
}

export interface Products{
    key:string,
    title:string,
    price:number,
    category:string,
    imageUrl:string
}

export interface User {
    name: string;
    email: string;
    phone: string;
    company: {
        name: string;
    }
}

export interface shoppingCartItems {
    product : Products;
    quantity: number;
} 

