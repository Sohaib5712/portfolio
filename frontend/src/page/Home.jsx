import React from 'react'

import { AboutMe, Navbar, Sidebar } from '../components'

const Home = () => {
    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <AboutMe />
            </div>

        </main>
    )
}

export default Home
