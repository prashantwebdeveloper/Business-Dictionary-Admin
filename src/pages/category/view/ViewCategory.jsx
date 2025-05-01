import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from "../../../assets/images/back.png";

import { GetCategoryDetailsFirebase } from '../../../firebase/services/category/CategoryServices';
import { toast } from 'react-toastify';

const ViewCategory = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const GetCategoryDetails = async (Id) => {
        // setLoader(true);

        try {
            const res = await GetCategoryDetailsFirebase(Id);
            console.log("Res-Category-Details++", res);

            setFormData(res);
        } catch (err) {
            console.error("Error-Category-Details", err);
        } finally {
            // setLoader(false);
        }
    }

    useEffect(() => {
        GetCategoryDetails(id);
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
                                />
                                View
                            </h2>
                        </div>

                        <form className="row g-3" >
                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="category" className="form-label">
                                    Category :
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    className="form-control"
                                    placeholder="Enter Category"
                                    autoComplete='off'
                                    value={formData?.category}
                                    readOnly
                                />
                            </div>

                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="image" className="form-label">
                                    Image :
                                </label>
                                {formData.image && (
                                    <div className="mb-2 mt-2">
                                        <img
                                            src={formData?.image}
                                            alt="Image"
                                            className="img-thumbnail img-fluid"
                                            style={{
                                                maxWidth: "150px", maxHeight: "150px"
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-lg-6 " >
                                <label htmlFor="status" className="form-label">
                                    Status :
                                </label>
                                <div className={`status ${formData.status === "active" ? "activate" : "deactivate"}`} style={{ height: '40px' }}>
                                    {formData.status === "active" ? "Active" : "Deactive"}
                                </div>
                            </div>

                            {/* <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="status" className="form-label">
                                    Status :
                                </label>
                                <div className="mt-2 d-flex">
                                    <div className="form-check ps-0">
                                        <input
                                            type="radio"
                                            name="status"
                                            id="Active"
                                            className="radio-check cursor-pointer"
                                            value={"active"}
                                            checked={formData.status === "active"}
                                            readOnly
                                        />
                                        <label className="form-label radio-label cursor-pointer" htmlFor="Active">
                                            Active
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="status"
                                            id="Deactive"
                                            className="radio-check cursor-pointer"
                                            value={"deactive"}
                                            checked={formData.status === "deactive"}
                                            readOnly
                                        />
                                        <label className="form-label radio-label cursor-pointer" htmlFor="Deactive">
                                            Deactive
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                        </form>

                    </div>
                </div>
            </section>

        </>
    );
}

export default ViewCategory;
