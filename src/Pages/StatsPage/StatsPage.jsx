import React from "react";

import { withAuth } from "../../Contexts/Authentication";
import PageHeader from "../../Components/PageHeader/PageHeader";
import PageFooter from "../../Components/PageFooter/PageFooter";

const StatsPage = () => (
  <React.Fragment>
    <PageHeader />

    <PageFooter />
  </React.Fragment>
);

export default withAuth(StatsPage);
