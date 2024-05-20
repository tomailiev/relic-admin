import { Container, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import {  useState } from "react";


const TemplateItem = ({ item }) => {

    const [query, setQuery] = useState('desktop');

    const handleQueryChange = (e, newQuery) => {
        setQuery(newQuery);
    }


    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography textAlign={'center'} variant="h5">{item.subject}</Typography>
            <Typography textAlign={'center'} variant="body1">{item.components?.find(val => val.id === 'mj-preview')?.text}</Typography>
            <Container disableGutters sx={{ width: '100%', textAlign: 'center', pb: 2, mt: 4 }}>
                <ToggleButtonGroup
                    value={query}
                    exclusive
                    onChange={handleQueryChange}
                    aria-label="media query"
                >
                    <ToggleButton value="desktop" aria-label="Desktop" disabled={query === "desktop"}>
                        Desktop
                    </ToggleButton>
                    <ToggleButton value="mobile" aria-label="Mobile" disabled={query === 'mobile'}>
                        Mobile
                    </ToggleButton>
                </ToggleButtonGroup>
            </Container>
            <Container disableGutters sx={{ textAlign: 'center' }}>
                <iframe title="emailHtml" srcDoc={item.html} style={{ height: '800px', width: query === 'desktop' ? '800px' : '400px', maxWidth: '100%' }} />
            </Container>
        </Paper>
    );
};

export default TemplateItem;