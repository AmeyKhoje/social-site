import React from 'react'
import Pract from './test/Pract';

 const Layout = (props) => {
    let data = props.data
    
    return (
        <h1>
            <div>
            {
                data.map(dta => {
                    return (
                        <div>
                            {dta.name}
                        </div>
                    )
                })
            }
            </div>
            {props.name}
            Hi
            {/* <Pract name="hey" /> */}
            {props.data.name}
        </h1>
    )
}

 export default Layout