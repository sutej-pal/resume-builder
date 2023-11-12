import React, { useState, ChangeEvent } from 'react';

const ProfilePictureUpload = () => {
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {image && (
                <div>
                    <h2>Preview:</h2>
                    <img
                        src={image}
                        alt="Profile Preview"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfilePictureUpload;
