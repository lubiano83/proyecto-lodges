import Profile from "@/app/components/profile/Profile";
import Title from "@/app/components/Title";

export default function ProfilePage() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
            <Title>Profile:</Title>
            <Profile/>
        </div>
    )
}