import React from "react";
import { Helmet } from "react-helmet-async";
const Title = ({
  title = "Gossipo",
  description = "From Screen to your soul",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
