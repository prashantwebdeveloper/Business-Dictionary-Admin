import React, { useEffect, useState } from 'react';
import DataTableComponents from '../../components/data-Table/DataTableComponents';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Delete from '../../components/modal/delete/Delete';

import { DeleteUserAccountFirebase, DeleteUserFirebase, GetUsersFirebase } from '../../firebase/services/user/UserServices';
import { toast } from 'react-toastify';

const modal = {
    deleteUser: false,
}

const initialState = {
    id: null,
    uid: null
}

const User = () => {

    const navigate = useNavigate();

    const [usersList, setUsersList] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteUser, setDeleteUser] = useState(initialState);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);

    const handleClose = () => {
        setModalShow(modal);
    }

    const GetUsersList = async () => {
        setLoader(true);

        try {
            const res = await GetUsersFirebase();
            console.log("Res-Users++", res);

            setUsersList(res);

        } catch (err) {
            console.error("Error-Res-Users", err);

            // if (err.response?.status === 500) {
            //     setError(err.response.data.message);
            // }
        } finally {
            setLoader(false);
        }
    }


    const handleDelete = async () => {
        setIsDeleteLoading(true);

        try {
            if (deleteUser.uid) {
                const resDelUserAcc = await DeleteUserAccountFirebase(deleteUser.uid);
                console.log("Res-Delete-User-Account++", resDelUserAcc);

                // if (resDelUserAcc) {
                //     const res = await DeleteUserFirebase(deleteUser.id);
                //     console.log("Res-Delete-Users++", res);

                //     setDeleteUser(initialState);
                //     handleClose();

                //     toast.success("user deleted successfully");
                //     GetUsersList();
                // }
            }
        }
        catch (err) {
            console.error("Error-Delete-Users", err);
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
            name: 'Name',
            cell: (row) => row.name || "-",
        },
        {
            name: 'Email',
            cell: (row) => row.email || "-",
        },
        {
            name: 'Password',
            cell: (row) => {
                const [isVisible, setIsVisible] = useState(false);

                const toggleVisibility = () => {
                    setIsVisible(!isVisible);
                };

                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>
                            {isVisible ? row.password : 'xxxxx'}
                        </span>
                        <button
                            type="button"
                            onClick={toggleVisibility}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007bff',
                                cursor: 'pointer',
                            }}
                        >
                            {isVisible ?
                                <FaRegEyeSlash size={20} style={{ color: 'rgb(108, 117, 125)' }} />
                                :
                                <FaRegEye size={20} style={{ color: 'rgb(108, 117, 125)' }} />
                            }
                        </button>
                    </div>
                )
            },
        },
        {
            name: 'Created Date',
            cell: (row) => row.createdAt || "-",
        },
        {
            name: 'Action',
            cell: (row) =>
            (
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap eye-icon me-2"
                        onClick={() => {
                            navigate(`/admin/user-details/${row?.id}`);
                        }}
                    >
                        <FaEye />
                    </button>
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover ri-delete-bin-line"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteUser: true });
                            setDeleteUser({
                                id: row?.id,
                                uid: row?.uid
                            });
                        }}
                    ></button>
                </div>
            ),
            width: '130px'
        },
    ];


    const filterUsers = usersList?.filter((i) => {
        const searchstr = `${i.name} ${i.email} ${i.password} ${i.createdAt}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterUsers?.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetUsersList();
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
                                        User
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
                                            filterDataLength={filterUsers?.length || 0}
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


            { /* ----- Delete-User Modal ----- */}
            <Delete show={modalShow.deleteUser} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="User" />

        </>
    );
}

export default User;
