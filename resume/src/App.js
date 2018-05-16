import React, { Component } from 'react';
import './App.css';
import resume from './resume.json';
import Experience from './experience';
import Education from './education';
import Languages from './languages';
import Interests from './interests';
import Projects from './projects';
import Skills from './skills';
import Certifications from './certifications';

class App extends Component {

    renderExperiences() {
        let resultsArray = [];
        resume.experiences.map((item, i) => {
            resultsArray.push(<Experience item={item} key={i} />);
        });
        return resultsArray;
    }
    renderEducation() {
        let resultsArray = [];
        resume.education.map((item, i) => {
            resultsArray.push(<Education item={item} key={i} />);
        });
        return resultsArray;
    }
    renderLanguages() {
        let resultsArray = [];
        resume.languages.map((item, i) => {
            resultsArray.push(<Languages item={item} key={i} />);
        });
        return resultsArray;
    }
    renderInterests(){
        let resultsArray = [];
        resume.interests.map((item, i) => {
            resultsArray.push(<Interests item={item} key={i} />);
        });
        return resultsArray;
    }
    renderProjects(){
        let resultsArray = [];
        resume.projects.map((item, i) => {
            resultsArray.push(<Projects item={item} key={i} />);
        });
        return resultsArray;
    }
    renderSkills(){
        let resultsArray = [];
        resume.skills.map((item, i) => {
            resultsArray.push(<Skills item={item} key={i} />);
        });
        return resultsArray;
    }
    renderCertifications(){
        let resultsArray = [];
        resume.certifications.map((item, i) => {
            resultsArray.push(<Certifications item={item} key={i} />);
        });
        return resultsArray;
    }
    render() {
        return (
            <div className="wrapper">
                <div className="sidebar-wrapper">
                    <div className="profile-container">
                        <img className="profile" src={resume.img} alt="" height="200px" width="200px" style={{ borderRadius: 1000 }} />
                        <h1 className="name">{resume.name}</h1>
                        <h3 className="tagline">{resume.designation}</h3>
                    </div>

                    <div className="contact-container container-block">
                        <ul className="list-unstyled contact-list">
                            <li className="email"><i className="fa fa-envelope"></i><a href="mailto:{resume.email}">{resume.email}</a></li>
                            <li className="phone"><i className="fa fa-phone"></i><a href="tel:{resume.phone}">{resume.phone}</a></li>
                            <li className="facebook"><i className="fa fa-facebook"></i><a href={resume.facebookURL} target="_blank">{resume.facebook}</a></li>
                            <li className="linkedin"><i className="fa fa-linkedin"></i><a href={resume.linkedInURL} target="_blank">{resume.linkedIn}</a></li>
                            <li className="github"><i className="fa fa-github"></i><a href={resume.githubURL} target="_blank">{resume.github}</a></li>
                            <li className="twitter"><i className="fa fa-twitter"></i><a href={resume.twitterURL} target="_blank">{resume.twitter}</a></li>
                        </ul>
                    </div>

                    <div className="education-container container-block">
                        <h2 className="container-block-title">Education</h2>
                        {this.renderEducation()}
                    </div>


                    <div className="languages-container container-block">
                        <h2 className="container-block-title">Languages</h2>
                        {this.renderLanguages()}
                    </div>


                    <div className="interests-container container-block">
                        <h2 className="container-block-title">Interests</h2>
                        {this.renderInterests()}
                    </div>

                </div>

                <div className="main-wrapper">

                    <section className="section summary-section">
                        <h2 className="section-title"><i className="fa fa-user"></i>Career Profile</h2>
                        <div className="summary">
                            <p>Summarise your career here lorem ipsum dolor sit amet, consectetuer adipiscing elit. You can <a href="http://themes.3rdwavemedia.com/website-templates/orbit-free-resume-cv-template-for-developers/" target="_blank">download this free resume/CV template here</a>. Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.</p>
                        </div>
                    </section>

                    <section className="section experiences-section">
                        <h2 className="section-title"><i className="fa fa-briefcase"></i>Experiences</h2>
                        {this.renderExperiences()}
                    </section>

                    <section className="section projects-section">
                        <h2 className="section-title"><i className="fa fa-archive"></i>Academic Projects</h2>
                        {this.renderProjects()}
                    </section>

                    <section className="skills-section section">
                        <h2 className="section-title"><i className="fa fa-rocket"></i>Skills &amp; Proficiency</h2>
                        {this.renderSkills()}
                    </section>

                    <section className="section certifate-section">
                        <h2 className="section-title"><i className="fa fa-certificate"></i>Certifications</h2>
                        {this.renderCertifications()}
                    </section>

                </div>
            </div>
        );
    }
}

export default App;
