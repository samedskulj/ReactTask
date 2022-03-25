import React from "react";
import "./SiteInfo.css";
import { SiteInfoBackround } from "../../../images";
import { NavbarBrand } from "../index";
import { BiCake } from "react-icons/bi";
const SiteInfo = () => {
  return (
    <>
      <div className="site-info">
        <img src={SiteInfoBackround} />
        <div className="site-info__section">
          <div className="site-info__main">
            <NavbarBrand />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima,
              consectetur.
            </p>
          </div>
          <div className="site-info__footer">
            <BiCake />
            <p>Created Mar 22, 2022</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteInfo;
