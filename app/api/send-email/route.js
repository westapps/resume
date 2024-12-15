import axios from 'axios';

export async function POST(req) {
  const { name, email, message } = await req.json();

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_EMAIL_API_URL}/email/send?source=resume`, {
      name,
      email,
      message,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`
      }
    });

    if (response.status === 200) {
      return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Failed to send email.' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending email.' }), { status: 500 });
  }
} 