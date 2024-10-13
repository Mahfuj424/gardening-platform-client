import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className=" py-24 dark:bg-darkBg">
      <section className="py-10 px-5 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-secondary dark:text-gray-300">
            We would love to hear from you
          </h1>
          <p className="text-secondary dark:text-gray-300 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          {/* Social Media Icons */}
        </div>

        {/* Contact Info and Map Section */}
        <div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Location */}
            <div className="flex flex-col items-center bg-white dark:text-gray-300 dark:bg-darkCard shadow-md p-6 rounded-md">
              <FaMapMarkerAlt className="text-4xl text-blue-500 mb-3" />
              <h3 className="font-bold">Our Location</h3>
              <p className="text-center text-secondary dark:text-gray-300">
                Jl. Cempaka Wangi No 22, Jakarta - Indonesia
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center bg-white dark:bg-darkCard dark:text-gray-300 shadow-md p-6 rounded-md">
              <FaPhoneAlt className="text-4xl text-blue-500 mb-3" />
              <h3 className="font-bold">Our Phone</h3>
              <p className="text-center text-secondary dark:text-gray-300">
                +6221.2002.2012
              </p>
              <p className="text-center text-secondary dark:text-gray-300">
                +6221.2002.2014
              </p>
            </div>

            {/* Mail */}
            <div className="flex flex-col items-center bg-white dark:bg-darkCard dark:text-gray-300 shadow-md p-6 rounded-md">
              <FaEnvelope className="text-4xl text-blue-500 mb-3" />
              <h3 className="font-bold">Mail Address</h3>
              <p className="text-center text-secondary dark:text-gray-300">
                support@yourdomain.tld
              </p>
              <p className="text-center text-secondary dark:text-gray-300">
                booking@yourdomain.tld
              </p>
            </div>
          </div>

          {/* Google Map (Optional) */}
        </div>
        <div className="md:flex justify-between mt-20 gap-10">
          {/* Contact Form */}
          <div>
            <img
              src="https://i.ibb.co.com/dmsXWyQ/flat-design-illustration-customer-support-23-2148887720-removebg-preview-removebg-preview.png"
              alt=""
              className=" mt-5"
            />
          </div>
          <div className="bg-white dark:bg-darkCard p-6 shadow-md rounded-md h-2/3 md:w-2/4">
            <h2 className="text-2xl font-bold mb-5 text-secondary dark:text-gray-300">
              Send Us A Message
            </h2>
            <p className="text-secondary dark:text-gray-300 mb-4">
              Blandit elementum lacus donec nisl ultrices et consequat.
            </p>
            <form>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 mb-4 border dark:bg-gray-700 dark:text-white outline-none dark:border-gray-600 border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 mb-4 border dark:bg-gray-700 border-gray-300 dark:text-white outline-none dark:border-gray-600 rounded-md"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border dark:bg-gray-700 dark:text-white outline-none border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 mb-4 border dark:bg-gray-700 dark:text-white outline-none border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
              <textarea
                placeholder="Message"
                className="w-full p-3 mb-4 border dark:bg-gray-700 dark:text-white outline-none border-gray-300 dark:border-gray-600 rounded-md"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-500"
              >
                SEND MY MESSAGE
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <iframe
            className="w-full h-80 rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2510.3578288790465!2d-0.11954368425093643!3d51.503324679635344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b31b88e109d%3A0x41e23b9de7a4990b!2sLondon%20Eye!5e0!3m2!1sen!2sid!4v1694646609010!5m2!1sen!2sid"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
