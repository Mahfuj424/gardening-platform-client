/* eslint-disable react/no-unescaped-entities */
import React from "react";

type TeamMember = {
  name: string;
  bio: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    bio: "John is a hospitality expert with over 15 years of experience, specializing in luxury hotel management.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvmFh3UxOkWLzHVS8_c4MDbDNsZhPvvxcXg&usqp=CAU",
  },
  {
    name: "Jane Smith",
    bio: "Jane is a travel consultant who ensures our guests find the perfect stay tailored to their needs.",
    image:
      "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=ovIQ5GPurLd3mOUj82jB9v-bjGZ8updgy1ACaHMeEC0=",
  },
  {
    name: "Sam Brown",
    bio: "Sam is a digital marketing specialist with a focus on making our platform user-friendly and accessible.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LmG47_W3RM0QBVGI23-vodL_oOOJxLIBrg&usqp=CAU",
  },
  // Add more team members as needed
];

const AboutUs: React.FC = () => {
  return (
    <div className=" dark:bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Our Mission */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Our mission is to connect gardening enthusiasts with the best resources, tips, and inspiration to cultivate beautiful and sustainable gardens. We believe in making the joy of gardening accessible to everyone by offering a platform that combines convenience, community, and expert advice. Whether you're tending to a small balcony garden or managing a large landscape, we strive to support every gardener's journey, ensuring they feel empowered to grow and nurture their green spaces.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
          By collaborating with experienced gardeners and eco-friendly brands, we offer a wide variety of tools, plants, and ideas that promote sustainability and creativity. We are committed to continuous innovation, always seeking to improve our platform and exceed the expectations of our gardening community.
          </p>
        </section>

        {/* Meet the Team */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-secondary dark:text-gray-300 mb-6 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-center dark:text-gray-300 text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
