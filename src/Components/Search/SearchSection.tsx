import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction, useEffect,
} from 'react';
import { Fragment } from 'react';
import styles from "../ResultsList/ResultList.module.css";
import IUser from "../../Interfaces/IUser";
import SearchNav from "./SearchNav";
import SearchBar from "./SearchBar";

interface ISearchSection{
    loading: boolean;
    setFilteredUsers: Dispatch<SetStateAction<IUser[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const SearchSection: FunctionComponent<ISearchSection> = (
    { setFilteredUsers, loading, setLoading }: ISearchSection
) => {

    useEffect(() => {
        console.log('Reset paginations', loading);
    }, [loading, setFilteredUsers]);

    return (
        <Fragment>
            <div className={styles.search}>
                <SearchBar loading={loading} setFilteredUsers={setFilteredUsers} setLoading={setLoading} />
                <SearchNav setFilteredUsers={setFilteredUsers} setLoading={setLoading} />
            </div>
        </Fragment>
    );
}

export default SearchSection;