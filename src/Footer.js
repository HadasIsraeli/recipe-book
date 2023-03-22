import { Link } from 'react-router-dom';
import gitImg from './assets/github.png';
import linkedIn from './assets/linkedin.png';
import reactImg from './assets/reactlogo.png';

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
                <img src={reactImg} alt="reactlogo" title="reactlogo"/>
            </div>
        </div>
    );
}

export default Footer;