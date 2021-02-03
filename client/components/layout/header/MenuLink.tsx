import React from "react";
import Link from "next/link";
import {Button} from "@material-ui/core";

const MenuLink = ({href, label}) => (
    <Link href={href}>
        <a>
            <Button>
                {label}
            </Button>
        </a>
    </Link>
);

export default MenuLink;
