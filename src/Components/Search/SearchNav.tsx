import React, {
    Dispatch,
    Fragment,
    FunctionComponent,
    MouseEventHandler,
    SetStateAction,
    useCallback,
    useReducer
} from 'react';
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/appState";
import styles from './Search.module.css';
import {searchUsers} from "../../Controllers/users.controller";
import {SAVE as storeUserList} from "../../store/userListReducer";
import {SAVE as storeSearchString} from "../../store/searchReducer";
import IUser from "../../Interfaces/IUser";

interface IActions{
    ADD: string;
    SUB: string;
}

interface IPaginationsState{
    secondPreviousPage: number;
    previousPage: number;
    currentPage: number;
    nextPage: number;
    secondNextPage: number;
}

const actions: IActions ={
    ADD: 'increment',
    SUB: 'subtract'
}

interface ISearchNav{
    setFilteredUsers: Dispatch<SetStateAction<IUser[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const SearchNav: FunctionComponent<ISearchNav> = ( { setFilteredUsers, setLoading }: ISearchNav ) => {

    const increment = (maximum: number, state: IPaginationsState) => {
        if (state.currentPage < maximum){
            return {
                secondPreviousPage: state.currentPage-1,
                previousPage: state.currentPage,
                currentPage: state.currentPage+1,
                nextPage: state.currentPage+2,
                secondNextPage: state.currentPage+3,
            };
        }
        return state;
    }

    const decrement = (state: IPaginationsState) => {
        if (state.currentPage > 1){
            return {
                secondPreviousPage: state.currentPage-3,
                previousPage: state.currentPage-2,
                currentPage: state.currentPage-1,
                nextPage: state.currentPage,
                secondNextPage: state.currentPage+1,
            };
        }
        return state;
    }

    const reducer = ( state: any, action: any) => {
        switch(action.type){
            case actions.ADD:
                return increment(totalPages, state);
            case actions.SUB:
                return decrement(state);
            default:
                return state;
        }
    }

    const storeDispatch = useDispatch();
    const searchVal: string = useSelector((state: AppState) => state.search);
    const totalPages: number = useSelector((state: AppState) => state.userList.totalPages);
    const page: number = useSelector((state: AppState) => state.userList.currentPage);

    const initialState = {
        secondPreviousPage: page-2,
        previousPage: page-1,
        currentPage: page,
        nextPage: page+1,
        secondNextPage: page+2
    }

    const [{
        secondPreviousPage,
        previousPage,
        currentPage,
        nextPage,
        secondNextPage
    }, dispatch] = useReducer( reducer, initialState);

    const executeSearch = useCallback(async (searchVal: string, pageNo: number = 1) => {
        setLoading(true);
        await searchUsers(searchVal, pageNo).then(
            result => {
                if (result){
                    storeDispatch({
                        type:storeUserList,
                        payload: result
                    });
                    storeDispatch({
                        type: storeSearchString,
                        payload: searchVal
                    });
                    setFilteredUsers(result.loadedUsers);
                }
            }
        );
        setLoading(false);
    }, [setFilteredUsers, setLoading, storeDispatch]);

    const handlePreviousPage: MouseEventHandler<HTMLButtonElement> = async (
        goToPrevious
    ) => {
        dispatch({ type: actions.SUB });
        console.log('Moving back to page:', currentPage-1);
        await executeSearch(searchVal, previousPage);
        console.log('Now on page:', currentPage);
    }

    const handleNextPage: MouseEventHandler<HTMLButtonElement> = async (
        goToNext
    ) => {
        dispatch({ type: actions.ADD });
        console.log('Moving forward to page:', currentPage+1);
        await executeSearch(searchVal, nextPage);
        console.log('Total number of pages:', totalPages);
        console.log('Now on page:', currentPage);
    }

    return(
        <Fragment>
            <div className={styles.resultsPagination}>
                <button
                    className={['navigateResultsPage', 'navigationButton'].join(' ')}
                    onClick={handlePreviousPage}
                ><BsChevronLeft /></button>
                <div
                    className={styles.pagination}
                    style={(currentPage>1)&&(currentPage===totalPages)?{display:'flex'}: {display:'none'}}
                >
                    {secondPreviousPage-2}
                </div>
                <div
                    className={styles.pagination}
                    style={(currentPage>1)&&([totalPages,totalPages-1].includes(currentPage))?{display:'flex'}: {display:'none'}}
                >
                    {secondPreviousPage-1}
                </div>
                <div
                    className={styles.pagination}
                    style={(secondPreviousPage)<1?{display:'none'}: {display:'flex'}}
                >
                    {secondPreviousPage}
                </div>
                <div
                    className={styles.pagination}
                    style={(previousPage)<1?{display:'none'}: {display:'flex'}}
                >
                    {previousPage}
                </div>
                <div className={[styles.pagination, styles.currentPage].join(' ')}>
                    {currentPage}
                </div>
                <div
                    className={styles.pagination}
                    style={(nextPage>totalPages)?{display:'none'}: {display:'flex'}}
                >
                    {nextPage}
                </div>
                <div
                    className={styles.pagination}
                    style={(secondNextPage>totalPages)?{display:'none'}: {display:'flex'}}
                >
                    {secondNextPage}
                </div>
                <div
                    className={styles.pagination}
                    style={(currentPage<totalPages)&&([1,2].includes(currentPage))?{display:'flex'}: {display:'none'}}
                >
                    {secondNextPage+1}
                </div>
                <div
                    className={styles.pagination}
                    style={(currentPage<totalPages)&&(currentPage===1)?{display:'flex'}: {display:'none'}}
                >
                    {secondNextPage+2}
                </div>
                <button
                    className={['navigateResultsPage', 'navigationButton'].join(' ')}
                    onClick={handleNextPage}
                ><BsChevronRight/></button>
                <p className='paginationLabel'>of {totalPages}</p>
            </div>
        </Fragment>
    );
}

export default SearchNav;