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
    // draggableId 는 전역적으로 유일해야만 합니다
    <Draggable draggableId={data[0]} index={index}>
      {(provided) => (
        // 아래 코드는 필수적으로 들어가야 합니다.
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
