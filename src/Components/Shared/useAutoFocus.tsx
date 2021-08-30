import {RefObject, useEffect, useRef} from "react";

export default function useAutoFocus(element: RefObject<HTMLInputElement>) {
    // element = useRef<HTMLInputElement>(null);
    useEffect(() => {
        // autofocus on search input element once element loaded
        if (element.current) {
            element.current.focus();
        }
        console.log('state updated');
    }, []);
}

