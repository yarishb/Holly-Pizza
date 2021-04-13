import TableCell from '@material-ui/core/TableCell';
import React from 'react'

export function UserValues({user}) {
    return (
        <>
            <TableCell align="right">{user.id}</TableCell>
            <TableCell align="right">{user.name}</TableCell>
            <TableCell align="right">{user.phone}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.is_staff ? "true" : "false"}</TableCell>
        </>
    )
}

