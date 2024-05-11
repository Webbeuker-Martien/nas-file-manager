import { Children } from 'react';

type Props = {
    render: (item: any, index: number) => React.ReactNode;
    of: Array<any>;
}

export const Each = ({ render, of }: Props) => 
    Children.toArray(of.map((item, index) => render(item, index)));

export default Each;