import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/aws-s3'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileUrl = await uploadToS3(
      buffer,
      file.name,
      file.type,
      folder
    )

    return NextResponse.json({
      success: true,
      url: fileUrl,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}