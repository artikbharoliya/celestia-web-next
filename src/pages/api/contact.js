
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const { name, email, message } = req.body;

    // // Create a transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER, // your email address
    //     pass: process.env.EMAIL_PASS  // your email password
    //   }
    // });

    // // Set up email data
    // let mailOptions = {
    //   from: email,
    //   to: process.env.EMAIL_USER, // your email address
    //   subject: `Contact form submission from ${name}`,
    //   text: message
    // };

    // try {
    //   await transporter.sendMail(mailOptions);
    //   res.status(200).json({ message: 'Message sent successfully' });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({ message: 'Failed to send message', error });
    // }
    res.status(500).json({ message: 'Service not ready yet', error });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}