"use client";
import { useState } from "react";
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";
import { Input, Button } from "@headlessui/react";

import { QuestionType } from "@/types";
import QuestionForm from "./QuestionForm";
import Question from "@/components/Question";
import { useGetQuestionsQuery } from "@/store/question";

const Questions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetQuestionsQuery({
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="w-[100%] p-4 lg:p-6 shadow rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="w-[100%]">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-[300px]">
            <Input
              type="text"
              name="discount"
              placeholder="Search ..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span className="absolute top-[10px] right-[10px]">
              <FaSearch />
            </span>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="w-[200px] rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Add Question
          </Button>
        </div>
        {data?.map((e: QuestionType) => (
          <Question key={e.id} question={e} />
        ))}
      </div>
      <QuestionForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Questions;
