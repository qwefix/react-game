import React from 'react';
import RSSLogo from './assetes/rs_school_js.svg'

function Footer() {
    return (
        <footer>
            <div className='logo-rss'>
                <a href='https://rs.school/js/'>
                    <img src={RSSLogo} alt='Roling Scopes School' height='30' />
                </a>
            </div>
            <div className='year'>
                2021
            </div>
            <div className='github'>
                <a href='https://github.com/qwefix'>qwefix</a>
            </div>
        </footer>
    )
}
export default Footer