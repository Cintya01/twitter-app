import logo from "../src/svg/Logo_Alone.svg"
import name from "../src/svg/Name_Logo.svg"
import ProfilePic from "../src/svg/ornacia.png"

function Header() {
    return (
        <div className="header-cont flex">
            <nav className="header-nav-cont flex">
                <img className="profile-img-header" src={ProfilePic} alt="Profile Pic"/>
                <img className="logo-cont-header" src={logo} alt="Logo"/>
                <img className="devs-header" src={name} alt="DEVSUNITED"/>
            </nav>
        </div>
    )
    
}

export default Header;