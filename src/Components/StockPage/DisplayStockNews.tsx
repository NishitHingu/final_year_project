import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { getStockNews } from "../../app/hooks";
import { stockNews } from "../../features/searchBar/Stock";
import { makeStyles } from "@mui/styles";
import CustomCollapseComponent from "./CustomCollapseComponent";
import { v4 as uuidV4 } from "uuid";

const ImgGrid = styled(Grid)(({ theme }) => ({
  maxWidth: "90%",
  height: "6rem",
  margin: "0.25rem",
  marginRight: "0.5rem",
  boxShadow: theme.shadows[4],
}));

const useStyles = makeStyles(() => ({
  newsLinkHeader: {
    textDecoration: "none",
    color: "black",
    fontSize: "16px",
  },
  newsDescription: {
    display: "block",
    marginTop: "0.5rem",
    textDecoration: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const DisplayStockNews = () => {
  const news = getStockNews();
  const classes = useStyles();

  // Displays a single news component
  const createNewsComponent = (article: stockNews) => {
    return (
      <Grid
        item
        key={uuidV4()}
        container
        xs={12}
        sm={12}
        md={6}
        style={{ padding: "0.5rem", height: "8rem" }}
        justifyContent="center"
      >
        <ImgGrid item xs={10} sm={4} md={2} bottom={0}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={article.image}
            alt=""
          />
        </ImgGrid>
        <Grid item xs={10} sm={7} md={9} fontSize="16px">
          <Typography
            variant="body1"
            className={classes.newsLinkHeader}
            component="a"
            href={article.url}
          >
            {article.title}
          </Typography>
          <Typography
            fontSize="12px"
            component="a"
            href={article.url}
            color="GrayText"
            className={classes.newsDescription}
          >
            {article.description}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <CustomCollapseComponent hide={true} title={"News"}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        marginTop={3}
      >
        {news?.map((article) => createNewsComponent(article))}
      </Grid>
    </CustomCollapseComponent>
  );
};

export default DisplayStockNews;
