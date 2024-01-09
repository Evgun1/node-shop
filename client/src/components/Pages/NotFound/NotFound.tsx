import { useRouteError } from 'react-router-dom';

const NotFound = () => {
    const error = useRouteError() as { statusText: String; message: String };

    return (
        <>
            <section>
                <div>
                    <h1>Oops!</h1>
                    <p>Page was not found.</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                </div>
            </section>
        </>
    );
};

export default NotFound;
