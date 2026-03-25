import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", req.url));
  }

  try {
    const vt = await db.select().from(verificationTokens).where(
      and(
        eq(verificationTokens.identifier, email),
        eq(verificationTokens.token, token)
      )
    );

    if (vt.length === 0) {
      return NextResponse.redirect(new URL("/login?error=InvalidToken", req.url));
    }
    
    if (vt[0].expires < new Date()) {
      return NextResponse.redirect(new URL("/login?error=TokenExpired", req.url));
    }

    // Verify user
    await db.update(users).set({ emailVerified: new Date() }).where(eq(users.email, email));
    
    // Clean token
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

    // Redirect to login with success indicator
    return NextResponse.redirect(new URL("/login?verified=1", req.url));
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(new URL("/login?error=VerificationFailed", req.url));
  }
}
