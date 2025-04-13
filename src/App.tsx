// import React, { forwardRef, useImperativeHandle } from "react";

// type ParamType = "string";

// interface Param {
//   id: number;
//   name: string;
//   type: ParamType;
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

// interface ParamEditorProps {
//   params: Param[];
//   model: Model;
// }

// export interface ParamEditorRef {
//   getModel: () => Model;
// }

// const ParamEditor = forwardRef<ParamEditorRef, ParamEditorProps>(
//   ({ params, model }, ref) => {
//     const [paramValues, setParamValues] = React.useState<ParamValue[]>([]);

//     React.useEffect(() => {
//       const initializedValues = params.map((param) => {
//         const existing = model.paramValues.find((v) => v.paramId === param.id);
//         return {
//           paramId: param.id,
//           value: existing ? existing.value : "",
//         };
//       });
//       setParamValues(initializedValues);
//     }, [params, model.paramValues]);

//     const handleChange = (paramId: number, newValue: string) => {
//       setParamValues((prevValues) =>
//         prevValues.map((v) =>
//           v.paramId === paramId ? { ...v, value: newValue } : v
//         )
//       );
//     };

//     const getModel = (): Model => {
//       return {
//         paramValues: paramValues,
//         colors: model.colors,
//       };
//     };

//     useImperativeHandle(ref, () => ({
//       getModel,
//     }));

//     return (
//       <div>
//         <h3>Редактирование параметров:</h3>
//         {params.map((param) => {
//           const valueObj = paramValues.find((v) => v.paramId === param.id);
//           return (
//             <div key={param.id} style={{ marginBottom: "8px" }}>
//               <label>
//                 {param.name}:
//                 <input
//                   type="text"
//                   value={valueObj?.value || ""}
//                   onChange={(e) => handleChange(param.id, e.target.value)}
//                   style={{ marginLeft: "8px" }}
//                 />
//               </label>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// );

// const params: Param[] = [
//   { id: 1, name: "Название", type: "string" },
//   { id: 2, name: "Описание", type: "string" },
// ];

// const model: Model = {
//   paramValues: [{ paramId: 1, value: "Смартфон" }],
//   colors: [{ name: "Чёрный" }],
// };

// function App() {
//   const editorRef = React.useRef<ParamEditorRef>(null);

//   const handleGetModel = () => {
//     if (editorRef.current) {
//       const model = editorRef.current.getModel();
//       console.log("Модель:", model);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Редактор параметров</h2>
//       <ParamEditor ref={editorRef} params={params} model={model} />
//       <button onClick={handleGetModel}>Получить модель</button>
//     </div>
//   );
// }

// export default App;

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";


interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}


const ParamEditor = forwardRef<{ getModel: () => Model }, Props>(
  ({ params, model }, ref) => {
    const [paramValues, setParamValues] = useState<ParamValue[]>([]);

    
    useEffect(() => {
      const initializedValues = params.map((param) => {
        const existingValue = model.paramValues.find(
          (v) => v.paramId === param.id
        );
        return {
          paramId: param.id,
          value: existingValue ? existingValue.value : "",
        };
      });
      setParamValues(initializedValues);
    }, [params, model.paramValues]);

    
    const handleParamChange = (paramId: number, value: string) => {
      setParamValues((prevValues) =>
        prevValues.map((item) =>
          item.paramId === paramId ? { ...item, value } : item
        )
      );
    };

    
    const getModel = (): Model => {
      return {
        paramValues: paramValues,
        colors: model.colors,
      };
    };

    
    useImperativeHandle(ref, () => ({
      getModel,
    }));

    return (
      <div>
        {params.map((param) => {
          const paramValue = paramValues.find((v) => v.paramId === param.id);
          return (
            <div key={param.id} style={{ marginBottom: "10px" }}>
              <label>
                {param.name}:
                <input
                  type="text"
                  value={paramValue?.value || ""}
                  onChange={(e) => handleParamChange(param.id, e.target.value)}
                  style={{ marginLeft: "8px" }}
                />
              </label>
            </div>
          );
        })}
      </div>
    );
  }
);


const App = () => {
  const editorRef = React.useRef<{ getModel: () => Model }>(null);

  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
    colors: [{ name: "Чёрный" }],
  };

  const handleGetModel = () => {
    if (editorRef.current) {
      const currentModel = editorRef.current.getModel();
      console.log("Current model:", currentModel);
      alert(JSON.stringify(currentModel, null, 2));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Редактор параметров товара</h2>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button
        onClick={handleGetModel}
        style={{ marginTop: "20px", padding: "8px 16px" }}
      >
        Получить модель
      </button>
    </div>
  );
};

export default App;
