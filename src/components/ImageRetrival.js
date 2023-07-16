// import React, { useState, useEffect } from 'react'
// import jwt_decode from "jwt-decode";

// export default function ImageRetrival() {
//   const [images, setImages] = useState([]);

//   let dataToken

//   if (localStorage.getItem('token') !== null) {
//     let token = localStorage.getItem('token')

//     dataToken = jwt_decode(token)

//   }

//   let username = dataToken.name;
//   useEffect(() => {
//     async function getImages() {
//       const response = await fetch(process.env.RREACT_APP_HOST + '/fetchImage', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           user: username,
//         })
//       });
//       const data = await response.json();
//       console.log("data",data.images);
//       setImages(data.images);
//     }
//     getImages();
//   }, []);

//   return (
//     <>
//       <h1 className="fw-light">Previous Prediction Results</h1>
//       <table className="table table-hover" id="tab">
//         <thead className="bg-dark text-white sticky-top">
//           <tr>
//             <th>Image</th>
//             <th className="text-center">Prediction</th>
//             <th className="text-center">Label</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             images != null ?
//               images.map((row) =>
//                 <tr key={row._id}>
//                   <td><img className="img-thumbnail" src={row.image} alt="input" /></td>
//                   <td className="text-center">{row.prediction}</td>
//                   <td className="text-center">{row.truth ? <p className="text-success">Correct</p> : <p className="text-danger">Wrong</p>}</td>
//                 </tr>
//               ) : <p>no images :(</p>
//           }
//         </tbody>
//       </table>
//     </>
//   );
// }

// import React from 'react'

// export default function ImageRetrival() {
//   return (
//     <div><img src = "image.png">
//       </img></div>
//   )
// }

import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function ImageRetrieval() {
  const [images, setImages] = useState([]);

  let dataToken;

  if (localStorage.getItem('token') !== null) {
    let token = localStorage.getItem('token');
    dataToken = jwt_decode(token);
  }

  let username = dataToken.name;

  useEffect(() => {
    async function getImages() {
      try {
        const response = await fetch('http://localhost:4000/api/fetchImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        console.log('data', data.images);
        setImages(data.images);
      } catch (error) {
        console.error(error);
      }
    }

    getImages();
  }, [username]);

  return (
    <>
      <h1 className="font-light text-2xl text-center p-2">Previous Prediction Results</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200 border border-gray-300">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4 text-center">Prediction</th>
              <th className="py-2 px-4 text-center">Label</th>
            </tr>
          </thead>
          <tbody>
            {images.length > 0 ? (
              images.map((image) => (
                <tr key={image._id} className="border-b border-gray-300">
                  <td className="py-2 px-4 text-center">
                    <img
                      className="mx-auto h-16 w-16 object-cover rounded-md"
                      src={image.img}
                      alt="input"
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    {image.prediction > 0.5 ? (
                      <span className="text-red-500">Paracitised</span>
                    ) : (
                      <span className="text-green-500">Non-paracitised</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {image.truth ? (
                      <span className="text-green-500">Correct</span>
                    ) : (
                      <span className="text-red-500">Wrong</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-6 text-center">
                  <p>No images found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>


  );
}
