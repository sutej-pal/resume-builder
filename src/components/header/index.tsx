import { Link } from 'react-router-dom';
import { SignUpModal } from '../SignUpModal';
import { LoginModal } from '../LoginModal';
import { StoreState } from "../../types/store-state.type";
import { destroySession } from "../../store/auth.store";
import { connect } from "react-redux";
import './header.scss';

function HeaderComponent({
  user,
  endSession
}: any) {


  console.log(user);
  const logOut = (e: any) => {
    e.preventDefault()
    endSession();
    window.location.href = "/";
    localStorage.removeItem("rb.user");
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          {/* TODO: Add Logo */}
        </a>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to={'/dashboard'} className="nav-link px-2 link-secondary">Home</Link>
          </li>
          <li>
            <Link to={"/resume-builder"} className="nav-link px-2 link-dark">
              Create a Resume
            </Link>
          </li>
          {/*<li>
            <a href="#" className="nav-link px-2 link-dark">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              FAQs
            </a>
          </li> */}
          <li>
            <Link to={'/about'} className="nav-link px-2 link-dark">
              About
            </Link>
          </li>
        </ul>
        <div className="col-md-3 text-end" style={{ display: user?.name ? 'none' : 'block' }}>
          <button className='btn btn-outline-primary me-2' data-bs-toggle="modal" data-bs-target="#login-card">
            Login
          </button>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signup-card">
            Sign-up
          </button>
        </div>
        <div>
          {
            user?.role === 'user' ?
              <>
                <div className="dropdown">
                  <span className='align-items-center border d-flex justify-content-center p-2 rounded-circle'
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="!#">Action</a></li>
                    <li><a className="dropdown-item" href="!#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="!#" onClick={logOut}>Logout</a></li>
                  </ul>
                </div>
              </>
              : <></>
          }
        </div>
      </header >
      <LoginModal />
      <SignUpModal />
    </div >
  );
};

const stp = (state: StoreState) => ({
  user: state.auth,
});
const dtp = {
  endSession: destroySession
}

export const Header = connect(stp, dtp)(HeaderComponent)