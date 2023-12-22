import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

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
                              {/* Add delete and edit buttons here */}
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
                              {/* Add delete and edit buttons here */}
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
                              {/* Add delete and edit buttons here */}
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
