import "./Nav.css"

function Nav() {
    return <nav>
        <div className="navbar_container">
            <a href="/">Culture Care</a>
        </div>

        <div className='navbar_menu'>
            <a href="/">Home</a>
            <a href="/pending-request">Appointment Requests</a>
        </div>
    </nav>

}

export default Nav
