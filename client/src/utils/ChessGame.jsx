// import * as Chess from 'chess.js'
// import { BehaviorSubject } from 'rxjs'

// const chess = new Chess();

// let from1;
// let to1;
// let type1;
// let promotion1;


// export const gameSubject = new BehaviorSubject({
//     board : chess.board()
// })

// export function initGame() {
//     const savedGame = localStorage.getItem('savedGame')
//     if (savedGame) {
//         chess.load(savedGame)
//     }
//     updateGame()
// }

// export function resetGame() {
//     chess.reset()
//     updateGame()
// }

// export function handleMove(from, to) {
//     const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
//     if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
//       const pendingPromotion = { from, to, color: promotions[0].color };
//       updateGame(pendingPromotion);
//     }
//     const { pendingPromotion } = gameSubject.getValue();
//     if (!pendingPromotion) {
//       move(from, to);
//     }
//   }


//   export function move(from, to, promotion) {
//     let tempMove = { from, to };
//     if (promotion) {
//       tempMove.promotion = promotion;
//     }
  
//     if (
//       chess
//         .moves({ verbose: true })
//         .some((move) => move.from === from && move.to === to)
//     ) {
//       const legalMove = chess.move(tempMove);
  
//       if (legalMove) {
//         from1 = from;
//         to1 = to;
//         type1 = chess.get(to).type;
//         promotion1 = promotion
//         updateGame();
//       }
//     } else {
//       console.error(`Invalid move: {"from":"${from}","to":"${to}"}`);
//     }
//   }


//   export function updateState(state) {
//     chess.load(state);
//     updateGame();
//   }

//   function updateGame(pendingPromotion) {
//     const isGameOver = chess.isGameOver();
//     const newGame = {
//       board: chess.board(),
//       pendingPromotion,
//       isGameOver,
//       turn: chess.turn(),
//       result: isGameOver ? getGameResult() : null,
//     };
  
//     if (chess.turn() === "w") {
//       const blackMoves = JSON.parse(localStorage.getItem("blackMoves")) || [];
//       if (to1) {
//         if (blackMoves.length === 0) {
//           blackMoves.push({ to: to1, from: from1, type: type1, promotion:promotion1 });
//           localStorage.setItem("blackMoves", JSON.stringify(blackMoves));
//         } else {
//           if (
//             to1 !== blackMoves[blackMoves.length - 1].to &&
//             from1 !== blackMoves[blackMoves.length - 1].from
//           ) {
//             blackMoves.push({ to: to1, from: from1, type: type1, promotion:promotion1 });
//             localStorage.setItem("blackMoves", JSON.stringify(blackMoves));
//           }
//         }
//       }
//     }
  
//     if (chess.turn() === "b") {
//       const whiteMoves = JSON.parse(localStorage.getItem("whiteMoves")) || [];
//       if (to1) {
//         if (whiteMoves.length === 0) {
//           whiteMoves.push({ to: to1, from: from1, type: type1, promotion:promotion1 });
//           localStorage.setItem("whiteMoves", JSON.stringify(whiteMoves));
//         } else {
//           if (
//             to1 !== whiteMoves[whiteMoves.length - 1].to &&
//             from1 !== whiteMoves[whiteMoves.length - 1].from
//           ) {
//             whiteMoves.push({ to: to1, from: from1, type: type1, promotion:promotion1 });
//             localStorage.setItem("whiteMoves", JSON.stringify(whiteMoves));
//           }
//         }
//       }
//     }
  
//     localStorage.setItem("saveGame", chess.fen());
//     gameSubject.next(newGame);
//   }

// function getGameResult() {
//     if (chess.in_checkmate()) {
//         const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
//         return `CHECKMATE - WINNER - ${winner}`
//     } else if (chess.in_draw()) {
//         let reason = '50 - MOVES - RULE'
//         if (chess.in_stalemate()) {
//             reason = 'STALEMATE'
//         } else if (chess.in_threefold_repetition()) {
//             reason = 'REPETITION'
//         } else if (chess.insufficient_material()) {
//             reason = "INSUFFICIENT MATERIAL"
//         }
//         return `DRAW - ${reason}`
//     } else {
//         return 'UNKNOWN REASON'
//     }
// }







import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'



const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export function initGame() {
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
        chess.load(savedGame)
    }
    updateGame()
}

export function resetGame() {
    chess.reset()
    updateGame()
}

export function handleMove(from, to) {
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
    console.table(promotions)
    if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color }
        updateGame(pendingPromotion)
    }
    const { pendingPromotion } = gameSubject.getValue()

    if (!pendingPromotion) {
        move(from, to)
    }
}


export function move(from, to, promotion) {
    let tempMove = { from, to }
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)

    if (legalMove) {
        updateGame()
    }
}

function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }

    localStorage.setItem('savedGame', chess.fen())

    gameSubject.next(newGame)
}
function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - WINNER - ${winner}`
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return 'UNKNOWN REASON'
    }
}