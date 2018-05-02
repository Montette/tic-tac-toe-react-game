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