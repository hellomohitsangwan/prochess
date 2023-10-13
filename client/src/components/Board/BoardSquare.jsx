import React, { useEffect, useState } from 'react'
import Square from './Square'
import Piece from './Piece'
import { useDrop } from 'react-dnd'
import { handleMove,gameSubject, handleMoveNew } from '../../utils/ChessGame'
import Promote from './Promote'
import "./Index.css"
import { useParams } from 'react-router-dom'

const BoardSquare = ({ piece, black, position }) => {
  const [promotion, setPromotion] = useState(null);
  const {id} = useParams()
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split('_')
      // handleMove(fromPosition, position)
      {id!=='offline'?handleMoveNew(fromPosition, position):handleMove(fromPosition, position);}
    },
  });

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    );
    return () => subscribe.unsubscribe();
  }, [position]);

  return (
    <div className="board-square" ref={drop}>
      <Square black={black}>
        {promotion ? (
          <Promote promotion={promotion}/>
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
};

export default BoardSquare;
