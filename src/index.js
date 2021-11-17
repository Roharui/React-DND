import React, { useCallback, useState } from "react";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { List, Row } from "./Draggable";

// 같은 배열 안의 요소간에 순서를 바꾸는 함수
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// 다른 배열의 요소간에 순서를 바꾸는 함수
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
  // 데이터1
  const [data1, setData1] = useState([
    ["01", "01", "01", "01"],
    ["02", "02", "02", "02"],
    ["03", "03", "03", "03"],
    ["04", "04", "04", "04"],
    ["05", "05", "05", "05"],
  ]);
  // 데이터2
  const [data2, setData2] = useState([
    ["06", "06", "06", "06"],
    ["07", "07", "07", "07"],
    ["08", "08", "08", "08"],
    ["09", "09", "09", "09"],
    ["10", "10", "10", "10"],
  ]);

  // 이벤트 처리 함수들
  // 참고 -> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/drag-drop-context.md
  const onBeforeCapture = useCallback(() => {}, []);
  const onBeforeDragStart = useCallback(() => {}, []);
  const onDragStart = useCallback(() => {}, []);
  const onDragUpdate = useCallback(() => {}, []);

  // 바꿀 리스트를 얻게 되는 함수
  const getList = (x) => {
    const dict = {
      test1: data1,
      test2: data2,
    };
    return dict[x];
  };

  // 필수!
  // 드래그가 끝날 경우 발생하는 이벤트
  const onDragEnd = useCallback((result) => {
    // source : 드래그 한 컴포넌트 정보
    // destination : 드롭한 컴포넌트 정보
    const { source, destination } = result;

    // 만약 드롭한 곳이 Droppable이 아닐경우
    if (!destination) {
      return;
    }

    // 같은 위치에서 순서만 변경한 경우
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
    }
    // 다른 리스트로 이동한 경우
    else {
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
        {/* dropabledId 는 전역적으로 유일해야함! */}
        <Droppable droppableId="test1">
          {(provided) => (
            // 아래 코드는 필수적으로 들어가야합니다.
            <List ref={provided.innerRef} {...provided.droppableProps}>
              <tbody>
                {/* 내부 데이터를 리스팅합니다. */}
                {data1.map((x, i) => (
                  <Row key={`ref-${x}`} data={x} index={i} />
                ))}
                {/* 필수! */}
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
