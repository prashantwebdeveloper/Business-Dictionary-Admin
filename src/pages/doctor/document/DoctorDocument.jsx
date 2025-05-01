import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from "../../../assets/images/back.png";
import UserImage from "../../../assets/images/user.jpg";

import { authorizationHeaders, Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';

const DoctorDocument = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState([]);

    const GetDoctorDocument = async (id) => {
        // setLoader(true);

        try {
            // const res = await Axios.get(apiendpoints.documentDoctor.replace(":id", id), authorizationHeaders());

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
        GetDoctorDocument(id);
    }, [id]);


    const degreeDocument = formData?.filter((i) => i.documentType === "degree");
    const licenseDocument = formData?.filter((i) => i.documentType === "license");


    return (
        <>

            <section className="categorylist-section my-4 my-lg-4 my-xl-5">
                <div className="edit-user document">
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
                                Document
                            </h2>
                        </div>

                        <div className="row g-3">
                            <div className='col-6'>
                                <h3 className="mb-3 mb-lg-4 title">Degree :-</h3>

                                {
                                    degreeDocument?.length > 0 ? (
                                        degreeDocument?.map((i, index) => {
                                            return (
                                                <>
                                                <div className="mb-3">
                                                    <a
                                                        href={i.document}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-primary pdf"
                                                    >
                                                        View Degree PDF
                                                    </a>
                                                </div>
                                                </>

                                            )
                                        })
                                    ) : (
                                        <div className='mt-4 mt-lg-5 no_document'>
                                            No Degree PDF
                                        </div>
                                    )
                                }

                            </div>

                            <div className='col-6'>
                                <h3 className="mb-3 mb-lg-4 title">License :-</h3>

                                {
                                    licenseDocument?.length > 0 ? (
                                        licenseDocument?.map((i, index) => {
                                            return (
                                                <div className="mb-3">
                                                    <a
                                                        href={i.document}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-primary pdf"
                                                    >
                                                        View License PDF
                                                    </a>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className='mt-4 mt-lg-5 no_document'>
                                            No License PDF
                                        </div>
                                    )
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default DoctorDocument;