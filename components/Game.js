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
        <h1> Tic-Tac-Toe </h1>
        <Button onClick={this.handleClick} />
        {this.state.clicked ? <Board /> : null}
      </div>
    );
  }
}

