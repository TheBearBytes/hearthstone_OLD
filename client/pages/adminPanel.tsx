import React from "react";
import withAuthWall from "../hoc/withAuthWall";
import {userRole} from "../consts/User";
import {Box, Button} from "@material-ui/core";

const AdminPanel = () => {
    return (
        <>
            <h1>AdminPanel</h1>
            <Box>
                <a href="http://localhost:8081/" target="_mongoexpress">
                    <Button>Mongo Express</Button>
                </a>
                <a href="http://localhost:3001/graphql" target="_graphql">
                    <Button>GraphQL</Button>
                </a>
            </Box>
        </>
    )
};

export default withAuthWall(AdminPanel)(userRole.ADMIN);
