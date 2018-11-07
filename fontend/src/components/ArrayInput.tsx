import * as React from 'react'

interface Props {
    onChange?: (data: string[]) => void;
    defaultValue?: string[];
}

export class ArrayInput extends React.Component<Props, {}> {
    data: string[] = []
    onChange: (data: string[]) => void;
    constructor(props: Props) {
        super(props);
        this.onChange = props.onChange || (_ => { })
        this.data = props.defaultValue || [];
    }

    render() {
        this.data = this.data.filter(x => x !== "")
        this.onChange(this.data)
        this.data = this.data.concat([""])
        return (
            <span>
                {this.data.map((value, index) => {
                    return <input key={index} defaultValue={value} onChange={(e) => {
                        this.data[index] = e.currentTarget.value
                        this.setState({})
                    }} />
                })}
            </span>
        )
    }
    componentDidMount() {
    }
}
