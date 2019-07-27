import React from 'react';

interface Props {
    thumbnail: string;
}

const BookImg: React.FC<Props> = (props) => {
    const thumbnail = props.thumbnail;
    if (thumbnail) {
        return <div><img src={ thumbnail } /></div>;
    } else {
        return <div>NO IMAGE</div>;
    }
}

export default BookImg;