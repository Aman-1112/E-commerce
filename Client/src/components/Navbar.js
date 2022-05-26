import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {FiLogOut} from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    let navigate = useNavigate();
    const handleLogout = ()=> {
        localStorage.removeItem('token');
        navigate('/home');
    }

    return (
        <div className='container1 '>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">E-commerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/#">Link</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="/#">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/#">Something else here</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex justify-content-start">
                            <input className="form-control me-4" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark" type="submit" style={{marginRight: '1rem'}}>Search</button>
                        </form>
                        <div className='cart'>
                            <Link className='text-reset text-decoration-none mx-2' to="/cart"><AiOutlineShoppingCart size={33}/></Link>
                            {!localStorage.getItem('token') ? <Link className='text-reset text-decoration-none mx-2' to="/login"><VscAccount size={33}/></Link> : <button style={{border: "none", background: "bottom"}} onClick={handleLogout}><FiLogOut size={30}/></button>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
