let redTileCount = 0;
let yellowTileCount = 0;
var cellBlankImgSrc = "Assets/Board_TIle.png";
let column1Amount = 0;
let column2Amount = 0;
let column3Amount = 0;
let column4Amount = 0;
let column5Amount = 0;
let column6Amount = 0;
let column7Amount = 0;

function changeTile(columnNumber){
    if (columnNumber == 1){
        column1Amount++;
        if(column1Amount == 6){
            document.getElementById("column" + columnNumber).style.pointerEvents="none";
        }
    }else if (columnNumber == 2){
        column2Amount++;
        if(column2Amount == 6){
            document.getElementById("column" + columnNumber).style.pointerEvents="none";
        }
    }else if (columnNumber == 3){
        column3Amount++;
        if(column3Amount == 6){
            document.getElementById("column" + columnNumber).style.pointerEvents="none";
        }
    }else if (columnNumber == 4){
        column4Amount++;
        if(column4Amount == 6){
            document.getElementById("column" + columnNumber).style.pointerEvents="none";
        }
    }else if (columnNumber == 5){
        column5Amount++;
        if(column5Amount == 6){
            document.getElementById("column" + columnNumber).style.pointerEvents="none";
        }
    }else if (columnNumber == 6){
        column6Amount++;
        if(column6Amount == 6){
            document.getElementById("column" + columnNumber).style.pointerEvents="none";
        }
    }else{
        column7Amount++;
        if(column7Amount == 6){
            document.getElementById("column" + columnNumber).style.pointerEvents="none";
        }
    }

    if (redTileCount == yellowTileCount){
        document.getElementById("statusTitle").innerHTML="Blue's Turn";
        document.getElementById("statusBar").style.backgroundColor="#6a9aba";
        document.getElementById("statusBar").style.borderColor="#003049";
        for (let x=1; x<7; x++){
            let imgSrc = (document.getElementById("cell" + columnNumber + x).getAttribute('src'));
            if((imgSrc != cellBlankImgSrc)){
                document.getElementById("cell" + columnNumber + (x - 1)).src="Assets/Red_Tile.png";
                redTileCount++; 
                winCheck("Red");
                break;
            }
            if (x==6 && imgSrc == cellBlankImgSrc){
                document.getElementById("cell" + columnNumber + "6").src="Assets/Red_Tile.png";
                redTileCount++
                winCheck("Red");
            }
        }
    }else{
        document.getElementById("statusTitle").innerHTML="Red's Turn";
        document.getElementById("statusBar").style.backgroundColor="#bb2226";
        document.getElementById("statusBar").style.borderColor="#780000";
        for (let y=1; y<7; y++){
            let imgSrc = (document.getElementById("cell" + columnNumber + y).getAttribute('src'));
            if((imgSrc != cellBlankImgSrc)){
                document.getElementById("cell" + columnNumber + (y - 1)).src="Assets/Yellow_Tile.png";
                yellowTileCount++; 
                winCheck("Yellow");
                break;
            }
            if (y==6 && imgSrc == cellBlankImgSrc){
                document.getElementById("cell" + columnNumber + "6").src="Assets/Yellow_Tile.png";
                yellowTileCount++;
                winCheck("Yellow");
            }
        }
    }
}

function winCheck(color){
    for(let i=1; i<8; i++){
        let columnCount=0;
        for(let j=1; j<7; j++){
            let columnCellSrc = (document.getElementById("cell" + i + j).getAttribute('src'));
            let columnCellSrcColor =  "Assets/" + color + "_Tile.png"
            if (columnCellSrc == columnCellSrcColor){
                columnCount++;
                if (columnCount == 4){
                    for(let k=0; k<=3; k++){
                        document.getElementById("cell" + i + (j-k)).src = "Assets/" + color + "_Column_Tile.png";
                    }
                    win(color);
                }
            }else{
                columnCount=0;
            }
        }
    }

    for(let i=1; i<7; i++){
        let rowCount = 0;
        for(let j=1; j<8; j++){
            let rowCellSrc = (document.getElementById("cell" + j + i).getAttribute('src'));
            let rowCellSrcColor = "Assets/" + color + "_Tile.png";
            if (rowCellSrc == rowCellSrcColor){
                rowCount++;
            }else{
                rowCount=0;
            }

            if (rowCount == 4){
                for(let k=0; k<=3; k++){
                    document.getElementById("cell" + (j-k) + i).src = "Assets/" + color + "_Row_Tile.png";
                }
                win(color);
            }
        }
    }


    let fallCount = 0;
    for (let i=1; i<=4; i++){
        for (let j=1; j<=3; j++){
            let fallCellSrc = (document.getElementById("cell" + i + j).getAttribute('src'));
            let fallCellSrcColor =  "Assets/" + color + "_Tile.png";
            if(fallCellSrc == fallCellSrcColor){
                fallCount++;
                for(let k=1; k<=3; k++){
                    fallCellSrc = (document.getElementById("cell" + (i+k) + (j+k)).getAttribute('src'));
                    if (fallCellSrc == fallCellSrcColor){
                        fallCount++;
                    }else{
                        fallCount=0;
                    }
                }
                if(fallCount == 4){
                    for(let l=0; l<=3; l++){
                        document.getElementById("cell" + (i+l) + (j+l)).src = "Assets/" + color + "_Fall_Tile.png";
                    }
                    win(color);
                }
            }else{
                fallCount=0;
            }
        }
    }

    let riseCount=0;
    for (let i=7; i>=4; i--){
        for (let j=1; j<=3; j++){
            let riseCellSrc = (document.getElementById("cell" + i + j).getAttribute('src'));
            let riseCellSrcColor =  "Assets/" + color + "_Tile.png";
            if (riseCellSrc == riseCellSrcColor){
                riseCount++;
                for(let k=1; k<=3; k++){
                    riseCellSrc = (document.getElementById("cell" + (i-k) + (j+k)).getAttribute('src'));
                    if(riseCellSrc == riseCellSrcColor){
                        riseCount++;
                    }else{
                        riseCount=0;
                    }
                }
                if(riseCount == 4){
                    for(let l=0; l<=3; l++){
                        document.getElementById("cell" + (i-l) + (j+l)).src = "Assets/" + color + "_Rise_Tile.png";
                    }
                    win(color);
                }
            }else{
                riseCount=0;
            }
        }
    }
}

function win(color){
    document.getElementById("gameBoard").style.pointerEvents = "none";
    if (color == "Red"){
        document.getElementById("statusTitle").innerHTML="Red Won!";
        document.getElementById("statusBar").style.backgroundColor="#bb2226";
        document.getElementById("statusBar").style.borderColor="#780000";
    }else{
        document.getElementById("statusTitle").innerHTML="Blue Won!";
        document.getElementById("statusBar").style.backgroundColor="#6a9aba";
        document.getElementById("statusBar").style.borderColor="#003049";
    }
}