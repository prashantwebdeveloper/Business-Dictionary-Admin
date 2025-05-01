import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackIcon from "../../../assets/images/back.png";
import { loaders } from '../../../components/loader/Loader';

import { DeleteCategoryImageKit, PostCategoryImageKit } from '../../../imageKit/services/category/CategoryServices';
import { PutCategoryFirebase } from '../../../firebase/services/category/CategoryServices';
import { toast } from 'react-toastify';

const initialState = {
    image: null,
    imageFileId: "",
    category: "",
    status: "active"
}

const EditCategory = () => {

    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [imageShow, setImageShow] = useState(state?.image);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));


        if (files) {
            setImageShow(URL.createObjectURL(files[0]));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let imageUrl = formData.image;
        let fileId = formData.imageFileId;
        try {
            if (typeof formData.image === 'object') {
                if (formData.imageFileId) {
                    const resDelImg = await DeleteCategoryImageKit(formData.imageFileId);

                    if (resDelImg?.$ResponseMetadata?.statusCode === 204) {
                        const resImg = await PostCategoryImageKit(formData.image);
                        console.log("Res-ImageKit++", resImg);

                        if (resImg?.$ResponseMetadata?.statusCode === 200) {
                            imageUrl = resImg?.url;
                            fileId = resImg?.fileId;
                        }
                    }
                }
            }


            const categoryData = {
                ...formData,
                image: imageUrl,
                imageFileId: fileId,
                createdAt: state.createdAt,
                updatedAt: state.updatedAt,
            }

            const res = await PutCategoryFirebase(id, categoryData);
            console.log("Res-Category++", res);

            if (res?.success) {
                toast.success("category updated successfully");
                setFormData(initialState);

                navigate("/admin/category");
            }

        } catch (err) {
            console.error("Error-Category", err);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setFormData({
            image: state?.image || null,
            imageFileId: state?.imageFileId || "",
            category: state?.category || "",
            status: state?.status,
        });

        setImageShow(state?.image);
    }, [state]);

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
                                Edit
                            </h2>
                        </div>

                        <form className="row g-3" onSubmit={handleSubmit}>
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
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="image" className="form-label">
                                    Image :
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="form-control"
                                    onChange={handleChange}
                                    // required
                                    accept='image/*'
                                />
                                {imageShow && (
                                    <div className="mb-2 mt-2">
                                        <img
                                            src={imageShow}
                                            alt="Image"
                                            className="img-thumbnail img-fluid"
                                            style={{
                                                maxWidth: "150px", maxHeight: "150px"
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-lg-12 col-md-12 col-12 mb-2">
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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
                                        />
                                        <label className="form-label radio-label cursor-pointer" htmlFor="Deactive">
                                            Deactive
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 text-end">
                                <button
                                    type="submit"
                                    className={`submit-btn ${loading ? 'btn-loading' : ''}`}
                                    disabled={loading}>
                                    {loading && loaders.small}
                                    {loading ?
                                        'Updating...'
                                        :
                                        'Update'
                                    }
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </section>

        </>
    );
}

export default EditCategory;
