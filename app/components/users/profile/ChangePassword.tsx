import Title from "../../Title";
import useAuth from "@/app/hooks/useAuth";
import Boton from "../../Boton";
import GoBack from "../../GoBack";

export default function ChangePassword({ email }: { email: string }) {
  const {
    changePasswordByEmail,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    repeatNewPassword,
    setRepeatNewPassword,
  } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await changePasswordByEmail(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-(--color1) text-(--color3) rounded-lg flex flex-col justify-center items-center p-4 gap-4 shadow-sm shadow-gray-700 max-w-lg w-full"
    >
      <Title>Change Password:</Title>
      <input
        type="password"
        name="oldPassword"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Antigua contraseña.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nueva contraseña.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="password"
        name="repeatNewPassword"
        value={repeatNewPassword}
        onChange={(e) => setRepeatNewPassword(e.target.value)}
        placeholder="Repite nueva contraseña.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <div className="w-full flex justify-center items-center gap-2">
        <GoBack path="/auth/profile" />
        <Boton>Modificar</Boton>
      </div>
    </form>
  );
}
