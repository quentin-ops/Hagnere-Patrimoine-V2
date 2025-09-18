import { NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/aws-s3'
import fs from 'fs/promises'
import path from 'path'

export async function POST() {
  try {
    // Read the SVG file
    const iconPath = path.join(process.cwd(), 'public/icons/bank-icon.svg')
    const iconBuffer = await fs.readFile(iconPath)
    
    // Upload to S3
    const url = await uploadToS3(
      iconBuffer,
      'bank-icon.svg',
      'image/svg+xml',
      'icons'
    )
    
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload icon' },
      { status: 500 }
    )
  }
}