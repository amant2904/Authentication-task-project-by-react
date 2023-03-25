import React, { useState } from "react";

const AuthContext = React.createContext({
    tokenId: "",
    tokenId_handler: () => { },
    tokenClear_handler: () => { }
})

export default AuthContext;

const AuthContextProvider = (props) => {
    const [tokenId, setTokenId] = useState("");

    const tokenId_handler = (id) => {
        setTokenId(id);
    }

    const tokenClear_handler = () => {
        setTokenId("");
    }
    return (
        <AuthContext.Provider value={{
            tokenId: tokenId,
            tokenId_handler: tokenId_handler,
            tokenClear_handler: tokenClear_handler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };