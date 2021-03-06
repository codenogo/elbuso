Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Reset your account password";
  },
  html( user, url ) {
    let name   = user.profile.firstname,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "hello@elbuso.com",
        emailBody      = `<table style="border:1px solid #ddd; width:auto; max-width:700px;" cell-padding="0" cell-spacing="0">
      <tr>
        <td style="background:#000; padding:20px; text-align:center;">
          <img src="http://elbuso.com/img/logo-white.png" height="35" style="height:35px" />
        </td>
      </tr>
      <tr>
        <td style="padding:20px; text-align:center; border-bottom: 1px solid #ddd;">
          <p style="padding:20px 0; font-family: arial,sans-serif; color: #767676;">Hi ${name},</p>
          <p style="padding:20px 50px; font-family: arial,sans-serif; color: #767676;">You have selected to reset your password on Elbuso. In order to create a new password click on the link below.</p>
          <p style="padding:30px 0">
            <a href="${urlWithoutHash}" style="font-family: arial,sans-serif; text-decoration:none;color:#000; padding:10px 20px; border:1px solid #000">reset my password</a>
          </p>
          <p style="padding:20px 50px; font-family: arial,sans-serif; color: #767676;">If you have any problems feel free to talk to us on <a style="text-decoration:none; color:#000;" href="mailto:hello@elbuso.com">${supportEmail}</a></p>
        </td>
      </tr>
      <tr>
        <td style="text-align:center;">
          <img src="http://elbuso.com/img/logo.png" height="35" style="height:35px; margin-top:30px;" />
          <p style="padding:20px 50px; font-size:12px; font-family: arial,sans-serif; color: #767676;">&copy; Elbuso Inc </p>
        </td>
      </tr>
    </table>`;

    return emailBody;
  }
};