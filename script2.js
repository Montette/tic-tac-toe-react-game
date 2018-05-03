class Square extends React.Component {
    render() {
        return ( <
            div onClick = {
                this.props.onClick
            }
            className = 'square' > {
                this.props.value
            } < /div>
        )
    }
}

class Board extends React.Component {

    constructor() {
        super()
            
        var player = prompt('Choose your figure', 'O or X?').toUpperCase();
        if(player.length == 0) {
            alert('Your choice is empty');
            return
        } else if (player.length > 2) {
            alert('Your figure is too long. Please choose one-letter figure');
            return
        }
        
         var enemy;
        if(player == 'X') {
            enemy = 'O'
        } else if (player == 'O'){
            enemy = 'X'
        } else {
            enemy = 'X'
        }
       
        this.state = {
            squares: Array(9).fill(null), // stan początkowy, inicjalizujemy tablicę 9 elementów(kwadratów), pustych na poczatku
            playerIsNext: true,
            player: player,
            enemy: enemy
        }
    }

    resetClick() {
        
        this.setState({
            squares: Array(9).fill(null),
            playerIsNext: true,
        })
      }



    handleClick(i) { // zdarzenie odpalające się w momencie klikniecia na kwadrat, zmienia stan
        const squares = this.state.squares.slice(); // w zmiennej squares definiujemy klikniety kwadrat
        if (calculateWinner(squares) || squares[i]) // blokujemy klikanie 1) gdy ktoś wygra || 2) klikanie kliknietego wczesniej kwadratu
            return

        squares[i] = this.state.player;
       
        this.setState({
            squares: squares, // zmiana stanu
            playerIsNext: !this.state.playerIsNext
        })
          
        
        //ruch komputera
       var enemy = this.state.enemy;
        function randomS() {
            let res = Math.floor(Math.random() * 9);
            display(res)
        };
        randomS();

        function display(res) {
            console.log(res)
            if (calculateWinner(squares)) {
                return
            } else if (squares[res] == squares[i] || squares[res] == enemy) {
                console.log('powtorka');
                randomS()
            } else {
                squares[res] = enemy;

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
        // sprawdzamy czy ktoś wygrał, jeżeli tak to renderujemy odpowiedni komunikat, jeżeli nie to wyświetlamy info, czyha jest następna kolejka
        if (winner) {
            info = 'The winner is ' + winner;
        } else if (draw) {
            info = 'The game ended with a draw.';
        } else {
            info = ('Next player is: ' + (this.state.playerIsNext ? this.state.player : this.state.enemy))
        };

      return ( <
            div className='board'>
              
            <
            div className='info' > {
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
            button className='resetGame' onClick = {
                () => this.resetClick()
            } > Reset Game < /button>

            <
            /div>
        )
    }
}

class Button extends React.Component {
  render() {
    return (
      <button className='newGame' onClick = {
                this.props.onClick
            }>
       Play New Game
      </button>
    );
  }  
}


class Game extends React.Component {
       
  constructor() {
    super();
    
    this.state = {
      clicked: false
    };
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      clicked: true
    });
  }
  
  render() {
    return (
      <div className='game'>
        <div className='header'>
        <img className='imgPicture' src="img/game.png" />
        <h1> Tic<span className='color'>.</span>Tac<span className='color'>.</span>Toe</h1>
        
        </div>
        <Button onClick={this.handleClick} />
        {this.state.clicked ? <Board /> : null}
        
        
      </div>
    );
  }
}

ReactDOM.render( < Game / > , document.getElementById('app'));

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
