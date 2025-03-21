import { Button, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import ErrorContext, { AppErrorType } from "../../context/ErrorContext";
import { Musician } from "../../types/DB";

const MusicianItem = ({ item }: { item: Musician }) => {
    const { setError } = useContext(ErrorContext);

    function handleCopyText() {
        navigator.clipboard.writeText(`https://relicensemble.org/about/musicians?dialog=musician&musicianId=${item.id}`)
            .then(() => {
                setError({ severity: 'success', message: 'Copied link', error: true })
            })
    }
    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6} textAlign={'center'}>
                    <Card sx={{ textDecoration: 'none' }}>
                        {item.imgSrc && <CardMedia
                            component="img"
                            image={URL.createObjectURL(item.imgSrc)}
                            alt="musician dmage"
                        ></CardMedia>}
                    </Card>
                    {item.id && <Button sx={{ mt: 2 }} size={'large'} variant={'text'} onClick={handleCopyText} >Copy Musician Link</Button>}
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4">
                        {item.name}
                    </Typography>
                    <Typography variant="h6">
                        {item.newTitle}
                    </Typography>
                    <Typography variant="body1">
                        {item.bio}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MusicianItem;