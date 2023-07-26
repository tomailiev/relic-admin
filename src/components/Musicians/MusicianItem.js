import { Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getLink } from "../../utils/firebase/firebase-functions";

const MusicianItem = ({ item }) => {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        if (!item.imgSrc) {
            getLink(item.pic)
                .then(url => setImgSrc(url));
        }
    }, [item])

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
                // left: `${(position < 0 && position !== -(length - 1)) || isShifting ? 150 : position === 1 || position === -(length - 1) ? -150 : 0}%`,
                // top: 0,
                // width: position ? '0px' : 'calc(100% + 16px)',
                // transition: Math.abs(position) === 1 || Math.abs(position) === length - 1? 'width 7s ease-in, visibility 5s ease-in, left 1s ease-in' : !position ? 'left 1s ease-in, width 100ms ease-in' : 'none',
                // visibility: position ? 'hidden' : 'visible',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Card sx={{ textDecoration: 'none' }}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            // width="70%"
                            // height={150}
                            image={URL.createObjectURL(item.imgSrc)}
                            alt="musician dmage"
                        ></CardMedia>
                        {/* </CardActionArea> */}
                    </Card>
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