import {Resend} from "resend"

const resend = new Resend("re_3m6jUtgM_MC5o7g9Ehk9draGh6eTu71Di");


export const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from : "onboarding@resend.dev",
      to,
      subject,
      html
    })
  } catch (err) {
    console.log("email error")
  }
}