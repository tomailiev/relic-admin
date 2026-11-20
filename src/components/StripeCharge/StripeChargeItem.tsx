import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Link,
    Typography
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { StripeCharge } from "../../types/DB";

interface Props {
    item: StripeCharge;
}

export default function StripeChargeItem({ item }: Props) {
    return (
        <Card variant="outlined" sx={{mx: 3}}>
            <CardContent>
                <Box mb={5} textAlign={'center'}>
                    <Typography variant="h6" textAlign={'center'}>
                        {item.stripeChargeId}
                    </Typography>

                    <Chip
                        label={item.status}
                        color={
                            item.status === "complete"
                                ? "success"
                                : "warning"
                        }
                        size="small"
                    />

                </Box>
                {/* <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1}
                    sx={{ mb: 2 }}
                > */}
                {/* </Stack> */}

                <Grid container spacing={2} mx={1}>
                    <Grid xs={12} md={6}>
                        <Typography variant="caption" color="text.secondary">
                            Donation Date
                        </Typography>
                        <Typography>
                            {item.donationDate}
                        </Typography>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <Typography variant="caption" color="text.secondary">
                            Donor
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/donors/${item.donorId}`}
                            underline="hover"
                            sx={{
                                display: "block",
                                wordBreak: "break-all"
                            }}
                        >
                            {item.donorId}
                        </Link>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <Typography variant="caption" color="text.secondary">
                            Charge ID
                        </Typography>
                        <Typography
                            sx={{
                                wordBreak: "break-all"
                            }}
                        >
                            {item.stripeChargeId}
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography variant="caption" color="text.secondary">
                            Donor Email
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/subscribers/${item.donorEmail}`}
                            underline="hover"
                            sx={{
                                display: "block",
                                wordBreak: "break-all"
                            }}
                        >
                            {item.donorEmail}
                        </Link>
                    </Grid>


                    <Grid xs={12} md={6}>
                        <Typography variant="caption" color="text.secondary">
                            Created
                        </Typography>
                        <Typography>
                            {
                                item.createdAt.toDate().toString()
                            }
                        </Typography>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <Typography variant="caption" color="text.secondary">
                            Processed
                        </Typography>
                        <Typography>
                            {item.processedAt
                                ? item.processedAt.toDate().toString()
                                : "Pending"}
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography variant="caption" color="text.secondary">
                            Payment Intent
                        </Typography>
                        <Typography
                            sx={{
                                wordBreak: "break-all"
                            }}
                        >
                            {item.paymentIntentId}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}