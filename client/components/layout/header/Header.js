const Header = ({currentUser}) => {
    console.log(currentUser);
    return <h1>{currentUser.email}</h1>
}

export default Header;

