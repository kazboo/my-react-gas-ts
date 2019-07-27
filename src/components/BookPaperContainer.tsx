import React from 'react';
import Grid from '@material-ui/core/Grid';
import BookPaper from './BookPaper';

interface Props {
    bookList: BookData[];
}

interface BookData {
    volumeInfo: {
        title: string;
        publisher: string;
        imageLinks?: {
            thumbnail?: string;
        }
    }
}

const BookPaperContainer: React.FC<Props> = (props) => {
    const bookList = props.bookList;
    return (
        <div>
            <h2>GoogleAppsScript本情報</h2>
            <Grid container spacing={ 3 }>
            {
                bookList.map(b => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 3 } key={ b.volumeInfo.title }>
                        <BookPaper
                            title={
                                b.volumeInfo.title
                            }
                            publisher={
                                b.volumeInfo.publisher
                            }
                            thumbnail={
                                (b.volumeInfo.imageLinks) ?
                                    b.volumeInfo.imageLinks.thumbnail : null
                            }
                            />
                    </Grid>
                ))
            }
            </Grid>
        </div>
    );
}

export default BookPaperContainer;