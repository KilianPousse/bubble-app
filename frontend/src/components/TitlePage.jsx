import { useEffect } from 'react';

let defaultTitle = "Chat App"; 

export function setDefaultTitle(title) {
    defaultTitle = title;
    document.title = title;
}

function PageTitle({ title }) {
    useEffect(() => {
        document.title = title ? `${title} - ${defaultTitle}` : defaultTitle;

        return () => {
            document.title = defaultTitle;
        };
    }, [title]);

    return null;
}

export default PageTitle;
