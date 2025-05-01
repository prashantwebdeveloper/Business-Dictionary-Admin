import React, { useEffect, useState } from 'react';
import DataTableComponents from '../../components/data-Table/DataTableComponents';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Delete from '../../components/modal/delete/Delete';

import { DeleteCategoryFirebase, GetCategoryFirebase } from '../../firebase/services/category/CategoryServices';
import { toast } from 'react-toastify';

const modal = {
    deleteCategory: false,
}

const initialState = {
    id: null
}

const Category = () => {

    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(initialState);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Offcanvas / Modal
    const [modalShow, setModalShow] = useState(modal);

    const handleClose = () => {
        setModalShow(modal);
    }

    const GetCategoryList = async () => {
        setLoader(true);

        try {
            const res = await GetCategoryFirebase();
            console.log("Res-Category++", res);

            setCategoryList(res);

        } catch (err) {
            console.error("Error-Res-Category", err);
        } finally {
            setLoader(false);
        }
    }


    const handleDelete = async () => {
        setIsDeleteLoading(true);

        try {
            const res = await DeleteCategoryFirebase(deleteCategory.id);
            console.log("Res-Delete-Category++", res);

            setDeleteCategory(initialState);
            handleClose();

            toast.success("category deleted successfully");
            GetCategoryList();
        }
        catch (err) {
            console.error("Error-Delete-Category", err);

            // if (err.response?.status === 500) {
            //     toast.error(err.response.data.message);
            // }
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
            name: 'Category',
            cell: (row) => row.category || "-",
        },
        {
            name: 'Status',
            cell: (row) => (
                <div className={`status ${row.status === "active" ? "activate" : "deactivate"}`}>
                    {row.status === "active" ? "Active" : "Deactive"}
                </div>
            ),
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
                            navigate(`/admin/category/view/${row?.id}`);
                        }}
                    >
                        <FaEye />
                    </button>
                    <button type="button" className="btn btn-sm btn-neutral text-nowrap ri-edit-box-line me-2"
                        onClick={() => {
                            navigate(`/admin/category/edit/${row?.id}`, { state: row });
                        }}
                    ></button>
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover ri-delete-bin-line"
                        onClick={() => {
                            setModalShow({ ...modalShow, deleteCategory: true });
                            setDeleteCategory({
                                id: row?.id,
                            });
                        }}
                    ></button>
                </div>
            ),
            width: '130px'
        },
    ];


    const filterCategory = categoryList?.filter((i) => {
        const searchstr = `${i.category} ${i.status} ${i.createdAt}`.toLowerCase();

        return searchstr.includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filterCategory?.slice(startIndex, startIndex + perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        GetCategoryList();
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
                                        Category
                                    </h3>


                                    <button className="add-btn boreder-0" type="button"
                                        onClick={() => navigate('/admin/category/create')}
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
                                            filterDataLength={filterCategory?.length || 0}
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


            { /* ----- Delete-Category Modal ----- */}
            <Delete show={modalShow.deleteCategory} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="Category" />

        </>
    );
}

export default Category;
