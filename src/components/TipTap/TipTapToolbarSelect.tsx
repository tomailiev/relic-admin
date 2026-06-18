import { useState } from 'react'
import { InputAdornment, Menu, MenuItem, TextField } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'

type ToolbarSelectProps = {
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
    width?: number
}

export function ToolbarSelect({
    value,
    onChange,
    options,
    // width = 140,
}: ToolbarSelectProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    const handleSelect = (val: string) => {
        onChange(val)
        handleClose()
    }

    const currentLabel =
        options.find(o => o.value === value)?.label || 'Select'

    return (
        <>
            <TextField
                onClick={handleOpen}
                variant="outlined"
                size="small"
                value={currentLabel}
                
                // endIcon={<ArrowDropDown />}
                sx={{ textTransform: 'none', width: 140 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <ArrowDropDown fontSize="small" />
                        </InputAdornment>
                    ),
                }}
            />

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {options.map(opt => (
                    <MenuItem
                        key={opt.value}
                        selected={opt.value === value}
                        onClick={() => handleSelect(opt.value)}
                    >
                        {opt.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
