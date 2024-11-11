"use client";
import React from "react";
import Link from "next/link";
import { UserCircle, Users, FileText, PlusCircle, Box } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-[#8B7500] text-black flex flex-col">
      <div className="flex items-center justify-center h-16 bg-[#665600]">
        <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
      </div>
      <nav className="flex-grow flex flex-col justify-between">
        <ul className="space-y-2 py-4">
          <li>
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <Users className="mr-3" />
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <Users className="mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/posts"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <FileText className="mr-3" />
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="/admin/posts/create"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <PlusCircle className="mr-3" />
              Create Post
            </Link>
          </li>
          <li>
            <Link
              href="/admin/challenge/getChallenges"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <FileText className="mr-3" />
              Challenges
            </Link>
          </li>
          <li>
            <Link
              href="/admin/challenge/create"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <PlusCircle className="mr-3" />
              Create Challenge
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products/getProducts"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <Box className="mr-3" />
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products/create"
              className="flex items-center px-4 py-2 hover:bg-[#A28A00] text-white"
            >
              <PlusCircle className="mr-3" />
              Create Product
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
