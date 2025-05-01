import React, { useEffect, useState } from 'react';
import DataTableComponents from '../../components/data-Table/DataTableComponents';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa6';

import Delete from '../../components/modal/delete/Delete';

import { toast } from 'react-toastify';
import { CreatedDate } from '../../utils/DateTimeFormate';

const modal = {
    deleteNotification: false,
}

const Notification = () => {

    const navigate = useNavigate();

    const [notificationList, setNotificationList] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);

    const handleClose = () => {
        setModalShow(modal);
    }
    const GetNotificationList = async () => {
        setLoader(true);

        try {
            // const res = await Axios.get(apiendpoints.getScheduleNotification, authorizationHeaders());

            // if (res.data?.status) {
            //     setNotificationList(res.data.data);
            // }
            // else {
            //     toast.error(res.data?.message);
            // }

        } catch (err) {
            if (err.response?.status === 500) {
                setError(err.response.data.message);
            }
        } finally {
            setLoader(false);
        }
    }


    const handleDelete = async () => {
        handleClose();

        setIsDeleteLoading(true);

        try {
            // const res = await Axios.delete(apiendpoints.deleteScheduleNotification.replace(":id", deleteId), authorizationHeaders());

            // if (res.data?.status) {
            //     toast.success(res.data?.message);

            //     handleClose();
            //     GetNotificationList();
            //     setBlog((prev) => prev.filter((i) => i.id !== deleteId));
            // }
            // else {
            //     toast.error(res.data?.message);
            // }

        } catch (err) {
            console.error("Delete-Blog-Error++", err);
        } finally {
            setIsDeleteLoading(false);
        }
    }

    const columns = [
        {
            name: 'No.',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '80px',
            style: {
                margin: '10px 0'
            }
        },
        {
            name: 'Image',
            cell: (row) => (
                <img
                    src={row.image}
                    alt="Image"
                    className={`${row.image === null && 'rounded-circle'}`}
                    style={{
                        maxWidth: "60px",
                        maxHeight: "60px",
                        padding: '8px 0'
                    }}
                />
            ),
            maxWidth: "10%",
            minWidth: "100px",
        },
        {
            name: 'Title',
            cell: (row) => row.title || "-",
        },
        {
            name: 'Message',
            cell: (row) => row.message || "-",
        },
        {
            name: 'Type',
            cell: (row) => row.type || "-",
        },
        {
            name: 'Start Date',
            cell: (row) => row.startDate || "-",
        },
        {
            name: 'End Date',
            cell: (row) => row.endDate || "-",
        },
        {
            name: 'Time',
            cell: (row) => row.time,
        },
        {
            name: 'Status',
            cell: (row) => (
                <div className={`status ${row.status === "Active" ? "activate" : "deactivate"}`}>
                    {row.status === "Active" ? "Active" : "Inactive"}
                </div>
            ),
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-2"
                        onClick={() => {
                            navigate(`/admin/notification/view/${row?.id}`, { state: row });
                        }}
                    >
                        <FaEye />
                    </button>
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap ri-edit-box-line me-2"
                        onClick={() => {
                            navigate(`/admin/notification/edit/${row?.id}`, { state: row });
                        }}
                    ></button>
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover ri-delete-bin-line"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteNotification: true });
                            setDeleteId(row?.id);
                        }}
                    ></button>
                </div>
            ),
            width: '130px'
        },
    ];


    const filterNotification = notificationList.filter((i) => {
        const searchstr = `${i.title} ${i.message} ${i.type} ${i.startDate} ${i.endDate} ${i.time} ${i.status} ${CreatedDate(i.createdAt)}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterNotification.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };
    useEffect(() => {
        GetNotificationList()
    }, []);

    return (
        <>

            <section className="categorylist-section mt-4 mt-lg-4 mt-xl-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header pt-3">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h3 className="mb-0 page-title">
                                        Notification
                                    </h3>

                                    <button className="add-btn boreder-0" type="button"
                                        onClick={() => navigate('/admin/notification/create')}
                                    >
                                        + Create
                                    </button>
                                </div>
                            </div>

                            <div className="card-body table-responsive">
                                <div className="row mt-2 mb-2 justify-content-between">
                                    <div className="col-md-auto search ms-auto">
                                        <div className="dt-search d-flex align-items-center gap-1">
                                            <label htmlFor="dt-search-0" className='search-label'>
                                                Search:
                                            </label>
                                            <input
                                                type="search"
                                                className="form-control form-control-sm search"
                                                placeholder='Search..'
                                                id="dt-search-0"
                                                name='search'
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {
                                    error ? (
                                        <div className="text-center text-dark my-5" style={{ fontSize: '22px', fontWeight: '600' }}>
                                            {error}
                                        </div>
                                    ) : (
                                        <DataTableComponents
                                            columns={columns}
                                            currentPageData={currentPageData}
                                            loader={loader}
                                            filterDataLength={filterNotification.length || 0}
                                            perPage={perPage}
                                            handleRowsPerPageChange={handleRowsPerPageChange}
                                            handlePageChange={handlePageChange}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            { /* ----- Delete-Notification Modal ----- */}
            <Delete show={modalShow.deleteNotification} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="Notification" />

        </>
    )
}

export default Notification;