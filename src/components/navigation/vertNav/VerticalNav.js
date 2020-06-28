import React, {  useContext} from 'react'
import { AuthContext } from '../../../context/auth-context'
import './vertNav.css'

const VerticalNav = () => {
    const auth = useContext(AuthContext)
    let darkClass = auth.isDark ? 'dark-nav' : 'light-nav'
    return (
        <div className={`vertNav ${darkClass}`}>
            <div className="vertNav-items_cont">
                <div className="vertNav-items_list">
                    <ul>
                        <li>
                            <a name="" id="" class="" href="#" role="button">Home</a>
                        </li>
                        <li>
                            <a name="" id="" class="" href="#" role="button">Create Post</a>
                        </li>
                        <li>
                            <a name="" id="" class="" href="#" role="button">Your Insights</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default VerticalNav