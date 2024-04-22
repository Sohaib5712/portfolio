import React, { useState, useEffect } from 'react';
import { AdminBar, TopBar } from '../components';
import "./admin.css";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';

const Projects = () => {
    const { project_user } = useAuthContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isModel, setIsModel] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [projects, setProjects] = useState([]);
    const [projectData, setProjectData] = useState({
        projectName: '',
        projectType: '',
        projectUrl: '',
        userName: project_user.user,
        images: [],
        sections: [{ heading: '', detail: '' }],
        keyPoints: [''],
        tools: [''],
    });

    const API_URL = process.env.REACT_APP_BASE_API_URL;
    useEffect(() => {
        return () => {
            projectData.images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [projectData.images]);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/project/userProject/${project_user.user}`);
                if (response.ok) {
                    const projectsData = await response.json();
                    setProjects(projectsData);
                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [API_URL, project_user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };
    const handleImageUpload = (e) => {
        const images = Array.from(e.target.files);
        setProjectData({ ...projectData, images: [...projectData.images, ...images] });
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...projectData.images];
        updatedImages.splice(index, 1);
        setProjectData({ ...projectData, images: updatedImages });
    };

    const handleSectionAdd = () => {
        const newSection = { heading: '', detail: '' };
        setProjectData({ ...projectData, sections: [...projectData.sections, newSection] });
    };

    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...projectData.sections];
        updatedSections[index][field] = value;
        setProjectData({ ...projectData, sections: updatedSections });
    };

    const handleSectionRemove = (index) => {
        const updatedSections = [...projectData.sections];
        updatedSections.splice(index, 1);
        setProjectData({ ...projectData, sections: updatedSections });
    };

    const handleKeyPointAdd = () => {
        const newKeyPoint = '';
        setProjectData({ ...projectData, keyPoints: [...projectData.keyPoints, newKeyPoint] });
    };

    const handleKeyPointChange = (index, value) => {
        const updatedKeyPoints = [...projectData.keyPoints];
        updatedKeyPoints[index] = value;
        setProjectData({ ...projectData, keyPoints: updatedKeyPoints });
    };

    const handleKeyPointRemove = (index) => {
        const updatedKeyPoints = [...projectData.keyPoints];
        updatedKeyPoints.splice(index, 1);
        setProjectData({ ...projectData, keyPoints: updatedKeyPoints });
    };

    const handleToolAdd = () => {
        const newTool = '';
        setProjectData({ ...projectData, tools: [...projectData.tools, newTool] });
    };

    const handleToolChange = (index, value) => {
        const updatedTools = [...projectData.tools];
        updatedTools[index] = value;
        setProjectData({ ...projectData, tools: updatedTools });
    };

    const handleToolRemove = (index) => {
        const updatedTools = [...projectData.tools];
        updatedTools.splice(index, 1);
        setProjectData({ ...projectData, tools: updatedTools });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('projectName', projectData.projectName);
            formData.append('projectType', projectData.projectType);
            formData.append('userName', projectData.userName);
            formData.append('projectUrl', projectData.projectUrl);

            projectData.images.forEach((image, index) => {
                formData.append('images', image);
            });

            projectData.sections.forEach((section, index) => {
                formData.append(`sections[${index}][heading]`, section.heading);
                formData.append(`sections[${index}][detail]`, section.detail);
            });

            projectData.keyPoints.forEach((keyPoint, index) => {
                formData.append(`keyPoints[${index}]`, keyPoint);
            });

            projectData.tools.forEach((tool, index) => {
                formData.append(`tools[${index}]`, tool);
            });

            let apiUrl = `${API_URL}/api/project/newProject`;
            let method = 'POST';

            if (isEditing) {
                apiUrl = `${API_URL}/api/project/updateProject/${editingProjectId}`;
                method = 'PUT';
            }

            const response = await fetch(apiUrl, {
                method: method,
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                if (isEditing) {
                    const updatedProjects = projects.map((project) =>
                        project._id === editingProjectId ? responseData : project
                    );
                    setProjects(updatedProjects);
                    toast.success('Project updated successfully');
                } else {
                    setProjects([...projects, responseData]);
                    toast.success('Project added successfully');
                }
                setIsModel(false);
            } else {
                toast.error(
                    `Failed to ${isEditing ? 'update' : 'add'} project, please try again.`
                );
            }
        } catch (error) {
            console.error(
                `Error ${isEditing ? 'updating' : 'adding'} project:`,
                error.message
            );
            toast.error(
                `Something went wrong while ${isEditing ? 'updating' : 'adding'} the project.`
            );
        } finally {
            setIsLoading(false);
            setProjectData({
                projectName: '',
                projectType: '',
                projectUrl: '',
                images: [],
                sections: [{ heading: '', detail: '' }],
                keyPoints: [''],
                tools: [''],
            });
            setIsEditing(false);
            setEditingProjectId(null);
        }
    };

    const handleDelete = async (projectId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this project?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${API_URL}/api/project/delProject/${projectId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setProjects(projects.filter(project => project._id !== projectId));
                    toast.success('Project deleted successfully');
                } else {
                    toast.error('Failed to delete project, please try again.');
                }
            } catch (error) {
                console.error('Error deleting project:', error.message);
                toast.error('Something went wrong while deleting the project.');
            }
        }
    };

    return (
        <div className="page">
            <AdminBar />
            <div className="detail">
                <TopBar />
                {isLoading && (
                    <div className="loading-bar"></div>
                )}
                <div className="content">
                    <Toaster position="top-right" />
                    <div className="body-header">
                        <h2>Fake Project's</h2>
                        <button className='project-button' onClick={() => setIsModel(true)}>
                            <span>Add Project</span>
                        </button>
                    </div>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Project Image</th>
                                    <th>Project Name</th>
                                    <th>Project Type</th>
                                    <th>Project Section</th>
                                    <th>Project Tools</th>
                                    <th>Project Key Point</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id}>
                                        <td><img src={project.images[0]} alt="" /></td>
                                        <td>{project.projectName}</td>
                                        <td>{project.projectType}</td>
                                        <td>
                                            <ul>
                                                <li>
                                                    <b>
                                                        {project.sections[0]?.heading}
                                                    </b>
                                                </li>
                                                <li>
                                                    {project.sections[0]?.detail && project.sections[0].detail.length > 20
                                                        ? `${project.sections[0].detail.substring(0, 20)}...`
                                                        : project.sections[0]?.detail}
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul>
                                                {project.tools.map((tool, index) => (
                                                    <li key={index}>{tool}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <ul>
                                                {project.keyPoints.map((keyPoint, index) => (
                                                    <li key={index}>{keyPoint}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="action">
                                            <button><MdEdit color='var(--yellow-color)' onClick={() => {
                                                setIsEditing(true);
                                                setEditingProjectId(project._id);
                                                setProjectData({
                                                    projectName: project.projectName,
                                                    userName: project.userName,
                                                    projectType: project.projectType,
                                                    images: project.images,
                                                    sections: project.sections,
                                                    keyPoints: project.keyPoints,
                                                    tools: project.tools,
                                                });
                                                setIsModel(true);
                                            }} /></button>
                                            <button onClick={() => handleDelete(project._id)}>
                                                <MdDelete color='var(--red-color)' />
                                            </button>
                                            <button><FaEye color='var(--white-color)' /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* add-project modal form */}
            {isModel &&
                <div className="model-overlay">
                    <div className="model scale-up-center">
                        <div className="model-header">
                            {isEditing ? 'Update Project' : 'Add Project'}
                            <IoMdClose size={34} className='close' onClick={() => setIsModel(!isModel)} />
                        </div>
                        {isLoading && (
                            <div className="loading-bar"></div>
                        )}
                        <div className="model-body">
                            <form className="project-form" onSubmit={handleAddOrUpdate} encType="multipart/form-data">
                                <label>Owner:
                                    <select name="userName" value={projectData.userName} onChange={handleInputChange}>
                                        <option value={project_user.user}>{project_user.user}</option>
                                        <option value="public">Public</option>
                                    </select>
                                </label>
                                <label>Project Name:
                                    <input type="text" name="projectName" value={projectData.projectName} onChange={handleInputChange} />
                                </label>
                                <label>Project Type:
                                    <select name="projectType" value={projectData.projectType} onChange={handleInputChange}>
                                        <option value="">Select Project Type</option>
                                        <option value="Web(php)">Web(php)</option>
                                        <option value="Web(mern)">Web(mern)</option>
                                        <option value="Mobile-App">Mobile-App</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </label>
                                <label>Project URL:
                                    <input type="text" name="projectUrl" value={projectData.projectUrl} onChange={handleInputChange} />
                                </label>

                                <label>Images:
                                    <input type="file" name="images" multiple onChange={handleImageUpload} />
                                </label>
                                <div className="image-preview">
                                    {projectData.images.map((image, index) => (
                                        <div key={index} className="preview-container">
                                            <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="preview-image" />
                                            <button type="button" onClick={() => handleImageRemove(index)}>Remove</button>
                                        </div>
                                    ))}
                                </div>

                                <h2>Description</h2>
                                {projectData.sections.map((section, index) => (
                                    <div key={index} className="section-container">
                                        <label>Section Heading:
                                            <input type="text" value={section.heading} onChange={(e) => handleSectionChange(index, 'heading', e.target.value)} />
                                        </label>
                                        <label>Section Detail:
                                            <textarea value={section.detail} onChange={(e) => handleSectionChange(index, 'detail', e.target.value)} />
                                        </label>
                                        <div className="row">

                                            <button title="Add" type="button" className="cssbuttons-io-button" onClick={handleSectionAdd}>
                                                <span><IoMdAdd size={30} /></span>
                                            </button>

                                            {index > 0 && <button title="Add" type="button" className="cssbuttons-io-button" onClick={() => handleSectionRemove(index)}>
                                                <span><IoMdClose size={30} /></span>
                                            </button>
                                            }
                                        </div>
                                    </div>
                                ))}
                                <h2>Key Points</h2>
                                {projectData.keyPoints.map((keyPoint, index) => (
                                    <div key={index} className="key-point-container">
                                        <label>Key Point {index + 1}:
                                        </label>
                                        <input type="text" value={keyPoint} onChange={(e) => handleKeyPointChange(index, e.target.value)} />
                                        <div className="row">
                                            <button type="button" className="cssbuttons-io-button" onClick={handleKeyPointAdd}><span><IoMdAdd size={30} /></span></button>

                                            {index > 0 && <button type="button" className="cssbuttons-io-button" onClick={() => handleKeyPointRemove(index)}><span><IoMdClose size={30} /></span></button>}
                                        </div>
                                    </div>
                                ))}

                                <h2>Tools</h2>
                                {projectData.tools.map((tool, index) => (
                                    <div key={index} className="tool-container">
                                        <label>Tool {index + 1}:
                                        </label>
                                        <input type="text" value={tool} onChange={(e) => handleToolChange(index, e.target.value)} />
                                        <div className="row">
                                            <button type="button" className="cssbuttons-io-button" onClick={handleToolAdd}><span><IoMdAdd size={30} /></span></button>

                                            {index > 0 && <button type="button" className="cssbuttons-io-button" onClick={() => handleToolRemove(index)}><span><IoMdClose size={30} /></span></button>}
                                        </div>
                                    </div>
                                ))}

                                <button type="submit" className='project-submit' disabled={isLoading}>{isLoading ? 'Submiting' : 'Submit'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Projects;
