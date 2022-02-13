function hasDuplicates(arr) {
    const hasDuplicate = new Set(arr).size != arr.length;
    return hasDuplicate;
}

class Game {
    getNewBoard(difficulty = 3) {
        if (difficulty > 2) this.difficulty = Math.floor(Math.random() * 3);
        else this.difficulty = difficulty;

        switch (this.difficulty) {
            case 0:
                this.difficultyText = "Easy";
                this.boardData = ProblemGetter.getEasyProblem();
                break;

            case 1:
                this.difficultyText = "Medium";
                this.boardData = ProblemGetter.getMediumProblem();
                break;

            case 2:
                this.difficultyText = "Hard";
                this.boardData = ProblemGetter.getHardProblem();
                break;
        }

        this.fullBoard = this.makeFullBoard();
        return;
    }

    makeFullBoard() {
        var fullBoard = [];

        for (var i = 0; i < 9; i += 1) {
            fullBoard.push([]);
            for (var j = 0; j < 9; j += 1) {
                var color = "white";
                if (i < 3 || i > 5) {
                    if (j < 3 || j > 5) color = "powderblue";
                } else {
                    if (i > 2 && i < 6 && j > 2 && j < 6) color = "powderblue";
                }

                fullBoard[i].push(new Cell(i, j, color));
            }
        }

        for (var i = 0; i < this.boardData.length; i += 1) {
            var cell = this.boardData[i];
            if (cell.value > 0) {
                fullBoard[cell.x][cell.y].init = true;
                fullBoard[cell.x][cell.y].value = cell.value;
            }
        }

        return fullBoard;
    }

    getInvalidRows() {
        var inValids = [];

        //"Check duplicate in Rows"

        for (var i = 0; i < 9; i += 1) {
            var arr = [];

            for (var j = 0; j < 9; j += 1) {
                this.fullBoard[i][j].currColor = this.fullBoard[i][j].initColor;

                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }

            if (hasDuplicates(arr)) {
                inValids.push(i);
            }
        }

        return inValids;
    }

    getInvalidCols() {
        var inValids = [];

        //"Check duplicate in Cols"

        for (var j = 0; j < 9; j += 1) {
            var arr = [];

            for (var i = 0; i < 9; i += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }

            if (hasDuplicates(arr)) {
                inValids.push(j);
            }
        }

        return inValids;
    }

    getInvalidSqrs() {
        var inValids = [];
        //"Check duplicate in Sqrs"

        //#region "Sqr 0"
        var sqr = 0;
        var arr = [];
        for (var i = 0; i < 3; i += 1) {
            for (var j = 0; j < 3; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 1"
        var sqr = 1;
        var arr = [];
        for (var i = 0; i < 3; i += 1) {
            for (var j = 3; j < 6; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 2"
        var sqr = 2;
        var arr = [];
        for (var i = 0; i < 3; i += 1) {
            for (var j = 6; j < 9; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 3"
        var sqr = 3;
        var arr = [];
        for (var i = 3; i < 6; i += 1) {
            for (var j = 0; j < 3; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 4"
        var sqr = 4;
        var arr = [];
        for (var i = 3; i < 6; i += 1) {
            for (var j = 3; j < 6; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 5"
        var sqr = 5;
        var arr = [];
        for (var i = 3; i < 6; i += 1) {
            for (var j = 6; j < 9; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 6"
        var sqr = 6;
        var arr = [];
        for (var i = 6; i < 9; i += 1) {
            for (var j = 0; j < 3; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 7"
        var sqr = 7;
        var arr = [];
        for (var i = 6; i < 9; i += 1) {
            for (var j = 3; j < 6; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        //#region "Sqr 8"
        var sqr = 8;
        var arr = [];
        for (var i = 6; i < 9; i += 1) {
            for (var j = 6; j < 9; j += 1) {
                if (this.fullBoard[i][j].value != 0) arr.push(this.fullBoard[i][j].value);
            }
        }

        if (hasDuplicates(arr)) {
            inValids.push(sqr);
        }
        //#endregion

        return inValids;
    }

    colorInvalidRows(invalidRows) {
        const invalidColor = "#ff5e6c";

        if (invalidRows.length < 1) return;

        console.log("Row :" + invalidRows);

        for (var i = 0; i < invalidRows.length; i += 1) {
            for (var j = 0; j < 9; j += 1) {
                var row = invalidRows[i];
                this.fullBoard[row][j].currColor = invalidColor;
            }
        }
        return;
    }

    colorInvalidCols(invalidCols) {
        const invalidColor = "#ff5e6c";

        if (invalidCols.length < 1) return;
        console.log("Col :" + invalidCols);

        for (var i = 0; i < invalidCols.length; i += 1) {
            for (var j = 0; j < 9; j += 1) {
                var col = invalidCols[i];
                this.fullBoard[j][col].currColor = invalidColor;
            }
        }
        return;
    }

    colorInvalidSqrs(invalidSqrs) {
        const invalidColor = "#ff5e6c";

        if (invalidSqrs.length < 1) return;
        console.log("Col :" + invalidSqrs);

        //#region "Sqr 0"
        var sqr = 0;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 0; i < 3; i += 1) {
                for (var j = 0; j < 3; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 1"
        var sqr = 1;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 0; i < 3; i += 1) {
                for (var j = 3; j < 6; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 2"
        var sqr = 2;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 0; i < 3; i += 1) {
                for (var j = 6; j < 9; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 3"
        var sqr = 3;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 3; i < 6; i += 1) {
                for (var j = 0; j < 3; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 4"
        var sqr = 4;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 3; i < 6; i += 1) {
                for (var j = 3; j < 6; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 5"
        var sqr = 5;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 3; i < 6; i += 1) {
                for (var j = 6; j < 9; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 6"
        var sqr = 6;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 6; i < 9; i += 1) {
                for (var j = 0; j < 3; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 7"
        var sqr = 7;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 6; i < 9; i += 1) {
                for (var j = 3; j < 6; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion

        //#region "Sqr 8"
        var sqr = 8;
        if (invalidSqrs.includes(sqr)) {
            for (var i = 6; i < 9; i += 1) {
                for (var j = 6; j < 9; j += 1) {
                    this.fullBoard[i][j].currColor = invalidColor;
                }
            }
        }
        //#endregion
    }

    checkZeros() {
        for (var i = 0; i < 9; i += 1) {
            for (var j = 0; j < 9; j += 1) {
                if (this.fullBoard[i][j].value == 0) return true;
            }
        }
        return false;
    }

    refreshUI() {
        const invalidRows = this.getInvalidRows();
        const invalidCols = this.getInvalidCols();
        const invalidSqrs = this.getInvalidSqrs();

        this.colorInvalidRows(invalidRows);
        this.colorInvalidCols(invalidCols);
        this.colorInvalidSqrs(invalidSqrs);

        mainContentVue.game = this;

        if (invalidRows.length == 0 && invalidCols.length == 0 && invalidSqrs.length == 0 && !this.checkZeros()) {
            gameOver = true;
            mainContentVue.controls = 1;
            if (selectedCellID) {
                var prevCell = getBoardCellByID(selectedCellID);
                prevCell.isSelected = false;
            }
        }
        this.autoSaveGame();
    }

    resetCurrGame() {
        for (var i = 0; i < 9; i += 1) {
            for (var j = 0; j < 9; j += 1) {
                if (!this.fullBoard[i][j].init) this.fullBoard[i][j].value = 0;
            }
        }
        this.refreshUI();
    }

    autoSaveGame() {
        this.selectedCellID = selectedCellID;
        localStorage.boardgame_sudoku = JSON.stringify(this);
    }

    autoLoadGame() {
        try {
            if (!localStorage.boardgame_sudoku || localStorage.boardgame_sudoku == null) return false;

            let loadedgame = JSON.parse(localStorage.boardgame_sudoku);
            game = new Game();

            game.difficulty = loadedgame.difficulty;
            game.difficultyText = loadedgame.difficultyText;
            game.boardData = loadedgame.boardData;
            game.fullBoard = loadedgame.fullBoard;
            selectedCellID = loadedgame.selectedCellID;

            mainContentVue.controls = 0;
            return true;
        } catch (e) {
            console.log("Exception", e);
            return false;
        }
    }
}
