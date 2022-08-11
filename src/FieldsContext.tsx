import * as React from "react";
import { Modal } from "./Modal";
import { Field } from "./types";
import styles from "./RenderField.module.css";

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const getField = (fields: Field[], indexes: number[]): Field => {
  let field = fields[indexes[0]];
  for (let i = 1; i < indexes.length; i++) {
    if (!field.subFields) {
      return field;
    }
    field = field.subFields[indexes[i]];
  }
  return field;
};

const FieldsContext = React.createContext({
  originalFields: [] as Field[],
  modifiedFields: [] as Field[],
  setModifiedFields: (() => {}) as React.Dispatch<
    React.SetStateAction<Field[]>
  >,
  setActiveIndexes: (() => {}) as React.Dispatch<
    React.SetStateAction<number[] | null>
  >,
  activeIndexes: null as number[] | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  triggerEdit: (_indexes: number[]) => {},
  handleCloseModal: () => {},
  handleSubmit: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDelete: (_indexes: number[]) => {},
});

export const FieldsProvider = ({
  children,
  fields: originalFields,
}: {
  children: React.ReactNode;
  fields: Field[];
}) => {
  const originalFieldsRef = React.useRef({ originalFields });
  const [modifiedFields, setModifiedFields] = React.useState(() => {
    return originalFieldsRef.current.originalFields;
  });
  const [activeIndexes, setActiveIndexes] = React.useState<number[] | null>(
    null
  );
  const [editValue, setEditValue] = React.useState("");

  React.useEffect(() => {
    if (!activeIndexes) return;
    const field = getField(modifiedFields, activeIndexes);
    setEditValue(field.name);
  }, [activeIndexes, modifiedFields]);

  const triggerEdit = (indexes: number[]) => {
    setActiveIndexes(indexes);
  };
  const handleCloseModal = () => {
    setActiveIndexes(null);
  };

  const handleSubmit = () => {
    if (!activeIndexes) return;
    const clonedFields = deepClone(modifiedFields);
    const field = getField(clonedFields, activeIndexes);
    field.name = editValue;
    setModifiedFields(clonedFields);
    handleCloseModal();
  };

  const handleDelete = (indexes: number[]) => {
    if (indexes.length === 1) {
      setModifiedFields((p) => {
        const clonedFields = deepClone(p);
        clonedFields.splice(indexes[0], 1);
        return clonedFields;
      });
      return;
    }
    const clonedFields = deepClone(modifiedFields);
    const lastIndex = indexes[indexes.length - 1];
    const parentField = getField(clonedFields, indexes.slice(0, -1));
    if (parentField.subFields) {
      parentField.subFields.splice(lastIndex, 1);
    }
    setModifiedFields(clonedFields);
  };

  return (
    <FieldsContext.Provider
      value={{
        originalFields: originalFieldsRef.current.originalFields,
        modifiedFields,
        setModifiedFields,
        setActiveIndexes,
        activeIndexes,
        handleCloseModal,
        handleSubmit,
        triggerEdit,
        handleDelete,
      }}
    >
      {Boolean(activeIndexes) && (
        <Modal>
          <div className={styles.modalContent}>
            <textarea
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            ></textarea>
          </div>
          <button onClick={handleCloseModal}>Close</button>
          <button onClick={handleSubmit}>Submit</button>
        </Modal>
      )}
      {children}
    </FieldsContext.Provider>
  );
};

export const useFields = () => {
  const context = React.useContext(FieldsContext);
  if (!context) {
    throw new Error("useFields must be used within a FieldsProvider");
  }
  return context;
};
