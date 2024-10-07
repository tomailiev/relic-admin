import { Autocomplete, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useHits, useSearchBox } from "react-instantsearch";

const SearchDonor = ({ donor, handleDonor, setSearchStatus }) => {

    const { hits } = useHits();
    const { query, refine, } = useSearchBox();
    const [inputValue, setInputValue] = useState(query);

    function setQuery(e) {
        setInputValue(e.currentTarget.value);
        if(e.currentTarget.value.length >= 4) {
            setSearchStatus(true);
        }
        refine(e.currentTarget.value);
    }

    function handleChange(_e, o) {
        console.log(o);
        
        handleDonor(o);
        setSearchStatus(!!o);
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Autocomplete
                value={donor}
                options={hits || []}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}, ${option.email}`}
                renderInput={(params) => <TextField {...params} value={inputValue} onChange={setQuery} label="Search donors" />}
                onChange={handleChange}
            />
        </Paper>
    );
};

export default SearchDonor;