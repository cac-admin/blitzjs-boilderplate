import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { SyntheticEvent } from 'react';
import { getAntiCSRFToken } from '@blitzjs/auth';
import { useRouter } from "next/navigation";

export default function AvatarPopover({avatar}: {avatar: string}, ) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const antiCSRFToken = getAntiCSRFToken()
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anti-csrf": antiCSRFToken
        },
      })
      if (res.ok) {
        console.log("Bruh")
        router.replace('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <Avatar sx={{backgroundColor: 'red'}}>
            {avatar}
        </Avatar>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button onClick={logout}>Logout</Button>
      </Popover>
    </div>
  );
}