import React, { useState } from 'react';
import { FormInput } from '../atoms/form-input.atom';
import { updateUserData } from '../../services/user.service';

interface FormData {
    firstName: string;
    lastName: string;
}

const RBForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
    });

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
        <div>

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div className='d-flex justifu-content-center gap-4'>
                        <FormInput wrapperClass='flex-grow-1' label='First Name' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                        <FormInput wrapperClass='flex-grow-1' label='Last Name' value={formData.lastName} onChange={(e: string) => handleInputChange('lastName', e)} />
                    </div>
                    <div className='d-flex justifu-content-center gap-4'>
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                    </div>
                    <div className='d-flex justifu-content-center gap-4'>
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                    </div>
                    <div className='d-flex justifu-content-center gap-4'>
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                    </div>
                    <div className='d-flex justifu-content-center gap-4'>
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                    </div>
                    <div className='d-flex justifu-content-center gap-4'>
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                    </div>
                    <div className='d-flex justifu-content-center gap-4'>
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                        <FormInput wrapperClass='flex-grow-1' value={formData.firstName} onChange={(e: string) => handleInputChange('firstName', e)} />
                    </div>
                </div>
                <button className='btn btn-primary mt-3' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RBForm;
