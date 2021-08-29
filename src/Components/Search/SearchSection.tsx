import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
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

const SearchSection = () => {
    return (
        <Fragment>
            <div className={styles.search}>
                <SearchBar />
                <SearchNav />
            </div>
        </Fragment>
    );
}

export default SearchSection;