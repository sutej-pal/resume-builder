import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from '../../components/atoms/form-input.atom';

const LoginModalComponent = ({ show, hide }: { show: boolean, hide: () => void }) => {
  const modalTriggerButton = useRef<HTMLButtonElement | null>(null);

  const openModal = useCallback(() => {
    if (show) {
      if (modalTriggerButton.current) {
        modalTriggerButton.current.click();
      }
    }
  }, [show]);

  useEffect(() => {
    openModal();
  }, [openModal, show])


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // const resp = await loginWithEmail({ email, password });
    // console.log(resp);
    // setUser(resp.user);
    // localStorage.setItem('rb.user', JSON.stringify(resp.user));
    // localStorage.setItem('rb.userSession', JSON.stringify({ session: 'active', lastActive: moment() }));
    // navigate('/dashboard')
  };


  return (
    <>
      <button type="button"
        ref={modalTriggerButton}
        className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
          <div className="modal-content">
            <div className="modal-header text-center">
              <div className='w-100'>
                <h2 className="modal-title text-uppercase" id="staticBackdropLabel">
                  Login
                </h2>
              </div>
              <button
                type="button"
                className="btn-close position-absolute"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => hide()}
                style={{ top: '25px', right: '25px' }}
              />
            </div>
            <div className="modal-body text-start">
              <form onSubmit={handleSubmit}>
                <FormInput label="Email" value={email} onChange={setEmail} />
                <FormInput label='Password' type='password' value={password} onChange={setPassword} />
              </form>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="switch text-start">Don't have an account?
                <div>
                  <Link to="#">Register here</Link>
                </div>
              </div>
              <button type="submit" className="btn btn-lg btn-primary my-3">Login</button>
            </div>
          </div>
        </div>
      </div >
    </>

  )

  // return <div className="login-container">
  //   <div className="container">
  //     <div className="card">
  //       <h2>Login Form</h2>
  //       <form onSubmit={handleSubmit}>
  //         <FormInput label="Email" value={email} onChange={setEmail}/>
  //         <FormInput label='Password' type='password' value={password} onChange={setPassword}/>
  //         <button type="submit">Login</button>
  //       </form>
  //       <div className="switch">Don't have an account? <a href="#">Register here</a></div>
  //     </div>
  //   </div>
  // </div>
};

export const LoginModal = LoginModalComponent;