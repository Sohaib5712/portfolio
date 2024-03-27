import React from 'react'

import { Navbar, Sidebar } from '../components'

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

                    {/* Education Timeline */}
                    <section className="timeline">
                        <div className="title-wrapper">
                            <div className="icon-box">
                                <ion-icon name="book-outline"></ion-icon>
                            </div>
                            <h3 className="h3">Education</h3>
                        </div>
                        <ol className="timeline-list">
                            <li className="timeline-item">
                                <h4 className="h4 timeline-item-title">Bachelor's in Computer Science</h4>
                                <span>2019 — 2023</span>
                                <p className="timeline-text">
                                    Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et
                                    quas molestias exceptur.
                                </p>
                            </li>
                            {/* Add more education items as needed */}
                        </ol>
                    </section>

                    {/* Experience Timeline */}
                    <section className="timeline">
                        <div className="title-wrapper">
                            <div className="icon-box">
                                <ion-icon name="book-outline"></ion-icon>
                            </div>
                            <h3 className="h3">Experience</h3>
                        </div>
                        <ol className="timeline-list">
                            <li className="timeline-item">
                                <h4 className="h4 timeline-item-title">Full Stack Developer (Intern)</h4>
                                <span>May 2022 — Oct 2022</span>
                                <p className="timeline-text">
                                    Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque corrupti, quos dolores et qvuas
                                    molestias exceptur.
                                </p>
                            </li>
                            {/* Add more experience items as needed */}
                        </ol>
                    </section>

                    {/* Skills Section */}
                    <section className="skill">
                        <h3 className="h3 skills-title">My skills</h3>
                        <ul className="skills-list content-card">
                            <li className="skills-item">
                                <div className="title-wrapper">
                                    <h5 className="h5">HTML/CSS</h5>
                                    <data value="90">90%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ width: '90%' }}></div>
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
