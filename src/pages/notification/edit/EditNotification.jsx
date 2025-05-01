import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackIcon from "../../../assets/images/back.png";

import { toast } from 'react-toastify';
import { loaders } from '../../../components/loader/Loader';
import { ConvertTo24HourFormat, FormatTimeTo12Hour } from '../../../utils/DateTimeFormate';

const initialState = {
    id: "",
    title: "",
    message: "",
    image: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    time: "",
    status: ""
}

const EditNotification = () => {

    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const [imageShow, setImageShow] = useState(state.image);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        if (files) {
            setImageShow(URL.createObjectURL(files[0]));
        }
        else if (name === "type") {
            setFormData((prev)=> ({ 
                ...prev,
                startDate: "",
                endDate: "",
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const Data = {
                ...formData,
                time: FormatTimeTo12Hour(formData.time),
                endDate: formData.type === "Singleday" ? formData.startDate : formData.endDate,
            }

            // const res = await Axios.put(apiendpoints.editScheduleNotification, Data, authorizationHeadersImage());

            // if (res.data?.status) {
            //     toast.success(res.data?.message);
            //     setFormData(initialState);
            //     navigate("/admin/notification");
            // }
            // else {
            //     toast.error(res.data?.message);
            // }

        } catch (err) {
            if (err.response?.status === 500) {
                toast.error(err.response.data.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setFormData({
            id: id,
            title: state.title,
            message: state.message,
            image: state.image,
            description: state.description,
            type: state.type,
            startDate: state.startDate,
            endDate: state.endDate,
            time: state.time ? ConvertTo24HourFormat(state.time) : "",
            status: state.status
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
                                <label htmlFor="title" className="form-label">
                                    Title :
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    autoComplete='off'
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="message" className="form-label">
                                    Message :
                                </label>
                                {/* <textarea
                                    type="text"
                                    name="message"
                                    id="message"
                                    className="form-control"
                                    placeholder="Enter Message"
                                    autoComplete='off'
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                /> */}

                                <input
                                    type="text"
                                    name="message"
                                    id="message"
                                    className="form-control"
                                    placeholder="Enter message"
                                    autoComplete='off'
                                    value={formData.message}
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
                                <label htmlFor="type" className="form-label">
                                    Type :
                                </label>
                                <select
                                    className="form-select"
                                    name="type"
                                    id="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Singleday">Single Day</option>
                                    <option value="Everyday">Every Day</option>
                                </select>
                            </div>

                            {
                                (formData.type === "Singleday" || formData.type === "Everyday") && (
                                    <div className="col-lg-6 col-md-12 col-12 mb-2">
                                        <label htmlFor="startDate" className="form-label">
                                            Start Date :
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            className="form-control"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            required
                                            min={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                )
                            }

                            {
                                formData.type === "Everyday" && (
                                    <div className="col-lg-6 col-md-12 col-12 mb-2">
                                        <label htmlFor="endDate" className="form-label">
                                            End Date :
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            className="form-control"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            required
                                            min={formData.startDate || new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                )
                            }


                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="time" className="form-label">
                                    Time :
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    id="time"
                                    className="form-control"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                />
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
                                            value={"Active"}
                                            checked={formData.status === "Active"}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-label radio-label cursor-pointer" htmlFor="Active">
                                            Active
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="status"
                                            id="Inactive"
                                            className="radio-check cursor-pointer"
                                            value={"Inactive"}
                                            checked={formData.status === "Inactive"}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-label radio-label cursor-pointer" htmlFor="Inactive">
                                            Inactive
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="description" className="form-label">
                                    Description :
                                </label>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="Enter Description"
                                    autoComplete='off'
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="col-md-12 text-end">
                                <button
                                    type="submit"
                                    className={`submit-btn ${loading ? 'btn-loading' : ''}`}
                                    disabled={loading}
                                >
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
    )
}

export default EditNotification;