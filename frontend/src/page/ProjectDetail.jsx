import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '../components';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import "./detail.css";

const ProjectDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState([]);
    const API_URL = process.env.REACT_APP_BASE_API_URL;

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/project/detailProject/${id}`);
                if (response.ok) {
                    const projectsData = await response.json();
                    setProject(projectsData);
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
    }, [API_URL, id]);

    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                {isLoading ?
                    <div className="loader"></div>
                    :
                    <section id="portfolio-details" className="portfolio-details">
                        <div className="container" id="detailed">
                            {/* Carousel */}
                            <Carousel>
                                {project.images && project.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100 rounded" src={image} alt={`Slide ${index + 1}`} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <div className="project-heading">
                                <h1>{project.projectName && project.projectName}</h1>

                                <p>{project.projectType && project.projectType}
                                </p>

                                {project.projectUrl &&
                                    <div className='project-heading-url'>
                                        <span>Url:
                                        </span>
                                        <a href={project.projectUrl} target='_blank' rel='noreferrer'>{project.projectUrl}</a>
                                    </div>
                                }
                            </div>
                            {/* Portfolio Descriptions */}
                            <div className="row gy-4">
                                <div className="col-lg-7">
                                    {project.sections && project.sections.map((section, index) => (
                                        <div key={index} className="portfolio-description">
                                            <h2>{section.heading}</h2>
                                            <p>{section.detail}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Portfolio Information */}
                                <div className="col-lg-4">
                                    <br />
                                    <div className="portfolio-info">
                                        <h3>Key Points</h3>
                                        <ul>
                                            {/* Map through project details */}
                                            {project.keyPoints && project.keyPoints.map((keyPoint, index) => (
                                                <li key={index}>{keyPoint}</li>
                                            ))}
                                            <br />
                                        </ul>
                                    </div>
                                    <div className="project-tool">
                                        <ul>
                                            {project.tools && project.tools.map((tool, index) => (
                                                <li key={index}>
                                                    {tool}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        </main>
    );
}

export default ProjectDetail;
