import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface PostCardProps {
    title: string;
    price: number;
    description: string|null;
}


const PostCard: React.FC<PostCardProps> = ({ title, price, description }) => {
    return (
      <Container style={{ width: 500 }}>
        <Card sx={{ textAlign: 'center' }}>
          <CardHeader title={`${title}: $${price}`} subheader="Posted by: First Last" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  };
  
  export default PostCard;
