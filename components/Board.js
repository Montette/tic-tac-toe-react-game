class Board extends React.Component {

    constructor() {
        super()
        this.state = {
            squares: Array(9).fill(null), // stan początkowy, inicjalizujemy tablicę 9 elementów(kwadratów), pustych na poczatku
            xIsNext: true
        }

    }

    resetClick() {
        this.setState({
            squares: Array(9).fill(null),

        })
    }


    handleClick(i) { // zdarzenie odpalające się w momencie klikniecia na kwadrat, zmienia stan
        const squares = this.state.squares.slice(); // w zmiennej squares definiujemy klikniety kwadrat
        if (calculateWinner(squares) || squares[i]) // blokujemy klikanie 1) gdy ktoś wygra || 2) klikanie kliknietego wczesniej kwadratu
            return
        squares[i] = 'X';

        this.setState({
            squares: squares, // zmiana stanu
            xIsNext: !this.state.xIsNext
        })

//        var res;

        function randomS() {
            res = Math.floor(Math.random() * 9);
            setTimeout(display(res), 5000)
        };
        randomS();

        function display(res) {
            console.log(res)
            if (calculateWinner(squares)) {
                return
            } else if (squares[res] == 'X' || squares[res] == 'O') {
                console.log('powtorka');
                randomS()
            } else {
                squares[res] = 'O';

            }
        }

    }

   renderSquare(i) {
        return <Square onClick = {
            () => this.handleClick(i)
        }
        value = {
            this.state.squares[i]
        }
        />
    }

    render() {

        let info = '';
        const winner = calculateWinner(this.state.squares);
        const draw = calculateDraw(this.state.squares);
        //        const info = winner ? 'The winner is ' + winner : ('Next player is: ' + (this.state.xIsNext ? 'X' : 'O'))
        // sprawdzamy czy ktoś wygrał, jeżeli tak to renderujemy odpowiedni komunikat, jeżeli nie to wyświetlamy info, czyha jest następna kolejka
        if (winner) {
            info = 'The winner is ' + winner;
        } else if (draw) {
            info = 'draw';
        } else {
            info = ('Next player is: ' + (this.state.xIsNext ? 'X' : 'O'))
        };





        return ( <
            div >
            <
            div > {
                info
            } < /div> <
            div className = 'board-row' > {
                this.renderSquare(0)
            } {
                this.renderSquare(1)
            } {
                this.renderSquare(2)
            } <
            /div>

            <
            div className = 'board-row' > {
                this.renderSquare(3)
            } {
                this.renderSquare(4)
            } {
                this.renderSquare(5)
            } <
            /div>

            <
            div className = 'board-row' > {
                this.renderSquare(6)
            } {
                this.renderSquare(7)
            } {
                this.renderSquare(8)
            } <
            /div> <
            button onClick = {
                () => this.resetClick()
            } > New game < /button>

            <
            /div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

function calculateDraw(squares) {
    let counter = 0;
    for (let i = 0; i < 9; i++) {
        if (squares[i] !== null) {
            counter++
        }
    }
    return counter == 9
}
