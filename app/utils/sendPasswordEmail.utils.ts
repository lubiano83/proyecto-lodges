import moment from "moment";
import transporter from "../config/nodemailer.config";
import useCapitalize from "../hooks/useCapitalize";

export default async function sendPasswordEmail(user: any, password: string) {

  const { capitalizeEachWord }: any = useCapitalize();
  const title = "Anwa Lodge"

  try {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/portfolio-3e2be.appspot.com/o/lasTrancasLodges%2Flogo.webp?alt=media&token=0c5d44ca-1507-4765-b55e-6209e6041bf5`;
    const mailOptions = {
      from: `"Reservas Cabañas" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Envio de Contraseña",
      html: `
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7; padding:30px 0; font-family:Arial, Helvetica, sans-serif;">
                <tr>
                  <td align="center">

                    <!-- Contenedor principal -->
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; padding:40px; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

                      <!-- Título -->
                      <tr>
                        <td align="center" style="padding-bottom:20px;">
                          <h1 style="margin:0; font-size:28px; color:#222; font-weight:600;">
                            ${title}
                          </h1>
                        </td>
                      </tr>

                      <!-- Logo -->
                      <tr>
                        <td align="center">
                          <img 
                            src="${imageUrl}" 
                            alt="Logo Anwa Lodge" 
                            style="width:160px; height:auto; border-radius:6px; margin-bottom:20px;"
                          />
                        </td>
                      </tr>

                      <!-- Contenido -->
                      <tr>
                        <td style="color:#333; font-size:16px; line-height:1.6;">
                          <p style="margin:0 0 15px 0;">
                            Hola <strong>${capitalizeEachWord(user.name)} ${capitalizeEachWord(user.lastname)}</strong>,
                          </p>

                          <p style="margin:0 0 15px 0;">
                            Tu nueva contraseña ha sido generada y enviada correctamente.
                          </p>

                          <p style="margin:0 0 15px 0;">
                            <strong>Nueva contraseña:</strong> 
                            <span style="background:#f2f2f2; padding:6px 10px; border-radius:6px; font-weight:bold;">
                              ${password}
                            </span>
                          </p>

                          <p style="margin:0 0 20px 0;">
                            <strong>Fecha:</strong> ${moment(user.updatedAt).format("DD/MM/YYYY")}
                          </p>

                          <p style="margin:0 0 20px 0;">
                            Te recomendamos cambiar tu contraseña apenas ingreses al sistema, para mantener la seguridad de tus datos.
                          </p>
                        </td>
                      </tr>

                      <!-- Línea divisoria -->
                      <tr>
                        <td style="padding:10px 0;">
                          <hr style="border:none; border-top:1px solid #e0e0e0;" />
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td align="center" style="padding-top:10px; color:#777; font-size:14px;">
                          <p style="margin:0;">© ${new Date().getFullYear()} <strong>${title}</strong></p>
                          <p style="margin:5px 0 0 0;">Las Trancas, Chillán - Chile</p>
                        </td>
                      </tr>

                    </table>
                    <!-- Fin contenedor -->
                  </td>
                </tr>
              </table>
            `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error: error };
  }
}
