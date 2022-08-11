import React from "react";
import { Field } from "./types";
import styles from "./RenderField.module.css";
import { FieldsProvider, useFields } from "./FieldsContext";

interface RenderFieldProps {
  fields: Field[];
  parents?: number[];
}

const RenderFields_Internal: React.FC<RenderFieldProps> = ({
  fields,
  parents,
}) => {
  const { triggerEdit } = useFields();
  return (
    <div>
      {fields.map((field, index) => {
        const newParents = parents ? [...parents, index] : [index];
        return (
          <div className={styles.field} key={field.id}>
            <div className={styles.details}>
              <p>
                <span>Name: </span>
                <span>{field.name}</span>
              </p>
              <p>
                <span>Id: </span>
                <span>{field.id}</span>
              </p>
              <code>{newParents.join(" , ")}</code>
              <button onClick={() => triggerEdit(newParents)}>Edit</button>
              <button>Delete</button>
            </div>
            {field.subFields ? (
              <div className={styles.subfields}>
                Children:
                <RenderFields_Internal
                  fields={field.subFields}
                  parents={newParents}
                />
              </div>
            ) : (
              <p>No Children</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const RenderModifiedFields = () => {
  const { modifiedFields } = useFields();
  return <RenderFields_Internal fields={modifiedFields} />;
};

export const RenderFields = ({ fields }: { fields: Field[] }) => {
  return (
    <FieldsProvider fields={fields}>
      <RenderModifiedFields />
    </FieldsProvider>
  );
};
