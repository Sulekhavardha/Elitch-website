import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Admin from '../models/Admin.js';
import AuditLog from '../models/AuditLog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vardha_builders';

async function seedAdmin() {
  console.log(`[Seed Script] Connecting to database at: ${MONGO_URI}`);
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[Seed Script] Connected successfully.');

    // Seed or Verify Superadmin Account
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@vardhabuilders.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'VardhaAdmin@2026';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = await Admin.create({
        name: 'Vardha Master Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
        phone: '+91 98200 91827',
        isActive: true
      });
      console.log(`[Seed Script] Created primary Superadmin: ${adminEmail}`);
    } else {
      console.log(`[Seed Script] Superadmin already exists: ${adminEmail}`);
    }

    // Seed initial Audit Log
    try {
      await AuditLog.create({
        action: 'ADMIN_SEEDED',
        entityType: 'SETTINGS',
        adminEmail: adminEmail,
        details: 'Admin authentication account verified and active.'
      });
    } catch (logErr) {}

    console.log('\n======================================================');
    console.log('✅ ADMIN SEED SCRIPT COMPLETE');
    console.log(`   Admin Email:    ${adminEmail}`);
    console.log(`   Admin Password: ${adminPassword}`);
    console.log('======================================================\n');
  } catch (error) {
    console.error('[Seed Script Error]:', error);
  } finally {
    await mongoose.disconnect();
    console.log('[Seed Script] Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedAdmin();
