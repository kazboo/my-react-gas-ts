import React from 'react';
import GasClient from './client/gas-client';
import LoadingAnimation from './LoadingAnimation';
import ErrorInformation from './ErrorInformation';
import BookPaperContainer from './BookPaperContainer';

interface Props {

}

interface State {
    error: ErrorResult;
    isLoaded: boolean;
    bookList: BookInfo[];
}

interface ErrorResult {
    message: string;
}

interface BookInfo {
    volumeInfo: {
        title: string;
        publisher: string;
        imageLinks?: {
            thumbnail?: string;
        }
    }
}

interface GetBookListResult {
    items: BookInfo[];
}

class BookInformation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            bookList: []
        };
    }
        
    componentDidMount() {

        GasClient.getBookJoinList(
            (result: GetBookListResult) => {
                this.setState({
                    isLoaded: true,
                    bookList: result.items
                })
            },
            (result: ErrorResult) => {
                this.setState({
                    isLoaded: true,
                    error: result
                })
            }
        );
    }

    render() {
        const { error, isLoaded, bookList } = this.state;
        if (error) {
            return <ErrorInformation message={ error.message } />;

        } else if (!isLoaded) {
            return <LoadingAnimation />;

        } else if (bookList) {
            return <BookPaperContainer bookList={ bookList } />;

        } else {
            return <div>本の情報はありません。</div>;
        }
    }
}

export default BookInformation;