import React from "react";
import { FaAnchor, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/accordion";
import { avatar } from "@nextui-org/theme";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import {
    FaGithub,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const TeamMembers = () => {
    const { alldata, loading } = useFetchData(`/api/getmember`);
    const activeMembers = alldata.filter((ab) => ab.status === "active");
    // console.log(activeMembers);

    const imgStyle = {
        borderRadius: "100%",
        padding: "0rem 1rem",
        width: "5rem",
        height: "3rem",
    };
    return (
        <div>
            {loading ? (
                <>
                    <div className="wh-100 flex flex-center mt-2 pb-5">
                        <div aria-live="assertive" role="alert" className="loader"></div>
                    </div>
                </>
            ) : (
                <>
                    {activeMembers.slice().reverse().map((member) => {
                        return (
                            <Accordion
                                selectionMode="multiple"
                                key={member._id}
                                variant="splitted"
                                className="gap-[1rem] my-3"
                            >
                                <AccordionItem
                                    startContent={
                                        <>
                                            <div className="flex">
                                                <img
                                                    color="primary"
                                                    radius="lg"
                                                    src={member.image}
                                                    width={70}
                                                    height={70}
                                                    alt="this is a demo site"
                                                    style={imgStyle}
                                                />
                                                <p>{member.name}</p>
                                            </div>
                                        </>
                                    }
                                    className="dark:text-gray-300 dark:!bg-[#1a202c] w-full"
                                    aria-label="Anchor"
                                    subtitle={member.role}
                                >
                                    <h2 className="pb-2">Social Links</h2>
                                    <div className="talk_sec">
                                        <h4>
                                        We're here for you—get in touch, and let's make it happen!
                                        </h4>
                                        <br />
                                        <h3>
                                            Phone:
                                            <a className="px-1" href={`tel:${member.phone}`}>{member.phone}</a>
                                        </h3>
                                        <h3>
                                            Email:
                                            <a className="px-1" href={`mailto:${member.mail}`}>{member.email}</a>
                                        </h3>
                                        <div className="social_talks flex flex-center gap-1 mt-2">
                                            {member.linkedin && (
                                                <div className="st_icon" data-aos="fade-up">
                                                    <Link href={member.linkedin} target="_blank">
                                                        <FaLinkedinIn />
                                                    </Link>
                                                </div>
                                            )}
                                            {member.github && (
                                                <div className="st_icon" data-aos="fade-up">
                                                    <Link href={member.github} target="_blank">
                                                        <FaGithub />
                                                    </Link>
                                                </div>
                                            )}
                                            {member.facebook && (
                                                <div className="st_icon" data-aos="fade-up">
                                                    <Link href={member.facebook} target="_blank">
                                                        <FaFacebook />
                                                    </Link>
                                                </div>
                                            )}
                                            {member.twitter && (
                                                <div className="st_icon" data-aos="fade-up">
                                                    <Link href={member.twitter} target="_blank">
                                                        <FaXTwitter />
                                                    </Link>
                                                </div>
                                            )}
                                            {member.instagram && (
                                                <div className="st_icon" data-aos="fade-up">
                                                    <Link href={member.instagram} target="_blank">
                                                        <FaInstagram />
                                                    </Link>
                                                </div>
                                            )}
                                            {member.youtube && (
                                                <div className="st_icon" data-aos="fade-up">
                                                    <Link href={member.youtube} target="_blank">
                                                        <FaYoutube />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default TeamMembers;
