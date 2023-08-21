import { Autocomplete, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useHits, useSearchBox } from "react-instantsearch";

const SearchDonor = ({ handleDonor }) => {

    const { hits } = useHits();
    const { query, refine, } = useSearchBox();
    const [inputValue, setInputValue] = useState(query);

    function setQuery(e) {
        setInputValue(e.currentTarget.value);

        refine(e.currentTarget.value);
    }

    function handleChange(_e, o) {
        handleDonor(o);
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Autocomplete
                options={hits || []}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}, ${option.email}`}
                renderInput={(params) => <TextField {...params} value={inputValue} onChange={setQuery} label="Search donors" />}
                onChange={handleChange}
            />
        </Paper>
    );
};

export default SearchDonor;