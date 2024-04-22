import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '../components';
import { IoEyeOutline } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const PortfolioMe = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('All'); // State to hold the current filter
    const [showSelectList, setShowSelectList] = useState(false); // State to manage visibility of select-list

    const API_URL = process.env.REACT_APP_BASE_API_URL;
    const USER_NAME = process.env.REACT_APP_BASE_USER_NAME;

    // fetch project data
    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/project/userProject/${USER_NAME}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const projectsData = await response.json();
                setProjects(projectsData);
            } catch (error) {
                toast.error('Failed to fetch Project');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [API_URL, USER_NAME]);

    // Function to handle filter button and select-item click
    const handleFilterClick = (filterType) => {
        setFilter(filterType);
        setShowSelectList(false); // Hide the select-list when a filter is selected
    };

    // Filter projects based on the current filter
    const filteredProjects = projects.filter(project => filter === 'All' || project.projectType === filter);

    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <article className="portfolio active">
                    <header>
                        <h2 className="h2 article-title">Portfolio</h2>
                    </header>

                    {isLoading && <div className="loader"></div>}
                    <section className="projects">
                        <Toaster position="top-right" />

                        <ul className="filter-list">
                            <li className="filter-item">
                                <button className={filter === 'All' ? 'active' : ''} onClick={() => handleFilterClick('All')}>All</button>
                            </li>
                            <li className="filter-item">
                                <button className={filter === 'Web(php)' ? 'active' : ''} onClick={() => handleFilterClick('Web(php)')}>Web(php)</button>
                            </li>
                            <li className="filter-item">
                                <button className={filter === 'Web(mern)' ? 'active' : ''} onClick={() => handleFilterClick('Web(mern)')}>Web(mern)
                                </button>
                            </li>
                            <li className="filter-item">
                                <button className={filter === 'Mobile-App' ? 'active' : ''} onClick={() => handleFilterClick('Mobile-App')}>Mobile-App</button>
                            </li>
                        </ul>

                        <div className="filter-select-box">
                            <button className="filter-select" onClick={() => setShowSelectList(!showSelectList)}>
                                <div className="select-value">{filter === 'All' ? 'Select category' : filter}</div>
                                <div className="select-icon">
                                    <FaSortDown />
                                </div>
                            </button>

                            {showSelectList && (
                                <ul className="select-list">
                                    <li className="select-item">
                                        <button onClick={() => handleFilterClick('All')}>All</button>
                                    </li>
                                    <li className="select-item">
                                        <button onClick={() => handleFilterClick('Web(mern)')}>Web(mern)
                                        </button>
                                    </li>
                                    <li className="select-item">
                                        <button onClick={() => handleFilterClick('Web(php)')}>Web(php)</button>
                                    </li>
                                    <li className="select-item">
                                        <button onClick={() => handleFilterClick('Mobile-App')}>Mobile-App</button>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <ul className="project-list">
                            {filteredProjects.map(project => (
                                <li key={project._id} className="project-item">
                                    <Link to={`/project-detail/${project._id}`}>
                                        <figure className="project-img">
                                            <div className="project-item-icon-box">
                                                <IoEyeOutline size={25} />
                                            </div>
                                            <img src={project.images[0]} alt={project.title} loading="lazy" />
                                        </figure>
                                        <h3 className="project-title">{project.projectName}</h3>
                                        <p className="project-category">{project.projectType}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </article>
            </div>
        </main >
    );
};

export default PortfolioMe;
