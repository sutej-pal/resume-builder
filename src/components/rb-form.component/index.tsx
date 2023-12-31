import React, { useEffect, useState, useRef } from 'react';
import { FormInput } from '../atoms/form-input.atom';
import { updateResumeData } from '../../services/user.service';
import ProfilePictureUpload from '../profile-picture-upload/ProfilePictureUpload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from 'ckeditor5/src/core';
import SectionHeader from '../section-header';
import { ResumeFormData } from '../../types/generic/resume-formData.type';
import _ from 'underscore';
import './styles.scss';

const RBForm = ({ fetchResume = () => { } }: { fetchResume: Function }) => {

    const [formData, setFormData] = useState<ResumeFormData>({
        id: '655a3f86f16b25f76eeb4864',
        position: '',
        firstName: '',
        lastName: '',
        profilePicture: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        profile: ''
    });

    const patchResumeData = async (data: any) => {
        try {
            await updateResumeData(data.id, data);
            fetchResume();
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedPatchResumeData = useRef(_.debounce(patchResumeData, 500));


    const editorConfig: EditorConfig = {
        toolbar: ['bold', 'italic', '|', 'bulletedList', 'numberedList'],
        placeholder: 'e.g. Exceptionally qualified educator with over 20 years of experience working with students, relying on experience and knowledge to help students reach their full potential.'
    }

    const handleInputChange = (
        fieldName: keyof ResumeFormData,
        value: string
    ) => {
        try {
            setFormData({
                ...formData,
                [fieldName]: value
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        debouncedPatchResumeData.current(formData);
    }, [formData]);

    // Render the form
    return (
        <div className='rb-form-container'>
            <div className="row justify-content-center vh-100 overflow-auto">
                <div className="col-md-10 pt-4">
                    <div className='text-center my-3'>
                        <h3>Untitled</h3>
                    </div>
                    <SectionHeader heading="Personal Details" subHeading="" />
                    <div className='form-group'>
                        <div className='d-flex justify-content-center gap-4'>
                            <FormInput wrapperClass='flex-grow-1' label='Job Title' value={formData.position} onChange={(e: string) => handleInputChange('position', e)} />
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
                        data={''}
                        config={editorConfig}
                        onChange={(event, editor: ClassicEditor) => handleInputChange('profile', editor.data.get())}
                    />
                    <SectionHeader heading='Employment History' subHeading='Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).' />
                    <div className="mt-5"></div>
                </div>
            </div>
        </div>
    );
};

export default RBForm;
