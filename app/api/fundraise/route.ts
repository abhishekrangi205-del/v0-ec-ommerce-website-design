import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      organizationName,
      organizationType,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      postalCode,
    } = body

    // Validate required fields
    if (!organizationName || !organizationType || !firstName || !lastName || !email || !phone || !address || !city || !province || !postalCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to admin
    await resend.emails.send({
      from: 'noreply@localjerkyplus.com',
      to: 'abhishekrangi413@gmail.com',
      subject: `New Fundraising Request from ${organizationName}`,
      html: `
        <h2>New Fundraising Request</h2>
        <h3>Organization Information</h3>
        <p><strong>Organization Name:</strong> ${organizationName}</p>
        <p><strong>Organization Type:</strong> ${organizationType}</p>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h3>Address</h3>
        <p><strong>Street:</strong> ${address}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Province:</strong> ${province}</p>
        <p><strong>Postal Code:</strong> ${postalCode}</p>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'noreply@localjerkyplus.com',
      to: email,
      subject: 'Fundraising Request Received - Local Jerky Plus',
      html: `
        <h2>Thank You for Your Interest!</h2>
        <p>Hi ${firstName},</p>
        <p>We received your fundraising request for ${organizationName}.</p>
        <p>Our team will review your information and contact you within 1-2 business days with details about how we can help your organization raise money.</p>
        <p>In the meantime, feel free to check out our products at <a href="https://localjerkyplus.com">Local Jerky Plus</a>.</p>
        <br />
        <p>Best regards,<br />Local Jerky Plus Team</p>
      `,
    })

    return NextResponse.json(
      { message: 'Fundraising request submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fundraise API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
