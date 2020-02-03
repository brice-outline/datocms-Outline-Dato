import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import BlurredImage from "../components/blocks/blurred-image";

import "../styles/grid.css";
import "../styles/case-studies.css";
import AniLink from "gatsby-plugin-transition-link/AniLink";

class CaseStudiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeadlineVisible: true,
      isMouseIdle: false,
      prevScrollpos: ""
    };
  }

  // scroll
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    let mouseScrollTimeout;
    console.log(currentScrollPos);
    this.setState({
      prevScrollpos: currentScrollPos,
      isHeadlineVisible: true
    });

    if (currentScrollPos > 60) {
      this.setState({
        isHeadlineVisible: false
      });
    } else {
      this.setState({
        isHeadlineVisible: true
      });
    }
  };

  mouseStopped = () => {
    console.log("mouse has stopped moving");
    this.setState({ isMouseIdle: true });
  };

  handleMouseMove = () => {
    const { prevScrollpos, isMouseIdle } = this.state;
    const currentScrollPos = prevScrollpos;
    let mouseMoveTimeout;
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(this.mouseStopped, 1000);

    console.log("mouse is moving");
    this.setState({ isMouseIdle: false });

    //screensaver
    if (currentScrollPos > 60) {
      //   clearTimeout(mouseMoveTimeout2);

      if (!isMouseIdle) {
        this.setState({ isHeadlineVisible: false });
        // mouseMoveTimeout2 = setTimeout(() => {
        //   this.setState({ isHeadlineVisible: true });
        // }, 15000);
      } else {
        this.setState({ isHeadlineVisible: true });
      }
    }
  };

  componentDidMount() {
    console.log(this.props.data);
    this.setState({ prevScrollpos: window.pageYOffset });
    window.addEventListener("scroll", this.handleScroll);
    // window.addEventListener("mousemove", this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    // window.removeEventListener("mousemove", this.handleMouseMove);
  }

  render() {
    const { data } = this.props;
    const { isHeadlineVisible } = this.state;
    return (
      <Layout>
        <div className="page" id="case-studies">
          <div
            className={`wrapper skinny title-container  ${
              isHeadlineVisible ? "visible" : ""
            }`}
          >
            <img src="/case-studies.svg" alt="" />
          </div>
          <div className="wrapper skinny">
            {data.datoCmsCaseStudiesPage.blocks.map(block => {
              switch (block.__typename) {
                case "DatoCmsSideBySide":
                  return (
                    <div
                      className={`block ${block.leftProjectPositioning} ${block.rightProjectPositioning}`}
                    >
                      <div className="wrapper flex grid two">
                        <div
                          className={`flex column left grid-item one-half ${block.leftProjectPositioning}`}
                        >
                          <AniLink
                            fade
                            to={`/case-studies/${block.leftProject?.slug}`}
                          >
                            {/* <Img fluid={block.leftProjectImage.fluid} /> */}
                            <BlurredImage src={block.leftProjectImage?.fluid} />
                          </AniLink>

                          <span
                            className={`${
                              block.leftProjectNarrowExcerpt ? "narrow" : ""
                            }`}
                          >
                            <span>{block.leftProject?.excerpt}</span>
                            <AniLink
                              fade
                              to={`/case-studies/${block.leftProject?.slug}`}
                              className="textlink"
                            >
                              {block.leftProject?.title}
                            </AniLink>
                          </span>
                        </div>
                        <div
                          className={`flex column right grid-item one-half ${block.rightProjectPositioning}`}
                        >
                          <AniLink
                            fade
                            to={`/case-studies/${block.rightProject?.slug}`}
                          >
                            {/* <Img fluid={block.rightProjectImage.fluid} /> */}
                            <BlurredImage
                              src={block.rightProjectImage?.fluid}
                            />
                          </AniLink>
                          <span
                            className={`${
                              block.rightProjectNarrowExcerpt ? "narrow" : ""
                            }`}
                          >
                            <span>{block.rightProject?.excerpt}</span>
                            <AniLink
                              fade
                              to={`/case-studies/${block.rightProject?.slug}`}
                              className="textlink"
                            >
                              {block.rightProject?.title}
                            </AniLink>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                case "DatoCmsSolo":
                  return (
                    <div
                      className={`block solo ${
                        !block.narrowWidth ? " full" : ""
                      }`}
                    >
                      <div
                        className={`wrapper${
                          block.narrowWidth ? " x_skinny" : ""
                        }`}
                      >
                        <div className="flex wrap">
                          <AniLink
                            fade
                            to={`/case-studies/${block.project?.slug}`}
                          >
                            {/* <Img fluid={block.projectImage?.fluid} /> */}
                            <BlurredImage src={block.projectImage?.fluid} />
                          </AniLink>

                          <span
                            className={`${
                              block.projectNarrowExcerpt ? "narrow" : ""
                            }`}
                          >
                            <span>{block.project?.excerpt}</span>
                            <AniLink
                              fade
                              to={`/case-studies/${block.project?.slug}`}
                              className="textlink"
                            >
                              {block.project?.title}
                            </AniLink>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default CaseStudiesPage;

export const query = graphql`
  query {
    datoCmsCaseStudiesPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      blocks {
        ... on DatoCmsSideBySide {
          leftProject {
            title
            slug
            excerpt
          }
          leftProjectNarrowExcerpt
          leftProjectImage {
            fluid(maxWidth: 860, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          leftProjectPositioning
          rightProject {
            title
            slug
            excerpt
          }
          rightProjectNarrowExcerpt
          rightProjectImage {
            fluid(maxWidth: 860, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          rightProjectPositioning
        }
        ... on DatoCmsSolo {
          project {
            title
            slug
            excerpt
          }
          projectNarrowExcerpt
          projectImage {
            fluid(
              maxWidth: 1920
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsFluid
            }
          }
          narrowWidth
        }
      }
    }
  }
`;
