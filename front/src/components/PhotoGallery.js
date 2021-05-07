import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    makeStyles
} from '@material-ui/core';

const PhotoGallery = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography>Hello</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography>Hello</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography>Hello</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography>Hello</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography>Hello</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography>Hello</Typography>
                </CardContent>
            </Card>

        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gridGap: 32,
    }
})

export default PhotoGallery;