import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div>
        <p>GitHub OAuth Data Fetcher</p>
        <ul>
            <li>
                <div>
                <span>Try out here &gt; </span>
                <Link to="/login">Login</Link>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default home