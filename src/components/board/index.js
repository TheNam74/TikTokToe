import "../../App.css"
import Square from "../square"

function Board({squares,onClick}) {
     function renderSquare(i) {
       return (
         <Square
           value={squares[i]}
           onClick={() => onClick(i)}
           key={i}
         />
       );
     }
     return (
       <div>
         {[0,1,2,3,4].map(el=>{
           return(
           <div className="board-row" key={el}>
           {[0,1,2,3,4].map(subEl=>{
             return renderSquare(el*5+subEl)
           })}
         </div>
         )          
         })}
       </div>
     );
   }

export default Board;
