import React from 'react';
import Card from '@material-ui/core/Card';
import BookImg from './BookImg';

interface Props {
    title: string;
    publisher: string;
    thumbnail?: string;
}

const BookPaper: React.FC<Props> = (props) => {
    const { title, publisher, thumbnail } = props;
    return (
        <Card style={{ padding:'10px', height:'280px' }}>
            <BookImg thumbnail={ thumbnail } />
            <div>
                <div>
                    { title }
                </div>
                <div>
                    { publisher }
                </div>
            </div>
        </Card>
    );
}

export default BookPaper;