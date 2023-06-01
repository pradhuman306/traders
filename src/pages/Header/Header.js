import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../../actions/auth';
export default function Header(props) {
    const dispatch = useDispatch();
    const logout = (e) => {
        dispatch(signout());
    };

    console.log(props);
    let name = props.auth.userdata.name;
    return (
        <div className="">
            <div className='main-header'>
                <div className='l-items'>
                    <h2>{props.heading}</h2>
                </div>
                <div className='r-items'>
                    <div className="account-info-wrapper">
                    {<div className="sidebar-header">
                                    <figure>
                                        <img
                                            src={
                                                props.profilePic
                                            }
                                            alt=""
                                        />
                                    </figure>
                                    <label>
                                        <span>{name}</span>
                                        Admin
                                    </label>
                                </div>}
                       
                    </div>
                </div>
            </div>

        </div>



    )
}