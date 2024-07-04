import React from "react";
import { Link, Outlet } from "react-router-dom";


function HomeTest(){


return(
    <div>
        <div>
        <Link to="/login">Login</Link>
        </div>
        <Link to="/signup">SignUp</Link>
    </div>
);
}

export default HomeTest;