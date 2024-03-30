import React from 'react'

import { Navbar, Sidebar } from '../components'
import { IoBookOutline } from "react-icons/io5";

const Resume = () => {


    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <article className="resume active">
                    <header>
                        <h2 className="h2 article-title">Resume</h2>
                    </header>

                    {/* Experience Timeline */}
                    <section className="timeline">
                        <div className="title-wrapper">
                            <div className="icon-box">
                                <IoBookOutline />
                            </div>
                            <h3 className="h3">Experience</h3>
                        </div>
                        <ol className="timeline-list">
                            <li className="timeline-item">
                                <h4 className="h4 timeline-item-title">ICE Parküberwachung | Germany (Remote)</h4>
                                <span>Dec 2023 - Currently</span>
                                <h4 className="h4 timeline-item-sub-title">Mobile App & Web DashBoard</h4>
                                <p className="timeline-text">
                                    The Parking Area Management System is a comprehensive MERN (MongoDB,
                                    Express.js, React.js, Node.js) stack project encompassing both web and mobile
                                    applications. The system caters to two main user roles, namely admin and employee.
                                    Employees can seamlessly add vehicles, perform check-outs, and handle fines, while
                                    administrators have full control over user management, vehicle oversight, check-out
                                    history, and various other administrative functions
                                </p>
                            </li>
                            <li className="timeline-item">
                                <h4 className="h4 timeline-item-title">The Skills | Faisalabad, Pakistan</h4>
                                <span>Feb-2023 - Nov-2023</span>
                                <h4 className="h4 timeline-item-sub-title">Mern Stack</h4>
                                <p className="timeline-text">
                                    Designed and developed an institute website with a comprehensive admin
                                    dashboard. Enabled students to access essential data and information while
                                    empowering administrators to manage student registrations, fees, courses, and
                                    more.
                                    Leveraged web development skills to create a user-friendly interface that
                                    enhanced communication and streamlined administrative tasks.
                                </p>
                            </li>
                            <li className="timeline-item">
                                <h4 className="h4 timeline-item-title">HashTag Soft | Faisalabad, Pakistan</h4>
                                <span>May-2022 - Dec-2022</span>
                                <h4 className="h4 timeline-item-sub-title">Full Stack Developer (PHP)</h4>
                                <p className="timeline-text">
                                    Successfully designed and developed an online medicine store, enabling users
                                    to purchase medications conveniently.
                                    Implemented an intuitive interface that allowed admin control over product
                                    pricing, sales, and overall store management.
                                    Utilized web development expertise to create a secure and user-friendly
                                    platform, enhancing the accessibility of essential healthcare products for users.
                                </p>
                            </li>
                        </ol>
                    </section>

                    {/* Education Timeline */}
                    <section className="timeline">
                        <div className="title-wrapper">
                            <div className="icon-box">
                                <IoBookOutline />
                            </div>
                            <h3 className="h3">Education</h3>
                        </div>
                        <ol className="timeline-list">
                            <li className="timeline-item">
                                <h4 className="h4 timeline-item-title">Bachelor's in Computer Science (University of Engineering & Technology)</h4>
                                <span>2019 — 2023</span>
                                <p className="timeline-text">
                                    During my final year of studies, I undertook a significant project that exemplified
                                    my skills in web development and problem-solving. I developed a comprehensive
                                    third-party website that serves as a centralized platform for vendors and clients
                                    within the event planning industry.
                                </p>
                            </li>
                            <li className="timeline-item">
                                <h4 className="h4 timeline-item-title">Intermediate in Computer Sciences (KIPS College)</h4>
                                <span>2016 — 2018</span>
                                <p className="timeline-text">
                                    Combining elements of computer science, information technology, and data management, this degree equips students with the skills needed to analyze complex problems, develop innovative solutions, and effectively communicate technical concepts.
                                </p>
                            </li>
                        </ol>
                    </section>

                    {/* Skills Section */}
                    <section className="skill">
                        <h3 className="h3 skills-title">My skills</h3>
                        <ul className="skills-list content-card">
                            <li className="skills-item">
                                <div className="title-wrapper">
                                    <h5 className="h5">React Js</h5>
                                    <data value="85">85%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ width: '85%' }}></div>
                                </div>
                            </li>

                            <li className="skills-item">
                                <div className="title-wrapper">
                                    <h5 className="h5">Node Js</h5>
                                    <data value="80">80%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ width: '80%' }}></div>
                                </div>
                            </li>

                            <li className="skills-item">
                                <div className="title-wrapper">
                                    <h5 className="h5">React Native</h5>
                                    <data value="70">70%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ width: '70%' }}></div>
                                </div>
                            </li>

                            <li className="skills-item">
                                <div className="title-wrapper">
                                    <h5 className="h5">UI/UX</h5>
                                    <data value="80">80%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ width: '80%' }}></div>
                                </div>
                            </li>

                            <li className="skills-item">
                                <div className="title-wrapper">
                                    <h5 className="h5">PHP</h5>
                                    <data value="75">75%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ width: '75%' }}></div>
                                </div>
                            </li>

                            {/* Add more skills items as needed */}
                        </ul>
                    </section>

                </article>
            </div>

        </main>
    )
}

export default Resume
