import { Autocomplete, Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useHits, useSearchBox } from "react-instantsearch";

const SearchDonor = ({ handleDonor }) => {

    const { hits } = useHits();
    const { query, refine, } = useSearchBox();
    const [inputValue, setInputValue] = useState(query);
    const [donor, setDonor] = useState(null);
    const [searchStatus, setSearchStatus] = useState(false);

    function setQuery(e) {
        setInputValue(e.currentTarget.value);
        if (e.currentTarget.value.length >= 4) {
            setSearchStatus(true);
        }
        refine(e.currentTarget.value);
    }

    function handleChange(_e, o) {

        setDonor(o);
        setSearchStatus(!!o);
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                <Box sx={{ flex: '1 1 auto', mx: 5 }}>
                </Box>

                <Button
                    variant="contained"
                    onClick={() => handleDonor(donor)}
                    disabled={!searchStatus}
                >
                    {!donor?.objectID ? 'New Donor' : 'Edit Donor'}
                </Button>
            </Box>
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