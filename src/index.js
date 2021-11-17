import React, { useCallback, useState } from "react";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { List, Row } from "./Draggable";

const App = () => {
  const [data, setData] = useState(["1", "2", "3", "4", "5"]);

  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }

    setData((x) => {
      let [removed] = x.splice(result.source.index, 1);
      x.splice(result.destination.index, 0, removed);
      return x;
    });
  }, []);

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="test">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((x, i) => (
              <Row key={`ref-${x}`} data={x} index={i} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
