import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// import Logo from "../../assets/images/logo.png";
// import LoginLogo from "../../assets/images/login-logo.png";
import Logo from "../../assets/images/logo-2.svg";
import LoginLogo from "../../assets/images/logo.svg";

import { loaders } from '../../components/loader/Loader';

import { SignInAdmin } from '../../firebase/services/auth/login/LoginServices';
import { toast } from 'react-toastify';

const initialState = {
    email: "",
    password: "",
}

const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const [showpassword, setshowpassword] = useState(false);

    const PasswordShowHide = () => {
        setshowpassword((prevShowPassword) => !prevShowPassword);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        // navigate("/admin/dashboard");


        try {
            const resLogin = await SignInAdmin(formData);
            console.log("Res-Login++", resLogin);

            if (resLogin?.user?.accessToken) {
                toast.success("Admin Login successfully");
                setFormData(initialState);

                localStorage.setItem("business-admin-token", resLogin.user.accessToken);
                
                navigate("/admin/dashboard");
            }
        }
        catch (err) {
            console.error("Error-Res-Login", err);

            if (err?.code === "auth/invalid-email") {
                toast.error("Please enter a valid email address.");
            }
            else if (err?.code === "auth/weak-password") {
                toast.error("Password should be at least 6 characters");
            }
            else if (err?.code === "auth/network-request-failed") {
                toast.error("Network error. Please check your internet connection and try again.");
            }
            else if (err?.code === "auth/invalid-credential") {
                toast.error("Invalid email or password.");
            }
            else {
                toast.error("An error occurred. Please try again later.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className="login-section">
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row bg-white shadow login-box">
                    <div className="col-lg-6 left-box">
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                {/* <img src={Logo} alt="Logo" className="img-fluid" draggable="false" /> */}
                                <div className="logo">
                                    <img src={Logo} alt="Medilink" className="img-fluid" draggable="false" />
                                </div>
                                <h4 className="mb-2">Sign In !
                                    <span>
                                        {/* 👋 */}
                                        <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />
                                    </span>
                                </h4>
                                <p>Hello there, sign in to continue!</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Your Email Address"
                                        autoComplete='off'
                                        value={formData?.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <div className="input-group">
                                        <input
                                            style={{ borderRadius: "10px" }}
                                            type={showpassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter Your Password"
                                            autoComplete='off'
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
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
                                <div className="mt-4">
                                    <button
                                        className={`login-btn ${loading ? 'btn-loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading && loaders.small}
                                        {loading ? 'Signing In...' : 'Sign In'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 right-box">
                        <div className="glass-effect">
                            <img src={LoginLogo} alt="LoginLogo" className="img-fluid login-logo" draggable="false" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;