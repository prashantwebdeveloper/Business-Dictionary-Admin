import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from "../../../assets/images/back.png";
import UserImage from "../../../assets/images/user.jpg";

import { authorizationHeaders, Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';

const DoctorDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const GetDoctorDetails = async (id) => {
        // setLoader(true);

        try {
            // const res = await Axios.get(apiendpoints.viewDoctor.replace(":id", id), authorizationHeaders());

            // if (res.data?.status) {
            //     setFormData(res.data.data);
            // }
            // else {
            //     toast.error(res.data?.message);
            // }

        } catch (err) {
            if (err.response?.status === 500) {
                // setError(err.response.data.message);
            }
        } finally {
            // setLoader(false);
        }
    }

    useEffect(() => {
        GetDoctorDetails(id);
    }, [id]);


    return (
        <>

            <section className="categorylist-section my-4 my-lg-4 my-xl-5">
                <div className="edit-user">
                    <div className="row">
                        {/* <div className="d-flex align-items-center justify-content-between gap-3">
                            <h2 className="d-flex mb-0 title">
                                <div className='pe-4' style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                                    <img src={left} alt="" style={{ height: '30px' }} />
                                </div>
                                <div>
                                    Doctor Detail
                                </div>
                            </h2>
                        </div> */}

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
                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className='d-flex'>
                                        <div>
                                            <img
                                                src={formData?.image === null ? UserImage : formData?.image}
                                                alt="Images"
                                                className="img-thumbnail img-fluid"
                                                style={{
                                                    marginBottom: "10px", background: "none", borderRadius: '50%', height: '100px', width: '100px'
                                                }}
                                            />
                                        </div>
                                        {/* <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column', marginTop: '30px', marginLeft: '20px' }}>
                                            <span style={{ fontSize: '22px', color: '#000', marginBottom: '12px', fontWeight: '600' }}>{formData?.name}</span>
                                            <span style={{ fontSize: '14px' }}>{formData?.mobileNumber}</span>
                                        </div> */}
                                    </div>

                                    {/* <div>
                                        <div className={`status ${formData.status === "Active" ? "activate" : "deactivate"}`} style={{ height: '40px' }}>
                                            {formData.status === "Active" ? "Active" : "Inactive"}
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-12 mb-2">
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

                            <div className="col-lg-4 col-md-6 col-12 mb-2">
                                <label htmlFor="gender" className="form-label">
                                    Gender :
                                </label>
                                <input
                                    type="text"
                                    name="gender"
                                    id="gender"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.gender || "-"}
                                    readOnly
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-12 mb-2">
                                <label htmlFor="dateOfBirth" className="form-label">
                                    Birth Date :
                                </label>
                                <input
                                    type="text"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.dateOfBirth || "-"}
                                    readOnly
                                />
                            </div>


                            <div className="col-lg-6 col-md-6 col-12 mb-2">
                                <label htmlFor="address" className="form-label">
                                    Address :
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.address || "-"}
                                    readOnly
                                />
                            </div>

                            <div className="col-lg-3 col-md-6 col-12 mb-2">
                                <label htmlFor="country" className="form-label">
                                    Country :
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.country || "-"}
                                    readOnly
                                />
                            </div>

                            <div className="col-lg-3 col-md-6 col-12 mb-2">
                                <label htmlFor="city" className="form-label">
                                    City :
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.city || "-"}
                                    readOnly
                                />
                            </div>

                            <div className="col-lg-12 col-md-6 col-12 mb-2">
                                <label htmlFor="jobTitle" className="form-label">
                                    Job Title :
                                </label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    id="jobTitle"
                                    className="form-control"
                                    autoComplete='off'
                                    value={formData?.jobTitle || "-"}
                                    readOnly
                                />
                            </div>

                            {/* <div className="col-lg-4 col-md-6 col-12 mb-2">
                                <label htmlFor="qualification" className="form-label">
                                    Qualification & Degree :
                                </label>
                                <input
                                    type="text"
                                    name="qualification"
                                    id="qualification"
                                    className="form-control"
                                    autoComplete='off'
                                    // value={formData?.country}
                                    readOnly
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-12 mb-2">
                                <label htmlFor="license" className="form-label">
                                    License :
                                </label>
                                <input
                                    type="text"
                                    name="license"
                                    id="license"
                                    className="form-control"
                                    autoComplete='off'
                                    // value={formData?.country}
                                    readOnly
                                />
                            </div> */}

                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="experience" className="form-label">
                                    Experience:
                                </label>

                                <textarea
                                    type="text"
                                    name="experience"
                                    id="experience"
                                    className="form-control"
                                    autoComplete='off'
                                    rows={4}
                                    value={formData?.experience || "-"}
                                    readOnly
                                />
                            </div>

                            {/* <div className="col-lg-4 col-md-6 col-12 mb-2">
                                <label htmlFor="daytime" className="form-label">
                                    Available Day & Time :
                                </label>
                                <input
                                    type="text"
                                    name="daytime"
                                    id="daytime"
                                    className="form-control"
                                    autoComplete='off'
                                    // value={formData?.country}
                                    readOnly
                                />
                            </div> */}

                            {/* <div className="col-md-12 text-end">
                                <button type="button" className="close-btn" onClick={() => navigate(-1)}>
                                    Back
                                </button>
                            </div> */}
                        </form>

                    </div>
                </div>
            </section>

        </>
    )
}

export default DoctorDetails;