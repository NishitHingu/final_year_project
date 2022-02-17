import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
import { getCreatorInfo } from "../../app/hooks";
import { creatorInfo } from "../../features/creator/creatorInfo";

const CustomGrid = styled(Grid)(({ theme }) => ({
  border: "1px solid black",
  height: "10rem",
  margin: "1rem",
  padding: "1rem",
}));

const Img = styled("img")(({ theme }) => ({
  border: "1px solid black",
  height: "8rem",
}));

interface RenderCreatorInfoProps {
  name?: string;
  description?: string;
  img?: string,
}

const RenderCreator = (Creator: creatorInfo) => {
  return (
    <>
      <Grid border={1} item xs={10} marginTop={6}>
        <Grid container justifyContent="space-evenly">
          <CustomGrid item xs={10} sm={4} md={3}>
            <Img src="" alt="YourPhoto" />
          </CustomGrid>
          <CustomGrid flex={1}>
            <Typography variant="h5">{Creator.name}</Typography>
            <Typography variant="body1" marginTop={1}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus aspernatur obcaecati illo dicta accusamus numquam
              cumque quo error adipisci dignissimos quibusdam consequatur modi
              laudantium ab, atque optio beatae, dolorem delectus?
            </Typography>
          </CustomGrid>
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
