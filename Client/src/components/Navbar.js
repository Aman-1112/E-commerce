import React,{useState,useEffect} from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import { Link/* ,useHistory */ } from 'react-router-dom';

export default function Navbar(props) {
    const [search, setSearch] = useState('');//DON'T USE NULL COZ VALUE ATTR.CAN'T BE NULL INSTEAD CONSIDER EMPTY STRING

    return (
        <div className='container1 '>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/#">E-commerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
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
                        </ul> */}
                        <form className="d-flex justify-content-start" /* onSubmit={handleSubmit} */>
                            <input className="form-control me-4"  type="search" placeholder="Search" onChange={e=>{setSearch(e.target.value)}} value={search} aria-label="Search" />
                            <Link to={`/search/${search}`}><button className="btn btn-outline-dark" type="submit" style={{marginRight: '1rem'}}>Search</button></Link>
                        </form>
                        <div className='cart'>
                            <Link className='text-reset text-decoration-none mx-2' to="/cart"><AiOutlineShoppingCart size={33}/></Link>
                            <Link className='text-reset text-decoration-none mx-2' to="/login"><VscAccount size={33}/></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}