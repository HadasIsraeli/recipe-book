import gitImg from '../assets/github.png';
import linkedIn from '../assets/linkedin.png';
import reactImg from '../assets/reactlogo.png';
import nodejs from '../assets/nodejs.png';
import mongodb from '../assets/mongodb.png';
import express from '../assets/express.png';

const Footer = () => {

    return (
        <div className="footer">
            <div>
                <a href="https://github.com/HadasIsraeli/recipe-book" target="_blank" rel="noopener noreferrer" title="Link to GitHub repository">
                    <img src={gitImg} alt="GitHub repository" />
                </a>
                <a href="https://www.linkedin.com/in/hadas-israeli/" target="_blank" rel="noopener noreferrer" title="Link to LinkedIn profile">
                    <img src={linkedIn} alt="linkedIn profile" />
                </a>
            </div>
            <div>
                <img src={reactImg} alt="react" title="react"/>
                <img src={nodejs} alt="nodejs" title="nodejs"/>
                <img src={mongodb} alt="mongodb" title="mongodb"/>
                <img src={express} alt="express" title="express"/>

            </div>
        </div>
    );
}

export default Footer;