import React, { useCallback, useState } from "react";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { List, Row } from "./Draggable";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const App = () => {
  const [data1, setData1] = useState([
    ["1", "1", "1", "1"],
    ["2", "2", "2", "2"],
    ["3", "3", "3", "3"],
    ["4", "4", "4", "4"],
    ["5", "5", "5", "5"],
  ]);
  const [data2, setData2] = useState([
    ["6", "6", "6", "6"],
    ["7", "7", "7", "7"],
    ["8", "8", "8", "8"],
    ["9", "9", "9", "9"],
    ["10", "10", "10", "10"],
  ]);

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

  const getList = (x) => {
    const dict = {
      test1: data1,
      test2: data2,
    };
    return dict[x];
  };

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "test2") {
        setData2(items);
      } else {
        setData1(items);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setData1(result["test1"]);
      setData2(result["test2"]);
    }
  });

  return (
    <>
      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="test1">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              <tbody>
                {data1.map((x, i) => (
                  <Row key={`ref-${x}`} data={x} index={i} />
                ))}
                {provided.placeholder}
              </tbody>
            </List>
          )}
        </Droppable>
        <br></br>
        <Droppable droppableId="test2">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              <tbody>
                {data2.map((x, i) => (
                  <Row key={`ref-${x}`} data={x} index={i} />
                ))}
                {provided.placeholder}
              </tbody>
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
