import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    tokenId: "",
    isLoggedIn: false,
    tokenId_handler: () => { },
    tokenClear_handler: () => { }
})

export default AuthContext;

const AuthContextProvider = (props) => {
    const [tokenId, setTokenId] = useState("");
    const isLoggedIn = !!tokenId; //if token is a string thats not empty, this will return true otherwise this will return false

    const tokenId_handler = (id) => {
        setTokenId(id);
    }

    const tokenClear_handler = () => {
        setTokenId("");
    }

    useEffect(() => {
        let tknId = localStorage.getItem("tokenId");
        setTokenId(tknId);

        setTimeout(() => {
            localStorage.removeItem("tokenId");
        }, 300000)
    }, [tokenId])

    return (
        <AuthContext.Provider value={{
            tokenId: tokenId,
            isLoggedIn: isLoggedIn,
            tokenId_handler: tokenId_handler,
            tokenClear_handler: tokenClear_handler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };