import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 max-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to our Fintoxx Shop store! We offer a wide variety of products
          that cater to all your needs. Our mission is to provide high-quality
          products at affordable prices. We believe in excellent customer
          service and aim to create a seamless shopping experience for our
          customers.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          Our team is dedicated to ensuring that you find exactly what you're
          looking for. We're always here to help, so don't hesitate to reach
        </p>
        <p className="text-gray-600 text-lg">
          Thank you for choosing us as your preferred online store. We hope you
          have a great shopping experience!
        </p>
      </div>
    </div>
  );
};

export default About;
