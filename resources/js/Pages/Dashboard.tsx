import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";

interface Task {
    id?: number;
    name: string;
    description: string;
    customer: string;
    project: string;
    start: string;
    end: string;
    duration: number;
    status: string;
}

const taskData: Task[] = [
    {
        name: "Task 1",
        description: "Task 1 description",
        customer: "Customer 1",
        project: "Project 1",
        start: "2022-01-01",
        end: "2022-01-02",
        duration: 1,
        status: "completed",
    },
    {
        name: "Task 2",
        description: "Task 2 description",
        customer: "Customer 2",
        project: "Project 2",
        start: "2022-01-02",
        end: "2022-01-03",
        duration: 1,
        status: "completed",
    },
    {
        name: "Task 3",
        description: "Task 3 description",
        customer: "Customer 3",
        project: "Project 3",
        start: "2022-01-03",
        end: "2022-01-04",
        duration: 1,
        status: "todo",
    },
];

function Header({ title }: { title: string }) {
    return (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {title}
        </h2>
    );
}

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header title="Dashboard" />}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold">Tasks</h3>
                        </div>
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </Button>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {taskData.map((task, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-start justify-start w-full p-4 my-2 bg-gray-100 rounded-lg"
                                >
                                    <h3 className="font-semibold text-lg text-gray-800 leading-tight">
                                        {task.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {task.description}
                                    </p>
                                    <div className="flex flex-row items-center justify-between w-full mt-2">
                                        <div className="flex flex-col items-start justify-start">
                                            <p className="text-sm text-gray-600">
                                                Customer: {task.customer}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Project: {task.project}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start justify-start">
                                            <p className="text-sm text-gray-600">
                                                Start: {task.start}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                End: {task.end}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start justify-start">
                                            <p className="text-sm text-gray-600">
                                                Duration: {task.duration} day(s)
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Status: {task.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
