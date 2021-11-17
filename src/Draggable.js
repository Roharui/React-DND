import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const List = styled.table`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

const TD = styled.td`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Row = ({ data, index }) => {
  return (
    <Draggable draggableId={data[0]} index={index}>
      {(provided) => (
        <tr
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {data.map((x, i) => (
            <TD key={i}>{x}</TD>
          ))}
        </tr>
      )}
    </Draggable>
  );
};

export { List, Row };
