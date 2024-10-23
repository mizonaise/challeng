"use client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "@/store";
import Navbar from "@/components/Navbar";
import Questions from "@/components/Questions";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-between pt-4 lg:p-24">
          <Questions />
        </main>
        <Toaster position="top-right" reverseOrder={false} />
      </Provider>
    </>
  );
}
