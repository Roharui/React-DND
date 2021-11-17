import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const List = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Row = ({ data, index }) => {
  return (
    <Draggable draggableId={data} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {data}
        </Container>
      )}
    </Draggable>
  );
};

export { List, Row };
