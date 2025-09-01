import React from "react";

const Footer = () => (
    <footer className="bg-white rounded-lg shadow p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased flex justify-center items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()}{" "} Personal Blog. All Rights Reserved.
        </p>
    </footer>
);

export default Footer;