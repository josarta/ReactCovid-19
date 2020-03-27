import React, { useState } from "react";
import {
  AnnotationLabel,
  EditableAnnotation,
  ConnectorLine,
  ConnectorEndDot,
  Note
} from "react-annotation";

const MyAnnotation = ({ title, label, x, y, labelX, labelY }) => {
  const [values, setVaules] = useState({});
  return (
    <div>
      <EditableAnnotation
        x={150}
        y={170}
        dy={117}
        dx={162}
        color={"#59039c"}
        title={title}
        label={label}
        className="show-bg"
      >
        <ConnectorLine>
          <ConnectorEndDot />
        </ConnectorLine>
        <Note
          align={"middle"}
          orientation={"topBottom"}
          bgPadding={20}
          padding={15}
          titleColor={"#9610ff"}
          lineType={null}
        />
      </EditableAnnotation>
    </div>
  );
};

export default MyAnnotation;