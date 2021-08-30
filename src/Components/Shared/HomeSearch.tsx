import React, {FormEvent, FormEventHandler, Fragment, useRef} from "react";
import useSearchUsers from "./useSearchUsers";
import {MdSearch} from "react-icons/md";
import useAutoFocus from "./useAutoFocus";

export default function HomeSearch(){

    const inputElement= useRef<HTMLInputElement>(null);
    useAutoFocus(inputElement);

    const handleSearch: FormEventHandler<HTMLFormElement> = async(
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Get search data
        const { searchString } = event.target as typeof event.target & {
            searchString: { value: string}
        };

        // await executeSearch(searchString.value);
        // await useSearchUsers(searchString.value);
    }

    return(
        <Fragment>
            <form onSubmit={async(submit: FormEvent<HTMLFormElement>) => await handleSearch(submit)}>
                <input id='searchString' name='searchString' type='text' ref={inputElement}/>
                <button type='submit'><MdSearch size={'30px'}/></button>
            </form>
        </Fragment>
    );
}