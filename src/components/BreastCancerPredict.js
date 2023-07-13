import React, { useState, useEffect } from 'react'

export default function BreastCancerPredict() {

    const [file, setFile] = useState(null);
    const [image, setImage] = useState('');
    const [predicting, setOut] = useState(false);
    const [predicted, setPredicted] = useState(false);
    const [prediction, setOutput] = useState('');
    const [response, setResponse] = useState(null);
    const [convertedImg, setConvertedImg] = useState('');


    const FileChange = (e) => {
        setOut(false);
        setPredicted(false);
        setConvertedImg('');
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        reader.onloadend = () => {
            setFile(selectedFile);
            setImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setOut(true);
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:5001/api/yolov5', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        mfa: 'your_header_value',
                    },
                });
                if (!response.ok) {
                    throw new Error('Request failed with status ' + response.status);
                }
                const responseData = await response.json();
                console.log(responseData);
                setResponse(responseData);
                if (responseData.code === 0) {
                    setOutput(responseData.all);
                    setPredicted(true);
                } else {
                    setPredicted(false);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            document.getElementById('filered').innerHTML = 'File Could not be Found.';
        }
        setOut(false);
    };

    return (
        <div className="bg-gray-100">
            <p className="text-center text-5xl pt-14 text-gray-400">
                Allred Scoring
            </p>

            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white rounded-2xl">


                    {(predicted && response) ?
                        <>
                            <div class="">
                                <div class="flex items-center justify-center w-auto pt-8">
                                    <img src={image} alt="input-image-copy" class="h-auto mx-auto" />
                                    <img src={`data:image/png;base64,${response.image}`} alt="output" class="h-auto mx-auto" />
                                    
                                </div>
                                <br/>
                                <div class="flex items-center justify-center">
                                    <p class="font-semibold mx-auto">Input</p>
                                    <p class="font-semibold mx-auto">Prediction</p>
                                </div>
                            </div>
                            <div className="text-center pt-4">
                                <div>
                                    <h3 className="font-bold underline">Predicted Counts</h3>
                                    <h3>
                                        N: <span>{response.n}</span>
                                    </h3>
                                    <h3>
                                        W: <span>{response.w}</span>
                                    </h3>
                                    <h3>
                                        M: <span>{response.m}</span>
                                    </h3>
                                    <h3>
                                        S: <span>{response.s}</span>
                                    </h3>
                                    <h3>
                                        All: <span>{response.all}</span>
                                    </h3>
                                </div>
                                <br />
                            </div>

                        </>
                        :
                        <>

                            <form
                                className="py-6 px-9"
                                onSubmit={(e) => handleFormSubmit(e)}>

                                <div className="pt-4 text-center">
                                    <label className="block text-2xl font-semibold text-gray-600 ">
                                        Upload File
                                    </label>
                                    <div className="flex items-center justify-center p-4">
                                        <input className="p-2 block w-full text-sm text-gray-100 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" onChange={FileChange} />
                                    </div>

                                </div>
                                <div>
                                    <button
                                        // className="hover:shadow-form w-full rounded-md bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        className="hover:shadow-form w-full rounded-2xl bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none" >
                                        Predict
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}
