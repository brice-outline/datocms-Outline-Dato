import React from "react";
import Layout from "../components/layout";
import SEO from "../components/blocks/SEO";

const NotFoundPage = () => (
  <Layout>
    <SEO title={`Out (of) Line`} />
    <div className="page wrong_turn">
      <div className="wrapper centertext">
        <h1 class="big visible">Out (of) line</h1>
        <p>Isn't it nice to be nowhere sometimes? That's where you are now.</p>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
