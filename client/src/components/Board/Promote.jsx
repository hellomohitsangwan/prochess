import React from 'react'
import Square from './Square'
import { move, moveNew } from '../../utils/ChessGame'
import "./Index.css"
import { useParams } from "react-router-dom";

const promotionPieces = ['r', 'n', 'b', 'q']

export default function Promote({
  promotion: { from, to, color },
}) {
  const {id} = useParams()
  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promote-square">
          <Square black={i % 3 === 0}>
            <div
              className="piece-container"
              onClick={()=>{id!=='local'?moveNew(from, to, p):move(from, to, p)}}
            >
              <img
                src={require(`../../assets/${p}_${color}.png`)}
                alt=""
                className="piece cursor-pointer"
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  )
}
