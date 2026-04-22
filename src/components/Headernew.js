import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import logo from "../images/site-logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const burgerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        burgerRef.current &&
        menuRef.current &&
        !burgerRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header>
      <div className="container wrapper">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="site logo" />
          </Link>
        </div>

        <button
          ref={burgerRef}
          className={`burger ${isMenuOpen ? "is-open" : ""}`}
          id="burgerBtn"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
          type="button"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <ul
          ref={menuRef}
          className={`menu-list ${isMenuOpen ? "is-open" : ""}`}
          id="menuList"
        >
          <li className="menu-item">
            <Link to="/about/" onClick={closeMenu}>
              About
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/obstetrics/" onClick={closeMenu}>
              Obstetrics
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/gynaecology/" onClick={closeMenu}>
              Gynaecology
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/infertility/" onClick={closeMenu}>
              Infertility
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/faq/" onClick={closeMenu}>
              FAQ
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/blog/" onClick={closeMenu}>
              Blogs
            </Link>
          </li>

          <li className="menu-item contact">
            <div className="btn-wrapper">
              <Link className="btn" to="/contact/" onClick={closeMenu}>
                Contact
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;