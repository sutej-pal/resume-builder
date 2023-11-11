import { useRef, useState } from "react";
import { FormInput } from "./atoms/form-input.atom";
import { registerWithEmail } from "../services/auth.service";
import { toast } from "react-toastify";

const SignUpModalComponent = () => {

    const modalMain = useRef<HTMLDivElement | null>(null);
    const closeButton = useRef<HTMLButtonElement | null>(null);

    const closeModal = () => {
        if (modalMain.current?.classList.contains('show')) {
            // hide modal
            if (closeButton.current) {
                closeButton.current.click();
            }
        }
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            const payload = {
                name, email, password
            }
            let resp = await registerWithEmail(payload)
            console.log(resp);
            toast.success(resp.message)
            closeModal();
        } catch (error) {

        }
    }
    return (
        <div
            className="modal fade"
            id="signup-card"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel1"
            aria-hidden="true"
            ref={modalMain}
        >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '450px' }}>
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <div className='w-100'>
                            <h2 className="modal-title text-uppercase" id="staticBackdropLabel1">
                                Sign up
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
                            <FormInput label="Name" value={name} onChange={setName} />
                            <FormInput label="Email" value={email} onChange={setEmail} />
                            <div className="d-flex gap-4">
                                <FormInput label='Password' type='password' value={password} onChange={setPassword} />
                                <FormInput label='Confirm Password' type='password' value={confirmPassword} onChange={setConfirmPassword} />
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div className="switch text-start">
                                Already have an account
                                <div>
                                    <a href="!#" data-bs-toggle="modal" data-bs-target="#login-card">Log in here</a>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary my-3">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const SignUpModal = SignUpModalComponent