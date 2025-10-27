import { useEffect } from 'react';

let defaultTitle = "Bubble";

function PageTitle({ title }) {
    useEffect(() => {
        document.title = title ? `${defaultTitle} - ${title}` : defaultTitle;

        return () => {
            document.title = defaultTitle;
        };
    }, [title]);

    return null;
}

export default PageTitle;
