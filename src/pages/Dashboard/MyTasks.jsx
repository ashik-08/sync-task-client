import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: myTasks = [], refetch } = useQuery({
    queryKey: ["my-tasks", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/tasks/${user?.email}`);
      return response.data;
    },
  });

  const onDragEnd = (dropResult) => {
    if (dropResult.destination.droppableId === dropResult.source.droppableId) {
      return toast.error("No changes will make");
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to revert your task status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Updating Task Status...");
        try {
          const response = await axiosPublic.patch(
            `/tasks/${dropResult.draggableId}`,
            { status: dropResult.destination.droppableId }
          );
          if (response.data.modifiedCount > 0) {
            toast.success("Task Status Changed.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while updating this task.", {
            id: toastId,
          });
        }
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting Task...");
        // delete own created task from the database
        try {
          const response = await axiosPublic.delete(`/tasks/${id}`);
          if (response.data.deletedCount > 0) {
            toast.success("Task Deleted Successfully.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting this task.", {
            id: toastId,
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>SyncTask | My Tasks</title>
      </Helmet>
      <section>
        <h1 className="text-center text-3xl font-play font-bold uppercase">
          My Tasks
        </h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Todo Column */}
            <Droppable droppableId="to-do">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <h5 className="bg-blue-gray-300 w-52 mx-auto text-center font-bold py-2 rounded-lg mb-8">
                    Todo{" "}
                    <span className="bg-white p-1.5 rounded-full">
                      {myTasks?.toDo?.length}
                    </span>{" "}
                  </h5>
                  <div className="">
                    {myTasks?.toDo?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div
                              style={{
                                backgroundColor: "#ECEFF1",
                                marginBottom: "20px",
                                padding: "12px",
                                borderRadius: "8px",
                              }}
                              className="space-y-2"
                            >
                              <p className="xl:text-lg font-medium">
                                {task.task_title}
                              </p>
                              <p>{task.description}</p>
                              <p className="flex justify-between">
                                <span>{task.task_deadline}</span>
                                <span className="text-special">
                                  {task.priority}
                                </span>
                              </p>
                              {/* edit */}
                              <span>
                                <Link to={`/dashboard/update-task/${task._id}`}>
                                  <Tooltip content="Edit Task">
                                    <IconButton variant="text">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                      </svg>
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                              </span>
                              {/* delete */}
                              <span onClick={() => handleDelete(task._id)}>
                                <Tooltip content="Delete Task">
                                  <IconButton variant="text">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                  </IconButton>
                                </Tooltip>
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>

            {/* Ongoing Column */}
            <Droppable droppableId="ongoing">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <h5 className="bg-purple-300 w-52 mx-auto text-center font-bold py-2 rounded-lg mb-8">
                    Ongoing{" "}
                    <span className="bg-white p-1.5 rounded-full">
                      {myTasks?.onGoing?.length}
                    </span>{" "}
                  </h5>
                  <div className="">
                    {myTasks?.onGoing?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div
                              style={{
                                backgroundColor: "#D1C4E9",
                                marginBottom: "20px",
                                padding: "12px",
                                borderRadius: "8px",
                              }}
                              className="space-y-2"
                            >
                              <p className="xl:text-lg font-medium">
                                {task.task_title}
                              </p>
                              <p>{task.description}</p>
                              <p className="flex justify-between">
                                <span>{task.task_deadline}</span>
                                <span className="text-special">
                                  {task.priority}
                                </span>
                              </p>
                              {/* edit */}
                              <span>
                                <Link to={`/dashboard/update-task/${task._id}`}>
                                  <Tooltip content="Edit Task">
                                    <IconButton variant="text">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                      </svg>
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                              </span>
                              {/* delete */}
                              <span onClick={() => handleDelete(task._id)}>
                                <Tooltip content="Delete Task">
                                  <IconButton variant="text">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                  </IconButton>
                                </Tooltip>
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>

            {/* Ongoing Column */}
            <Droppable droppableId="completed">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <h5 className="bg-green-300 w-52 mx-auto text-center font-bold py-2 rounded-lg mb-8">
                    Completed{" "}
                    <span className="bg-white p-1.5 rounded-full">
                      {myTasks?.completed?.length}
                    </span>{" "}
                  </h5>
                  <div className="">
                    {myTasks?.completed?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div
                              style={{
                                backgroundColor: "#C8E6C9",
                                marginBottom: "20px",
                                padding: "12px",
                                borderRadius: "8px",
                              }}
                              className="space-y-2"
                            >
                              <p className="xl:text-lg font-medium">
                                {task.task_title}
                              </p>
                              <p>{task.description}</p>
                              <p className="flex justify-between">
                                <span>{task.task_deadline}</span>
                                <span className="text-special">
                                  {task.priority}
                                </span>
                              </p>
                              {/* delete */}
                              <span onClick={() => handleDelete(task._id)}>
                                <Tooltip content="Delete Task">
                                  <IconButton variant="text">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                  </IconButton>
                                </Tooltip>
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </section>
    </>
  );
};

export default MyTasks;
