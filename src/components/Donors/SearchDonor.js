import { Autocomplete, Paper, TextField } from "@mui/material";
import { useHits } from "react-instantsearch";

const SearchDonor = () => {

    const { hits } = useHits();

    function handleChange(_e, o) {
        console.log(o);
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Autocomplete
                options={hits}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}, ${option.email}`}
                renderInput={(params) => <TextField {...params} label="Search donors" />}
                onChange={handleChange}
            />
        </Paper>
    );
};

export default SearchDonor;