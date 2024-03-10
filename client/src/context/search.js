
import { useState, useContext, createContext} from 'react';
const SearchContext = createContext();
/*const [auth, setAuth] = useState({
    user: null,
    token: ""
})*/

const SearchProvider = ({children}) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: []
    });
    
    return (
       <SearchContext.Provider value={[auth,setAuth]}>
         {children}
       </SearchContext.Provider>
    )
}
//custom hook
const useSearch = () => useContext(SearchContext);
export {useSearch, SearchProvider};