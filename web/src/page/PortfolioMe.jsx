import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '../components';
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const PortfolioMe = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [projects, setProjects] = useState([]);

    const API_URL = process.env.REACT_APP_BASE_API_URL;

    // fetch project data
    useEffect(() => {
        // Fetch projects when the component mounts
        const fetchProjects = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${API_URL}/api/project/allProject`);
                if (response.ok) {
                    const projectsData = await response.json();
                    setProjects(projectsData);

                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            } finally {
                setIsLoading(false)
            }
        };

        fetchProjects();
    }, [API_URL]);

    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <article className="portfolio active">
                    <header>
                        <h2 className="h2 article-title">Portfolio</h2>
                    </header>

                    {/* Projects Section */}
                    {isLoading &&
                        <div className="loader"></div>
                    }
                    <section className="projects">
                        {/* Project List */}
                        <ul className="project-list">
                            {projects.map(project => (
                                <li
                                    key={project._id}
                                    className="project-item"
                                >
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
        </main>
    );
};

export default PortfolioMe;
