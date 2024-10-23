"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddAnswerMutation, useUpdateAnswerMutation } from "@/store/answer";
import { AnswerType } from "@/types";
import toast from "react-hot-toast";

type FormType = {
  description: string;
};

const useAnswerForm = ({
  id,
  edit,
  setIsOpen,
}: {
  id: number;
  edit?: {
    edit?: boolean;
    data?: AnswerType;
  };
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mutate] = useAddAnswerMutation();
  const [update] = useUpdateAnswerMutation();
  const formik = useFormik<FormType>({
    initialValues: {
      description: edit?.edit ? edit?.data?.description ?? "" : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = edit?.edit
          ? await update({ id: edit?.data?.id, ...values }).unwrap()
          : await mutate({ questionId: id, ...values }).unwrap();
        if (res.error) {
          toast.error(res.error.message);
        } else {
          setIsOpen(false);
          toast.success(
            edit?.edit ? "Changes saved successfully!" : "Successfully added!"
          );
          formik.resetForm();
        }
      } catch (error: any) {
        toast.error(error.message ? error.message : "Unknown Error");
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return formik;
};

export default useAnswerForm;
