"use client";
import { useState } from "react";
import { format } from "date-fns";
import {
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";

import {
  MdEdit,
  MdDelete,
  MdAddCircleOutline,
  MdOutlineModeComment,
} from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";

import AnswerForm from "./AnswerForm";
import { AnswerType, QuestionType } from "@/types";
import { useDeleteAnswerMutation } from "@/store/answer";
import QuestionForm from "./QuestionForm";
import { useDeleteQuestionMutation } from "@/store/question";
import toast from "react-hot-toast";

type QuestionPageProps = {
  question: QuestionType;
};

const Question = ({ question }: QuestionPageProps) => {
  const [edit, setEdit] = useState<{
    edit?: boolean;
    data?: AnswerType;
  }>({});
  const [deleteItem] = useDeleteAnswerMutation();
  const [deleteQuest] = useDeleteQuestionMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenQuest, setIsOpenQuest] = useState(false);

  return (
    <div className="border rounded-md shadow border-gray-200 dark:border-gray-700 p-4 my-2">
      <Disclosure as="div">
        <h3 className="text-xl font-black text-gray-900 dark:text-white">
          {question.title}
          <span className="text-base font-light text-gray-500">
            {" "}
            ({format(new Date(question.createdAt), "dd MMMM, yyyy")})
          </span>
        </h3>
        <p className="text-gray-900 dark:text-white">{question.description}</p>
        <div className="mt-4 flex items-center justify-around">
          <DisclosureButton className="flex gap-1 items-center cursor-pointer text-gray-900 dark:text-white">
            <MdOutlineModeComment size={18} />
            <span className="text-xs">{question.answers.length}</span>
          </DisclosureButton>
          <div
            onClick={() => setIsOpen(true)}
            className="text-gray-900 dark:text-white cursor-pointer"
          >
            <MdAddCircleOutline size={20} />
          </div>
          <div
            onClick={() => setIsOpenQuest(true)}
            className="text-gray-900 dark:text-white cursor-pointer"
          >
            <MdEdit size={20} />
          </div>
          <div
            onClick={async () => {
              const res = await deleteQuest(question.id).unwrap();
              if (res?.error) {
                toast.error(res.error.message);
              } else {
                toast.success("Item deleted successfully!");
              }
            }}
            className="text-gray-900 dark:text-white cursor-pointer"
          >
            <MdDelete size={20} />
          </div>
        </div>
        <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
          {question.answers.map((ans: AnswerType) => (
            <div
              key={ans.id}
              className="mt-4 p-2 flex justify-between border rounded-md border-gray-200 dark:border-gray-700"
            >
              <p className="text-gray-900 dark:text-white">
                {ans.description}
                <span className="text-gray-500">
                  {" "}
                  ({format(new Date(ans.createdAt), "dd MMMM, yyyy")})
                </span>
              </p>
              <Menu>
                <MenuButton className="">
                  <CiCircleMore
                    size={25}
                    className="fdark:fill-white/30 text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-[142px] origin-top-right rounded-xl border border-white/5 bg-gray-300 dark:bg-medium p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button
                      onClick={() => {
                        setEdit({
                          data: ans,
                          edit: true,
                        });
                        setIsOpen(true);
                      }}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-gray-900 dark:text-white "
                    >
                      <MdEdit
                        size={16}
                        className="dark:fill-white/30 text-gray-500"
                      />
                      Edit
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={async () => {
                        const res = await deleteItem(ans.id).unwrap();
                        if (res?.error) {
                          toast.error(res.error.message);
                        } else {
                          toast.success("Item deleted successfully!");
                        }
                      }}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-gray-900 dark:text-white "
                    >
                      <MdDelete
                        size={16}
                        className="dark:fill-white/30 text-gray-500 "
                      />
                      Delete
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ))}
        </DisclosurePanel>
      </Disclosure>
      <AnswerForm
        id={question.id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        edit={edit}
        setEdit={setEdit}
      />
      <QuestionForm
        edit={true}
        data={question}
        isOpen={isOpenQuest}
        setIsOpen={setIsOpenQuest}
      />
    </div>
  );
};

export default Question;
