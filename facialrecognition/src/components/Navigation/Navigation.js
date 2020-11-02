import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signin')}
                    className="link pointer">Sign Out</p>
            </nav>
        )
    }
    else {
        return (
            <nav className="flex justify-end">
            <p onClick={() => onRouteChange('signin')}
                className="link pointer">Sign In</p>
            <p onClick={() => onRouteChange('register')}
                className="link pointer">Register</p>
        </nav>
        )
    }

}

export default Navigation;