import React from 'react';

interface EnvProps {
    color: string;
}

export class Background extends React.Component<EnvProps, {}> {
    bg: string;
    constructor(props: EnvProps) {
        super(props);
        this.bg = this.props.color;
    }
    
    render() {
        return (
            <div style={{
                background: this.bg,
            }}>
                {this.props.children}
            </div>
        )
    }
}