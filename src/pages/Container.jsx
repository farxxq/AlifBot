// Main.js (layout with container and gif)
import React from "react";
import Chat from "./Chat"; // Import the Chat component

const Container = () => {
  return (
    <div className="flex justify-center items-center bg-blue-100 min-h-screen">
      {/* Outer Container with Light Bluish Background */}
      <div className="bg-blue-200 rounded-lg p-6 w-full max-w-3xl shadow-lg flex items-center space-x-8">

        {/* GIF Section (Replace with your GIF later) */}
        <div className="flex-shrink-0 w-1/3 text-center">
          <img
            src="https://media.giphy.com/media/3o7bu4UClv4scQmnd6/giphy.gif" // Example GIF, replace later
            alt="Loading GIF"
            className="mx-auto w-32"
          />
        </div>

        {/* Chat Component */}
        <div className="flex-1 w-2/3">
          <Chat />
        </div>

      </div>
    </div>
  );
};

export default Container;

