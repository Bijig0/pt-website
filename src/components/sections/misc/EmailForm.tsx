import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import validator from "validator";
import { z } from "zod";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  message: z.string().nullable(),
});

type ErrorTextProps = {
  children: React.ReactNode;
};

const ErrorText = (props: ErrorTextProps) => {
  return (
    <p className="text-danger text-3" style={{ fontSize: "12px" }}>
      {props.children}
    </p>
  );
};

type Inputs = z.infer<typeof schema>;

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const sendEmail = async (inputs: Inputs) => {
    const templateParams = {
      to_name: "Brady",
      from_name: "Gifleet Car Rental",
      subject: "New Car Rental Quote From Contact us",
      message: `New From Car Rental Quote, details: ${JSON.stringify(inputs)}`,
    };

    const serviceId = "service_010xydf";
    const templateName = "template_1dcm4rn";
    const publicKey = "Yd6r5t5etWEKD3GNh";
    return emailjs.send(serviceId, templateName, templateParams, publicKey);
  };

  const {
    mutate: sendEmailMutate,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: sendEmail,
    mutationKey: ["sendEmail"],
  });

  const onSubmit: SubmitHandler<Inputs> = (inputs) => {
    console.log(inputs);
    sendEmailMutate(inputs);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="seller_offer_form mt-40"
      >
        <div className="row g-3">
          <div className="col-6">
            <div className="input-field">
              <label>First Name</label>
              <input
                required
                className="color-secondary"
                {...register("firstName", { required: true })}
                type="text"
              />
              {errors.firstName && (
                <ErrorText>First name is required</ErrorText>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="input-field">
              <label>Last Name</label>
              <input
                required
                className="color-secondary"
                {...register("lastName", { required: true })}
                type="text"
              />
              {errors.lastName && <ErrorText>Last name is required</ErrorText>}
            </div>
          </div>
          <div className="col-6">
            <div className="input-field">
              <label>Email</label>
              <input
                className="color-secondary"
                {...register("email", { required: true })}
                type="email"
              />
              {errors.email && <ErrorText>Email is required</ErrorText>}
            </div>
          </div>
          <div className="col-6">
            <div className="input-field">
              <label>Phone</label>
              <input
                className="color-secondary"
                {...register("phoneNumber", { required: true })}
                type="tel"
              />
              {errors.phoneNumber && (
                <ErrorText>Phone Number is required</ErrorText>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="input-field">
              <label>Message</label>
              <textarea
                className="color-secondary"
                {...register("message")}
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-md mt-30">
          {isLoading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Request a quote"
          )}
        </button>
      </form>
      {isSuccess ? <SuccessToast /> : null}
      {error ? <ErrorToast /> : null}
    </>
  );
};

const SuccessToast = () => {
  return (
    <div className="alert alert-success" role="alert">
      We have received your quote request and will be in touch soon!
    </div>
  );
};

const ErrorToast = () => {
  return (
    <div className="alert alert-danger" role="alert">
      Something went wrong, please try again
    </div>
  );
};

const queryClient = new QueryClient();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EmailForm />
    </QueryClientProvider>
  );
};

export default Main;
