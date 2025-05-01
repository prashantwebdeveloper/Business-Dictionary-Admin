import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import BackIcon from "../../../assets/images/back.png";
import UserImage from "../../../assets/Images/user.jpg";

import { GetUserDetailsFirebase } from '../../../firebase/services/user/UserServices';
import { toast } from 'react-toastify';

const UserDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const [showpassword, setshowpassword] = useState(false);

    const PasswordShowHide = () => {
        setshowpassword((prevShowPassword) => !prevShowPassword);
    };

    const GetUserDetails = async (uid) => {
        // setLoader(true);

        try {
            const res = await GetUserDetailsFirebase(uid);
            console.log("Res-User-Details++", res);

            setFormData(res);
        } catch (err) {
            console.error("Error-User-Details", err);
        } finally {
            // setLoader(false);
        }
    }

    useEffect(() => {
        GetUserDetails(id);
    }, [id]);

    return (
        <>

            <section className="categorylist-section my-4 my-lg-4 my-xl-5">
                <div className="edit-user">
                    <div className="row">

                        <div className="">
                            <h2 className="mb-0 title d-flex align-items-center">
                                <img
                                    src={BackIcon}
                                    alt="Back"
                                    className="cursor-pointer me-3"
                                    onClick={() => navigate(-1)}
                                    draggable={false}
                                />
                                Detail
                            </h2>
                        </div>

                        <form className="row g-3">
                            {/* <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className='d-flex'>
                                        <div>
                                            <img
                                                src={!formData?.image ? UserImage : formData?.image}
                                                alt="Images"
                                                className="img-thumbnail img-fluid"
                                                style={{
                                                    marginBottom: "10px", background: "none", borderRadius: '50%', height: '100px', width: '100px'
                                                }}
                                            />
                                        </div> */}
                            {/* <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column', marginTop: '30px', marginLeft: '20px' }}>
                                            <span style={{ fontSize: '22px', color: '#000', marginBottom: '12px', fontWeight: '600' }}>{formData?.name}</span>
                                            <span style={{ fontSize: '14px' }}>{formData?.mobileNumber}</span>
                                        </div> */}
                            {/* </div> */}

                            {/* <div>
                                        <div className={`status ${formData.status === "Active" ? "activate" : "deactivate"}`} style={{ height: '40px' }}>
                                            {formData.status === "Active" ? "Active" : "Inactive"}
                                        </div>
                                    </div> */}
                            {/* </div>
                            </dissssv> */}

                            <div className="col-12 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Name :
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.name || "-"}
                                    readOnly
                                />
                            </div>

                            <div className="col-12 mb-2">
                                <label htmlFor="email" className="form-label">
                                    Email :
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.email || "-"}
                                    readOnly
                                />
                            </div>

                            <div className="col-12 mb-2">
                                <label htmlFor="password" className="form-label">
                                    Password :
                                </label>
                                <div className="input-group">
                                    <input
                                        type={showpassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        autoComplete='off'
                                        value={formData?.password || "-"}
                                        readOnly
                                    />
                                    <span
                                        onClick={PasswordShowHide}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            border: "0",
                                            color: '#000',
                                            backgroundColor: "transparent",
                                            cursor: 'pointer',
                                            zIndex: "999"
                                        }}
                                    >
                                        {showpassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                                    </span>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </section>

        </>
    );
}

export default UserDetails;
