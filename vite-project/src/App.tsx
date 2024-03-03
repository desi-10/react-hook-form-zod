import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type FormFields = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    reset();
  };

  return (
    <main className="mt-36">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-[90%] mx-auto mt-5 lg:w-[500px]"
      >
        <div className="mb-2">
          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <input
            {...register("email")}
            className="border rounded px-2 py-1 w-full"
            id="email"
            type="email"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="text-xs">
            Password
          </label>
          <input
            {...register("password")}
            className="w-full border rounded px-2 py-1"
            type="password"
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="border bg-blue-500 text-white disabled:bg-gray-200 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
