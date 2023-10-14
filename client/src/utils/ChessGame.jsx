import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()
let socketID;
let gameId;
let turnPlayed
export let gameSubject 

export function initGame(id, socket, turn) {
    socketID = socket;
    gameId = id
    turnPlayed = turn
    if(id!=='offline'){
        gameSubject = new BehaviorSubject();
        chess.reset();
        const savedGame = localStorage.getItem('savedOnlineChessGame')
        if (savedGame) {
            chess.load(savedGame)
        }
        updateGameNew()
    }else{
        gameSubject = new BehaviorSubject();
        const savedGame = localStorage.getItem('savedChessGame')
        if (savedGame) {
            chess.load(savedGame)
        }
        updateGame()
    }
    
}

export function resetGame() {
    chess.reset()
    updateGame()
}
export function resetGameNew() {
    chess.reset()
    updateGameNew()
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
export function handleMoveNew(from, to) {
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
    console.table(promotions)
    if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color }
        updateGameNew(pendingPromotion)
    }
    const { pendingPromotion } = gameSubject.getValue()

    if (!pendingPromotion) {
        moveNew(from, to)
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
export function moveNew(from, to, promotion) {
    let tempMove = { from, to }
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)

    if (legalMove) {
        updateGameNew()
    }
}
export function updateGameState(state) {
    chess.load(state);
    updateGame();
}
async function updateGameNew(pendingPromotion) {
    const isGameOver = chess.game_over()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        position: turnPlayed,
        result: isGameOver ? getGameResult() : null
    }
    let obj = {
        gameId: gameId,
        update: chess.fen(),
        turn:(chess.turn()),
      };
    gameSubject?.next(newGame)
    await socketID?.emit("send_update", {obj});
    // localStorage.setItem('savedOnlineChessGame', chess.fen())
}
function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        position: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }

    localStorage.setItem('savedChessGame', chess.fen())

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