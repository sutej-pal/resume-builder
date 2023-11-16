import React, { useState } from 'react';
import { FormInput } from '../atoms/form-input.atom';
import { updateUserData } from '../../services/user.service';
import ProfilePictureUpload from '../profile-picture-upload/ProfilePictureUpload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from 'ckeditor5/src/core';
import './styles.scss';
import SectionHeader from '../section-header';
interface FormData {
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string,
    phone: string,
    country: string,
    city: string,
}

const RBForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        profilePicture: '',
        email: '',
        phone: '',
        country: '',
        city: '',
    });

    const editorConfig: EditorConfig = {
        placeholder: 'e.g. Exceptionally qualified educator with over 20 years of experience working with students, relying on experience and knowledge to help students reach their full potential.'
    }

    const handleInputChange = (
        fieldName: keyof FormData,
        value: string
    ) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        try {
            const resp = await updateUserData(formData);
            console.log(resp);
        } catch (e) {

        }
    };

    // Render the form
    return (
        <div className='rb-form-container'>
            <div className="row justify-content-center vh-100 overflow-auto">
                <div className="col-md-10">
                    <form onSubmit={handleSubmit}>
                        <SectionHeader heading="Personal Details" subHeading="" />
                        <div className='form-group'>
                            <div className='d-flex justify-content-center gap-4'>
                                <FormInput wrapperClass='flex-grow-1' label='Job Title' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                                <ProfilePictureUpload profilePicture={(e: string) => handleInputChange('profilePicture', e)} />
                            </div>
                            <div className='d-flex justify-content-center gap-4'>
                                <FormInput wrapperClass='flex-grow-1' label='First Name' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                                <FormInput wrapperClass='flex-grow-1' label='Last Name' value={formData.lastName} onChange={(e: string) => handleInputChange('lastName', e)} />
                            </div>
                            <div className='d-flex justify-content-center gap-4'>
                                <FormInput wrapperClass='flex-grow-1' label='Email' value={formData.email} onChange={(e: string) => handleInputChange('email', e)} />
                                <FormInput wrapperClass='flex-grow-1' label='Phone' value={formData.phone} onChange={(e: string) => handleInputChange('phone', e)} />
                            </div>
                            <div className='d-flex justify-content-center gap-4'>
                                <FormInput wrapperClass='flex-grow-1' label='Country' value={formData.country} onChange={(e: string) => handleInputChange('country', e)} />
                                <FormInput wrapperClass='flex-grow-1' label='City' value={formData.city} onChange={(e: string) => handleInputChange('city', e)} />
                            </div>
                        </div>
                        <SectionHeader heading='Professional Summary' subHeading='Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills.' />
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            config={editorConfig}
                        />
                        <SectionHeader heading='Employment History' subHeading='Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).' />
                        <div className="mt-5"></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RBForm;
