/* eslint-disable react/jsx-one-expression-per-line */ // ошибка линтера

import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.scss';

function Footer() {
    return (
        <footer className="page_footer">
          <div className="page_footer__links">
            <Link to="/admin">Главная страница</Link>
            <a
              href="https://github.com/PVthfinder"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="page_footer__copyright">
            Copyright &copy; {new Date().getFullYear()} Simbirsoft
          </div>
        </footer>
    );
}

export default Footer;
