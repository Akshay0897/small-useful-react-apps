import React, { useState } from 'react';
import './App.css';
import { useDrag, DndProvider, useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function Card({ isDragging, text, type }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type, text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className="card" ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}

export function DroppableSpot({ type, text, setText }) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: type,
    drop: (item) => {

      if(item.type === ItemTypes.CARD)
         setText(Number(item.text));
      else
        setText(item.text)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  let backGroundColor = '#f2f2f2';

  if (canDrop) backGroundColor = '#3db897';
  if (isOver) backGroundColor = '#4bdcb5';

  return (
    <div
      className="spot"
      ref={drop}
      style={{ backgroundColor: backGroundColor }}
    >
      {text}
    </div>
  );
}

export default function App() {
  const [number1, setnumber1] = useState(1);
  const [number2, setnumber2] = useState(1);
  const [operator, setoperator] = useState('+');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {/* math card */}

        <div>
          <div className="cards numbers">
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Card
                  key={i}
                  className="card"
                  text={i + 1}
                  type={ItemTypes.CARD}
                >
                  {i + 1}
                </Card>
              ))}
          </div>

          <div className="math-card">
            <DroppableSpot
              type={ItemTypes.CARD}
              text={number1}
              setText={setnumber1}
            >
              1
            </DroppableSpot>
            <DroppableSpot
              type={ItemTypes.CARD}
              text={number2}
              setText={setnumber2}
            >
              1
            </DroppableSpot>
            <DroppableSpot
              className="spot"
              type={ItemTypes.OPERATOR}
              text={operator}
              setText={setoperator}
            >
              +
            </DroppableSpot>
            <div className="total">{eval(`${number1}${operator}${number2}`)}</div>
          </div>

          <div className="cards operators">
            {['*', '-', '+', '/'].map((o, i) => (
              <Card key={i} text={o} type={ItemTypes.OPERATOR} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
