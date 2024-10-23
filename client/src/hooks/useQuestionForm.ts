import * as Yup from "yup";
import { useFormik } from "formik";

import { QuestionType } from "@/types";
import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
} from "@/store/question";
import toast from "react-hot-toast";

type FormType = {
  title: string;
  description: string;
};

const useQuestionForm = ({
  edit,
  data,
  setIsOpen,
}: {
  edit?: boolean;
  data?: QuestionType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mutate] = useAddQuestionMutation();
  const [update] = useUpdateQuestionMutation();

  const formik = useFormik<FormType>({
    initialValues: {
      title: edit ? data?.title ?? "" : "",
      description: edit ? data?.description ?? "" : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = edit
          ? await update({ id: data?.id, ...values }).unwrap()
          : await mutate(values).unwrap();
        if (res.error) {
          toast.error(res.error.message);
        } else {
          setIsOpen(false);
          toast.success(
            edit ? "Changes saved successfully!" : "Successfully added!"
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

export default useQuestionForm;
