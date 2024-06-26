"use client"
import { useSession } from "@blitzjs/auth";
import { useRouter } from "next/navigation";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AvatarPopover from "./components/AvatarPopover";
import Link from "next/link";

export default function Home() {
  const session = useSession({ suspense: false })
  const router = useRouter();

  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 450,
    height: 450,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    ...theme.typography.body2,
  }));

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
          <Typography variant="h2">Not FB Marketplace</Typography>
        </Box>
      </Box>
      <Box style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <Stack direction="row" spacing={5} mt={10} mb={10}>
          <Link href={'/admin'}>
            <DemoPaper variant="elevation">Admin Page</DemoPaper>
          </Link>
          <Link href={'/posts'}>
            <DemoPaper variant="elevation">Market Place</DemoPaper>
          </Link>
        </Stack>
        <Box>
          <Typography variant="h6">Get Started <Link style={{ textDecoration: 'underline' }} href={'/signup'}>Here</Link></Typography>
        </Box>
      </Box>
    </Box>
  )
}
