import React, { useEffect, useState } from 'react'
import DataTableComponents from '../../components/data-Table/DataTableComponents';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaFilePdf } from 'react-icons/fa6';
import { IoDocumentText, IoDocumentTextOutline } from "react-icons/io5";

import UserImage from "../../assets/Images/user.jpg";

import Delete from '../../components/modal/delete/Delete';

import { CreatedDate } from '../../utils/DateTimeFormate';
import { authorizationHeaders, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';
import doc from "../../assets/images/google-docs.png"

const modal = {
    deleteDoctor: false,
}

const Doctor = () => {

    const navigate = useNavigate();

    const [doctorList, setDoctorList] = useState([]);
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


    const GetDoctor = async () => {
        setLoader(true);

        try {
            // const res = await Axios.get(apiendpoints.getDoctor, authorizationHeaders());

            // if (res.data?.status) {
            //     setDoctorList(res.data.data);
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
        setIsDeleteLoading(true);

        try {
            // const res = await Axios.delete(apiendpoints.deleteDoctor.replace(":id", deleteId), authorizationHeaders());

            // if (res.data?.status) {
            //     toast.success(res.data?.message);

            //     handleClose();
            //     // GetDoctor();

            //     setDoctorList((prev) => prev.filter((i) => i.id !== deleteId));
            // }
            // else {
            //     toast.error(res.data?.message);
            // }

        }
        catch (err) {
            if (err.response?.status === 500) {
                toast.error(err.response.data.message);
            }
        }
        finally {
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
                    src={row.image === null ? UserImage : row.image}
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
            name: 'Name',
            cell: (row) => row.name || "-",
            maxWidth: "30%",
            minWidth: "130px",
        },
        {
            name: 'Mobile',
            cell: (row) => row.mobileNumber,
            // minWidth: "80px",
        },
        {
            name: 'Gender',
            cell: (row) => row.gender || "-",
            // minWidth: "80px",
        },
        {
            name: 'Created Date',
            cell: (row) => (
                CreatedDate(row.createdAt)
            ),
            // minWidth: "80px",
        },
        {
            name: 'Document',
            cell: (row) => (
                <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon "
                    onClick={() => {
                        navigate(`/admin/doctor-document/${row?.id}`);
                    }}
                >
                    <FaFilePdf />
                </button>

            ),
            // minWidth: "80px",
        },
        {
            name: 'Status',
            cell: (row) => (
                <div className={`status ${row.status === "Active" ? "activate" : "deactivate"}`}>
                    {row.status === "Active" ? "Active" : "Inactive"}
                </div>

                // <InputSwitch
                //     checked={row.status === "Active"}
                //     onChange={() => handleStatusChange(row?.id)}
                // />
            ),
            maxWidth: "8%",
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-2"
                        onClick={() => {
                            navigate(`/admin/doctor-details/${row?.id}`);
                        }}
                    >
                        <FaEye />
                    </button>
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover ri-delete-bin-line"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteDoctor: true });
                            setDeleteId(row?.id);
                        }}
                    ></button>
                </div>
            ),
            width: '130px'
        },
    ];


    const filterDoctor = doctorList.filter((i) => {
        const searchstr = `${i.name} ${i.mobileNumber} ${i.gender} ${i.status} ${CreatedDate(i.createdAt)}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterDoctor.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetDoctor();
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
                                        Doctor
                                    </h3>

                                    <div className="search d-flex align-items-center gap-1">
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

                            <div className="card-body table-responsive">
                                {/* <div className="row mt-2 mb-2 justify-content-between">
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
                                </div> */}

                                {
                                    error ? (
                                        <div className="text-center text-dark my-5" style={{ fontSize: '22px', fontWeight: '600' }}>
                                            {error}
                                        </div>
                                    ) : (
                                        // <DataTable
                                        //     columns={columns}
                                        //     data={currentPageData}
                                        //     progressPending={loader}
                                        //     progressComponent={loaders.table}
                                        //     noDataComponent={loaders.noDataTable}
                                        //     pagination
                                        //     paginationServer
                                        //     paginationTotalRows={filterDoctor.length}
                                        //     paginationPerPage={perPage}
                                        //     onChangeRowsPerPage={handleRowsPerPageChange}
                                        //     onChangePage={handlePageChange}
                                        //     customStyles={customStyles}
                                        // // theme='blackTheme'
                                        // />

                                        <DataTableComponents
                                            columns={columns}
                                            currentPageData={currentPageData}
                                            loader={loader}
                                            filterDataLength={filterDoctor.length || 0}
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


            { /* ----- Delete-Doctor Modal ----- */}
            <Delete show={modalShow.deleteDoctor} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="Doctor" />
        </>
    )
}

export default Doctor;