import React, { useState } from 'react'
import axios from 'axios';

export default function ImageProcessing() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [normalizedImage, setNormalizedImage] = useState(null);
    const [inputImage, setInputImage] = useState(null);
    const [maskOverlayImage, setMaskOverlayImage] = useState(null);
    const [boundingBoxesImage, setBoundingBoxesImage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setInputImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleReinhardNormalization = () => {
        const formData = new FormData();
        formData.append('input_image', selectedFile);

        axios
            .post('http://localhost:5002/api/reinhard-normalization', formData)
            .then((response) => {
                console.log(response.data);
                setResult(response.data);
                setNormalizedImage(response.data.normalized_image);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCompleteCode = () => {
        const formData = new FormData();
        formData.append('input_image', selectedFile);

        axios
            .post('http://localhost:5002/api/execute-notebook', formData)
            .then((response) => {
                setResult(response.data);
                setMaskOverlayImage(`data:image/png;base64,${response.data.mask_overlay}`);
                setBoundingBoxesImage(`data:image/png;base64,${response.data.bounding_boxes}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    // const handleReinhardtNormalization = async () => {
    //     const formData = new FormData();
    //     formData.append('input_image', selectedFile);

    //     try {
    //         const response = await fetch('http://localhost:5002/api/reinhard-normalization', {
    //             method: 'POST',
    //             body: formData,
    //         })

    //         if (!response.ok) {
    //             throw new Error('Request failed with status ' + response.status);
    //         }
    //         const responseData = await response.json();
    //         console.log(responseData);
    //         setResult(responseData);
    //         setNormalizedImage(responseData.normalized_image);

    //     } catch (error) {
    //         console.error(error);
    //     };
    // }
    // const handleCompleteCode = () => {
    //     const formData = new FormData();
    //     formData.append('input_image', selectedFile);

    //     fetch('http://localhost:5002/api/execute-notebook', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setResult(data);
    //             setMaskOverlayImage(`data:image/png;base64,${data.mask_overlay}`);
    //             setBoundingBoxesImage(`data:image/png;base64,${data.bounding_boxes}`);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    return (
        // <div className="bg-gray-100">
        //     <p className="text-center text-5xl pt-14 text-gray-400">
        //         Image Processing
        //     </p>

        //     <div className="flex items-center justify-center p-12">
        //         <div className="mx-auto w-full max-w-[550px] bg-white rounded-2xl">
        //             <form
        //                 onSubmit={(e) => handleReinhardNormalization(e)}
        //                 className="py-6 px-9"
        //             >

        //                 <div className="pt-4 text-center">
        //                     <label className="block text-2xl font-semibold text-gray-600 ">
        //                         Upload File
        //                     </label>
        //                     <div className="flex items-center justify-center p-4">

        //                         <input
        //                             className="p-2 block w-full text-sm text-gray-100 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
        //                             type="file"
        //                             accept="image/*"
        //                             onChange={handleFileChange}
        //                         />

        //                     </div>

        //                 </div>
        // <div>
        //     <button

        //         // className="hover:shadow-form w-full rounded-md bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
        //         className="hover:shadow-form w-full rounded-2xl bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none" >
        //         Predict
        //     </button>
        // </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>

        <>
            <div className="bg-gray-100">
                <p className="text-center text-5xl pt-14 text-gray-400">
                    Nuclei Segementation
                </p>

                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px] bg-white rounded-2xl">
                        <div className="flex justify-center">
                            <div className="rounded p-4">
                                <label className="block text-2xl font-semibold text-gray-600 flex justify-center pt-4">
                                    Upload File
                                </label>
                                <div className="flex items-center justify-center p-4">
                                    <input
                                        className="p-2 block w-full text-sm text-gray-100 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {inputImage && normalizedImage && (
                                    <div className="flex justify-center">
                                        <div className="image-container text-center">
                                            <img
                                                src={inputImage}
                                                alt="Input"
                                                className="border  max-w-3/4"
                                            />
                                            <p className="font-semibold">Input</p>
                                        </div>
                                        <div className="image-container text-center ml-8">
                                            <img
                                                src={`data:image/png;base64,${normalizedImage}`}
                                                alt="Normalized"
                                                className="border  max-w-3/4"
                                            />
                                            <p className="font-semibold">Normalized</p>
                                        </div>
                                    </div>
                                )}

                                {maskOverlayImage && boundingBoxesImage && (
                                    <div className="flex justify-center p-4">
                                        <div className="flex justify-center items-center">
                                            <div className="image-container text-center">
                                                <img
                                                    src={maskOverlayImage}
                                                    alt="Mask Overlay"
                                                    className=" max-w-3/4"
                                                />
                                                <p className="font-semibold">Nuclei Segmentation
                                                    <br /> Mask Overlay</p>
                                            </div>
                                            <div className="image-container text-center ml-8">
                                                <img
                                                    src={`${boundingBoxesImage}`}
                                                    alt="Bounding Boxes"
                                                    className=" max-w-3/4"
                                                />
                                                <p className="font-semibold">Nuclei Bounding Boxes</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {result && maskOverlayImage && boundingBoxesImage && (
                                    <div className="flex justify-center p-4">
                                        <center>
                                            <p className="font-semibold text-xl">
                                                Nuclei Segmentation: {result.number_of_nuclei}
                                            </p>
                                        </center>
                                        {/* Display other relevant results */}
                                    </div>
                                )}
                                <div className="flex justify-center mt-4">
                                    <div className="flex justify-center items-center">
                                        <div className="p-2">
                                            <button

                                                onClick={handleReinhardNormalization}
                                                // className="hover:shadow-form w-full rounded-md bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                                className="hover:shadow-form w-full rounded-2xl bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none p-2" >
                                                Reinhard Normalization
                                            </button>
                                        </div>
                                        <div className="p-2">
                                            <button
                                                onClick={handleCompleteCode}
                                                // className="hover:shadow-form w-full rounded-md bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                                className="hover:shadow-form w-full rounded-2xl bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none p-2" >
                                                Nuclei Segmentation
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};
