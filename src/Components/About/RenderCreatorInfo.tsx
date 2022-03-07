import { Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
import { getCreatorInfo } from "../../app/hooks";
import { creatorInfo } from "../../features/creator/creatorInfo";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Img = styled("img")(({ theme }) => ({
  border: "1px solid black",
  // height: "8rem",
  width: "80%",
}));

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[700],
}))

interface RenderCreatorInfoProps {
  name?: string;
  description?: string;
  img?: string,
}

const RenderCreator = (creator: creatorInfo) => {
  return (
    <>
      <Grid border={1} item xs={10} marginTop={6}>
        <Grid container justifyContent="space-evenly">
          <Grid item container xs={10} sm={3} justifyContent="center">
            <Img src={creator.img} alt="YourPhoto" />
          </Grid>
          <Grid container flex={1} justifyContent="center" alignItems="center">
            <Grid item>
              <Typography variant="h4" style={{ paddingBottom: "0" }}>{creator.name}</Typography>
              <Typography variant="subtitle1">{creator.role}</Typography>
              <Typography variant="body1" marginTop={2} marginBottom={1}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus aspernatur obcaecati illo dicta accusamus numquam
                cumque quo error adipisci dignissimos quibusdam consequatur modi
                laudantium ab, atque optio beatae, dolorem delectus?
              </Typography>
              <div>
                {creator.link.mail && <CustomLink target="_blank" href={creator.link.mail}><MailIcon color="inherit" /></CustomLink>}
                {creator.link.github && <CustomLink target="_blank" href={creator.link.github}><GitHubIcon color="inherit" /></CustomLink>}
                {creator.link.linkedIn && <CustomLink target="_blank" href={creator.link.linkedIn}><LinkedInIcon color="inherit" /></CustomLink>}
                {creator.link.youtube && <CustomLink target="_blank" href={creator.link.youtube}><YouTubeIcon color="inherit" /></CustomLink>}
                {creator.link.twitter && <CustomLink target="_blank" href={creator.link.twitter}><TwitterIcon color="inherit" /></CustomLink>}
                {creator.link.instagram && <CustomLink target="_blank" href={creator.link.instagram}><InstagramIcon color="inherit" /></CustomLink>}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const RenderCreatorInfo: FunctionComponent<RenderCreatorInfoProps> = () => {
  const data = getCreatorInfo();
  return (
    <>
      {data.map(item => RenderCreator(item))}
    </>
  );
};

export default RenderCreatorInfo;
