/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResumeTemplate = () => {
  const { userData } = useSelector((state: any) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !userData ||
      Object.keys(userData).length === 0 ||
      userData === undefined
    ) {
      navigate("/user");
    }
  }, [userData]);
  return (
    <>
      {userData && (
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            {/* <!-- Header Section --> */}
            <header className="text-center mb-6">
              {/* <!-- Profile Photo --> */}
              <img
                src={userData.profilePhoto}
                alt="Profile Photo"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-gray-900 mb-2" id="name">
                {`${userData.firstName} ${userData.lastName}`}
              </h1>
              <p className="text-gray-700 mb-2" id="profession">
                {userData.occupation} | {userData.gender} | {userData.dob}
              </p>
              <p className="text-gray-600 text-sm" id="contact-info">
                {`${userData.contact?.phoneNumber} | ${userData.contact?.email} | `}
                <a
                  href={
                    userData.contact?.linkedInUrl
                      ? userData.contact?.linkedInUrl
                      : "#"
                  }
                  className="text-blue-500"
                >
                  LinkedIn
                </a>{" "}
                | {userData.contact?.fax}
              </p>
            </header>

            {/* <!-- About Me Section --> */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                About Me
              </h2>
              <p className="text-gray-700" id="about-me">
                A passionate Software Developer with a keen interest in building
                scalable applications and solving real-world problems.
              </p>
            </section>

            {/* Address Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Address
              </h2>
              <p className="text-gray-700">
                {userData.address?.address}, {userData.address?.city},{" "}
                {userData.address?.state}, {userData.address?.zipCode},{" "}
                {userData.address?.country}
              </p>
            </section>

            {/* <!-- Experience Section --> */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Experience
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    id="job-title-1"
                  >
                    Software Developer
                  </h3>
                  <span className="text-gray-600" id="job-duration-1">
                    Jan 2015 - Present
                  </span>
                </div>
                <p className="text-gray-700" id="job-description-1">
                  Developing web applications and APIs using modern technologies
                  such as Node.js, React, and TypeScript.
                </p>

                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    id="job-title-2"
                  >
                    Junior Developer
                  </h3>
                  <span className="text-gray-600" id="job-duration-2">
                    Jun 2012 - Dec 2014
                  </span>
                </div>
                <p className="text-gray-700" id="job-description-2">
                  Worked on various small-scale applications and provided
                  technical support to the team.
                </p>
              </div>
            </section>

            {/* <!-- Education Section --> */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Education
              </h2>
              <div className="space-y-4">
                {userData.academic?.pastSchools &&
                  userData.academic?.pastSchools.map(
                    (school: string, index: number) => (
                      <div
                        className="flex items-center justify-between"
                        key={index}
                      >
                        <h3
                          className="text-lg font-semibold text-gray-900"
                          id="degree-1"
                        >
                          {school}
                        </h3>
                        <span className="text-gray-600" id="university-1">
                          Harvard University | 2011
                        </span>
                      </div>
                    )
                  )}
              </div>
            </section>

            {/* <!-- Skills Section --> */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Skills
              </h2>
              <ul className="grid grid-cols-2 gap-4">
                <li className="text-gray-700" id="skill-1">
                  JavaScript (React, Node.js)
                </li>
                <li className="text-gray-700" id="skill-2">
                  TypeScript
                </li>
                <li className="text-gray-700" id="skill-3">
                  HTML & CSS
                </li>
                <li className="text-gray-700" id="skill-4">
                  SQL & NoSQL Databases
                </li>
              </ul>
            </section>

            {/* <!-- Projects Section --> */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Projects
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    id="project-title-1"
                  >
                    Project Management App
                  </h3>
                  <span className="text-gray-600" id="project-duration-1">
                    2020
                  </span>
                </div>
                <p className="text-gray-700" id="project-description-1">
                  A full-stack project management application to track and
                  manage tasks within teams.
                </p>

                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    id="project-title-2"
                  >
                    E-commerce Platform
                  </h3>
                  <span className="text-gray-600" id="project-duration-2">
                    2022
                  </span>
                </div>
                <p className="text-gray-700" id="project-description-2">
                  A scalable e-commerce platform to sell and manage products
                  with real-time inventory tracking.
                </p>
              </div>
            </section>

            {/* <!-- Footer Section --> */}
            <footer className="text-center text-gray-600 text-sm mt-8">
              <p>Generated by Intenttech</p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeTemplate;
