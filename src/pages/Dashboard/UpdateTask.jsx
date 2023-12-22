import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Fragment, useContext, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const prioritySet = ["Low", "Moderate", "High"];

const UpdateTask = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { task_title, description, priority, task_deadline } = useLoaderData();

  const [selected, setSelected] = useState(priority);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating Task Data...");

    const updatedTask = {
      task_title: data.title,
      description: data.description,
      priority: selected,
      added_by_name: user?.displayName,
      added_by_email: user?.email,
      added_by_photo: user?.photoURL,
      task_deadline: data.deadline,
    };

    try {
      const response = await axiosPublic.patch(`/task/${id}`, updatedTask);
      if (response.data.modifiedCount > 0) {
        toast.success("Task Data Updated Successfully.", { id: toastId });
        reset();
        navigate("/dashboard/my-tasks");
      } else if (response.data.modifiedCount === 0) {
        toast.error("First make some changes.", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating this contest.", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>SyncTask | Update Task</title>
      </Helmet>
      <section
        className="animated-gradient px-5 md:px-14 lg:px-28 py-20 drop-shadow-sm 2xl:my-36"
        data-aos="zoom-in"
        data-aos-offset="300"
        data-aos-easing="ease-in-out-sine"
        data-aos-duration="1200"
      >
        <h1 className="text-center text-head font-slab font-medium text-4xl lg:text-5xl mb-8">
          Update Existing Task
        </h1>
        <p className="text-center text-blue-gray-400 md:text-lg mb-8 px-4 md:px-14 italic">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <span className="space-y-4">
            <p className="text-sub-head text-lg font-medium">Title</p>
            <input
              className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              defaultValue={task_title}
              {...register("title")}
              placeholder="Enter task title"
              required
            />
          </span>
          <span className="space-y-4">
            <p className="text-sub-head text-lg font-medium">Description</p>
            <input
              className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              defaultValue={description}
              {...register("description")}
              placeholder="Enter task description"
              required
            />
          </span>
          <span className="space-y-4">
            <p className="text-sub-head text-lg font-medium">Priority</p>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative cursor-default text-left text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500">
                  <span className="block truncate">{selected}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {prioritySet.map((tag, tagIdx) => (
                      <Listbox.Option
                        key={tagIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={tag}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {tag}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </span>
          <span className="space-y-4">
            <p className="text-sub-head text-lg font-medium">Deadline</p>
            <input
              className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
              type="datetime-local"
              defaultValue={task_deadline}
              {...register("deadline")}
              placeholder="Enter task deadline"
              required
            />
          </span>
          <span className="md:col-span-2 mt-6">
            <input
              className="bg-head text-sub-head text-xl font-medium w-full p-3 rounded-md"
              type="submit"
              value="Update Existing Task"
            />
          </span>
        </form>
      </section>
    </>
  );
};

export default UpdateTask;
