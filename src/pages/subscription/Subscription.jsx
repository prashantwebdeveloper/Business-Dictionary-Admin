import React, { useEffect, useState } from 'react';
import DataTableComponents from '../../components/data-Table/DataTableComponents';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa6';

import Delete from '../../components/modal/delete/Delete';

import { DeleteSubscriptionFirebase, GetSubscriptionFirebase } from '../../firebase/services/subscription/SubscriptionServices';
import { toast } from 'react-toastify';

const modal = {
    deleteSubscription: false,
}

const initialState = {
    id: null
}

const Subscription = () => {

    const navigate = useNavigate();

    const [subscriptionList, setSubscriptionList] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteSubscription, setDeleteSubscription] = useState(initialState);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);

    const handleClose = () => {
        setModalShow(modal);
    }

    const GetSubscriptionList = async () => {
        setLoader(true);

        try {
            const res = await GetSubscriptionFirebase();
            console.log("Res-Subscription++", res);

            setSubscriptionList(res);

        } catch (err) {
            console.error("Error-Res-Subscription", err);
        } finally {
            setLoader(false);
        }
    }

    const handleDelete = async () => {
        setIsDeleteLoading(true);

        try {
            const res = await DeleteSubscriptionFirebase(deleteSubscription.id);
            console.log("Res-Delete-Subscription++", res);

            setDeleteSubscription(initialState);
            handleClose();

            toast.success("subscription deleted successfully");
            GetSubscriptionList();
        }
        catch (err) {
            console.error("Error-Delete-Subscription", err);
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
            name: 'Email',
            cell: (row) => row.email || "-",
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
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover ri-delete-bin-line"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteSubscription: true });
                            setDeleteSubscription({
                                id: row?.id,
                            });
                        }}
                    ></button>
                </div>
            ),
            width: '130px'
        },
    ];


    const filterSubscription = subscriptionList?.filter((i) => {
        const searchstr = `${i.email} ${i.createdAt}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterSubscription?.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetSubscriptionList();
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
                                        Subscription
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
                                            filterDataLength={filterSubscription?.length || 0}
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


            { /* ----- Delete-Subscription Modal ----- */}
            <Delete show={modalShow.deleteSubscription} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="Subscription" />

        </>
    );
}

export default Subscription;
