import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import axios from "axios";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data : ProductData) => {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('not valid data')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } {
            throw new Error('Theres a new error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id : Product['id'])  {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output
        } {
            throw new Error('Theres a new error...')
        }
    } catch (error) {
        console.log(error)
    }
}


export async function updateProduct(data: ProductData, id: Product['id'])  {
}