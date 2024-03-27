import React from 'react'
import { Navbar, Sidebar } from '../components'

const Contact = () => {
    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <article className="contact active">
                    <header>
                        <h2 className="h2 article-title">Contact</h2>
                    </header>


                    {/* Contact Form Section */}
                    <section className="contact-form">
                        <h3 className="h3 form-title">Contact Form</h3>

                        <form action="#" className="form" data-form>
                            <div className="input-wrapper">
                                <input type="text" name="fullname" className="form-input" placeholder="Full name" required data-form-input />
                                <input type="email" name="email" className="form-input" placeholder="Email address" required data-form-input />
                            </div>

                            <textarea name="message" className="form-input" placeholder="Your Message" required data-form-input></textarea>

                            <button className="form-btn" type="submit" disabled data-form-btn>
                                <ion-icon name="paper-plane"></ion-icon>
                                <span>Send Message</span>
                            </button>
                        </form>
                    </section>
                </article>
            </div>

        </main>
    )
}

export default Contact
