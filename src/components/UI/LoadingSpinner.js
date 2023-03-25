import React from 'react'
import loader from "../../Assest/loader.png"

export default function LoadingSpinner(props) {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img src={loader} alt="loadingSpinner" className={props.className} />
        </div>
    )
}