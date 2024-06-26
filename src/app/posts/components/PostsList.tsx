"use client";
import { usePaginatedQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getPosts from "../queries/getPosts";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { Route } from "next";
import { BlitzPage, useSession } from "@blitzjs/auth";
import AvatarPopover from "@/app/components/AvatarPopover";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PostCard from "@/app/components/PostCard";

const ITEMS_PER_PAGE = 9;

export const PostsList: BlitzPage = () => {
  const session = useSession({ suspense: false })
  const searchparams = useSearchParams()!;
  const page = Number(searchparams.get("page")) || 0;
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const router = useRouter();
  const pathname = usePathname();

  const goToPreviousPage = () => {
    const params = new URLSearchParams(searchparams);
    params.set("page", (page - 1).toString());
    router.push((pathname + "?" + params.toString()) as Route);
  };
  const goToNextPage = () => {
    const params = new URLSearchParams(searchparams);
    params.set("page", (page + 1).toString());
    router.push((pathname + "?" + params.toString()) as Route);
  };

  if (session.userId && !session.isLoading) {
    return (
      <Box>
        <Box style={{ textAlign: 'center', position: 'relative' }}>
          <Typography variant="h2" component={'h2'}>Not FB Marketplace</Typography>
          <Box height={15} />
          <Typography variant="h4">Welcome {session.name}</Typography>
          <Box sx={{ position: 'absolute', right: 100, top: 20 }}>
            <AvatarPopover avatar={session.name[0]} />
          </Box>
        </Box>
        <Box sx={{ width: '100%', mt: '7rem' }}>
          <Grid container rowSpacing={3} columns={18}>
            {posts.map((post) => (
              <Grid key={post.id} item xs={6}>
                <Link href={`/posts/${post.id}`}>
                  <PostCard
                    title={post.name}
                    price={post.price}
                    description={post.description}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', columnGap: 20, marginTop: 10 }}>
          <button disabled={page === 0} style={{fontSize: 18, padding: 5}} onClick={goToPreviousPage}>
            Previous
          </button>
          <button disabled={!hasMore} style={{fontSize: 18, padding: 5}} onClick={goToNextPage}>
            Next
          </button>
        </Box>
      </Box>
    );
  }
  else {
    return (<></>)
  }
};