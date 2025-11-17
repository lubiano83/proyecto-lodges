import Module from "@/app/components/admin/Module";
import Title from "@/app/components/Title";

export default function AdminUsersPage() {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center p-8 gap-6">
            <Title>Panel Usuarios:</Title>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <Module path={"/admin/users/role"}>Change Role</Module>
            </div>
        </div>
    )
};