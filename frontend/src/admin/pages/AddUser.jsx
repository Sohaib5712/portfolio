import React, { useState, useEffect } from 'react';
import { AdminBar, TopBar } from '../components';
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext'

const AddUser = () => {
    const { project_user } = useAuthContext();

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'Admin',
    });
    const [editUser, setEditUser] = useState(null); // State to store the user being edited

    const API_URL = process.env.REACT_APP_BASE_API_URL;

    useEffect(() => {
        // Fetch user data from the backend
        fetch(`${API_URL}/api/project/all-user`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError('An error occurred while fetching user data');
                setLoading(false);
            });
    }, [API_URL]);

    const handleClose = () => {
        setFormData({
            username: '',
            role: 'Admin',
        });
        setIsModalOpen(false)
        setEditUser(false)
    }

    const handleEdit = (user) => {
        setEditUser(user);
        setFormData({
            username: user.username,
            role: user.role,
        });
        setIsModalOpen(true);
    };
    const handleDelete = (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) {
            return;
        }
        fetch(`${API_URL}/api/project/user/${userId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                setUserData(userData.filter(user => user._id !== userId));
                toast.success('User record deleted successfully!');
            })
            .catch((error) => {
                setError('An error occurred while deleting the user');
            });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);

        try {
            let response;
            if (editUser) {
                // If editUser is not null, it's an update
                response = await fetch(`${API_URL}/api/project/user/${editUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // It's a new user, so use POST
                response = await fetch(`${API_URL}/api/project/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (response.ok) {
                const updatedUser = await response.json();
                if (editUser) {
                    // If editing, update the existing user in the userData array
                    setUserData(userData.map(user => (user._id === updatedUser._id ? updatedUser : user)));
                } else {
                    // If adding a new user, add it to the list
                    setUserData([...userData, updatedUser]);
                }

                // Clear form and close the modal
                setFormData({
                    username: '',
                    role: 'Admin',
                });
                setIsModalOpen(false);
                toast.success(editUser ? 'User updated successfully!' : 'User added successfully!');
            } else {
                toast.error('Failed to submit the form');
            }
        } catch (error) {
            toast.error('An error occurred while submitting the form');
        } finally {
            setIsSubmit(false);
            setEditUser(null); // Clear the editUser state
        }
    };

    return (
        <div className='page'>
            <AdminBar />
            <div className="detail">
                <TopBar />
                {loading && (
                    <div className="loader"></div>
                )}
                <div className="content">
                    <Toaster position="top-right" />
                    <div className="body-header">
                        <h2>Add your boiz</h2>
                        <button className='project-button' onClick={() => setIsModalOpen(true)}>
                            <span>+Add User</span>
                        </button>
                    </div>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.length > 0 ? (
                                    userData.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.role}</td>
                                            <td className='action'>
                                                {project_user.user === user.username ?
                                                    'Owner'
                                                    :
                                                    <>
                                                        <button onClick={() => handleEdit(user)}><MdEdit color='var(--red-color)' /></button>
                                                        <button onClick={() => handleDelete(user._id)}><MdDelete color='var(--white-color)' /></button>
                                                    </>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) :
                                    <tr>
                                        <td colSpan="3" className="warning">Ops!!! Nothing found.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {error && (
                        <div className="error-message">{error}</div>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <div className="model-overlay">
                    <div className="model scale-up-center">
                        <div className="model-header">
                            <h3>{editUser ? 'Edit User' : 'Add User'}</h3>
                            <AiOutlineClose size={24} className='close' onClick={handleClose} />
                        </div>
                        {isSubmit &&
                            <div className="loader"></div>
                        }
                        <form onSubmit={handleSubmit} className='project-form'>
                            <div className="model-body">
                                <div className="form-group">
                                    <label htmlFor="username">User Name</label>
                                    <input type="text" className="form-control" name="username" id="username" placeholder='User Name' value={formData.username} onChange={handleFormChange} required />
                                </div>
                                {!editUser &&
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" id="password" placeholder='Password' value={formData.password} onChange={handleFormChange} required />
                                    </div>
                                }
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select name="role" id="role" value={formData.role} onChange={handleFormChange} required>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className='project-submit' disabled={isSubmit}>{isSubmit ? 'Submitting' : (editUser ? 'Update User' : 'Add User')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default AddUser;
