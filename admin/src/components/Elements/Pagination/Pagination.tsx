import { FC, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

type CustomPaginationItemProps = {
    index: number;
    onClick: (index: number) => void;
    activePage: number;
};

const CustomPaginationItem: FC<CustomPaginationItemProps> = ({
    index,
    onClick,
    activePage,
}) => (
    <Pagination.Item
        disabled={activePage === index}
        onClick={() => onClick(index)}
    >
        {index}
    </Pagination.Item>
);

type CustomPaginationProps = {
    rowsCount?: number;
    limit: number;
};

const CustomPagination: FC<CustomPaginationProps> = ({ rowsCount, limit }) => {
    const [maxPageCount, setPage] = useState<number>(0);
    let [urlSeachParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (rowsCount !== undefined) {
            setPage(Math.ceil(rowsCount / limit));
        }
    }, [limit]);

    const paginationBtnClickHandler = (index: number) => {
        urlSeachParams.set('page', index.toString());
        setSearchParams(urlSeachParams.toString());
    };

    const activePage =
        urlSeachParams.get('page') && urlSeachParams.get('page') !== null
            ? urlSeachParams.get('page')
            : '1';
    const activePageInt = parseInt(activePage as string);
    const items = [];
    items.push(
        <CustomPaginationItem
            index={1}
            activePage={activePageInt}
            onClick={paginationBtnClickHandler}
            key={1}
        />
    );

    if (activePageInt >= 5) {
        items.push(<Pagination.Ellipsis />);
    }

    for (let index = activePageInt - 2; index <= activePageInt + 2; index++) {
        if (index > 0 && index > 1 && index < maxPageCount) {
            items.push(
                <CustomPaginationItem
                    index={index}
                    activePage={activePageInt}
                    onClick={paginationBtnClickHandler}
                    key={index}
                />
            );
        }
    }

    return (
        <>
            <Pagination>
                {items}

                {activePageInt < maxPageCount - 3 && <Pagination.Ellipsis />}
                {maxPageCount > 1 && (
                    <CustomPaginationItem
                        index={maxPageCount}
                        activePage={activePageInt}
                        onClick={paginationBtnClickHandler}
                        key={maxPageCount}
                    />
                )}
            </Pagination>
        </>
    );
};

export default CustomPagination;
