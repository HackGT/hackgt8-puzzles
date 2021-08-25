import React from 'react';
import './tile.scss';

interface TileProps {
    content: {
        message: string,
        image?: string
    };
    refresh: number;
}

interface TileState {
    visible: boolean;
    open: boolean;
}

export class Tile extends React.Component<TileProps, TileState> {
    constructor(props: TileProps) {
        super(props);
        this.state = {
            visible: false,
            open: false
        }
    }

    componentDidMount() {
        document.title = "Welcome!"
        setInterval(() => {
            this.setState({visible: !this.state.visible});
        }, this.props.refresh * 1000);
    }

    openTile = () => {
        this.setState({open: true});
    }

    closeTile = () => {
        this.setState({open: false});
    }

    renderImage() {
        if (this.props.content.image) {
            return <img className="hidden-icon" src={this.props.content.image} alt="icon representing the hidden string"></img>
        }
    }

    convertVisibility() {
        return (this.state.visible) ? "visible" : "hidden"
    }

    render() {
        return(
            <>
                <div className="tile-root">
                    <div className="tile" tabIndex={0} onClick={this.openTile} onBlur={this.closeTile}></div>
                    <div className="hidden-text" style={{
                            visibility: this.convertVisibility()
                        }}>
                            <span>
                                {this.props.content.message}
                            </span>
                        </div>
                    <div>
                        <div>
                            {this.renderImage()}
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }
}