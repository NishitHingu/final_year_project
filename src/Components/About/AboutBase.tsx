import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
import RenderCreatorInfo from "./RenderCreatorInfo";

const CustomGrid = styled(Grid)(({ theme }) => ({
  border: "1px solid black",
  height: "10rem",
  margin: "1rem",
  padding: "1rem",
}));

interface BaseProps {}

const Base: FunctionComponent<BaseProps> = (props) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" align="center" marginTop={16}>
          Financial Market Analysis Platform
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" marginTop={10}>
          <CustomGrid item xs={8} sm={5} md={3}>
            <Typography
              variant="h5"
              align="center"
              marginTop={1}
              marginBottom={2}
            >
              Heading
            </Typography>
            <Typography variant="body1" align="center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              rem nesciunt.
            </Typography>
          </CustomGrid>
          <CustomGrid item xs={8} sm={5} md={3}>
            <Typography
              variant="h5"
              align="center"
              marginTop={1}
              marginBottom={2}
            >
              Heading
            </Typography>
            <Typography variant="body1" align="center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              rem nesciunt.
            </Typography>
          </CustomGrid>
          <CustomGrid item xs={8} sm={5} md={3}>
            <Typography
              variant="h5"
              align="center"
              marginTop={1}
              marginBottom={2}
            >
              Heading
            </Typography>
            <Typography variant="body1" align="center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              rem nesciunt.
            </Typography>
          </CustomGrid>
        </Grid>
      </Grid>

      {/* Creators Personal info */}

      <Grid item xs={12} marginTop={16}>
        <Typography variant="h4" align="center">
          {" "}
          Developers{" "}
        </Typography>
      </Grid>
      <RenderCreatorInfo />

      {/* Footer */}
      <Grid item xs={12} marginBottom={10}></Grid>
    </Grid>
  );
};

export default Base;
