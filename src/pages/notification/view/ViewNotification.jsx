// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// import BackIcon from "../../../assets/images/back.png";

// const ViewNotification = () => {

//     const { id } = useParams();
//     const { state } = useLocation();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         setFormData(state);
//     }, [state]);

//     return (
//         <>

//             <section className="categorylist-section mt-4 mt-lg-4 mt-xl-5">
//                 <div className="edit-user">
//                     <div className="row">
//                         <div className="">
//                             <h2 className="mb-0 title d-flex align-items-center">
//                                 <img
//                                     src={BackIcon}
//                                     alt="Back"
//                                     className="cursor-pointer me-3"
//                                     onClick={() => navigate(-1)}
//                                 />
//                                 View
//                             </h2>
//                         </div>

//                         <form className="row g-3">
//                             <div className="col-lg-12 col-md-12 col-12 mb-2">
//                                 <label htmlFor="title" className="form-label">
//                                     Title :
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     id="title"
//                                     className="form-control"
//                                     placeholder="Enter Title"
//                                     autoComplete='off'
//                                     value={formData.title || "-"}
//                                     readOnly
//                                 />
//                             </div>

//                             <div className="col-lg-12 col-md-12 col-12 mb-2">
//                                 <label htmlFor="message" className="form-label">
//                                     Message :
//                                 </label>
//                                 <textarea
//                                     type="text"
//                                     name="message"
//                                     id="message"
//                                     className="form-control"
//                                     placeholder="Enter Message"
//                                     autoComplete='off'
//                                     rows={4}
//                                     value={formData.message || "-"}
//                                     readOnly
//                                 />
//                             </div>

//                             <div className="col-lg-12 col-md-12 col-12 mb-2">
//                                 <label htmlFor="image" className="form-label">
//                                     Image :
//                                 </label>

//                                 <div className="mb-2 mt-2">
//                                     <img
//                                         src={formData?.image}
//                                         alt="Image"
//                                         className="img-thumbnail img-fluid"
//                                         style={{
//                                             maxWidth: "150px", maxHeight: "150px"
//                                         }}
//                                     />
//                                 </div>
//                             </div>


//                             <div className="col-lg-12 col-md-12 col-12 mb-2">
//                                 <label htmlFor="role" className="form-label">
//                                     Role :
//                                 </label>
//                                 <select
//                                     className="form-select"
//                                     name="role"
//                                     id="role"
//                                     value={formData.role}
//                                     readOnly
//                                 >
//                                     <option value="doctor">Doctor</option>
//                                     <option value="patient">Patient</option>
//                                 </select>
//                             </div>


//                             <div className="col-lg-12 col-md-12 col-12 mb-2">
//                                 <label htmlFor="status" className="form-label">
//                                     Status :
//                                 </label>
//                                 <div className="mt-2 d-flex">
//                                     <div className="form-check ps-0">
//                                         <input
//                                             type="radio"
//                                             name="status"
//                                             id="Active"
//                                             className="radio-check cursor-pointer"
//                                             value={"Active"}
//                                             checked={formData.status === "Active"}
//                                             readOnly
//                                         />
//                                         <label className="form-label radio-label cursor-pointer" htmlFor="Active">
//                                             Active
//                                         </label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             name="status"
//                                             id="Inactive"
//                                             className="radio-check cursor-pointer"
//                                             value={"Inactive"}
//                                             checked={formData.status === "Inactive"}
//                                             readOnly
//                                         />
//                                         <label className="form-label radio-label cursor-pointer" htmlFor="Inactive">
//                                             Inactive
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>

//                     </div>
//                 </div>
//             </section>

//         </>
//     )
// }

// export default ViewNotification;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackIcon from "../../../assets/images/back.png";
import { ConvertTo24HourFormat } from '../../../utils/DateTimeFormate';

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

const ViewNotification = () => {

    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData({
            id: state.id,
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
                                View
                            </h2>
                        </div>

                        <form className="row g-3" >
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
                                    readOnly
                                />
                            </div>

                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="message" className="form-label">
                                    Message :
                                </label>
                                <textarea
                                    type="text"
                                    name="message"
                                    id="message"
                                    className="form-control"
                                    placeholder="Enter Message"
                                    autoComplete='off'
                                    rows={4}
                                    value={formData.message}
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

                            <div className="col-lg-12 col-md-12 col-12 mb-2">
                                <label htmlFor="type" className="form-label">
                                    Type :
                                </label>
                                <select
                                    className="form-select"
                                    name="type"
                                    id="type"
                                    value={formData.type}
                                    disabled
                                >
                                    <option value="">Select Type</option>
                                    <option value="Singleday">Single Day</option>
                                    <option value="Everyday">Every Day</option>
                                </select>
                            </div>

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
                                    readOnly
                                />
                            </div>

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
                                    readOnly
                                />
                            </div>


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
                                    readOnly
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
                                            id="Inactive"
                                            className="radio-check cursor-pointer"
                                            value={"Inactive"}
                                            checked={formData.status === "Inactive"}
                                            readOnly
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
                                    readOnly
                                />
                            </div>


                            {/* <div className="col-md-12 text-end">
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
                            </div> */}
                        </form>

                    </div>
                </div>
            </section>

        </>
    )
}

export default ViewNotification;