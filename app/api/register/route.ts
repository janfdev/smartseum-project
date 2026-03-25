import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Nama, Email, dan Password wajib diisi" }, { status: 400 });
    }

    const existingUserList = await db.select().from(users).where(eq(users.email, email));
    
    if (existingUserList.length > 0) {
      if (existingUserList[0].emailVerified) {
        return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
      }
      
      // Update the user's password and name if they haven't verified yet
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.update(users).set({ 
        password: hashedPassword, 
        name,
        // Reset timestamp
        updatedAt: new Date()
      }).where(eq(users.email, email));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.insert(users).values({
        email,
        password: hashedPassword,
        name,
      });
    }

    // Prepare Token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    // Clean up old tokens for this email if any
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires,
    });

    // Send Mail
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    // Handle base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: `${process.env.RESEND_SENDER_NAME || "Auth"} <${process.env.RESEND_SENDER_EMAIL || "no-reply@dummy.com"}>`,
      to: email,
      subject: "Verifikasi Akun SmartSeum Anda",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:20px;border:1px solid #eaeaea;border-radius:12px;background-color:#ffffff;text-align:center;">
          <h2 style="color:#10b981;margin-bottom:8px;">Halo ${name}!</h2>
          <p style="color:#333;font-size:16px;">Terima kasih telah bergabung di SmartSeum. Sebelum Anda dapat mulai berkeliling museum bersama fitur inovatif kami, Anda harus memverifikasi Email Anda.</p>
          <a href="${verifyUrl}" style="display:inline-block;padding:14px 28px;background-color:#10b981;color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;margin:24px 0;">Verifikasi Email Saya</a>
          <p style="font-size:12px;color:#999;border-top:1px solid #eaeaea;padding-top:16px;">Jika Anda merasa tidak melakukan pendaftaran ini, abaikan pesan ini. Link valid untuk 24 jam.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, message: "Pendaftaran berhasil, silahkan cek email untuk verifikasi!" });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem internal." }, { status: 500 });
  }
}
