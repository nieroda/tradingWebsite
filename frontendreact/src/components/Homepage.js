import React from 'react'
import { Link } from 'react-router-dom'


const Homepage = () => (
  <div className="outpostHome">
    <h1> A New Trading Experience </h1>
    <h4> </h4>
    <Link to="/main" className="btn btn-dark">
      Trade Now!
    </Link>
</div>
)


export default Homepage
