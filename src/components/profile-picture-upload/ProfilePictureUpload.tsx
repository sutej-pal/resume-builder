import React, { useState, ChangeEvent, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './styles.scss';
import { cropImage } from '../../utils/crop.utils';

const ProfilePictureUpload = () => {
    const fileUpload = useRef<HTMLInputElement>(null);
    const imageUploadModal = useRef<HTMLButtonElement>(null);
    const [image, setImage] = useState<string | undefined>(undefined);
    const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

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

    const handleEnter = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("enter!");
    }
    const handleLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("leave!");
    }
    const handleOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("over!");
    }
    const handleUpload = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("drop!", e);
        const [file] = e.target.files || e.dataTransfer.files;
        console.log(file);
        uploadFile(file);
    }

    const uploadFile = (file: Blob) => {
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    }

    const onComplete = (imagePromisse: Promise<any>) => {
        imagePromisse.then((image: React.SetStateAction<string | undefined>) => {
            setCroppedImage(image);
        });
    }

    const deleteImage = () => {
        setImage(undefined);
        setCroppedImage(undefined);
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div>
                {!croppedImage && (
                    <div className='align-items-center bg-secondary-subtle d-flex justify-content-center profile-picture-container rounded'>
                        <i className="fs-1 fa-solid fa-user"></i>
                    </div>
                )}
                {croppedImage && (
                    <div className='d-flex justify-content-center profile-picture-container align-items-center rounded '>
                        <img
                            src={croppedImage}
                            className='rounded w-100 h-auto'
                            alt="Profile Preview"
                        />
                    </div>
                )}
            </div>
            <div className=''>
                {
                    croppedImage && (
                        <>
                            <div>
                                <button className="btn text-primary" type='button'
                                    onClick={() => imageUploadModal.current?.click()}
                                ><i className="fa-solid fa-upload"></i> Edit Photo</button>
                            </div>
                            <div>
                                <button className="btn text-danger" type='button'
                                    onClick={() => deleteImage()}
                                ><i className="fa-solid fa-trash"></i> Delete</button>
                            </div>
                        </>
                    )
                }
                {
                    !croppedImage && (
                        <div>
                            <button className="btn text-primary" type='button'
                                onClick={() => imageUploadModal.current?.click()}
                            ><i className="fa-solid fa-upload"></i> Upload Photo</button>
                        </div>
                    )
                }
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className='d-none'
                    ref={fileUpload}
                />
            </div>

            <button type="button" className="btn d-none" ref={imageUploadModal} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Upload Photo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                image ?
                                    <>
                                        <div className='text-center text-secondary mb-3'>Drag to reposition the photo</div>
                                        <div className='image-cropper-container position-relative'>
                                            <Cropper
                                                image={image}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={1}
                                                onCropChange={setCrop}
                                                onCropComplete={(_, croppedAreaPixels) => {
                                                    setCroppedAreaPixels(croppedAreaPixels);
                                                }}
                                                onZoomChange={setZoom}
                                            />
                                        </div>
                                        <div className='mt-3'>
                                            {/* <label className="form-label">Zoom</label> */}
                                            <input
                                                type="range"
                                                value={zoom}
                                                min={1}
                                                max={4}
                                                step={0.05}
                                                aria-labelledby="Zoom"
                                                onChange={(e) => {
                                                    setZoom(+e.target.value)
                                                }}
                                                className="form-range"
                                            />
                                        </div>
                                    </> :
                                    <div
                                        onDragEnter={(e) => handleEnter(e)}
                                        onDragLeave={(e) => handleLeave(e)}
                                        onDragOver={(e) => handleOver(e)}
                                        onDrop={(e) => handleUpload(e)}
                                        role="button" onClick={() => fileUpload.current?.click()}
                                        className='border-2 file-upload-container rounded d-flex justify-content-center align-items-center'>
                                        <div className='text-center'>
                                            <button type='button' className='btn btn-primary shadow'>Upload Photo</button>
                                            <div className='mt-2'>
                                                Drag & drop or select a photo <br /> from your computer.
                                            </div>
                                        </div>

                                    </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" data-bs-dismiss="modal" onClick={() =>
                                onComplete(cropImage(image, croppedAreaPixels, console.log))
                            } className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePictureUpload;
