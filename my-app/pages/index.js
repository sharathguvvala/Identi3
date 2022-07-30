import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
}
