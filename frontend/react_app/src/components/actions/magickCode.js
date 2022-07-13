// import axios from "axios";
// import { tokenConfig } from "./auth";
// import { returnErrors } from "./messages";
// import { 
//     MAGICK_CODE,
//  } from "./types";


// export const getMagickCode = () => (dispatch, getState) => {
//   axios
//     .get("http://127.0.0.1/api/code/", tokenConfig(getState))
//     .then((res) => {
//       dispatch({
//         type: MAGICK_CODE,
//         payload: res.data,
//       });
//     });
// };

// export const createMagickCode = () => (dispatch, getState) => {
//     axios
//       .post("http://127.0.0.1/api/code/",null, tokenConfig(getState))
//       .then((res) => {
//         dispatch({
//           type: MAGICK_CODE,
//           payload: res.data,
//         });
//       });
//   };
