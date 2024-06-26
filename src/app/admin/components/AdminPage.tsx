"use client"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AvatarPopover from "@/app/components/AvatarPopover";
import { useSession } from "@blitzjs/auth";
import { useRouter } from "next/navigation";

const AdminPage = () => {
    const session = useSession()
    const router = useRouter()

    return (
        <Box style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
            <Box style={{ textAlign: 'center' }} mt={2} mb={2}>
                <Box sx={{ position: 'absolute', right: 100, top: 30 }}>
                    {session.name
                        ?
                        <AvatarPopover avatar={session.name[0]} />
                        :
                        <Button variant="contained" onClick={() => router.push('/login')}>Login</Button>
                    }
                </Box>  
                <Box>
                    <Typography variant="h2">Admin Page</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminPage