import { Collapse, Divider, Grid, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CustomCollapseComponentProps {
  hide: boolean;
  title: string;
}

const CustomCollapseComponent: FunctionComponent<
  CustomCollapseComponentProps
> = (props) => {
  const [hide, setHide] = useState<boolean>(props.hide);
  return (
    <>
      <Divider></Divider>
      <Grid
        container
        onClick={() => setHide(!hide)}
        justifyContent="space-between"
        alignItems="center"
        style={{ paddingRight: "1.5rem" }}
      >
        <Typography style={{ margin: "0.5rem 0" }} variant="h4">
          {props.title}
        </Typography>
        {hide ? <AddIcon /> : <RemoveIcon />}
      </Grid>
      <Divider></Divider>
      <Collapse in={!hide}>
        {props.children}
      </Collapse>
    </>
  );
};

export default CustomCollapseComponent;
