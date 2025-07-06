import axios from "axios"

     export const getUsers = () => {
        return(
            axios.create({
                baseURL: 'http://localhost:8000/api/registerusers/',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

     export const getItems = () => {
        return(
            axios.create({
                baseURL: 'http://localhost:8000/api/items/',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getSuppliers = () => {
        return(
            axios.create({
                baseURL: 'http://localhost:8000/api/suppliers/',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getInventory = () => {
        return(
            axios.create({
                baseURL: "http://localhost:8000/api/inventories/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getSales = () => {
        return(
            axios.create({
                baseURL: "http://localhost:8000/api/sales/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getSalesToday = () => {
        return(
            axios.create({
                baseURL: "http://localhost:8000/api/sales_today/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getExpense = () => {
        return(
            axios.create({
                baseURL: "http://localhost:8000/api/expenses/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }

    export const getExpensesToday = () => {
        return(
            axios.create({
                baseURL: "http://localhost:8000/api/expenses_today/",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        )
    }
   


