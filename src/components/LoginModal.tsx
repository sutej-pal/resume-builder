import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { loginWithEmail } from '../services/auth.service';
import { FormInput } from './atoms/form-input.atom';
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { createSession } from '../store/auth.store';

const LoginModalComponent = ({ setUser }: any) => {

    const modalMain = useRef<HTMLDivElement | null>(null);
    const closeButton = useRef<HTMLButtonElement | null>(null);

    const closeModal = () => {
        console.log('Hi', modalMain);
        if (modalMain.current?.classList.contains('show')) {
            // hide modal
            if (closeButton.current) {
                closeButton.current.click();
            }
        }
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const resp = await loginWithEmail({ email, password });
            console.log(resp);
            toast.success(resp.message);
            const userObject = {
                ...resp.user,
                token: (resp as any).token,
            };
            setUser(userObject);
            localStorage.setItem('rb.user', JSON.stringify(resp.user));
            localStorage.setItem('rb.userToken', JSON.stringify(resp.token));
            localStorage.setItem('rb.userSession', JSON.stringify({ session: 'active', lastActive: moment() }));
            closeModal()
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div
            className="modal fade"
            id="login-card"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            ref={modalMain}
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
                            ref={closeButton}
                            style={{ top: '25px', right: '25px' }}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body text-start">
                            <FormInput label="Email" value={email} onChange={setEmail} />
                            <FormInput label='Password' type='password' value={password} onChange={setPassword} />
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div className="switch text-start">Don't have an account?
                                <div>
                                    <a href="!#" data-bs-toggle="modal" data-bs-target="#signup-card">Create your account</a>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary my-3">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

const dtp = {
    setUser: createSession
}

export const LoginModal = connect(() => ({}), dtp)(LoginModalComponent);;