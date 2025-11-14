import moment from "moment";
import transporter from "../config/nodemailer.config";

export default async function sendPasswordEmail(user: any, password: string) {
  try {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/portfolio-3e2be.appspot.com/o/lasTrancasLodges%2Flogo.webp?alt=media&token=0c5d44ca-1507-4765-b55e-6209e6041bf5`;
    const mailOptions = {
      from: `"Reservas Cabañas" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Envio de Contraseña",
      html: `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0px 30px 0px 30px;">
                    <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                        <img src="${imageUrl}" alt="Logo Cabañas" style="width: 200; height: auto;">
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: start;">
                        <h2>Hola ${user.name} ${user.lastname}, tu nueva contraseña ha sido enviada.</h2>
                        <p><strong>Nueva contraseña:</strong> ${password} </p>
                        <p><strong>Fecha:</strong> ${moment(user.updatedAt).format("DD/MM/YYYY")}</p>
                    </div>
                    <p> Recomendamos que la cambies a la brevedad tu contraseña por una de tu eleccion.. </p>
                </div>
            `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error: error };
  }
}
