import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import "./Index.css";

export default function Piece({ piece: { type, color }, position }) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "piece",
    item: { type: "piece", id: `${position}_${type}_${color}` },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const pieceImg = require(`../../assets/${type}_${color}.png`);
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <div className="piece-container" ref={drag}>
        <img
          src={pieceImg}
          width={80}
          alt=""
          className="piece"
          ref={drag}
          style={{ opacity: isDragging ? 0 : 1 }}
        />
      </div>
    </>
  );
}
