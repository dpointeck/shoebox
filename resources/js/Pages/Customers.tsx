import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

function Header({ title }: { title: string }) {
    return <h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>;
}

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header title="Customers"/>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">seas</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
