import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationLimitProps {
    limitsArray: number[];
    setNewLimit: (param: number) => void;
    currentLimit: number;
}

const PaginationLimit: FC<PaginationLimitProps> = ({
    limitsArray,
    setNewLimit,
    currentLimit,
}) => {
    const [urlSearchParams, setSearchParams] = useSearchParams();

    const limitBtnClickHandler = (element: number) => {
        setNewLimit(element);
        urlSearchParams.set('limit', element.toString());
        setSearchParams(urlSearchParams.toString());
    };

    return limitsArray.map((element, i) => (
        <button
            key={i}
            className={`btn btn-primary ${
                element === currentLimit ? 'active' : ''
            } `}
            onClick={() => limitBtnClickHandler(element)}
        >
            {element}
        </button>
    ));
};

export default PaginationLimit;
