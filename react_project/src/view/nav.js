import {useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    

    const home = () => {
        navigate('/artists');
    }

    const profile = () => {
        navigate('/profile');
    }

    const search = () => {
        navigate('/search');
    }

    return (
        <nav>
            <a onClick={home}>Home</a>
            <a onClick={search}>Search</a>
            <a onClick={profile}>Profile</a>
        </nav>
    )

}

export default Nav;