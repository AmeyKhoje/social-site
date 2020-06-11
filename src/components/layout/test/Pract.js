import React from 'react'
import Layout from '../Layout'

const data = [
    {
        name : "Amey",
        address : "Thane"
    },
    {
        name : "Anuj",
        address : "Kalyan"
    }
]

const Pract = (props) => {
    return (
        <Layout data={data} name="Anuj" />
    )
}

export default Pract