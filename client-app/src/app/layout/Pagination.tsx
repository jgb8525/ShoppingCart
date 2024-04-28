import { Icon, Pagination } from 'semantic-ui-react';
import { PaginationProps } from "../model/paginationProps";

interface Props {
    paginationProps: PaginationProps;
}

const PaginationShorthand = ({ paginationProps }: Props) => {
    return (
        <Pagination
            defaultActivePage={paginationProps.currentPage}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={paginationProps.totalPages}
            onPageChange={}
        />
    );
}

export default PaginationShorthand