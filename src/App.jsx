import './css/App.css';
import './css/Sidebar.css';

import { Route, Routes } from 'react-router-dom';

import { AuthLayout, DefaultLayout } from './components/layout/Layout';
// Login
import Login from './pages/login/Login';
// Dashboard
import Dashboard from './pages/dashboard/Dashboard';
// User
import User from './pages/users/User';
import UserDetails from './pages/users/details/UserDetails';
// Category
import Category from './pages/category/Category';
import CreateCategory from './pages/category/create/CreateCategory';
import EditCategory from './pages/category/edit/EditCategory';
import ViewCategory from './pages/category/view/ViewCategory';
// Subscription
import Subscription from './pages/subscription/Subscription';

function App() {
    return (
        <>

            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/' element={<Login />} />
                </Route>

                <Route element={<DefaultLayout />}>
                    <Route path='/admin/dashboard' element={<Dashboard />} />

                    {/* User */}
                    <Route path='/admin/user' element={<User />} />
                    <Route path='/admin/user-details/:id' element={<UserDetails />} />

                    {/* Category */}
                    <Route path='/admin/category' element={<Category />} />
                    <Route path='/admin/category/create' element={<CreateCategory />} />
                    <Route path='/admin/category/edit/:id' element={<EditCategory />} />
                    <Route path='/admin/category/view/:id' element={<ViewCategory />} />

                    {/* Subscription */}
                    <Route path='/admin/subscription' element={<Subscription />} />
                </Route>
            </Routes>

        </>
    )
}

export default App;