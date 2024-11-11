'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, TrendingUp, ChevronRight, Linkedin, Github ,Mail } from 'lucide-react';

const teamMembers = [
  { name: "Abdallah Aljbour", role: "Scrum Master", image: "https://png.pngtree.com/png-vector/20240204/ourlarge/pngtree-avatar-job-student-flat-portrait-of-man-png-image_11606888.png" },
  { name: "Abd-Alrahman Mansour Ata", role: "Product Owner", image: "https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg" },
  { name: "Islam Ismail", role: "QA", image: "https://png.pngtree.com/png-clipart/20190904/original/pngtree-circular-pattern-user-cartoon-avatar-png-image_4492893.jpg" },
  { name: "AbdelRahman Alwabarneh", role: "Developer", image: "https://cdn.discordapp.com/attachments/1250078577219600477/1295102147783819349/man-with-suit-tie-that-says-he-is-man_670382-378251-removebg-preview-removebg-preview.png?ex=670d6d5d&is=670c1bdd&hm=e7463cd10a49dbaf7c076c6a3d35a26e03af58e80f1501ed54678a13de86e57b&" },
  { name: "Mohammed Husban", role: "Developer", image: "https://cdn.discordapp.com/attachments/1250078577219600477/1295101934587478039/image.png?ex=670d6d2b&is=670c1bab&hm=f76ddafac4aec55a14d939759faa9e1f822a727bc221fd3a3a33b296e310924a&" }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D3134] to-[#1A1D1F] text-white px-4 sm:px-6 lg:px-20 mt-[68px]">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto py-10 sm:py-14 lg:py-20 text-center"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
            font-extrabold mb-4 md:mb-6 bg-clip-text text-transparent 
            bg-gradient-to-r from-[#ceae62] to-[#FDB713] 
            leading-tight sm:leading-snug max-w-5xl mx-auto"
        >
          Revolutionizing Energy
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl 
            text-[#FAF8ED]/80 max-w-3xl mx-auto leading-relaxed sm:leading-normal"
        >
          Harnessing the power of motion to create a sustainable future
        </p>
      </motion.header>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              icon: <Zap className="w-12 h-12 text-[#FDB713]" />,
              title: "Kinetic Conversion",
              description:
                "Our groundbreaking technology transforms everyday movement into clean, sustainable electrical energy.",
            },
            {
              icon: <Globe className="w-12 h-12 text-[#FDB713]" />,
              title: "Global Impact",
              description:
                "We're reducing carbon emissions and promoting environmental sustainability on a global scale.",
            },
            {
              icon: <TrendingUp className="w-12 h-12 text-[#FDB713]" />,
              title: "Future Vision",
              description:
                "Pioneering smart cities and green buildings where kinetic energy powers our world.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-[#FAF8ED]/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm 
                hover:bg-[#FAF8ED]/20 transition-all text-center"
            >
              {item.icon}
              <h2 className="text-xl font-semibold mt-4 mb-2">{item.title}</h2>
              <p className="text-[#FAF8ED]/80">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-16 bg-[#FAF8ED]/5 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Visionary Team</h2>
          <p className="text-[#FAF8ED]/80 max-w-2xl mx-auto">
            Meet the innovators driving our mission to revolutionize energy production and create a sustainable future.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#FAF8ED]/10 rounded-2xl overflow-hidden hover:bg-[#FAF8ED]/15 transition-all shadow-lg flex flex-col"
            >
              <div className="flex-grow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-[#FAF8ED]/60">{member.role}</p>
                </div>
              </div>
              <div className="bg-[#FAF8ED]/5 p-3 flex justify-center space-x-4">
                <a href="#" className="text-[#FAF8ED]/60 hover:text-[#FDB713] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-[#FAF8ED]/60 hover:text-[#FDB713] transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="container mx-auto py-16 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Contact Us
        </h2>
        <p className="text-[#FAF8ED]/80 max-w-2xl mx-auto mb-8">
          We're here to answer your questions and provide expert guidance on our innovative energy solutions. Let's discuss how we can power your future.
        </p>
        <a
          href="/contactus"
          className="inline-flex items-center bg-[#FDB713] text-[#2D3134] px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#FDB713]/90 transition-colors"
        >
          Get in Touch
          <ChevronRight className="ml-2 w-5 h-5" />
        </a>
      </motion.section>
    </div>
  );
  
};

export default AboutUs;