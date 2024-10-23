"use client";
import {
  Input,
  Label,
  Field,
  Button,
  Dialog,
  Textarea,
  Transition,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import useQuestionForm from "@/hooks/useQuestionForm";
import { QuestionType } from "@/types";

type QuestionFormPageProps = {
  edit?: boolean;
  isOpen: boolean;
  data?: QuestionType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionForm = ({
  edit,
  data,
  isOpen,
  setIsOpen,
}: QuestionFormPageProps) => {
  const { values, errors, touched, handleChange, handleSubmit } =
    useQuestionForm({ edit, data, setIsOpen });

  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-10" onClose={() => setIsOpen(false)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 backdrop-blur-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                    <DialogTitle
                      as="h3"
                      className="mb-4 text-base/7 font-medium text-gray-900 dark:text-white"
                    >
                      {edit ? "Edit Question" : "Your Question"}
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                      <Field className="mb-1">
                        <Label className="text-lg font-bold text-gray-900 dark:text-white ">
                          Title
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          placeholder="Title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </Field>
                      <Field>
                        <Label className="text-lg font-bold text-gray-900 dark:text-white ">
                          Question
                        </Label>

                        <Textarea
                          rows={5}
                          name="description"
                          onChange={handleChange}
                          value={values.description}
                          placeholder="Write your Question"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </Field>
                      <div className="mt-2 flex justify-center">
                        <Button
                          type="submit"
                          // onClick={close}
                          className="mt-4 w-[100%] rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </DialogPanel>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuestionForm;
