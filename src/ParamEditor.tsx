// import React, { useState, useEffect } from "react";

// interface Param {
//   id: number;
//   name: string;
//   type: "string";
// }

// interface ParamValue {
//   paramId: number;
//   value: string;
// }

// interface Color {
//   name: string;
// }

// interface Model {
//   paramValues: ParamValue[];
//   colors: Color[];
// }

// interface Props {
//   params: Param[];
//   model: Model;
// }

// const ParamEditor: React.FC<Props> = ({ params, model }) => {
//   const [paramValues, setParamValues] = useState<ParamValue[]>([]);

//   useEffect(() => {
//     const initializedValues = params.map((param) => {
//       const existing = model.paramValues.find((v) => v.paramId === param.id);
//       return {
//         paramId: param.id,
//         value: existing ? existing.value : "",
//       };
//     });
//     setParamValues(initializedValues);
//   }, [params, model.paramValues]);

//   const handleChange = (paramId: number, newValue: string) => {
//     setParamValues((prevValues) =>
//       prevValues.map((v) =>
//         v.paramId === paramId ? { ...v, value: newValue } : v
//       )
//     );
//   };

//   const getModel = (): Model => {
//     return {
//       paramValues: paramValues,
//       colors: model.colors,
//     };
//   };

//   const handleGetModel = () => {
//     console.log(getModel());
//   };

//   return (
//     <div>
//       <h3>Редактирование параметров:</h3>
//       {params.map((param) => {
//         const valueObj = paramValues.find((v) => v.paramId === param.id);
//         return (
//           <div key={param.id} style={{ marginBottom: "8px" }}>
//             <label>
//               {param.name}:
//               <input
//                 type="text"
//                 value={valueObj?.value || ""}
//                 onChange={(e) => handleChange(param.id, e.target.value)}
//                 style={{ marginLeft: "8px" }}
//               />
//             </label>
//           </div>
//         );
//       })}
//       <button onClick={handleGetModel} style={{ marginTop: "16px" }}>
//         Получить модель (смотреть в консоли)
//       </button>
//     </div>
//   );
// };

// export default ParamEditor;
