import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Setup Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Setup Secure Encryption (AES-256-GCM)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '';
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  console.error('CRITICAL: ENCRYPTION_KEY must be a 32-byte hex string (64 characters) in .env.local');
  process.exit(1);
}
const key = Buffer.from(ENCRYPTION_KEY, 'hex');

// File path for storing encrypted subscribers
const SUBSCRIBERS_FILE = path.join(process.cwd(), 'subscribers.json');

// Helper to encrypt text
function encrypt(text: string): string {
  const iv = crypto.randomBytes(12); // GCM standard IV is 12 bytes
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

// Helper to hash text (SHA-256) for lookups/deduplication
function hashEmail(email: string): string {
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
}

// Ensure the subscribers.json file exists
if (!fs.existsSync(SUBSCRIBERS_FILE)) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
}

// POST endpoint to capture email submissions
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Basic validation
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email field is required and must be a string' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const emailHash = hashEmail(trimmedEmail);

    // 2. Read existing subscribers and check for duplicates using secure hash
    const fileData = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
    const subscribers = JSON.parse(fileData);
    
    const isDuplicate = subscribers.some((sub: any) => sub.hash === emailHash);
    if (isDuplicate) {
      return res.status(400).json({ error: 'This email is already subscribed' });
    }

    // 3. Encrypt and save the email address securely (no plain-text storage)
    const encryptedEmail = encrypt(trimmedEmail);
    const newSubscriber = {
      hash: emailHash,
      encrypted: encryptedEmail,
      subscribedAt: new Date().toISOString()
    };

    subscribers.push(newSubscriber);
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

    // 4. Capture in Resend by sending a welcome transaction email
    let emailSent = false;
    let resendMessage = '';

    if (process.env.RESEND_API_KEY) {
      try {
        const response = await resend.emails.send({
          from: 'Forge Systems <onboarding@resend.dev>',
          to: trimmedEmail,
          subject: 'Welcome to Forge Systems!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; rounded: 8px;">
              <h2 style="color: #2563eb; font-weight: 700;">Welcome to Forge Systems!</h2>
              <p style="color: #333; line-height: 1.6;">Thank you for subscribing to our newsletter.</p>
              <p style="color: #333; line-height: 1.6;">We'll keep you updated with the latest in design, high-performance apps, and automated workflows.</p>
              <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px;">© 2026 Forge Systems. All Rights Reserved.</p>
            </div>
          `
        });

        if (response.error) {
          resendMessage = `Resend reported: ${response.error.message}`;
          console.warn('Resend error:', response.error);
        } else {
          emailSent = true;
          resendMessage = 'Confirmation email sent successfully via Resend!';
        }
      } catch (resendErr: any) {
        resendMessage = `Resend connection failed: ${resendErr.message || resendErr}`;
        console.warn('Failed to call Resend API:', resendErr);
      }
    } else {
      resendMessage = 'Resend API key missing, saved local subscription only.';
    }

    return res.status(200).json({
      success: true,
      message: 'Subscription saved successfully!',
      emailSent,
      resendStatus: resendMessage
    });

  } catch (error: any) {
    console.error('Subscription Endpoint Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Secure backend API running at http://localhost:${PORT}`);
});
