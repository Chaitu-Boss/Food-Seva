import React from 'react'
import image from '../assets/image.png'
const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 px-6 py-10 ">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start mt-40 gap-8">
            {/* Left Side - Image */}
            <div className="md:w-1/3">
              <img
                src={image}
                alt="About Us"
                className="rounded-lg shadow-lg"
              />
            </div>
    
            {/* Right Side - Text Content */}
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">About Our Organization</h2>
              <p className="text-gray-700 mb-4">
                You may have heard about our organization, seen our work, or even participated in our events.
                But who are we? What do we stand for? What is our mission?
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is to spread knowledge, create a sense of community, and work towards a better future.
                We were founded with the vision of making a positive impact on society through various initiatives,
                education, and outreach programs.
              </p>
              <p className="text-gray-700 mb-4">
                Our principles are rooted in inclusivity, service, and progress. We believe in the power of 
                collective efforts and the role of knowledge in shaping a better tomorrow.
              </p>
              <p className="text-gray-700 mb-4">
                We welcome everyone to be a part of our movement, to learn, contribute, and grow together. 
                Join us in making a meaningful difference.
              </p>
            </div>
          </div>
        </div>
      );
}

export default AboutUs
